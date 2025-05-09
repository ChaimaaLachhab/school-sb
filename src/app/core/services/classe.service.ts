import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Observable } from 'rxjs';
import { ClasseRequest } from '../dto/classe/classe-request';
import { ClasseResponse } from '../dto/classe/classe-response';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {
  private apiUrl = `${environment.apiUrl}/auth/classes`;

  constructor(private http: HttpClient) {}

  getAllClasses(): Observable<ClasseResponse[]> {
    return this.http.get<ClasseResponse[]>(`${this.apiUrl}`);
  }

  getClasseById(id: number): Observable<ClasseResponse> {
    return this.http.get<ClasseResponse>(`${this.apiUrl}/${id}`);
  }

  createClasse(request: ClasseRequest): Observable<ClasseResponse> {
    return this.http.post<ClasseResponse>(`${this.apiUrl}`, request);
  }

  updateClasse(id: number, request: ClasseRequest): Observable<ClasseResponse> {
    return this.http.put<ClasseResponse>(`${this.apiUrl}/${id}`, request);
  }

  deleteClasse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
