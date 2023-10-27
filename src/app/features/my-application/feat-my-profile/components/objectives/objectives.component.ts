import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-objectives',
  templateUrl: './objectives.component.html',
  styleUrls: ['./objectives.component.scss'],
})
export class ObjectivesComponent {
  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    Promise.resolve().then(() => {
      this.dataService.setTitle('Objetivos Nutricionales');
    });
  }
}
