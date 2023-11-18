import { Component, Input } from '@angular/core';
import { FoodDTO } from '../../interfaces/FoodDTO';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddEditIntakeComponent } from '../../../feat-dashboard/pages/add-edit-intake/add-edit-intake.component';
import { DatabaseService } from '../../services/database.service';
import { DashboardService } from '../../../feat-dashboard/services/dashboard.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss'],
})
export class FoodComponent {
  @Input() details!: FoodDTO;
  @Input() hasRequiredRoles!: boolean;

  constructor(
    private dashboardService: DashboardService,
    private databaseService: DatabaseService,
    private dialog: MatDialog
  ) {}

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
    });
    console.log('Add intake');
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
