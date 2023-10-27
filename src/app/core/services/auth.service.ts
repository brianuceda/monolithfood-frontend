import { Injectable } from '@angular/core';

interface MyTokenPayload {
  profileStage: string;
  sub: string;
  iat: number;
  exp: number;
}
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
  // Guard
  public isValidTokenStructure(decoded: any): decoded is MyTokenPayload {
    return (
      decoded &&
      typeof decoded.profileStage === 'string' &&
      typeof decoded.sub === 'string' &&
      typeof decoded.iat === 'number' &&
      typeof decoded.exp === 'number' &&
      // Asegura que solo hay 4 propiedades
      Object.keys(decoded).length === 4
    );
  }

  public decodeJwtPayload(jwtToken: string): any {
    try {
      const payloadBase64 = jwtToken.split('.')[1];
      const payloadJson = atob(payloadBase64);
      return JSON.parse(payloadJson);
    } catch (err) {
      console.error("Error decodificando el JWT:", err);
      return null;
    }
  }
}
