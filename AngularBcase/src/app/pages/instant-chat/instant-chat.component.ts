import { Component, OnInit } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-instant-chat',
  standalone: true,
  imports: [],
  templateUrl: './instant-chat.component.html',
  styleUrl: './instant-chat.component.scss'
})
export class InstantChatComponent implements OnInit{
  private socket: Socket

  ngOnInit(): void {
    this.socket = io(`http://${environment.wsAddress}:${environment.wsPort}`, {
      path: '/'
    })

    this.socket.on('connect', () => {
      this.socket.emit('toto')
    })
  }
}
