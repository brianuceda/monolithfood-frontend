import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-oauth-callback',
  templateUrl: './oauth-callback.component.html',
  styleUrls: ['./oauth-callback.component.scss'],
})
export class OauthCallbackComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.identifyOauth();
  }

  async identifyOauth(): Promise<void> {
    try {
      const params = await firstValueFrom(this.route.queryParams);
      const token = params['token'];
      if (token) {
        localStorage.setItem('token', token);
        this.authService.setBasicOauth2Data();
        await this.router.navigate(['/dashboard']);
      } else {
        await this.router.navigate(['/login']);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
