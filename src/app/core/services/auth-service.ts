import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
import { JwtService } from "./jwt.service";
import { Router } from "@angular/router";
import { Role } from "../enums/Role";
import { LoginRequest } from "../dto/login-request";
import { JwtResponse } from "../dto/jwt-response";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth`;
  currentUserSubject = new BehaviorSubject<any>(this.decodeToken(this.jwtService.getToken()));

  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
    private router: Router
  ) {}

  login(request: LoginRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.apiUrl}/login`, request).pipe(
      tap((response: JwtResponse) => {
        if (response) {
          this.jwtService.saveToken(response.token);
          const decoded = this.decodeToken(response.token);
          this.currentUserSubject.next(decoded);

          // Si le premier rôle existe, le stocker dans localStorage
          if (decoded && decoded.roles && decoded.roles.length > 0) {
            const roleWithoutPrefix = this.normalizeRole(decoded.roles[0]);
            this.jwtService.setUserRole(roleWithoutPrefix);
          }
        } else {
          console.error('No login response received');
        }
      })
    );
  }

  verifyToken(): Observable<any> {
    return this.http.get(`${this.apiUrl}/verify`);
  }

  checkUsernameExists(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/utilisateur/${username}/exists`);
  }

  checkEmailExists(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/email/${email}/exists`);
  }

  getRoles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/roles`);
  }

  logout(): void {
    this.jwtService.removeToken();
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  /**
   * Normalize un rôle en enlevant le préfixe "ROLE_" si présent
   */
  private normalizeRole(role: string): string {
    return role.startsWith('ROLE_') ? role.substring(5) : role;
  }

  /**
   * Vérifie si l'utilisateur a un rôle spécifique
   * Gère à la fois les rôles avec et sans préfixe "ROLE_"
   */
  hasRole(role: Role): boolean {
    const currentUser = this.currentUserSubject.value;
    if (!currentUser || !currentUser.roles) {
      return false;
    }

    // Normaliser le rôle recherché
    const normalizedTargetRole = this.normalizeRole(role.toString());

    // Vérifier les rôles de l'utilisateur (en normalisant chacun)
    return currentUser.roles.some((userRole: string) => {
      const normalizedUserRole = this.normalizeRole(userRole);
      return normalizedUserRole === normalizedTargetRole;
    });
  }

  /**
   * Récupère le rôle actuel de l'utilisateur sans le préfixe "ROLE_"
   */
  getCurrentUserRole(): Role | null {
    const currentUser = this.currentUserSubject.value;
    if (!currentUser || !currentUser.roles || currentUser.roles.length === 0) {
      return null;
    }

    // Prendre le premier rôle et enlever le préfixe "ROLE_" si présent
    return this.normalizeRole(currentUser.roles[0]) as Role;
  }

  private decodeToken(token: string | null): any {
    if (token) {
      return this.jwtService.decodeToken(token);
    }
    return null;
  }
}
