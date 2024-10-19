import express from "express";
import { ReadUsers } from "./src/controllers/userControllers.js";

const app = express();
const PORT = 3001;

app.get("/user", async (req, res) => {
  try {
    const user = await ReadUsers();
    res.json(user);
  } catch (err) {
    res.status(500).send("Error to get users");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
