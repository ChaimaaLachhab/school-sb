import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Observable } from 'rxjs';
import { ModuleRequest } from '../dto/module/module-request';
import { ModuleResponse } from '../dto/module/module-response';
import { ClasseResponse } from '../dto/classe/classe-response';
import { SessionResponse } from '../dto/session/session-response';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private apiUrl = `${environment.apiUrl}/auth/modules`;

  constructor(private http: HttpClient) {}

  getAllModules(): Observable<ModuleResponse[]> {
    return this.http.get<ModuleResponse[]>(`${this.apiUrl}`);
  }

  getModuleById(id: number): Observable<ModuleResponse> {
    return this.http.get<ModuleResponse>(`${this.apiUrl}/${id}`);
  }

  getModulesByClasse(classeId: number): Observable<ModuleResponse[]> {
    return this.http.get<ModuleResponse[]>(`${this.apiUrl}/classe/${classeId}`);
  }

  getModulesByEnseignant(enseignantId: number): Observable<ModuleResponse[]> {
    return this.http.get<ModuleResponse[]>(`${this.apiUrl}/enseignant/${enseignantId}`);
  }

  createModule(module: ModuleRequest): Observable<ModuleResponse> {
    return this.http.post<ModuleResponse>(`${this.apiUrl}`, module);
  }

  updateModule(id: number, module: ModuleRequest): Observable<ModuleResponse> {
    return this.http.put<ModuleResponse>(`${this.apiUrl}/${id}`, module);
  }

  deleteModule(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  activerModule(id: number, actif: boolean): Observable<ModuleResponse> {
    return this.http.patch<ModuleResponse>(`${this.apiUrl}/${id}/activation`, { actif });
  }

  getModulesBySessionAndEnseignant(sessionId: number, enseignantId: number): Observable<ModuleResponse[]> {
    return this.http.get<ModuleResponse[]>(`${this.apiUrl}/session/${sessionId}/enseignant/${enseignantId}`);
  }

  getClassesByModuleAndEnseignant(moduleId: number, enseignantId: number): Observable<ClasseResponse[]> {
    return this.http.get<ClasseResponse[]>(`${this.apiUrl}/${moduleId}/enseignant/${enseignantId}/classes`);
  }

  getSessionsByEnseignant(enseignantId: number): Observable<SessionResponse[]> {
    return this.http.get<SessionResponse[]>(`${this.apiUrl}/enseignant/${enseignantId}/sessions`);
  }
}
