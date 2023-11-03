// login.component.ts
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RegisterRequestDTO } from 'src/app/core/interfaces/RegisterRequestDTO';
import { ResponseType } from 'src/app/core/interfaces/ResponseType';
import { GlobalService } from 'src/app/shared/services/global.service';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  private oauthUrl: string = environment.oauthUrl;
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

  reactiveForm(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordStrengthValidator()]],
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

  // Método para validar la fuerza de la contraseña
  private passwordStrengthValidator(): Validators {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';
      let errors = {};
      if (value.length < 8) {
        errors = {
          ...errors,
          minlength: { requiredLength: 8, actualLength: value.length },
        };
      }
      if (!/[A-Z]/.test(value)) {
        errors = { ...errors, hasUpperCase: true };
      }
      if (!/[a-z]/.test(value)) {
        errors = { ...errors, hasLowerCase: true };
      }
      if (!/[0-9]/.test(value)) {
        errors = { ...errors, hasNumeric: true };
      }
      if (!/[~!@#\$%\^&\*\(\)_\+\-\=\[\]\{\};',\.\/\|:?><]/.test(value)) {
        errors = { ...errors, hasSpecialCharacter: true };
      }
      return Object.keys(errors).length ? errors : null;
    };
  }
}
