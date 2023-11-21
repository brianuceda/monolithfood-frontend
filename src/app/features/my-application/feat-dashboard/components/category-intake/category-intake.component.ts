import { Component, Input } from '@angular/core';
import { CategoryDetails } from '../../interfaces/MacrosDetailedDTO';

@Component({
  selector: 'app-category-intake',
  templateUrl: './category-intake.component.html',
  styleUrls: ['./category-intake.component.scss'],
})
export class CategoryIntakeComponent {
  @Input() details!: CategoryDetails;
  @Input() categoryName!: string;

  constructor() {}
}
