// import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';

// @WebSocketGateway()
// export class SocketGateway {
//   @WebSocketServer()
//   private server: Server

//   handleConnection(client: Socket, ...args: any[]) {
//     console.log('Client connected', client.id);
//   }

//   handleDisconnect(client: Socket) {
//     console.log('Client disconnected', client.id);
//   }

//   @SubscribeMessage('message')
//   handleMessage(client: any, payload: any): string {
//     console.log(client.id, payload);
//     this.server.emit('message', {
//       id: client.id,
//       message: payload.message,
//     });
//     return 'Hello world!';
//   }
// }

import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } }) 
export class SocketGateway {
  @WebSocketServer()
  private server: Server;

  sendOrderNotification(productOwnerId: number, message: string) {
    this.server.emit(`order-notification-${productOwnerId}`, { message });
  }
}
