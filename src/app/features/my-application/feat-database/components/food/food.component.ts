import { Component, Input } from '@angular/core';
import { FoodDTO } from '../../interfaces/FoodDTO';
import { GlobalService } from 'src/app/shared/services/global.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddEditIntakeComponent } from '../../../feat-dashboard/components/add-edit-intake/add-edit-intake.component';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss'],
})
export class FoodComponent {
  @Input() details!: FoodDTO;

  constructor(
    private globalService: GlobalService,
    private dialog: MatDialog
  ) {}

  addIntake(foodId: number): void {
    let dialogRef;
    let config = new MatDialogConfig();
    config = this.globalService.getDialogConfig(
      '550px',
      '785px',
      false,
      false,
      foodId
    );
    dialogRef = this.dialog.open(AddEditIntakeComponent, config);
    dialogRef.afterClosed().subscribe((result) => {
      // console.log(`Dialog result: ${result}`);
    });
  }
}
