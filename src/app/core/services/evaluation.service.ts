import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EvaluationRequest } from '../dto/evaluation/evaluation-request';
import { EvaluationResponse } from '../dto/evaluation/evaluation-response';

@Injectable({ providedIn: 'root' })
export class EvaluationService {
  private apiUrl = `${environment.apiUrl}/auth/evaluations`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<EvaluationResponse[]> {
    return this.http.get<EvaluationResponse[]>(this.apiUrl);
  }

  getById(id: number): Observable<EvaluationResponse> {
    return this.http.get<EvaluationResponse>(`${this.apiUrl}/${id}`);
  }

  getByEtudiant(etudiantId: number): Observable<EvaluationResponse[]> {
    return this.http.get<EvaluationResponse[]>(`${this.apiUrl}/etudiant/${etudiantId}`);
  }

  create(data: EvaluationRequest): Observable<EvaluationResponse> {
    return this.http.post<EvaluationResponse>(this.apiUrl, data);
  }

  update(id: number, data: EvaluationRequest): Observable<EvaluationResponse> {
    return this.http.put<EvaluationResponse>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
