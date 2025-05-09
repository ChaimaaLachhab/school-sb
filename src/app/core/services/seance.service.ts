import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SeanceRequest } from '../dto/seance/seance-request';
import { SeanceResponse } from '../dto/seance/seance-response';

@Injectable({ providedIn: 'root' })
export class SeanceService {
  private apiUrl = `${environment.apiUrl}/auth/seances`;

  constructor(private http: HttpClient) {}

  getAllSeances(): Observable<SeanceResponse[]> {
    return this.http.get<SeanceResponse[]>(`${this.apiUrl}`);
  }

  getSeanceById(id: number): Observable<SeanceResponse> {
    return this.http.get<SeanceResponse>(`${this.apiUrl}/${id}`);
  }

  getSeancesByModule(moduleId: number): Observable<SeanceResponse[]> {
    return this.http.get<SeanceResponse[]>(`${this.apiUrl}/module/${moduleId}`);
  }

  getSeancesByEnseignant(enseignantId: number): Observable<SeanceResponse[]> {
    return this.http.get<SeanceResponse[]>(`${this.apiUrl}/enseignant/${enseignantId}`);
  }

  getSeancesByStatut(statut: string): Observable<SeanceResponse[]> {
    return this.http.get<SeanceResponse[]>(`${this.apiUrl}/statut/${statut}`);
  }

  getSeancesByDate(date: string): Observable<SeanceResponse[]> {
    return this.http.get<SeanceResponse[]>(`${this.apiUrl}/date/${date}`);
  }

  getSeancesByEnseignantAndPeriode(id: number, debut: string, fin: string): Observable<SeanceResponse[]> {
    return this.http.get<SeanceResponse[]>(`${this.apiUrl}/enseignant/${id}/periode?debut=${debut}&fin=${fin}`);
  }

  getSeancesByClasseAndDate(classeId: number, date: string): Observable<SeanceResponse[]> {
    return this.http.get<SeanceResponse[]>(`${this.apiUrl}/classe/${classeId}/date/${date}`);
  }

  createSeance(request: SeanceRequest): Observable<SeanceResponse> {
    return this.http.post<SeanceResponse>(`${this.apiUrl}`, request);
  }

  updateSeance(id: number, request: SeanceRequest): Observable<SeanceResponse> {
    return this.http.put<SeanceResponse>(`${this.apiUrl}/${id}`, request);
  }

  updateStatut(id: number, statut: string): Observable<SeanceResponse> {
    return this.http.patch<SeanceResponse>(`${this.apiUrl}/${id}/statut`, { statut });
  }

  deleteSeance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  activerSeance(id: number, actif: boolean): Observable<SeanceResponse> {
    return this.http.patch<SeanceResponse>(`${this.apiUrl}/${id}/actif`, { actif });
  }
}
