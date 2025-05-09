import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AbsenceRequest } from '../dto/absence/absence-request';
import { AbsenceResponse } from '../dto/absence/absence-response';
import { EtudiantResponse } from '../dto/etudiant/etudiant-response';

@Injectable({ providedIn: 'root' })
export class AbsenceService {
  private apiUrl = `${environment.apiUrl}/auth/absences`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<AbsenceResponse[]> {
    return this.http.get<AbsenceResponse[]>(this.apiUrl);
  }

  getById(id: number): Observable<AbsenceResponse> {
    return this.http.get<AbsenceResponse>(`${this.apiUrl}/${id}`);
  }

  getByEtudiant(etudiantId: number): Observable<AbsenceResponse[]> {
    return this.http.get<AbsenceResponse[]>(`${this.apiUrl}/etudiant/${etudiantId}`);
  }

  getBySeance(seanceId: number): Observable<AbsenceResponse[]> {
    return this.http.get<AbsenceResponse[]>(`${this.apiUrl}/seance/${seanceId}`);
  }

  getByEtudiantAndPeriode(etudiantId: number, start: string, end: string): Observable<AbsenceResponse[]> {
    return this.http.get<AbsenceResponse[]>(`${this.apiUrl}/etudiant/${etudiantId}/periode`, {
      params: { dateDebut: start, dateFin: end }
    });
  }

  create(data: AbsenceRequest): Observable<AbsenceResponse> {
    return this.http.post<AbsenceResponse>(this.apiUrl, data);
  }

  update(id: number, data: AbsenceRequest): Observable<AbsenceResponse> {
    return this.http.put<AbsenceResponse>(`${this.apiUrl}/${id}`, data);
  }

  validate(id: number, validee: boolean): Observable<AbsenceResponse> {
    return this.http.patch<AbsenceResponse>(`${this.apiUrl}/${id}/validation`, { validee });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getEtudiantsByModuleClasse(moduleId: number, classeId: number, enseignantId: number): Observable<EtudiantResponse[]> {
    return this.http.get<EtudiantResponse[]>(`${this.apiUrl}/etudiants`, {
      params: { moduleId, classeId, enseignantId }
    });
  }

  createBulk(data: AbsenceRequest[], enseignantId: number): Observable<AbsenceResponse[]> {
    return this.http.post<AbsenceResponse[]>(`${this.apiUrl}/bulk`, data, {
      params: { enseignantId }
    });
  }
}
