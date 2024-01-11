import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnboardingService } from '../../services/onboarding.service';
import { SetInfoDTO } from '../../interfaces/SetDataDTO';

@Component({
  selector: 'app-set-information',
  templateUrl: './set-information.component.html',
  styleUrls: ['./set-information.component.scss'],
})
export class SetInformationComponent implements OnInit {
  myForm!: FormGroup;
  data: SetInfoDTO = {
    gender: '',
    borndate: new Date().toISOString().substring(0, 10),
    weightKg: 0,
    heightCm: 0,
    targetWeightKg: 0,
    targetDate: new Date().toISOString().substring(0, 10),
  };

  constructor(
    private onBoardingService: OnboardingService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.reactiveForm();
  }

  reactiveForm(): void {
    this.myForm = this.formBuilder.group({
      gender: ['', Validators.required],
      borndate: ['', Validators.required],
      weightKg: ['', Validators.required, Validators.min(20), Validators.max(800)], // Peso mínimo 20kg y máximo 800kg
      heightCm: ['', Validators.required, Validators.min(20), Validators.max(300)], // Altura mínima 20cm y máxima 300cm
      targetWeightKg: ['', Validators.required],
      targetDate: ['', Validators.required],
    });
  }

  setInfo(): void {
    this.transFormToInfoDTO();
    this.onBoardingService.setInfo(this.data).subscribe();
  }

  transFormToInfoDTO(): void {
    this.data = {
      gender: this.myForm.get('gender')?.value,
      borndate: this.myForm.get('borndate')?.value,
      weightKg: this.myForm.get('weightKg')?.value,
      heightCm: this.myForm.get('heightCm')?.value,
      targetWeightKg: this.myForm.get('targetWeightKg')?.value,
      targetDate: this.myForm.get('targetDate')?.value,
    };
  }
}
