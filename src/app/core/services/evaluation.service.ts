import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EvaluationRequest } from '../dto/evaluation/evaluation-request';
import { EvaluationResponse } from '../dto/evaluation/evaluation-response';
import {ApiResponse} from "../dto/common/api-response";

@Injectable({ providedIn: 'root' })
export class EvaluationService {
  private apiUrl = `${environment.apiUrl}/evaluations`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<EvaluationResponse[]>> {
    return this.http.get<ApiResponse<EvaluationResponse[]>>(this.apiUrl);
  }

  getById(id: number): Observable<ApiResponse<EvaluationResponse>> {
    return this.http.get<ApiResponse<EvaluationResponse>>(`${this.apiUrl}/${id}`);
  }

  getByEtudiant(etudiantId: number): Observable<ApiResponse<EvaluationResponse[]>> {
    return this.http.get<ApiResponse<EvaluationResponse[]>>(`${this.apiUrl}/etudiant/${etudiantId}`);
  }

  create(data: EvaluationRequest): Observable<ApiResponse<EvaluationResponse>> {
    return this.http.post<ApiResponse<EvaluationResponse>>(this.apiUrl, data);
  }

  update(id: number, data: EvaluationRequest): Observable<ApiResponse<EvaluationResponse>> {
    return this.http.put<ApiResponse<EvaluationResponse>>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
  }
}
