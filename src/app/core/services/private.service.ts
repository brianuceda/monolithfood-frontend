import { Injectable } from '@angular/core';
import { TokenPayload } from 'src/app/core/interfaces/token-payload.model';
import { TokenProfileStages } from 'src/app/shared/interfaces/token-profile-stages.model';

@Injectable({
  providedIn: 'root',
})
export class PrivateService {
  // * Token
  // Retorna true si el token existe
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
  // Valida la estructura del token
  public isValidTokenStructure(decoded: any): decoded is TokenPayload {
    return (
      decoded &&
      Array.isArray(decoded.roles) &&
      decoded.roles.every(
        (role: any) =>
          typeof role === 'object' &&
          role !== null &&
          typeof role.authority === 'string'
      ) &&
      typeof decoded.profileStage === 'string' &&
      typeof decoded.sub === 'string' &&
      typeof decoded.iat === 'number' &&
      typeof decoded.exp === 'number' &&
      // Asegura que solo hay 5 propiedades en el token
      Object.keys(decoded).length === 5
    );
  }
  // Verifica si hay algun Dialog abierto en base al payload del token JWT
  public isDialogOpened(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const profileStage = this.decodeJwtPayload(token).profileStage;
    return TokenProfileStages.some(
      (stageObj) => stageObj.stage === profileStage
    );
  }
  // Decodifica el token y retorna el payload
  public decodeJwtPayload(jwtToken: string): any {
    try {
      const payloadBase64 = jwtToken.split('.')[1];
      const payloadJson = atob(payloadBase64);
      return JSON.parse(payloadJson);
    } catch (err) {
      console.error('Error decodificando el token de autenticacion: ', err);
      return null;
    }
  }
}
