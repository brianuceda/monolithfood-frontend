import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { DetailedIntakeDTO, NutritionDTO } from '../../interfaces/NutritionDTO';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryIntake } from '../../interfaces/MacrosDetailedDTO';
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
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.savedData = this.data.data;
    this.isAdding = this.isAddingIntake();
    this.addOrEditText = this.isAdding ? 'Agregar' : 'Actualizar';
    this.initializeNutrientData(this.savedData.nutrients);
    this.reactiveForm();
    this.setDefaultDateTime();
    this.updateNutrientQuantities();
    this.processNutrientData(this.savedData.nutrients);
  }

  saveOrEdit(): void {}

  // Verifica si se está agregando o editando un registro de ingesta
  isAddingIntake(): boolean {
    return this.savedData.date === undefined;
  }

  // Inicializar los valores de los nutrientes
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

  //
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

  // Método para separar y formatear fecha y hora
  separateAndFormatDate(): void {
    const dateTimeString = this.savedData.date;
    const datePart = dateTimeString.split('T')[0];
    let timePart = dateTimeString.split('T')[1].split('+')[0];
    // Mantener solo la hora y los minutos
    timePart = timePart.substring(0, 5);
    this.savedData.date = datePart;
    this.time = timePart;
  }

  // Método para establecer valores por defecto de fecha y hora
  setDefaultDateTime(): void {
    const currentDate = new Date();
    if (!this.savedData.date) {
      this.savedData.date = currentDate.toISOString().split('T')[0];
    } else {
      this.separateAndFormatDate();
    }
    if (!this.time) {
      this.time = currentDate.toTimeString().substring(0, 5);
      this.onTimeChange();
    }
  }

  reactiveForm(): void {
    this.myForm = this.formBuilder.group({
      quantity: ['', [Validators.required, Validators.min(0)]],
      unitOfMeasurement: ['', [Validators.required]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      categoryIntake: ['', [Validators.required]],
    });
  }

  onTimeChange(): void {
    const hours = parseInt(this.time.split(':')[0], 10);

    if (hours > 2 && hours < 12) {
      this.savedData.categoryIntake = 'DESAYUNO';
    } else if (hours >= 12 && hours < 19) {
      this.savedData.categoryIntake = 'ALMUERZO';
    } else {
      this.savedData.categoryIntake = 'CENA';
    }
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
