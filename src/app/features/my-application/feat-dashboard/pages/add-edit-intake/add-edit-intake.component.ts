import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import {
  DetailedIntakeDTO,
  NutritionDTO,
  AddIntakeDTO,
  EditIntakeDTO,
} from '../../interfaces/NutritionDTO';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-intake',
  templateUrl: './add-edit-intake.component.html',
  styleUrls: ['./add-edit-intake.component.scss'],
})
export class AddEditIntakeComponent implements OnInit {
  // Verifica si se está agregando o editando un registro de ingesta
  public isAdding!: boolean;
  public addOrEditText!: string;
  // Formulario data
  myForm!: FormGroup;
  public savedData!: DetailedIntakeDTO;
  public time!: string;
  // Valores originales
  originalMainNutrients: NutritionDTO[] = [];
  originalOtherNutrients: NutritionDTO[] = [];
  // Valores actuales
  public mainNutrients: NutritionDTO[] = [];
  public otherNutrients: NutritionDTO[] = [];

  constructor(
    private dialogRef: DialogRef<AddEditIntakeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.savedData = this.data.data;
    this.isAdding = this.isAddingIntake();
    this.addOrEditText = this.isAdding ? 'Agregar' : 'Actualizar';
    this.initializeNutrientData(this.savedData.nutrients);
    this.reactiveForm();
    this.setDefaultDateTime();
    this.processNutrientData(this.savedData.nutrients);
    this.updateNutrientQuantities();
  }

  // Inicializa el formulario reactivo
  reactiveForm(): void {
    this.myForm = this.formBuilder.group({
      quantity: ['', [Validators.required, Validators.min(0)]],
      unitOfMeasurement: ['', [Validators.required]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      categoryIntake: ['', [Validators.required]],
    });
  }

  // Agrega o edita un registro de ingesta
  confirmSaveOrEdit(savedData: DetailedIntakeDTO): void {
    if (this.isAdding) {
      const combinedDateTime = this.combineDateTime(
        this.savedData.date,
        this.time,
        'Add'
      );
      // Agregar ingesta
      let addIntake: AddIntakeDTO = {
        foodId: savedData.id,
        quantity: savedData.quantity,
        unitOfMeasurement: savedData.unitOfMeasurement,
        date: combinedDateTime,
      };
      this.dashboardService.addIntake(addIntake).subscribe(() => {
        this.closeDialog();
      });
    } else {
      const combinedDateTime = this.combineDateTime(
        this.savedData.date,
        this.time,
        'Edit'
      );
      // Editar ingesta
      let editIntake: EditIntakeDTO = {
        eatId: savedData.id,
        quantity: savedData.quantity,
        unitOfMeasurement: savedData.unitOfMeasurement,
        date: combinedDateTime,
      };
      this.dashboardService.updateIntake(editIntake).subscribe(() => {
        this.closeDialog();
      });
    }
    this.dashboardService;
  }

  // Verifica si se está agregando o editando un registro de ingesta
  isAddingIntake(): boolean {
    return this.savedData.date === undefined;
  }

  // Inicializa los valores de los nutrientes
  initializeNutrientData(nutrients: NutritionDTO[]): void {
    this.mainNutrients = nutrients.filter((nutrient) =>
      [1, 2, 3, 4].includes(nutrient.id)
    );
    this.otherNutrients = nutrients.filter(
      (nutrient) => ![1, 2, 3, 4].includes(nutrient.id)
    );
    // Clonar los valores originales
    this.originalMainNutrients = JSON.parse(JSON.stringify(this.mainNutrients));
    this.originalOtherNutrients = JSON.parse(
      JSON.stringify(this.otherNutrients)
    );
  }

  // Actualiza los valores de los nutrientes en base a la cantidad
  updateNutrientQuantities(): void {
    const factor = this.savedData.quantity;

    this.mainNutrients = this.originalMainNutrients.map((nutrient) => ({
      ...this.transformNutrientData(nutrient),
      nutrientQuantity: parseFloat(
        (nutrient.nutrientQuantity * factor).toFixed(2)
      ),
    }));

    this.otherNutrients = this.originalOtherNutrients.map((nutrient) => ({
      ...this.transformNutrientData(nutrient),
      nutrientQuantity: parseFloat(
        (nutrient.nutrientQuantity * factor).toFixed(2)
      ),
    }));
  }

  private combineDateTime(date: string, time: string, type: string): string {
    const dateTime = new Date(date + 'T' + time);
    const offset = dateTime.getTimezoneOffset() * 60000;
    const localDateTime = new Date(dateTime.getTime() - offset);

    if (type === 'Add') {
      return localDateTime.toISOString();
    } else if (type === 'Edit') {
      localDateTime.setHours(localDateTime.getHours() - 5);
      return localDateTime.toISOString();
    }
    return localDateTime.toISOString();
  }

  // Metodo para establecer la fecha y hora por defecto en el formulario
  setDefaultDateTime(): void {
    const currentDate = new Date();
    if (!this.savedData.date) {
      const newCurrentDate = new Date();
      newCurrentDate.setHours(currentDate.getHours() - 5);
      const localDate = newCurrentDate.toISOString().split('T')[0];
      this.savedData.date = localDate;
    } else {
      this.separateAndFormatDate();
    }
    if (!this.time) {
      this.time = currentDate.toTimeString().substring(0, 5);
      this.onTimeChange();
    }
  }

  // Método para separar y formatear fecha y hora que vienen juntas del backend
  separateAndFormatDate(): void {
    const dateTimeString = this.savedData.date;
    const dateTime = new Date(dateTimeString);
    const datePart = dateTime.toISOString().split('T')[0];
    let timePart = dateTime.toISOString().split('T')[1];
    timePart = timePart.substring(0, 5);
    this.savedData.date = datePart;
    this.time = timePart;
  }

  onTimeChange(): void {
    const hours = parseInt(this.time.split(':')[0], 10);
    if (hours < 12) {
      this.savedData.categoryIntake = 'DESAYUNO';
    } else if (hours >= 12 && hours < 19) {
      this.savedData.categoryIntake = 'ALMUERZO';
    } else {
      this.savedData.categoryIntake = 'CENA';
    }
    // Desayuno: 0:00 hasta las 11:59
    // Almuerzo: 12:00 hasta las 18:59
    // Cena: 19:00 hasta las 23:59
  }

  onCategoryChange(): void {
    switch (this.savedData.categoryIntake) {
      case 'DESAYUNO':
        this.time = '08:00';
        break;
      case 'ALMUERZO':
        this.time = '13:00';
        break;
      case 'CENA':
        this.time = '20:00';
        break;
    }
  }

  // Separar los nutrientes principales y los demás
  processNutrientData(nutrients: NutritionDTO[]): void {
    if (nutrients && Array.isArray(nutrients)) {
      this.mainNutrients = nutrients.filter((nutrient) =>
        [1, 2, 3, 4].includes(nutrient.id)
      );
      this.otherNutrients = nutrients.filter(
        (nutrient) => ![1, 2, 3, 4].includes(nutrient.id)
      );
      this.mainNutrients = this.mainNutrients.map(this.transformNutrientData);
      this.otherNutrients = this.otherNutrients.map(this.transformNutrientData);
    } else {
      console.error('Los datos recibidos no son válidos');
    }
  }

  private transformNutrientData(nutrient: NutritionDTO): NutritionDTO {
    return {
      ...nutrient,
      name: nutrient.name.toUpperCase(),
      unitOfMeasurement: nutrient.unitOfMeasurement.toLowerCase(),
    };
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
