// import { createServer } from "node:http";
import {createServer} from "http"
import { app } from "./app.ts";
import { startSockerServer } from "./socket.server.ts";
import "../src/dns/dns.ts";
import "../src/services/udpSocket.ts";



const server = createServer(app);

// app listening

const serverStarted = async() => {  
  server.listen(process.env.PORT, () => {
    // here the server getting listend
    console.log(`App is listening on the port : ${process.env.PORT}`);

    // start the socket server
    startSockerServer();
  });

  server.on("error", (err) => {});
};

serverStarted();

export { server };




















// import { createServer } from "node:http";
// import { app } from "./app";
// import {Server} from "socket.io";
// import { Devices } from "./dns/dns.ts";

// const server = createServer(app);
// const port = process.env.PORT

// server.listen(port, () => {
//   console.log(`Server is listening on port: ${port}`);
// });

// const io = new Server(server, {
//   cors: {
//     origin: process.env.CORS_ORIGIN, // or the frontend url
//     methods: ["GET", "POST"]
//   }
// });

// io.on("connection", (socket) => {
//   console.log(`Socket connected: ${socket.id}`);
//   socket.emit("devices", Devices);

//   socket.on("disconnected", () => {
//     console.log(`Socket disconnected: ${socket.id}`);
//   });
// });

// console.log("Socket server is ready!");
