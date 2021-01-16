import io from 'socket.io-client';

export default class Socket {
  constructor(uid) {
    // need uid
    this.ENDPOINT = 'localhost:5000';
    this.socket = io(this.ENDPOINT); // connected

    console.log('connected');
    this.socket.emit('init', { uid });

    this.socket.on('connect', () => {
      console.log('connected, SocketID: ', this.socket.id);
    });

    // this.socket.on('online', (uid) => {
    //   console.log('uid came online: ', uid);
    // });
  }

  closeSocket(uid) {
    console.log('disconnected');
    this.socket.close();
  }
}
