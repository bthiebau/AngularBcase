import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../entities/user.entity';
import { UsersService } from '../../services/users/users.service';
import { MessageInput } from '../../entities/message.entity';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-instant-chat',
  templateUrl: './instant-chat.component.html',
  styleUrls: ['./instant-chat.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgFor]
})
export class InstantChatComponent implements OnInit {
  private readonly route = inject(ActivatedRoute)
  private readonly usersService = inject(UsersService)
  // private readonly messagesService = inject(MessagesService)


  // messages: Message[]
  receiver: User
  form: FormGroup
  private socket: WebSocket;
  private senderId: number;
  private receiverId: number;

  async ngOnInit(): Promise<void> {
    this.senderId = parseInt(this.route.snapshot.queryParamMap.get('s'))
    this.receiverId = parseInt(this.route.snapshot.queryParamMap.get('r'))

    this.receiver = await this.usersService.getById(this.receiverId)
    // this.messages = await this.messagesService.ListForSenderAndReceiver(this.senderId, this.receiverId)
    this.form = new FormGroup({
      content: new FormControl(undefined, [
        Validators.required
      ])
    })

    this.initSocket();
  }

  onClickSendMessage() {
    if(this.form.valid){
      const {content} = this.form.value
      const message: MessageInput = {
        senderId: this.senderId,
        receiverId: this.receiverId,
        content: content
      }

      this.socket.send(JSON.stringify({
        type: 'conversation.message.created',
        data: message
      }))
    }
  }

  private initSocket(): void {
    this.socket = new WebSocket(`ws://${environment.wsAddress}:${environment.wsPort}`);

    // Lorsque la connexion est ouverte
    this.socket.onopen = () => {
      console.info('WebSocket is connected.');
      // Envoie un message test juste après la connexion
    };

    // Lorsqu'un message est reçu du serveur
    this.socket.onmessage = (event) => {
      console.log('Message received: ', event.data);
    };

    this.socket.onerror = (event) => {
      console.error('Une erreur est survenue:', event)
    }

    this.socket.onclose = () => {
      //todo : desactiver l'input d'envoie de msg
    }
  }
}