import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-private-navbar',
  templateUrl: './private-navbar.component.html',
  styleUrls: ['./private-navbar.component.scss'],
})
export class PrivateNavbarComponent {
  title?: string;
  titleSub?: Subscription;

  constructor(private dataService: DataService) {
    this.titleSub = this.dataService.currentTitle.subscribe(
      (title) => (this.title = title)
    );
  }
}
