import { Router } from "express";
import { singIn, singUp } from "../controllers/auth.controller.js";
import {
  checkDuplicateUserOrEmail,
  checkRolesExisted,
} from "../middlewares/verifySignUp.js";

const router = Router();

router.post("/singup", [checkDuplicateUserOrEmail, checkRolesExisted], singUp);
router.post("/singin", singIn);

export default router;
