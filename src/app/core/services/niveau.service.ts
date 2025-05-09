import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NiveauRequest } from '../dto/niveau/niveau-request';
import { NiveauResponse } from '../dto/niveau/niveau-response';

@Injectable({ providedIn: 'root' })
export class NiveauService {
  private apiUrl = `${environment.apiUrl}/niveaux`;

  constructor(private http: HttpClient) {}

  getAllNiveaux(): Observable<NiveauResponse[]> {
    return this.http.get<NiveauResponse[]>(this.apiUrl);
  }

  getNiveauById(id: number): Observable<NiveauResponse> {
    return this.http.get<NiveauResponse>(`${this.apiUrl}/${id}`);
  }

  getNiveauxActifs(): Observable<NiveauResponse[]> {
    return this.http.get<NiveauResponse[]>(`${this.apiUrl}/actifs`);
  }

  getNiveauxOrdonnes(): Observable<NiveauResponse[]> {
    return this.http.get<NiveauResponse[]>(`${this.apiUrl}/ordonnes`);
  }

  createNiveau(request: NiveauRequest): Observable<NiveauResponse> {
    return this.http.post<NiveauResponse>(this.apiUrl, request);
  }

  updateNiveau(id: number, request: NiveauRequest): Observable<NiveauResponse> {
    return this.http.put<NiveauResponse>(`${this.apiUrl}/${id}`, request);
  }

  deleteNiveau(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  activerNiveau(id: number, actif: boolean): Observable<NiveauResponse> {
    return this.http.patch<NiveauResponse>(`${this.apiUrl}/${id}/activer`, { actif });
  }
}
