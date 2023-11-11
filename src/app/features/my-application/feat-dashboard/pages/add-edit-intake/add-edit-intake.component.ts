import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { NutritionDTO } from '../../interfaces/NutritionDTO';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryIntake } from '../../interfaces/MacrosDetailedDTO';

@Component({
  selector: 'app-add-edit-intake',
  templateUrl: './add-edit-intake.component.html',
  styleUrls: ['./add-edit-intake.component.scss'],
})
export class AddEditIntakeComponent implements OnInit {
  public savedData!: {
    id: number;
    name: string;
    imgUrl: string;
    quantity: number;
    unitOfMeasurement: string;
  };
  public mainNutrients: NutritionDTO[] = []; // Arreglo para los nutrientes principales
  public otherNutrients: NutritionDTO[] = []; // Arreglo para los demás nutrientes

  constructor(
    private dialogRef: DialogRef<AddEditIntakeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.data) {
      this.savedData = this.data.data;
      this.savedData.unitOfMeasurement =
        this.savedData.unitOfMeasurement.toLowerCase();
    }
    this.getNutrients();
  }

  getNutrients(): void {
    this.dashboardService
      .getNutrients(this.savedData.id, this.savedData.quantity)
      .subscribe(
        (data) => {
          this.processNutrientData(data.nutrients);
        },
        (error) => {
          console.error('Error al obtener nutrientes: ', error);
        }
      );
  }

  // Método para procesar y transformar los datos de nutrientes
  processNutrientData(nutrients: NutritionDTO[]): void {
    if (nutrients && Array.isArray(nutrients)) {
      // Separar los nutrientes principales y los demás
      this.mainNutrients = nutrients.filter((nutrient) =>
        [1, 2, 3, 4].includes(nutrient.id)
      );
      this.otherNutrients = nutrients.filter(
        (nutrient) => ![1, 2, 3, 4].includes(nutrient.id)
      );
      // Transformar los datos de cada nutriente
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
