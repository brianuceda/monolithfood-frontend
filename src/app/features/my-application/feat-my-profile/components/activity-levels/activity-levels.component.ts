import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-activity-levels',
  templateUrl: './activity-levels.component.html',
  styleUrls: ['./activity-levels.component.scss'],
})
export class ActivityLevelsComponent {
  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    Promise.resolve().then(() => {
      this.dataService.setTitle('Nivel de Actividad Física');
    });
  }
}
