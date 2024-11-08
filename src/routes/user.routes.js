import { Router } from "express";
import {
  ReadUsers,
  CreateUser,
  UpdateUser,
  DeleteUser,
  Login,
} from "../controllers/user.controllers.js";

const router = Router();

//User routes definition
router.get("/user", ReadUsers);
router.post("/user", CreateUser);
router.put("/user/:id", UpdateUser);
router.delete("/user/:id", DeleteUser);
router.post("/login", Login);

// router.get("/", (req, res, next) => {
//   console.log("Authenticated");
//   res.render("index", { title: "Express", session: req.session });
//   next();
// });

// Export routes
export default router;
