import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Observable } from 'rxjs';
import { EnseignantRequest } from '../dto/enseignant/enseignant-request';
import { EnseignantResponse } from '../dto/enseignant/enseignant-response';

@Injectable({
  providedIn: 'root'
})
export class EnseignantService {
  private apiUrl = `${environment.apiUrl}/auth/enseignants`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<EnseignantResponse[]> {
    return this.http.get<EnseignantResponse[]>(this.apiUrl);
  }

  getById(id: number): Observable<EnseignantResponse> {
    return this.http.get<EnseignantResponse>(`${this.apiUrl}/${id}`);
  }

  getByDepartement(departementId: number): Observable<EnseignantResponse[]> {
    return this.http.get<EnseignantResponse[]>(`${this.apiUrl}/departement/${departementId}`);
  }

  create(request: EnseignantRequest): Observable<EnseignantResponse> {
    return this.http.post<EnseignantResponse>(this.apiUrl, request);
  }

  update(id: number, request: EnseignantRequest): Observable<EnseignantResponse> {
    return this.http.put<EnseignantResponse>(`${this.apiUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
