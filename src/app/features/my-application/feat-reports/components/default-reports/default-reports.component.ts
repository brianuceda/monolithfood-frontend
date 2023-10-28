import { Component } from '@angular/core';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-default-reports',
  templateUrl: './default-reports.component.html',
  styleUrls: ['./default-reports.component.scss'],
})
export class DefaultReportsComponent {
  constructor(private globalService: GlobalService) {}
  ngOnInit(): void {
    Promise.resolve().then(() => {
      this.globalService.setTitle('Reportes');
    });
  }
}
