// import { createServer } from "node:http";
import { createServer } from "http";
import { app } from "./app.ts";
import { startSockerServer } from "./socket.server.ts";
import dotenv from "dotenv";
dotenv.config();

const server = createServer(app);

// app listening

const serverStarted = async () => {
  console.log(process.env.PORT);
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
