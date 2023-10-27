import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-fitness-reports',
  templateUrl: './fitness-reports.component.html',
  styleUrls: ['./fitness-reports.component.scss'],
})
export class FitnessReportsComponent {
  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    Promise.resolve().then(() => {
      this.dataService.setTitle('Reportes Fitness');
    });
  }
}
