import { Component, Input } from '@angular/core';
import { CategoryIntake } from '../../interfaces/MacrosDetailedDTO';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddEditIntakeComponent } from '../add-edit-intake/add-edit-intake.component';
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
    // categoryFood: string;
    quantity: number;
    unitOfMeasurement: string;
    // date: string;
  } {
    return (intake as any).id !== undefined;
  }

  isMessageType(intake: CategoryIntake): intake is { message: string } {
    return (intake as any).message !== undefined;
  }

  edit(id: number): void {
    let dialogRef;
    let config = new MatDialogConfig();
    config = this.dashboardService.getDialogConfig(
      '550px',
      '785px',
      false,
      false
    );
    dialogRef = this.dialog.open(AddEditIntakeComponent, config);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
    console.log('Edit intake');
  }

  delete(intakeId: number): void {
    this.dashboardService.deleteIntake(intakeId).subscribe((response) => {
      console.log('Response: ', response);
    });
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
}
