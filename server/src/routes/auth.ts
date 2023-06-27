import express from "express";
import { login, register, updateUser } from "../controllers/auth.js";
import { authenticateUser } from "../middleware/authentication.js";
import { testUserLimitations } from "../middleware/testUser.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.patch("/updateUser", authenticateUser, testUserLimitations, updateUser);

export default router;
