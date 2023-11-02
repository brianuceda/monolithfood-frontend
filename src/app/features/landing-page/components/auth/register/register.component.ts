// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterRequestDTO } from 'src/app/core/interfaces/RegisterRequestDTO';
import { ResponseType } from 'src/app/core/interfaces/ResponseType';
import { AuthService } from 'src/app/core/services/auth.service';
import { GlobalService } from 'src/app/shared/services/global.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  private oauthUrl: string = environment.oauthUrl;
  disabled: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.reactiveForm();
  }

  reactiveForm(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      names: ['', [Validators.required]],
    });
  }

  register(): void {
    if (this.registerForm.valid) {
      const registerData: RegisterRequestDTO = {
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        names: this.registerForm.value.names,
      };
      this.authService.register(registerData).subscribe({
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
    window.location.href = this.oauthUrl + '/google';
  }
  microsoftOauth2(): void {
    window.location.href = this.oauthUrl + '/microsoft';
  }
  githubOauth2(): void {
    window.location.href = this.oauthUrl + '/github';
  }
}
