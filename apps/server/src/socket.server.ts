import { server } from "./index.ts";
import { Server } from "socket.io";

const neededIP: string[] = [];
const startSockerServer = () => {
  const io = new Server(server, {
    cors: {
      origin: "*", // or your frontend URL
      methods: ["GET", "POST"],
    },
  });

  //socket connection setup
  io.on("message", (socket) => {
    socket.on("chat message", (msg: string) => {
      console.log("message :" + msg);
    });

    socket.emit("message", "hi there"); // fix: devices: to devices
  });

  //creating custom namespaces

  //for gaining ip4 Address
  const founder = io.of("/founder");
  founder.on("connection", (socket) => {
    console.log("connection established");

    socket.on("main_message", (message: any) => {
      console.log(message);
      const ipv4Regex: RegExp =
       /\b(?:\d{1,3}\.){3}\d{1,3}\b/

      const ip4Address = message.message.candidate.match(ipv4Regex);
      if (ip4Address) {
        console.log(ip4Address[0]);
      }
      if (message) {
        socket.emit("data found", "data found successfully");
      }
    });
  });
};

export { startSockerServer };
