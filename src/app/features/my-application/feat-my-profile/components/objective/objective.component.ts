import { Component, Input } from '@angular/core';
import { ObjectiveDTO } from '../../interfaces/ObjectiveDTO';

@Component({
  selector: 'app-objective',
  templateUrl: './objective.component.html',
  styleUrls: ['./objective.component.scss'],
})
export class ObjectiveComponent {
  @Input() data!: ObjectiveDTO;
}
