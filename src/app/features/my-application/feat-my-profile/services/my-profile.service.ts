import {
  HeightAndWeight,
  MyProfile,
  PutMyProfile,
} from './../interfaces/my-profile';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class MyProfileService {
  private apiUrl = `${environment.api}`;
  private apiPersonalInfo = `${environment.api}/user/info`;

  constructor(private httpService: HttpService) {}

  public getPersonalInfo(): Observable<MyProfile> {
    return this.httpService.getSimple(this.apiPersonalInfo);
  }

  public updatePersonalInfo(putMyProfile: PutMyProfile): any {
    return this.httpService.putBodySimple<any>(
      this.apiPersonalInfo + '/update',
      putMyProfile
    );
  }

  public updateHeightAndWeight(handw: HeightAndWeight) {
    return this.httpService.putBodySimple<any>(
      this.apiPersonalInfo + '/update-weight-height',
      handw
    );
  }
}
