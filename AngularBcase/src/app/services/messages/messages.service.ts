import { inject, Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Message, MessageHttp } from '../../entities/message.entity';
import { HttpClient, HttpParams } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService extends BaseService{
  private readonly http = inject(HttpClient)

  constructor() {
    super('api/messages')
  }

  async ListForSenderAndReceiver(senderId: number, receiverId): Promise<Message[]> {
    const params = new HttpParams({fromObject: {
      senderId: senderId,
      receiverId: receiverId
    }})
    const request = this.http.get<{member: MessageHttp[] }>(this.apiUrl, {params: params})
    const response = await lastValueFrom(request)
    return response.member.map(message => Message.fromHttp(message))
  }
}
