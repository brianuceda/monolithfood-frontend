import { MyProfile } from './../interfaces/my-profile';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyProfileService {
  private apiUrl = `${environment.api}`;


  constructor(private  httpClient: HttpClient) { }

  public getPersonalInfo(
  ): Observable<MyProfile> {
    const api = this.apiUrl + '/user/info';
    return this.httpClient.get<MyProfile>(api);
  }

  public updatePersonalInfo( myProfile: any
  ): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuYXlkZSIsImlhdCI6MTY5NTg2MDM3NiwiZXhwIjoxNjk1OTQ2Nzc2fQ.brw2wGr9HwDxkZUGAWw7L6qyu8AE4OqF5XEq3gkYz1s"}`
      })
    };
    const api = this.apiUrl + '/user/info/update-weight-height';
    return this.httpClient.put(api, myProfile, httpOptions);
  }

}
