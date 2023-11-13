import { Component, Input } from '@angular/core';
import { CategoryIntake } from '../../interfaces/MacrosDetailedDTO';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddEditIntakeComponent } from '../../pages/add-edit-intake/add-edit-intake.component';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-intake',
  templateUrl: './intake.component.html',
  styleUrls: ['./intake.component.scss'],
})
export class IntakeComponent {
  @Input() intakes!: CategoryIntake;

  constructor(
    private dialog: MatDialog,
    private dashboardService: DashboardService
  ) {}

  isDetailType(intake: CategoryIntake): intake is {
    id: number;
    name: string;
    imgUrl: string;
    quantity: number;
    unitOfMeasurement: string;
    createdAt: string;
  } {
    return (intake as any).id !== undefined;
  }

  isMessageType(intake: CategoryIntake): intake is { message: string } {
    return (intake as any).message !== undefined;
  }

  addIntake(id: number): void {
    let dialogRef;
    let quantity: number = 100;
    let config = new MatDialogConfig();
    this.dashboardService.getDetailedFood(id, quantity).subscribe((data) => {
      config = this.dashboardService.getDialogConfig(
        '600px',
        '785px',
        false,
        false,
        { data }
      );
      dialogRef = this.dialog.open(AddEditIntakeComponent, config);
      // dialogRef.afterClosed().subscribe((result) => {
      //   console.log(`Dialog result: ${result}`);
      // });
    });
    console.log('Add intake');
  }

  editIntake(id: number): void {
    let dialogRef;
    let config = new MatDialogConfig();
    this.dashboardService.getDetailedIntake(id).subscribe((data) => {
      config = this.dashboardService.getDialogConfig(
        '600px',
        '785px',
        false,
        false,
        { data }
      );
      dialogRef = this.dialog.open(AddEditIntakeComponent, config);
      // dialogRef.afterClosed().subscribe((result) => {
      //   console.log(`Dialog result: ${result}`);
      // });
    });
    console.log('Edit intake');
  }

  delete(id: number): void {
    this.dashboardService.deleteIntake(id).subscribe();
  }

  convertUnitOfMeasurement(unit: string): string {
    return unit.toLowerCase();
  }

  showDialog(id: number, quantity: number, unit: string, name: string): void {
    const config = new MatDialogConfig();
    config.disableClose = false;
    config.autoFocus = true;
    config.hasBackdrop = true;
    config.closeOnNavigation = false;
    config.width = '400px';
    config.height = '260px';
    config.backdropClass = 'style-css-dialog-background';
    config.data = {
      title: 'Eliminar alimento',
      msg: '¿Deseas eliminar ',
      object:
        quantity +
        ' ' +
        this.convertUnitOfMeasurement(unit) +
        '. de ' +
        name +
        '?',
    };
    // Abrir dialogo
    this.dialog
      .open(ConfirmDialogComponent, config)
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.delete(id);
        }
      });
  }

  calcTime(fechaIso: string): string {
    const fecha = new Date(fechaIso);
    fecha.setHours(fecha.getHours() + 5);
    const horas = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    return `${horas}:${minutos}`;
    return fechaIso;
  }
}
