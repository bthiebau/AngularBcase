import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, map, Observable } from 'rxjs';
import { BaseService } from '../base.service';
import { environment } from '../../../environments/environment.development';
import { jwtDecode } from 'jwt-decode';
import { UsersService } from '../users/users.service';
import { UserJWT, UserJWTHttp } from '../../entities/user.entity';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  private readonly http = inject(HttpClient)
  private readonly usersService = inject(UsersService)

  private token$: BehaviorSubject <string | undefined> = new BehaviorSubject(undefined);//Jamais public

  constructor() {
    super('api')
    const token = localStorage.getItem(environment.localStorageKeys.token)
    if(token){
      this.processToken(token, false);
    }
  }

  get token (): string | undefined{
    return this.token$.getValue();
  }

  selectToken(): Observable<string | undefined> {
    return this.token$.asObservable(); //readOnly
  }

  get isAuthenticated(): boolean {
    return !!this.token
  }

  selectIsAuthenticated(): Observable<boolean> {
    return this.token$.pipe(map(token => !!token))
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
    this.token$.next(undefined);
    localStorage.removeItem(environment.localStorageKeys.token)
    this.usersService.userJWT = undefined; 
  }

  private processToken(token: string, stayConnected:boolean): void {
    const tokenExtracted:UserJWTHttp = jwtDecode(token);
    this.usersService.userJWT = UserJWT.fromHttp(tokenExtracted);
    this.token$.next(token);

    if(stayConnected){
      if(localStorage.getItem(environment.localStorageKeys.token)){
        localStorage.removeItem(environment.localStorageKeys.token)
      }
      localStorage.setItem(environment.localStorageKeys.token, this.token)
    }

  }
}