export interface MessageHttp {
    id: number
    sender: { id: number }
    receiver: { id: number }
    content: string
    sentDate: string
}

export interface Message {
    id: number
    sender: { id: number }
    receiver: { id: number }
    content: string
    sentDate: string
}

export namespace Message {
    export function fromHttp(messageHttp: MessageHttp): Message{
        return {
            id: messageHttp.id,
            sender: messageHttp.sender,
            receiver: messageHttp.receiver,
            content: messageHttp.content,
            sentDate: messageHttp.sentDate
        }
    }
}

export interface MessageInput {
    senderId: number
    receiverId: number
    content: string
}