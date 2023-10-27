import { DataService } from 'src/app/shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'MonolithFoodFrontend';
  isUserAuthenticated?: boolean;
  isSidenavOpened = true;

  constructor(
    private dataService: DataService,
    private router: Router,
    private authService: AuthService
  ) {
    this.isUserAuthenticated = this.authService.isAuthenticated();
  }

  toggleSidenav() {
    this.isSidenavOpened = !this.isSidenavOpened;
  }

  isPrivateRoute(): boolean {
    return this.dataService.isPrivateRoute(this.router.url);
  }

  // Testing
  ngOnInit() {
    // Exponer los métodos en el objeto window
    (window as any).app = {
      setCompletedToken: this.setCompletedToken.bind(this),
      setPersonalInfoToken: this.setPersonalInfoToken.bind(this),
      setActivityLevelToken: this.setActivityLevelToken.bind(this),
      setObjectivesToken: this.setObjectivesToken.bind(this),
    };
  }

  public setCompletedToken(): void {
    localStorage.removeItem('token');
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiJ9.eyJwcm9maWxlU3RhZ2UiOiJjb21wbGV0ZWQiLCJzdWIiOiJraXdpZ29kIiwiaWF0IjoxNjk4MzUxNjUwLCJleHAiOjE2OTg5NTY0NTB9.z03hSWgBo7AfQZ5Jy1nYyBIVppFpxAfuB0W1krfE1fc'
    );
  }
  public setPersonalInfoToken(): void {
    localStorage.removeItem('token');
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiJ9.eyJwcm9maWxlU3RhZ2UiOiJwZXJzb25hbEluZm8iLCJzdWIiOiJraXdpZ29kIiwiaWF0IjoxNjk4MzQ1ODY4LCJleHAiOjE2OTg5NTA2Njh9.N5KTXyHBlxyvLdiiSUElvEOsJTcyOoUdNoPtF8zLFlw'
    );
  }
  public setActivityLevelToken(): void {
    localStorage.removeItem('token');
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiJ9.eyJwcm9maWxlU3RhZ2UiOiJhY3Rpdml0eUxldmVsIiwic3ViIjoia2l3aWdvZCIsImlhdCI6MTY5ODM4NDM4OSwiZXhwIjoxNjk4OTg5MTg5fQ.p6bLaNe1skqGgNLGTb65cdKI6piyw5zGB2N8QMKVT04'
    );
  }
  public setObjectivesToken(): void {
    localStorage.removeItem('token');
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiJ9.eyJwcm9maWxlU3RhZ2UiOiJvYmplY3RpdmVzIiwic3ViIjoia2l3aWdvZCIsImlhdCI6MTY5ODM4NDU4OSwiZXhwIjoxNjk4OTg5Mzg5fQ.QMITQE6p9w12N0X33T5xv3Wi8txOr5dL1ivUTdHlIDo'
    );
  }
}
