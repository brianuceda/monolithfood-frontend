import { Component, Input } from '@angular/core';
import { NutritionDTO } from '../../interfaces/NutritionDTO';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-nutrition-label',
  templateUrl: './nutrition-label.component.html',
  styleUrls: ['./nutrition-label.component.scss'],
})
export class NutritionLabelComponent {
  @Input() details!: NutritionDTO;

  constructor(private dashboardService: DashboardService) {}
}
