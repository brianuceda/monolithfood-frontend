import { Component } from '@angular/core';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss'],
})
export class DatabaseComponent {
  constructor(private globalService: GlobalService) {}
  ngOnInit(): void {
    Promise.resolve().then(() => {
      this.globalService.setTitle('Base de Datos');
    });
  }
}
