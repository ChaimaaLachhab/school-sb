import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Role } from "../enums/Role";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  decodeToken(token: string): any {
    return jwtDecode(token);
  }

  getUserRole(token: string): string | null {
    const decodedToken = this.decodeToken(token);
    if (decodedToken?.roles && decodedToken.roles.length > 0) {
      const role = decodedToken.roles[0];
      return role.startsWith('ROLE_') ? role.substring(5) : role;
    }
    return null;
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  setUserRole(role: string) {
    localStorage.setItem('userRole', role);
  }

  getUserRoleFromStorage(): string | null {
    return localStorage.getItem('userRole');
  }

  getUsernameFromToken(token: string): string | null {
    const decodedToken = this.decodeToken(token);
    return decodedToken?.sub || null;
  }

  removeToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAdmin(): boolean {
    const role = this.getUserRoleFromStorage();
    return role === Role.ADMIN;
  }

  isEnseignant(): boolean {
    const role = this.getUserRoleFromStorage();
    return role === Role.ENSEIGNANT;
  }

  isEtudiant(): boolean {
    const role = this.getUserRoleFromStorage();
    return role === Role.ETUDIANT;
  }

  isParent(): boolean {
    const role = this.getUserRoleFromStorage();
    return role === Role.PARENT;
  }
}
