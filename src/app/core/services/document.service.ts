import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DocumentRequest } from '../dto/document/document-request';
import { DocumentResponse } from '../dto/document/document-response';
import { StatusDocument } from '../enums/StatusDocument';

@Injectable({ providedIn: 'root' })
export class DocumentService {
  private apiUrl = `${environment.apiUrl}/documents`;

  constructor(private http: HttpClient) {}

  getAllDocuments(): Observable<DocumentResponse[]> {
    return this.http.get<DocumentResponse[]>(`${this.apiUrl}`);
  }

  getDocumentById(id: number): Observable<DocumentResponse> {
    return this.http.get<DocumentResponse>(`${this.apiUrl}/${id}`);
  }

  getDocumentsByEtudiant(etudiantId: number): Observable<DocumentResponse[]> {
    return this.http.get<DocumentResponse[]>(`${this.apiUrl}/etudiant/${etudiantId}`);
  }

  getDocumentsByDemandeur(demandeurId: number): Observable<DocumentResponse[]> {
    return this.http.get<DocumentResponse[]>(`${this.apiUrl}/demandeur/${demandeurId}`);
  }

  getDocumentsByType(type: string): Observable<DocumentResponse[]> {
    return this.http.get<DocumentResponse[]>(`${this.apiUrl}/type/${type}`);
  }

  getDocumentsByStatus(status: StatusDocument): Observable<DocumentResponse[]> {
    return this.http.get<DocumentResponse[]>(`${this.apiUrl}/status/${status}`);
  }

  createDocument(request: DocumentRequest): Observable<DocumentResponse> {
    return this.http.post<DocumentResponse>(`${this.apiUrl}`, request);
  }

  updateDocument(id: number, request: DocumentRequest): Observable<DocumentResponse> {
    return this.http.put<DocumentResponse>(`${this.apiUrl}/${id}`, request);
  }

  updateStatus(id: number, status: StatusDocument): Observable<DocumentResponse> {
    return this.http.patch<DocumentResponse>(`${this.apiUrl}/${id}/status`, { status });
  }

  updateFichierUrl(id: number, fichierUrl: string): Observable<DocumentResponse> {
    return this.http.patch<DocumentResponse>(`${this.apiUrl}/${id}/fichier-url`, { fichierUrl });
  }

  deleteDocument(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
