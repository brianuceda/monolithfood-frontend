import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent {
  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    Promise.resolve().then(() => {
      this.dataService.setTitle('Favoritos');
    });
  }
}
