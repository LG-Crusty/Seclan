import { io, Socket } from "socket.io-client";


console.log(process.env.NEXT_PUBLIC_WSSURL_1 )
console.log(process.env.NEXT_PUBLIC_WSSURL_2)


export class messanger {
  private socket: Socket;

  constructor(connectionUrl: any) {
    this.socket = io(connectionUrl, {
      transports: ["websocket"],
    });
    this.socket.on("connect", () => {
      console.log(`connected to the server : ${this.socket.id}`);
      this.socket.emit("hello", "klpd hello world");
    });
  }

  // manual connector
  connect() {
    return { message: " socket is connected" };
  }

  disconnect() {
    this.socket.disconnect();
    return "socket is disconnected";
  }

  //  emit events
  shareVal(message: any) {
    return new Promise((resolve, reject) => {
      // call the particular endpoint
      const founderSocket = io(process.env.NEXT_PUBLIC_WSSURL_2, {
        transports: ["websocket"],
      });

      //  for sending the message
      founderSocket.emit("main_message", {
        message: message,
      });

      // for recieving the message
      founderSocket.on("main_message", (message) => {
        console.log(message);
        resolve(message);
      });

      //for error handling
      founderSocket.on("connect_error", (err) => {
        reject(err);
      });
    });
  }
}

const messangerService = new messanger(process.env.NEXT_PUBLIC_WSSURL_1);

export { messangerService };
