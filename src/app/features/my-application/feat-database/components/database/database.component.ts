import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss'],
})
export class DatabaseComponent {
  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    Promise.resolve().then(() => {
      this.dataService.setTitle('Base de Datos');
    });
  }
}
