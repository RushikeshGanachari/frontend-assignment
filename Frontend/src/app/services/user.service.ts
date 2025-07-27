import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface UserData {
  name: string;
  mobile: string;
  address: string;
  skills?: string;
  hobbies?: string;
  photo?: File;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000/api'; // Adjust if your server runs on a different port

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, { username, password });
  }
  

  // 🟢 POST: Submit a new user with file
  createUser(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, formData);
  }

  // 🔵 GET: Fetch all users
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`);
  }
}
