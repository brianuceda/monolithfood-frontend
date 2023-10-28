import { Component } from '@angular/core';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-activity-levels',
  templateUrl: './activity-levels.component.html',
  styleUrls: ['./activity-levels.component.scss'],
})
export class ActivityLevelsComponent {
  constructor(private globalService: GlobalService) {}
  ngOnInit(): void {
    Promise.resolve().then(() => {
      this.globalService.setTitle('Nivel de Actividad Física');
    });
  }
}
