import { Component, Input } from '@angular/core';
import { ActivityLevelDTO } from '../../interfaces/ActivityLevelDTO';

@Component({
  selector: 'app-activity-level',
  templateUrl: './activity-level.component.html',
  styleUrls: ['./activity-level.component.scss'],
})
export class ActivityLevelComponent {
  @Input() data!: ActivityLevelDTO;
}
