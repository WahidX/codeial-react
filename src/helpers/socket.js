import io from 'socket.io-client';
import { APIurls } from './urls';

export default class Socket {
  constructor(uid) {
    this.socket = io(APIurls.getEndPoint(), {
      query: {
        token: localStorage.getItem('token'),
      },
    }); // connected

    console.log('connected');
    this.socket.emit('init', { uid });

    this.socket.on('connect', () => {
      console.log('connected, SocketID: ', this.socket.id);
    });

    // this.socket.on('online', (uid) => {
    //   console.log('uid came online: ', uid);
    // });
  }

  // emitEvent(event, args) {
  //   this.socket.emit(event, args);
  // }

  closeSocket(uid) {
    console.log('disconnected');
    this.socket.close();
  }
}

let socket;

export function getSocket(uid) {
  if (!socket) {
    socket = new Socket(uid);
  }
  return socket;
}
