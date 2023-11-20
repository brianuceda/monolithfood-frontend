import { DashboardService } from './../../services/dashboard.service';
import { Component, Input } from '@angular/core';
import {
  CategoryDetails,
  MacrosConsumedPerCategory,
} from '../../interfaces/MacrosDetailedDTO';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddEditIntakeComponent } from '../../pages/add-edit-intake/add-edit-intake.component';

@Component({
  selector: 'app-category-intake',
  templateUrl: './category-intake.component.html',
  styleUrls: ['./category-intake.component.scss'],
})
export class CategoryIntakeComponent {
  @Input() details!: CategoryDetails;
  @Input() categoryName!: string;

  constructor(
    private dashboardService: DashboardService,
    private dialog: MatDialog
  ) {}
}
