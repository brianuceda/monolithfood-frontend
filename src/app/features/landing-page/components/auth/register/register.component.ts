// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.component.scss'],
})
export class RegisterComponent implements OnInit {
  myForm!: FormGroup;
  private oauthUrl: string = environment.oauthUrl;
  disabled: boolean = true;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.reactiveForm();
  }

  reactiveForm(): void {
    this.myForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      names: ['', [Validators.required]],
    });
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
