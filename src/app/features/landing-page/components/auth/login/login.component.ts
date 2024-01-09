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

    console.log('PRODUCTION: ' + environment.PRODUCTION);
    console.log('ENV_NAME: ' + environment.ENV_NAME);
    console.log('API: ' + environment.API);
    console.log('OAUTH2_URL: ' + environment.OAUTH2_URL + '/github');
    console.log('OAUTH2_URL_MICROSOFT' + environment.OAUTH2_URL_MICROSOFT);

  }

  reactiveForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const loginData: LoginRequestDTO = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      };
      this.authService.login(loginData).subscribe({
        next: (response) => {
          console.log(response);
          this.globalService.openCustomSnackbar(
            'Sesión iniciada correctamente',
            ResponseType.SUCCESS
          );
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  googleOauth2(): void {
    let disabled = true;
    if (!disabled) {
      this.authService.googleOauth2();
    }
  }

  githubOauth2(): void {
    this.authService.githubOauth2();
  }

  microsoftOauth2(): void {
    this.authService.microsoftOauth2();
  }
}
