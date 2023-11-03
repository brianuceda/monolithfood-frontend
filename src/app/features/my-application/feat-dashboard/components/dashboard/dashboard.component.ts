import { Component } from '@angular/core';
import { PrivateService } from 'src/app/core/services/private.service';
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
import { BehaviorSubject } from 'rxjs';

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

  private dataSubject = new BehaviorSubject<MacrosDetailedDTO>({
    consumedCalories: 0,
    dailyCaloricIntake: 0,
    consumedProteins: 0,
    dailyProteinIntake: 0,
    consumedCarbohydrates: 0,
    dailyCarbohydrateIntake: 0,
    consumedFats: 0,
    dailyFatIntake: 0,
  });
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
      this.getMacrosDetailed();
    } else {
      // Abre un dialogo si el usuario no ha completado su perfil
      await this.openDialogBasedOnProfileStage(profileStage);
    }
  }

  getMacrosDetailed(): void {
    this.dashboardService
      .getMacrosDetailed(this.selectedDate)
      .subscribe((response) => {
        this.dataSubject.next(
          response || {
            consumedCalories: 0,
            dailyCaloricIntake: 0,
            consumedProteins: 0,
            dailyProteinIntake: 0,
            consumedCarbohydrates: 0,
            dailyCarbohydrateIntake: 0,
            consumedFats: 0,
            dailyFatIntake: 0,
          }
        );
        console.log(response);
      });
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
            case 'information':
              dialogRef = this.dialog.open(SetInformationComponent, config);
              dialogRef.afterClosed().subscribe((result) => {
                console.log(`Dialog result: ${result}`);
                resolve(); // Resuelve la promesa cuando el diálogo se cierre
              });
              break;
            case 'activity-level':
              dialogRef = this.dialog.open(
                SelectActivityLevelComponent,
                config
              );
              dialogRef.afterClosed().subscribe((result) => {
                console.log(`Dialog result: ${result}`);
                resolve();
              });
              break;
            case 'objectives':
              dialogRef = this.dialog.open(SelectObjectivesComponent, config);
              dialogRef.afterClosed().subscribe((result) => {
                console.log(`Dialog result: ${result}`);
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
