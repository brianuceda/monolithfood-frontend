import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MonolithFoodFrontend';
  isUserAuthenticated?: boolean;

  constructor(public router: Router, private authService: AuthService) {
    this.isUserAuthenticated = this.authService.isAuthenticated();
  }

  isPrivateRoute(): boolean {
    const publicRoutes = ['/', '/home', '/about-us', '/login', '/register'];
    return !publicRoutes.includes(this.router.url);
  }
}
