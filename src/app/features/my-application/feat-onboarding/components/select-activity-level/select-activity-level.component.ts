import { Component } from '@angular/core';
import { GlobalService } from 'src/app/shared/services/global.service';
import {
  ListActivityLevelsDTO,
  ActivityLevelDTO,
} from '../../../feat-my-profile/interfaces/ActivityLevelDTO';
import { PersonalInformationService } from '../../../feat-my-profile/services/personal-information.service';
import { OnboardingService } from '../../services/onboarding.service';

@Component({
  selector: 'app-select-activity-level',
  templateUrl: './select-activity-level.component.html',
  styleUrls: ['./select-activity-level.component.scss'],
})
export class SelectActivityLevelComponent {
  public data: ListActivityLevelsDTO = { activityLevels: [] };
  public selectedActivityLevels = 1;
  public maxActivityLevels = 1;

  constructor(
    private globalService: GlobalService,
    private piService: PersonalInformationService,
    private onBoardingService: OnboardingService
  ) {}

  ngOnInit(): void {
    Promise.resolve().then(() => {
      this.globalService.setTitle('Nivel de Actividad Física');
    });
    this.loadActivityLevels();
  }

  // Obtiene los niveles de actividad física
  loadActivityLevels(): void {
    this.piService.getActivityLevels().subscribe((data) => {
      this.data = data;
      this.countActivityLevels();
    });
  }

  // Cuenta los niveles de actividad física seleccionados
  countActivityLevels(): void {
    this.selectedActivityLevels = this.data.activityLevels.filter(
      (al) => al.selected
    ).length;
  }

  // Se ejecuta cuando se selecciona un nivel de actividad física
  selectActivityLevel(selectedLevel: ActivityLevelDTO): void {
    this.data.activityLevels.forEach((level) => {
      level.selected = false;
    });
    selectedLevel.selected = true;
    this.countActivityLevels();
  }

  // Se ejecuta cuando se hace click en el botón de actualizar
  setNewActivityLevel(): void {
    const selectedLevel = this.data.activityLevels.find(
      (level) => level.selected
    );
    if (selectedLevel) {
      this.onBoardingService
        .setNewActivityLevel(selectedLevel.name)
        .subscribe();
    } else {
      console.error('No hay ningún nivel de actividad seleccionado');
    }
  }
}
