import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserJWT } from '../../entities/user.entity';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService {
  private readonly http = inject(HttpClient)

  private userJWT$: BehaviorSubject<UserJWT | undefined> = new BehaviorSubject(undefined);

  constructor(){
    super('/api/users');
  }

  selectUserJWT(): Observable<UserJWT | undefined> {
    return this.userJWT$.asObservable();
  }

  set userJWT(value: UserJWT | undefined) {
    this.userJWT$.next(value);
  }

  async list(): User[]{
    const request = this.http.get<>
    
    return
  }
}
