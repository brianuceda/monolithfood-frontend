import { Component } from '@angular/core';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ListObjectivesDTO, ObjectiveDTO } from '../../interfaces/ObjectiveDTO';
import { PersonalInformationService } from '../../services/personal-information.service';
import { ResponseType } from 'src/app/core/interfaces/ResponseType';

@Component({
  selector: 'app-list-objectives',
  templateUrl: './list-objectives.component.html',
  styleUrls: ['./list-objectives.component.scss'],
})
export class ListObjectivesComponent {
  public data: ListObjectivesDTO = { objectives: [] };
  public selectedObjectivesCount = 0;
  public maxObjectives = 3;

  constructor(
    private globalService: GlobalService,
    private piService: PersonalInformationService
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
  updateObjectives(): void {
    const selectedObjectivesNames = this.data.objectives
      .filter((obj) => obj.selected)
      .map((obj) => obj.name);
    this.piService.updateObjectives(selectedObjectivesNames).subscribe();
  }
}
