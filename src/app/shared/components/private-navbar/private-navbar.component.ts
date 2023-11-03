import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalService } from '../../services/global.service';
import { AuthService } from 'src/app/features/landing-page/services/auth.service';
import { circle } from './navbar.animations';

@Component({
  selector: 'app-private-navbar',
  templateUrl: './private-navbar.component.html',
  styleUrls: ['./private-navbar.component.scss'],
  animations: [circle],
})
export class PrivateNavbarComponent {
  title?: string;
  titleSub?: Subscription;
  isMenuVisible: boolean = false;

  constructor(
    private globalService: GlobalService,
    private authService: AuthService
  ) {
    this.titleSub = this.globalService.currentTitle$.subscribe(
      (title) => (this.title = title)
    );
  }

  toggleMenu(): void {
    this.isMenuVisible = !this.isMenuVisible;
  }

  logout(): void {
    this.authService.logout();
  }
}
