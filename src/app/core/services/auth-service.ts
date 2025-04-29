import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
import { JwtService } from "./jwt.service";
import { Router } from "@angular/router";
import { Role } from "../enums/role.enum";
import {LoginRequest} from "../dto/login-request";
import {JwtResponse} from "../dto/jwt-response";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<any>(this.decodeToken(this.jwtService.getToken()));

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
          this.currentUserSubject.next(this.decodeToken(response.token));
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

  hasRole(role: Role): boolean {
    const currentUserRole = this.getCurrentUserRole();
    return currentUserRole === role;
  }

  getCurrentUserRole(): Role | null {
    const token = this.jwtService.getToken();
    if (token) {
      return this.jwtService.getUserRole(token) as Role || null;
    }
    return null;
  }

  private decodeToken(token: string | null): any {
    if (token) {
      return this.jwtService.decodeToken(token);
    }
    return null;
  }
}
