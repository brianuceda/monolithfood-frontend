import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  // Navbar
  // Retorna true si el token existe
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
