import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { environment } from 'src/environments/environment.prod';
import { ListActivityLevelsDTO } from '../interfaces/ActivityLevelDTO';
import { ListObjectivesDTO, ObjectiveDTO } from '../interfaces/ObjectiveDTO';
import { HttpParams } from '@angular/common/http';
import { ListNutrientDTO } from '../../feat-dashboard/interfaces/NutritionDTO';

@Injectable({
  providedIn: 'root',
})
export class PersonalInformationService {
  // * APIs
  private apiActivityLevelsUrl = `${environment.api}${environment.rscFitness}/activity-levels`;
  private apiObjectivesUrl = `${environment.api}${environment.rscFitness}/objectives`;

  constructor(private httpService: HttpService) {}

  getActivityLevels(): Observable<ListActivityLevelsDTO> {
    return this.httpService.getSimple(this.apiActivityLevelsUrl);
  }

  updateActivityLevel(activityLevelName: string): Observable<any> {
    const params = new HttpParams().set('activityLevel', activityLevelName);
    return this.httpService.putSimple(
      this.apiActivityLevelsUrl + '/update',
      {},
      params
    );
  }

  getObjectives(): Observable<ListObjectivesDTO> {
    return this.httpService.getSimple(this.apiObjectivesUrl);
  }
  updateObjectives(objectiveNames: string[]): Observable<any> {
    const updateUrl = `${this.apiObjectivesUrl}/update`;
    return this.httpService.putBodySimple(updateUrl, objectiveNames);
  }
}
