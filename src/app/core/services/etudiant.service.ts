import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Observable } from 'rxjs';
import { EtudiantRequest } from '../dto/etudiant/etudiant-request';
import { EtudiantResponse } from '../dto/etudiant/etudiant-response';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  private apiUrl = `${environment.apiUrl}/auth/etudiants`;

  constructor(private http: HttpClient) {}

  getAllEtudiants(): Observable<EtudiantResponse[]> {
    return this.http.get<EtudiantResponse[]>(`${this.apiUrl}`);
  }

  getEtudiantById(id: number): Observable<EtudiantResponse> {
    return this.http.get<EtudiantResponse>(`${this.apiUrl}/${id}`);
  }

  getEtudiantsByClasseId(classeId: number): Observable<EtudiantResponse[]> {
    return this.http.get<EtudiantResponse[]>(`${this.apiUrl}/classe/${classeId}`);
  }

  createEtudiant(request: EtudiantRequest): Observable<EtudiantResponse> {
    return this.http.post<EtudiantResponse>(`${this.apiUrl}`, request);
  }

  updateEtudiant(id: number, request: EtudiantRequest): Observable<EtudiantResponse> {
    return this.http.put<EtudiantResponse>(`${this.apiUrl}/${id}`, request);
  }

  deleteEtudiant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  activate(id: number, actif: boolean): Observable<EtudiantResponse> {
    return this.http.patch<EtudiantResponse>(`${this.apiUrl}/${id}/activer`, { actif });
  }
}
