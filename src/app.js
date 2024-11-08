import express from "express";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";

//Initialize app
export const app = express();
const port = process.env.SYSTEM_PORT;
const server = process.env.SYSTEM_SERVER;

//Settings
app.set("port", parseInt(port));

//Middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", server);
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong" });
});
app.use(cors({ origin: "*", optionSuccessStatus: 200 }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use(userRoutes);
