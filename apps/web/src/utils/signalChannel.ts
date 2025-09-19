import { io, Socket } from "socket.io-client";


export class messanger {
  private socket: Socket;

  constructor(connectionUrl: any) {
    this.socket = io(connectionUrl, {
      transports: ["websocket"],
    });
       console.log(this.socket.id)
    this.socket.emit("handshake", "hello socket")
    this.socket.on("handshake", (message)=>{
      console.log( "handshake message :" + message )
    })
  }

  // checking 
  connect() {
   
    if (this.socket.id){
      return { message: " socket is connected" };
    }
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
        resolve(message);
      });

      //for error handling
      founderSocket.on("message", (err) => {
        reject(err);
      });
    });
  }
}

const messangerService = new messanger(process.env.NEXT_PUBLIC_WSSURL_1);

export { messangerService };
