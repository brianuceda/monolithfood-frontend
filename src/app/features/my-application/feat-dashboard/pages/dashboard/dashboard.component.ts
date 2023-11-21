import { Component } from '@angular/core';
import { PrivateService } from 'src/app/core/services/private.service';
// Components
import { SetInformationComponent } from '../../../feat-onboarding/components/set-information/set-information.component';
import { SelectObjectivesComponent } from '../../../feat-onboarding/components/select-objectives/select-objectives.component';
import { SelectActivityLevelComponent } from '../../../feat-onboarding/components/select-activity-level/select-activity-level.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GlobalService } from 'src/app/shared/services/global.service';

import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
} from 'ng-apexcharts';
import {
  MacrosConsumedPerCategory,
  MacrosDetailedDTO,
  AllMacrosAndIntakesDTO,
} from '../../interfaces/MacrosDetailedDTO';
import { FormControl } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';
import { BehaviorSubject } from 'rxjs';
import { ResponseType } from 'src/app/core/interfaces/ResponseType';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

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

  private dataSubject = new BehaviorSubject<AllMacrosAndIntakesDTO | null>(
    null
  );
  public data$ = this.dataSubject.asObservable();

  constructor(
    private globalService: GlobalService,
    private dashboardService: DashboardService,
    private privateService: PrivateService,
    private dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    Promise.resolve().then(() => {
      this.globalService.setTitle('Panel de Inicio');
    });
    let profileStage = this.getProfileStage();
    if (profileStage === 'completed') {
      // Suscripción a los cambios de fecha
      this.dashboardService.startAndEndDate(this.selectedDate);
      this.selectedDate.valueChanges.subscribe((date) => {
        this.dashboardService.startAndEndDate(this.selectedDate);
      });
      // Suscripción a los cambios de datos
      this.dashboardService.refreshNeeded$.subscribe(() => {
        this.getMacrosDetailed();
      });
    } else {
      // Abre un dialogo si el usuario no ha completado su perfil
      await this.openDialogBasedOnProfileStage(profileStage);
    }
  }

  getMacrosDetailed(): void {
    this.dashboardService.getMacrosDetailed(this.selectedDate).subscribe({
      next: (response) => {
        if (response) {
          this.dataSubject.next(response);
        } else {
          const defaultMacros: MacrosDetailedDTO = {
            consumedCalories: 0,
            dailyCaloricIntake: 0,
            consumedProteins: 0,
            dailyProteinIntake: 0,
            consumedCarbohydrates: 0,
            dailyCarbohydrateIntake: 0,
            consumedFats: 0,
            dailyFatIntake: 0,
          };
          const defaultConsumedMacros: MacrosConsumedPerCategory = {
            consumedCalories: 0,
            consumedProteins: 0,
            consumedCarbohydrates: 0,
            consumedFats: 0,
          };
          const defaultData: AllMacrosAndIntakesDTO = {
            statusCode: 0,
            type: ResponseType.ERROR,
            macros: defaultMacros,
            categories: {
              desayuno: {
                macrosConsumedPerCategory: defaultConsumedMacros,
                myIntakes: [],
              },
              almuerzo: {
                macrosConsumedPerCategory: defaultConsumedMacros,
                myIntakes: [],
              },
              cena: {
                macrosConsumedPerCategory: defaultConsumedMacros,
                myIntakes: [],
              },
            },
          };
          this.dataSubject.next(defaultData);
        }
      },
      error: (error) =>
        console.error('An error occurred while fetching data', error),
    });
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    const newDate = event.value;
    this.selectedDate.setValue(newDate);
    this.getMacrosDetailed();
  }

  decreaseDateByOneDay() {
    const newDate = new Date(this.selectedDate.value!);
    newDate.setDate(newDate.getDate() - 1);
    this.selectedDate.setValue(newDate);
    this.getMacrosDetailed();
  }

  increaseDateByOneDay() {
    const newDate = new Date(this.selectedDate.value!);
    newDate.setDate(newDate.getDate() + 1);
    this.selectedDate.setValue(newDate);
    this.getMacrosDetailed();
  }

  // Abre un dialogo si el usuario no ha completado su perfil
  private openDialogBasedOnProfileStage(profileStage: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        let dialogRef;
        if (
          profileStage === 'information' ||
          profileStage === 'activity-level' ||
          profileStage === 'objectives'
        ) {
          // Dialogos de Onboarding
          switch (profileStage) {
            case 'information':
              let informationConfig = new MatDialogConfig();
              informationConfig = this.dashboardService.getDialogConfig(
                '500px',
                '750px',
                true,
                false
              );
              dialogRef = this.dialog.open(
                SetInformationComponent,
                informationConfig
              );
              dialogRef.afterClosed().subscribe((result) => {
                resolve();
              });
              break;
            case 'activity-level':
              let activityLevelConfig = new MatDialogConfig();
              activityLevelConfig = this.dashboardService.getDialogConfig(
                '1450px',
                '750px',
                true,
                false
              );
              dialogRef = this.dialog.open(
                SelectActivityLevelComponent,
                activityLevelConfig
              );
              dialogRef.afterClosed().subscribe((result) => {
                resolve();
              });
              break;
            case 'objectives':
              let objectivesConfig = new MatDialogConfig();
              objectivesConfig = this.dashboardService.getDialogConfig(
                '1450px',
                '850px',
                true,
                false
              );
              dialogRef = this.dialog.open(
                SelectObjectivesComponent,
                objectivesConfig
              );
              dialogRef.afterClosed().subscribe((result) => {
                resolve();
              });
              break;
          }
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  private getProfileStage(): string {
    const token = localStorage.getItem('token')!;
    const payload = this.privateService.decodeJwtPayload(token);
    return payload.profileStage;
  }
}
