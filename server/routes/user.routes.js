import { Router } from "express";
import { createUser } from "../controllers/user.controller.js";
import { isAdmin, verifyToken } from "../middlewares/authjwt.js";
import { checkRolesExisted} from "../middlewares/verifySignUp.js";

const router = Router();

router.post("/user", [verifyToken, isAdmin, checkRolesExisted, createUser]);

export default router;
