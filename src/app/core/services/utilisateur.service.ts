import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Observable } from 'rxjs';
import { UtilisateurRequest } from '../dto/utilisateur/utilisateur-request';
import { UtilisateurResponse } from '../dto/utilisateur/utilisateur-response';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private apiUrl = `${environment.apiUrl}/auth/utilisateurs`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<UtilisateurResponse[]> {
    return this.http.get<UtilisateurResponse[]>(this.apiUrl);
  }

  getById(id: number): Observable<UtilisateurResponse> {
    return this.http.get<UtilisateurResponse>(`${this.apiUrl}/${id}`);
  }

  create(request: UtilisateurRequest): Observable<UtilisateurResponse> {
    return this.http.post<UtilisateurResponse>(this.apiUrl, request);
  }

  update(id: number, request: UtilisateurRequest): Observable<UtilisateurResponse> {
    return this.http.put<UtilisateurResponse>(`${this.apiUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getByRole(role: string): Observable<UtilisateurResponse[]> {
    return this.http.get<UtilisateurResponse[]>(`${this.apiUrl}/role/${role}`);
  }

  existsByUsername(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/exists/username/${username}`);
  }

  existsByEmail(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/exists/email/${email}`);
  }
}
