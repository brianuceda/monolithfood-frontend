import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { SetInfoDTO } from '../interfaces/SetDataDTO';
import { environment } from 'src/environments/environment-prod';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root',
})
export class OnboardingService {
  apiUrl = environment.API;
  apiInfo = this.apiUrl + environment.rscInfo;
  private apiActivityLevelsUrl =
    this.apiUrl + environment.rscFitness + '/activity-levels';
  private apiObjectivesUrl =
    this.apiUrl + environment.rscFitness + '/objectives';

  constructor(private httpService: HttpService) {}

  setInfo(data: SetInfoDTO): Observable<any> {
    return this.httpService.postBodySimple(this.apiInfo + '/new', data).pipe(
      tap((response: any) => {
        if (response) {
          localStorage.setItem('token', response.token);
          window.location.href = '/dashboard';
        }
      })
    );
  }

  setNewActivityLevel(activityLevelName: string): Observable<any> {
    return this.httpService
      .postSimple(this.apiActivityLevelsUrl + '/new', {
        activityLevel: activityLevelName,
      })
      .pipe(
        tap((response: any) => {
          if (response) {
            localStorage.setItem('token', response.token);
            window.location.href = '/dashboard';
          }
        })
      );
  }

  setNewObjectives(objectiveNames: string[]): Observable<any> {
    return this.httpService
      .postBodySimple(this.apiObjectivesUrl + '/new', objectiveNames)
      .pipe(
        tap((response: any) => {
          if (response) {
            localStorage.setItem('token', response.token);
            window.location.href = '/dashboard';
          }
        })
      );
  }
}
