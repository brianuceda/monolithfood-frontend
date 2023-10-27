import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private titleSubject = new BehaviorSubject<string>('');
  currentTitle = this.titleSubject.asObservable();

  public setTitle(title: string): void {
    this.titleSubject.next(title);
  }

  public isPrivateRoute(path: string): boolean {
    const publicRoutes = ['/', '/home', '/about-us', '/login', '/register'];
    return !publicRoutes.includes(path);
  }
}
