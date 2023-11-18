import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  apiUrl: string = environment.api;
  apiInfo: string = this.apiUrl + environment.rscInfo;
  apiFitness: string = this.apiUrl + environment.rscFitness;

  constructor(private httpService: HttpService) {}

  getProgressWeight() {
    return this.httpService.getSimple(this.apiInfo + '/progress-weight');
  }

  calcFitnessInfo() {
    return this.httpService.getSimple(this.apiFitness + '/calc');
  }
}
