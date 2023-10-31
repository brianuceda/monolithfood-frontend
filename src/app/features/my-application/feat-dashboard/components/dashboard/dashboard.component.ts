import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
// Components
import { SetInformationComponent } from '../../../feat-onboarding/components/set-information/set-information.component';
import { SelectObjectivesComponent } from '../../../feat-onboarding/components/select-objectives/select-objectives.component';
import { SelectActivityLevelComponent } from '../../../feat-onboarding/components/select-activity-level/select-activity-level.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GlobalService } from 'src/app/shared/services/global.service';
import { AddEditIntakeComponent } from '../add-edit-intake/add-edit-intake.component';

import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
} from 'ng-apexcharts';
import { MacrosDetailedDTO } from '../../interfaces/MacrosDetailedDTO';
import { FormControl } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  labels: string[];
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  public chartOptionsCalories?: ChartOptions;
  public colorCalories: string = '';
  public chartOptionsProteins?: ChartOptions;
  public colorProteins: string = '';
  public chartOptionsCarbs?: ChartOptions;
  public colorCarbs: string = '';
  public chartOptionsFats?: ChartOptions;
  public colorFats: string = '';
  selectedDate = new FormControl(new Date());

  public chartData: MacrosDetailedDTO = {
    // Calorías: Menos del 10% (Rojo)
    consumedCalories: 183.07,
    dailyCaloricIntake: 2000.0,
    percentageCaloricConsumed: 9.15,
    // Proteínas: Entre 20% y 30% (Naranja)
    consumedProteins: 22.5,
    dailyProteinIntake: 75.53,
    percentageProteinConsumed: 29.77,
    // Carbohidratos: Entre 40% y 50% (Amarillo)
    consumedCarbohydrates: 113.09,
    dailyCarbohydrateIntake: 250.76,
    percentageCarbohydrateConsumed: 45.02,
    // Grasas: Entre 65% y 70% (Verde)
    consumedFats: 45.02,
    dailyFatIntake: 65.55,
    percentageFatConsumed: 68.69,
  };

  constructor(
    private globalService: GlobalService,
    private dashboardService: DashboardService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    Promise.resolve().then(() => {
      this.globalService.setTitle('Panel de Inicio');
    });
    this.openDialogBasedOnProfileStage();
    this.initializeCharts();
    // Suscripción a los cambios de fecha
    this.dashboardService.startAndEndDate(this.selectedDate);
    this.selectedDate.valueChanges.subscribe((date) => {
      this.dashboardService.startAndEndDate(this.selectedDate);
    });
  }

  decreaseDateByOneDay() {
    const newDate = new Date(this.selectedDate.value!);
    newDate.setDate(newDate.getDate() - 1);
    this.selectedDate.setValue(newDate);
  }

  increaseDateByOneDay() {
    const newDate = new Date(this.selectedDate.value!);
    newDate.setDate(newDate.getDate() + 1);
    this.selectedDate.setValue(newDate);
  }

  // Inicializa las configuraciones de los gráficos
  private initializeCharts(): void {
    // Asignar colores a variables
    this.colorCalories = this.getColorBasedOnPercentage(
      this.chartData.percentageCaloricConsumed
    );
    this.colorProteins = this.getColorBasedOnPercentage(
      this.chartData.percentageProteinConsumed
    );
    this.colorCarbs = this.getColorBasedOnPercentage(
      this.chartData.percentageCarbohydrateConsumed
    );
    this.colorFats = this.getColorBasedOnPercentage(
      this.chartData.percentageFatConsumed
    );
    // Pasar color a getChartOptions
    this.chartOptionsCalories = this.getChartOptions(
      'calories',
      this.colorCalories
    );
    this.chartOptionsProteins = this.getChartOptions(
      'proteins',
      this.colorProteins
    );
    this.chartOptionsCarbs = this.getChartOptions('carbs', this.colorCarbs);
    this.chartOptionsFats = this.getChartOptions('fats', this.colorFats);
  }
  // Obtiene las configuraciones de los gráficos en base al tipo de gráfico
  getChartOptions(type: string, color: string): ChartOptions {
    let consumed: number;
    let dailyIntake: number;
    let percentage: number;
    // Establece los valores en base al tipo de gráfico
    switch (type) {
      case 'calories':
        consumed = this.chartData.consumedCalories;
        dailyIntake = this.chartData.dailyCaloricIntake;
        percentage = this.chartData.percentageCaloricConsumed;
        break;
      case 'proteins':
        consumed = this.chartData.consumedProteins;
        dailyIntake = this.chartData.dailyProteinIntake;
        percentage = this.chartData.percentageProteinConsumed;
        break;
      case 'carbs':
        consumed = this.chartData.consumedCarbohydrates;
        dailyIntake = this.chartData.dailyCarbohydrateIntake;
        percentage = this.chartData.percentageCarbohydrateConsumed;
        break;
      case 'fats':
        consumed = this.chartData.consumedFats;
        dailyIntake = this.chartData.dailyFatIntake;
        percentage = this.chartData.percentageFatConsumed;
        break;
      default:
        throw new Error('Tipo de gráfico no reconocido');
    }
    // Asigna las configuraciones en base al tipo de gráfico
    // https://apexcharts.com/docs/options/plotoptions/radialbar/
    return {
      series: [percentage],
      chart: {
        height: 250,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
          hollow: {
            size: '65%',
            background: 'transparent',
          },
          track: {
            show: true,
            strokeWidth: '100%',
            background: 'rgba(253, 253, 253, 0.25)',
          },
          dataLabels: {
            value: {
              show: true,
              color: color,
              fontWeight: 400,
              fontSize: '15px',
              formatter: () => `${Math.round(percentage)}%`,
              offsetY: -20,
            },
            name: {
              show: true,
              color: '#f3f3f3',
              fontWeight: 400,
              fontSize: '15px',
              offsetY: 20,
            },
          },
        },
      },
      labels: [`${consumed} / ${dailyIntake} g.`],
    };
  }
  // Obtiene el color en base al porcentaje
  getColorBasedOnPercentage(percentage: number): string {
    if (percentage <= 10) return '#EC6C6C'; // Rojo
    else if (percentage <= 30) return '#EC956C'; // Naranja
    else if (percentage <= 50) return '#E6ECA5'; // Amarillo
    else if (percentage <= 70) return '#96DD99'; // Verde
    else return '#6CECAF'; // Verde GOD
  }
  // Abre un dialogo si el usuario no ha completado su perfil
  private openDialogBasedOnProfileStage(): void {
    try {
      let dialogRef;
      const token = localStorage.getItem('token')!;
      const payload = this.authService.decodeJwtPayload(token);
      const profileStage = payload.profileStage;

      if (
        profileStage === 'personalInfo' ||
        profileStage === 'fitnessInfo' ||
        profileStage === 'objectives' ||
        profileStage === 'activityLevel'
      ) {
        // Configuracion de Dialogos
        const config = new MatDialogConfig();
        config.disableClose = true;
        config.autoFocus = true;
        config.hasBackdrop = true;
        config.closeOnNavigation = false;
        config.width = '1080px';
        config.height = '650px';
        config.enterAnimationDuration = 700;
        config.exitAnimationDuration = 700;
        config.backdropClass = 'style-css-dialog-background';
        // Dialogos de Onboarding
        switch (profileStage) {
          case 'personalInfo' || 'fitnessInfo':
            dialogRef = this.dialog.open(SetInformationComponent, config);
            dialogRef.afterClosed().subscribe((result) => {
              console.log(`Dialog result: ${result}`);
            });
            break;
          case 'objectives':
            dialogRef = this.dialog.open(SelectObjectivesComponent, config);
            dialogRef.afterClosed().subscribe((result) => {
              console.log(`Dialog result: ${result}`);
            });
            break;
          case 'activityLevel':
            dialogRef = this.dialog.open(SelectActivityLevelComponent, config);
            dialogRef.afterClosed().subscribe((result) => {
              console.log(`Dialog result: ${result}`);
            });
            break;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  // Abrir dialogo
  openDialog(): void {
    // Configuracion de Dialogos
    const config = new MatDialogConfig();
    config.disableClose = false;
    config.autoFocus = true;
    config.hasBackdrop = true;
    config.closeOnNavigation = false;
    config.width = '550px';
    config.height = '750px';
    config.enterAnimationDuration = 700;
    config.exitAnimationDuration = 700;
    config.backdropClass = 'style-css-dialog-background';
    let dialogRef = this.dialog.open(AddEditIntakeComponent, config);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
