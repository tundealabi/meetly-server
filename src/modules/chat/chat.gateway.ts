import { Logger, OnModuleInit } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SubscribeMessageDto } from './dtos';
import { ConfigService } from '@nestjs/config';

@WebSocketGateway({ cors: { origin: '*' }, transports: ['websocket'] })
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit
{
  constructor(private readonly configService: ConfigService) {}

  private logger = new Logger(ChatGateway.name);

  @WebSocketServer()
  server!: Server;

  @SubscribeMessage('tap')
  async tap(@ConnectedSocket() client: Socket) {}

  // @SubscribeMessage('messages')
  // async handleMessage(@MessageBody() dto: SubscribeMessageDto) {
  //   const newChat: {
  //     createdAt: string;
  //     id: string;
  //     senderUid: number;
  //     senderUsername: string;
  //     text: string;
  //   } = {
  //     createdAt: new Date().toISOString(),
  //     id: `${Date.now()}-${Math.floor(Math.random() * 100)}`,
  //     senderUid: dto.senderUid,
  //     senderUsername: dto.senderUsername,
  //     text: dto.message,
  //   };
  //   this.server.to(dto.room).emit('message', newChat);
  //   return dto;
  // }

  async handleConnection(client: Socket) {
    const { sockets } = this.server.sockets;

    const channel = client.handshake.headers['X-CHANNEL'];

    console.log('channel', channel);

    if (channel) {
      await client.join(channel);

      this.logger.log(`Client id: ${client.id} connected`);
      this.logger.debug(`Number of connected clients: ${sockets.size}`);
    }
  }

  async handleDisconnect(client: Socket) {
    const { sockets } = this.server.sockets;

    this.logger.log(`Client id:${client.id} disconnected`);
    this.logger.debug(`Number of connected clients remaining: ${sockets.size}`);
  }
  async onModuleInit() {
    console.log('HSJNVSNVN');
    console.log('this', this.server);
  }
}
