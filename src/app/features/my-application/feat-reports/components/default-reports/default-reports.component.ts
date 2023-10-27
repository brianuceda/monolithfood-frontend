import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-default-reports',
  templateUrl: './default-reports.component.html',
  styleUrls: ['./default-reports.component.scss'],
})
export class DefaultReportsComponent {
  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    Promise.resolve().then(() => {
      this.dataService.setTitle('Reportes');
    });
  }
}
