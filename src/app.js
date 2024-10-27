import express from "express";
import userRoutes from "./routes/user.routes.js";

//Initialize app
const app = express();
const PORT = 3001;

//Settings
app.set("port", PORT);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use(userRoutes);

export default app;
