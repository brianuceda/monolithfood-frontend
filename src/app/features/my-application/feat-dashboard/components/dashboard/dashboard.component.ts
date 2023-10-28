import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
// Components
import { SetInformationComponent } from '../../../feat-onboarding/components/set-information/set-information.component';
import { SelectObjectivesComponent } from '../../../feat-onboarding/components/select-objectives/select-objectives.component';
import { SelectActivityLevelComponent } from '../../../feat-onboarding/components/select-activity-level/select-activity-level.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(
    private globalService: GlobalService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    //Ejecutar el código luego de que se haya inicializado el componente
    Promise.resolve().then(() => {
      this.globalService.setTitle('Panel de Inicio');
    });
    this.openDialogBasedOnProfileStage();
  }

  // Abrir dialogos si el usuario no ha completado su perfil
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
}
