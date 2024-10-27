import { Router } from "express";
import {
  ReadUsers,
  CreateUser,
  UpdateUser,
  DeleteUser,
} from "../controllers/user.controllers.js";

const router = Router();

//Routes definition
router.get("/user", ReadUsers);
router.post("/user", CreateUser);
router.put("/user/:id", UpdateUser);
router.delete("/user/:id", DeleteUser);

// Export routes
export default router;
