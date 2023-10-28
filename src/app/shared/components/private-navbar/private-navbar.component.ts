import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-private-navbar',
  templateUrl: './private-navbar.component.html',
  styleUrls: ['./private-navbar.component.scss'],
})
export class PrivateNavbarComponent {
  title?: string;
  titleSub?: Subscription;

  constructor(private globalService: GlobalService) {
    this.titleSub = this.globalService.currentTitle$.subscribe(
      (title) => (this.title = title)
    );
  }
}
