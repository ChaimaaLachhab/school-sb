import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment"; // À adapter selon vos modèles
import { SessionRequest } from '../dto/session/session-request';
import { SessionResponse } from '../dto/session/session-response';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private apiUrl = `${environment.apiUrl}/auth/sessions`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<SessionResponse[]> {
    return this.http.get<SessionResponse[]>(this.apiUrl);
  }

  getById(id: number): Observable<SessionResponse> {
    return this.http.get<SessionResponse>(`${this.apiUrl}/${id}`);
  }

  getByResponsable(responsableId: number): Observable<SessionResponse[]> {
    return this.http.get<SessionResponse[]>(`${this.apiUrl}/responsable/${responsableId}`);
  }

  getByAnneeScolaire(anneeScolaire: string): Observable<SessionResponse[]> {
    return this.http.get<SessionResponse[]>(`${this.apiUrl}/annee/${anneeScolaire}`);
  }

  getByStatut(statut: string): Observable<SessionResponse[]> {
    return this.http.get<SessionResponse[]>(`${this.apiUrl}/statut/${statut}`);
  }

  create(request: SessionRequest): Observable<SessionResponse> {
    return this.http.post<SessionResponse>(this.apiUrl, request);
  }

  update(id: number, request: SessionRequest): Observable<SessionResponse> {
    return this.http.put<SessionResponse>(`${this.apiUrl}/${id}`, request);
  }

  updateStatut(id: number, statut: string): Observable<SessionResponse> {
    return this.http.patch<SessionResponse>(`${this.apiUrl}/${id}/statut`, { statut });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  activer(id: number, actif: boolean): Observable<SessionResponse> {
    return this.http.patch<SessionResponse>(`${this.apiUrl}/${id}/activer`, { actif });
  }
}
