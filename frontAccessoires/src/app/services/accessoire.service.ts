import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessoireService {

  private apiUrl = 'http://localhost:3000/api/accessoires';

  constructor(private http: HttpClient) {}

  getAccessoires(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addAccessoire(data: FormData): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateAccessoire(id: string, data: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteAccessoire(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
