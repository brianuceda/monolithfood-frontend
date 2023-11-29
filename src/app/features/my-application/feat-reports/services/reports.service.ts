import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import {
  FitnessProgressDTO,
  FitnessDataDTO,
  MacrosPerWeekDTO,
} from '../interfaces/FitnessDataDTO';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  apiUrl: string = environment.api;
  apiInfo: string = this.apiUrl + environment.rscInfo;
  apiFitness: string = this.apiUrl + environment.rscFitness;

  constructor(private httpService: HttpService) {}

  public getProgressWeight(): Observable<FitnessProgressDTO> {
    return this.httpService.getSimple<FitnessProgressDTO>(
      this.apiInfo + '/progress-weight'
    );
  }

  public calcFitnessInfo(): Observable<FitnessDataDTO> {
    return this.httpService.getSimple<FitnessDataDTO>(
      this.apiFitness + '/calc'
    );
  }

  public getMacrosPerWeek(): Observable<MacrosPerWeekDTO> {
    return this.httpService.getSimple<MacrosPerWeekDTO>(
      this.apiFitness + '/reports/calories'
    );
  }
}
