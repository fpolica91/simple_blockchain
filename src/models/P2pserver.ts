/* eslint-disable no-console */
import WebSocket from 'ws';

import BlockChain from './Blockchain';

const P2P_PORT = Number(process.env.P2P_PORT) || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

export default class P2pserver {
  blockchain: BlockChain;

  sockets: any[];

  constructor(blockchain: BlockChain) {
    this.blockchain = blockchain;
    this.sockets = [];
  }

  public listen(): void {
    const server = new WebSocket.Server({ port: P2P_PORT });
    server.on('connection', socket => this.connectSocket(socket));
    this.connectToPeers();
    console.log(`Listening for peer to peer connection on port : ${P2P_PORT}`);
  }

  public connectSocket(socket: any): void {
    console.info('Socket connected');
    // push the socket too the socket array
    this.sockets.push(socket);

    // register message event listener to the socket
    this.messageHandler(socket);
    // on new connection send the blockchain chain to the peer
    this.sendChain(socket);
  }

  public connectToPeers(): void {
    peers.forEach(peer => {
      const socket = new WebSocket(peer);
      socket.on('open', () => this.connectSocket(socket));
    });
  }

  sendChain(socket: any): void {
    socket.send(JSON.stringify(this.blockchain.chain));
  }

  syncChain(): void {
    this.sockets.forEach(socket => {
      this.sendChain(socket);
    });
  }

  public messageHandler(socket: any): void {
    socket.on('message', (message: any) => {
      const data = JSON.parse(message);
      console.log(data);
      this.blockchain.replaceChain(data);
    });
  }
}
