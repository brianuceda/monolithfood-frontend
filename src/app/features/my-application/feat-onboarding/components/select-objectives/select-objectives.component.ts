import { Component } from '@angular/core';
import { ResponseType } from 'src/app/core/interfaces/ResponseType';
import { GlobalService } from 'src/app/shared/services/global.service';
import {
  ListObjectivesDTO,
  ObjectiveDTO,
} from '../../../feat-my-profile/interfaces/ObjectiveDTO';
import { PersonalInformationService } from '../../../feat-my-profile/services/personal-information.service';
import { OnboardingService } from '../../services/onboarding.service';

@Component({
  selector: 'app-select-objectives',
  templateUrl: './select-objectives.component.html',
  styleUrls: ['./select-objectives.component.scss'],
})
export class SelectObjectivesComponent {
  public data: ListObjectivesDTO = { objectives: [] };
  public selectedObjectivesCount = 0;
  public maxObjectives = 3;

  constructor(
    private globalService: GlobalService,
    private piService: PersonalInformationService,
    private onBoardingService: OnboardingService
  ) {}

  ngOnInit(): void {
    this.globalService.setTitle('Objetivos Nutricionales');
    this.loadObjectives();
  }

  // Carga los objetivos desde la base de datos
  loadObjectives(): void {
    this.piService.getObjectives().subscribe((data) => {
      this.data = data;
      this.countSelectedObjectives();
    });
  }
  // Marca un objetivo como seleccionado o no
  selectObjective(selectedObjective: ObjectiveDTO): void {
    if (selectedObjective.selected) {
      selectedObjective.selected = false;
      this.selectedObjectivesCount--;
    } else if (this.selectedObjectivesCount < this.maxObjectives) {
      selectedObjective.selected = true;
      this.selectedObjectivesCount++;
    } else {
      this.globalService.openCustomSnackbar(
        'No puedes seleccionar más de 3 objetivos',
        ResponseType.WARN
      );
    }
  }
  // Cuenta los objetivos seleccionados
  countSelectedObjectives(): void {
    this.selectedObjectivesCount = this.data.objectives.filter(
      (obj) => obj.selected
    ).length;
  }

  // Actualiza los objetivos seleccionados en la base de datos
  setNewObjectives(): void {
    const selectedObjectivesNames = this.data.objectives
      .filter((obj) => obj.selected)
      .map((obj) => obj.name);
    this.onBoardingService.setNewObjectives(selectedObjectivesNames).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
