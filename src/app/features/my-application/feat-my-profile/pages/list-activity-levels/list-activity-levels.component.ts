import { Component } from '@angular/core';
import { GlobalService } from 'src/app/shared/services/global.service';
import { PersonalInformationService } from '../../services/personal-information.service';
import {
  ActivityLevelDTO,
  ListActivityLevelsDTO,
} from '../../interfaces/ActivityLevelDTO';

@Component({
  selector: 'app-list-activity-levels',
  templateUrl: './list-activity-levels.component.html',
  styleUrls: ['./list-activity-levels.component.scss'],
})
export class ListActivityLevelsComponent {
  public data: ListActivityLevelsDTO = { activityLevels: [] };
  public selectedActivityLevels = 1;
  public maxActivityLevels = 1;

  constructor(
    private globalService: GlobalService,
    private piService: PersonalInformationService
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
  updateActivityLevels(): void {
    const selectedLevel = this.data.activityLevels.find(
      (level) => level.selected
    );
    if (selectedLevel) {
      this.piService.updateActivityLevel(selectedLevel.name).subscribe();
    } else {
      console.error('No hay ningún nivel de actividad seleccionado');
    }
  }
}
