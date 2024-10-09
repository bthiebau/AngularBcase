import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { User, UserHttp, UserJWT } from '../../entities/user.entity';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService {
  private readonly http = inject(HttpClient)

  private userJWT$: BehaviorSubject<UserJWT | undefined> = new BehaviorSubject(undefined);

  constructor(){
    super('api/users');
  }

  selectUserJWT(): Observable<UserJWT | undefined> {
    return this.userJWT$.asObservable();
  }

  get userJWT(): UserJWT |undefined {
    console.log(this.userJWT$.getValue())
    return this.userJWT$.getValue();
  }

  set userJWT(value: UserJWT | undefined) {
    this.userJWT$.next(value);
  }

  async list(): Promise <User[]> {
    const request = this.http.get<{member: UserHttp[]}>(this.apiUrl)
    const response = await lastValueFrom(request);
    
    return response.member.map(userHttp => User.fromHttp(userHttp)) // => tableau de User
  }

  async getById(id: number): Promise <User> {
    const request = this.http.get<UserHttp>(`${this.apiUrl}/${id}`)
    const response = await lastValueFrom(request);
    console.log(response)
    return User.fromHttp(response) // => tableau de User
  }
}
