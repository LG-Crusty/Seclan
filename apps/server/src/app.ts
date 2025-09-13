import express, { urlencoded } from "express";
import cors from "cors";
import { errorMiddleware } from "../src/middlewares/errormiddlewares.ts";
import { router } from "./routes/routes.ts";
const app = express();

//cors setup
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

//let you send
app.use(
  express.json({
    limit: "100kb",
  })
);

// let you send complex data into the url too
app.use(
  urlencoded({
    limit: "100kb",
    extended: true,
  })
);

app.use(express.static("./public/temp"));

//adding router
app.use("/app/v1", router);
app.post("/random", (req, res) => {
  const data = req.body;
  res.json(data);
});

app.use(errorMiddleware);

export { app };
