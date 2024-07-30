// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequestDTO } from 'src/app/core/interfaces/LoginRequestDTO';
import { ResponseType } from 'src/app/core/interfaces/ResponseType';
import { GlobalService } from 'src/app/shared/services/global.service';
import { AuthService } from '../../../services/auth.service';
import { environment } from 'src/environments/environment-prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  disabled: boolean = true;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.reactiveForm();
  }

  public reactiveForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['testuser', [Validators.required]],
      password: ['testuser123A!', [Validators.required]],
    });
  }

  public async login(): Promise<void> {
    if (this.loginForm.valid) {
      this.globalService.openCustomSnackbar(
        'Cargando...',
        ResponseType.LOADING
      );

      const loginData: LoginRequestDTO = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      };

      await this.authService.login(loginData).subscribe({
        next: () => {
          this.globalService.openCustomSnackbar(
            'Sesión iniciada correctamente',
            ResponseType.SUCCESS
          );
        },
        error: (error: any) => {
          if (!environment.PRODUCTION) {
            console.log('login.component.ts: ' + error);
          }
        },
      });
    }
  }

  public githubOauth2(): void {
    if (true) {
      this.globalService.openCustomSnackbar(
        'Cargando...',
        ResponseType.LOADING
      );
      this.authService.githubOauth2();
    }
  }

  public microsoftOauth2(): void {
    if (true) {
      this.globalService.openCustomSnackbar(
        'Cargando...',
        ResponseType.LOADING
      );
      this.authService.microsoftOauth2();
    }
  }

  public googleOauth2(): void {
    if (true) {
      this.globalService.openCustomSnackbar(
        'Cargando...',
        ResponseType.LOADING
      );
      this.authService.googleOauth2();
    }
  }
}
