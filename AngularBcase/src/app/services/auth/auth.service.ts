import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { BaseService } from '../base.service';
import { environment } from '../../../environments/environment.development';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  private _token: string | undefined
  private readonly http = inject(HttpClient)

  constructor() {
    super('api')
    const token = localStorage.getItem(environment.localStorageKeys.token)
    if(token){
      this._token = token;
    }
  }

  get token (): string | undefined{
    return this._token
  }

  get isAuthenticated(): boolean {
    return !!this.token
  }

  async login(email: string, password: string, stayConnected: boolean): Promise<void> {
    const request = this.http.post<{token: string}>(`${this.apiUrl}/login_check`, {
      email: email,
      password: password
    })

    const response = await lastValueFrom(request);
    this.processToken(response.token, stayConnected);

  }

  logout(): void {
    this._token = undefined
    localStorage.removeItem(environment.localStorageKeys.token)
  }

  private processToken(token: string, stayConnected:boolean): void {
    const tokenExtracted = jwtDecode(token);
    console.log(tokenExtracted);
    this._token = token;

    if(stayConnected){
      if(localStorage.getItem(environment.localStorageKeys.token)){
        localStorage.removeItem(environment.localStorageKeys.token)
      }
      localStorage.setItem(environment.localStorageKeys.token, this.token)
    }

  }
}