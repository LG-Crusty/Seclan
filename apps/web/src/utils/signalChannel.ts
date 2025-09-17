import { io, Socket } from "socket.io-client";

const main = process.env.WSSURL_1 as string;
const founder = process.env.WSSURL_2 as string;

export class messanger {
  private socket: Socket;

  constructor(connectionUrl: string) {
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
      const founderSocket = io(founder, {
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

const messangerService = new messanger(main);

export { messangerService };
