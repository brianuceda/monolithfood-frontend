// login.component.ts
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RegisterRequestDTO } from 'src/app/core/interfaces/RegisterRequestDTO';
import { ResponseType } from 'src/app/core/interfaces/ResponseType';
import { GlobalService } from 'src/app/shared/services/global.service';
import { AuthService } from '../../../services/auth.service';
import { environment } from 'src/environments/environment-prod';

// lista de validaciones establecidas para la contraseña (mínimo 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial)
interface Validations {
  minlength?: boolean;
  hasUpperCase?: boolean;
  hasLowerCase?: boolean;
  hasNumeric?: boolean;
  hasSpecialCharacter?: boolean;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
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
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, this.usernameStrengthValidator()]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordStrengthValidator()]],
      names: ['', [Validators.required]],
    });
  }

  public async register(): Promise<void> {
    if (this.registerForm.valid) {
      this.globalService.openCustomSnackbar(
        'Cargando...',
        ResponseType.LOADING
      );

      const registerData: RegisterRequestDTO = {
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        names: this.registerForm.value.names,
      };

      await this.authService.register(registerData).subscribe({
        next: () => {
          this.globalService.openCustomSnackbar(
            'Sesión iniciada correctamente',
            ResponseType.SUCCESS
          );
        },
        error: (error) => {
          if (!environment.PRODUCTION) {
            console.log('register.component.ts' + error);
          }
        },
      });
    }
  }

  public googleOauth2(): void {
    let disabled = true;
    if (!disabled) {
      this.authService.googleOauth2();
    }
  }

  public githubOauth2(): void {
    this.authService.githubOauth2();
  }

  public microsoftOauth2(): void {
    this.authService.microsoftOauth2();
  }

  private usernameStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';
      let errors: ValidationErrors = {};
      const validations: Validations = {
        minlength: value.length >= 6,
        hasUpperCase: /[A-Z]/.test(value),
      };
      if (!validations.minlength) {
        errors['minlength'] = true;
      }
      if (validations.hasUpperCase) {
        errors['hasUpperCase'] = true;
      }
      return Object.keys(errors).length > 0 ? errors : null;
    };
  }

  private passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      // control.value: Es el valor del campo que se está validando
      const value = control.value || '';
      // errors: Almacena los errores encontrados retorna si hay errores o no (null)
      let errors: ValidationErrors = {};
      // validaciones para la contraseña
      const validations: Validations = {
        minlength: value.length >= 8,
        hasUpperCase: /[A-Z]/.test(value),
        hasLowerCase: /[a-z]/.test(value),
        hasNumeric: /[0-9]/.test(value),
        hasSpecialCharacter: /[~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
          value
        ),
      };
      // Si el valor del campo es menor a 8 caracteres, se activa el error minlength
      if (!validations.minlength) {
        errors['minlength'] = true;
      }
      if (!validations.hasUpperCase) {
        errors['hasUpperCase'] = true;
      }
      if (!validations.hasLowerCase) {
        errors['hasLowerCase'] = true;
      }
      if (!validations.hasNumeric) {
        errors['hasNumeric'] = true;
      }
      if (!validations.hasSpecialCharacter) {
        errors['hasSpecialCharacter'] = true;
      }
      // Retorna un objeto que almacena en el atributo errors los errores encontrados o null
      return Object.keys(errors).length > 0 ? errors : null;
    };
  }
}
