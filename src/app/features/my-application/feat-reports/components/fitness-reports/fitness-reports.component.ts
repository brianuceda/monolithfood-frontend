import { Component } from '@angular/core';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-fitness-reports',
  templateUrl: './fitness-reports.component.html',
  styleUrls: ['./fitness-reports.component.scss'],
})
export class FitnessReportsComponent {
  constructor(private globalService: GlobalService) {}
  ngOnInit(): void {
    Promise.resolve().then(() => {
      this.globalService.setTitle('Reportes Fitness');
    });
  }
}
