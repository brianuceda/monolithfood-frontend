import { Component, Input } from '@angular/core';
import { FoodDTO } from '../../interfaces/FoodDTO';
import { GlobalService } from 'src/app/shared/services/global.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddEditIntakeComponent } from '../../../feat-dashboard/components/add-edit-intake/add-edit-intake.component';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss'],
})
export class FoodComponent {
  @Input() details!: FoodDTO;
  @Input() hasRequiredRoles!: boolean;

  constructor(
    private globalService: GlobalService,
    private databaseService: DatabaseService,
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

  addToFavorites(foodId: number): void {
    this.databaseService.addToFavorites(foodId).subscribe({
      next: () => {
        this.details.isFavorite = true;
      },
    });
  }

  removeFromFavorites(foodId: number): void {
    this.databaseService.removeFromFavorites(foodId).subscribe({
      next: () => {
        this.details.isFavorite = false;
      },
    });
  }
}
