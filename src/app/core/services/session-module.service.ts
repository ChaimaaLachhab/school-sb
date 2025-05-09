import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SessionModuleRequest } from '../dto/sessionmodule/session-module-request';
import { SessionModuleResponse } from '../dto/sessionmodule/session-module-response';

@Injectable({ providedIn: 'root' })
export class SessionModuleService {
  private apiUrl = `${environment.apiUrl}/auth/session-modules`;

  constructor(private http: HttpClient) {}

  getAllSessionModules(): Observable<SessionModuleResponse[]> {
    return this.http.get<SessionModuleResponse[]>(`${this.apiUrl}`);
  }

  getSessionModuleById(id: number): Observable<SessionModuleResponse> {
    return this.http.get<SessionModuleResponse>(`${this.apiUrl}/${id}`);
  }

  getSessionModulesBySession(sessionId: number): Observable<SessionModuleResponse[]> {
    return this.http.get<SessionModuleResponse[]>(`${this.apiUrl}/session/${sessionId}`);
  }

  getSessionModulesByModule(moduleId: number): Observable<SessionModuleResponse[]> {
    return this.http.get<SessionModuleResponse[]>(`${this.apiUrl}/module/${moduleId}`);
  }

  getSessionModulesBySessionOrdered(sessionId: number): Observable<SessionModuleResponse[]> {
    return this.http.get<SessionModuleResponse[]>(`${this.apiUrl}/session/${sessionId}/ordered`);
  }

  createSessionModule(request: SessionModuleRequest): Observable<SessionModuleResponse> {
    return this.http.post<SessionModuleResponse>(`${this.apiUrl}`, request);
  }

  updateSessionModule(id: number, request: SessionModuleRequest): Observable<SessionModuleResponse> {
    return this.http.put<SessionModuleResponse>(`${this.apiUrl}/${id}`, request);
  }
}
