import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalService } from '../../services/global.service';
import { circle } from './navbar.animations';
import { AuthService } from 'src/app/features/landing-page/services/auth.service';
import { GetUser } from '../../interfaces/GetUser';
import { HttpService } from 'src/app/core/services/http.service';
import { environment } from 'src/environments/environment-prod';

@Component({
  selector: 'app-private-navbar',
  templateUrl: './private-navbar.component.html',
  styleUrls: ['./private-navbar.component.scss'],
  animations: [circle],
})
export class PrivateNavbarComponent {
  data: GetUser = new GetUser();
  title?: string;
  titleSub?: Subscription;
  isMenuVisible: boolean = false;
  darkMode: boolean = true;
  notifications: boolean = false;

  constructor(
    private globalService: GlobalService,
    private httpService: HttpService,
    private authService: AuthService
  ) {
    this.titleSub = this.globalService.currentTitle$.subscribe(
      (title) => (this.title = title)
    );
  }

  ngOnInit(): void {
    this.httpService.getUser().subscribe(
      (data: GetUser) => {
        this.data = data;
      },
      (error) => {
        if (!environment.PRODUCTION) {
          console.log('private-navbar.component.ts: ' + error);
        }
      }
    );
  }

  toggleMenu(): void {
    this.isMenuVisible = !this.isMenuVisible;
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
  }

  toggleNotifications(): void {
    this.notifications = !this.notifications;
  }

  logout(): void {
    this.authService.logout();
  }
}
