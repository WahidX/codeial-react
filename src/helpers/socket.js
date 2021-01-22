import io from 'socket.io-client';
import { APIurls } from './urls';
import { ChatBox } from '../components';

export default class Socket {
  constructor(uid) {
    this.token = localStorage.getItem('token');
    this.socket = io(APIurls.getEndPoint(), {
      query: {
        token: this.token,
        uid,
      },
    }); // connected

    console.log('connected');
    // this.socket.emit('init', { uid });

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

  closeSocket() {
    console.log('disconnected');
    this.socket.close();
  }
}

let socket;

export function getSocket(uid) {
  if (!socket || socket.token !== localStorage.getItem('token')) {
    console.log('registered new socket.');
    socket = new Socket(uid);
  }
  return socket;
}
