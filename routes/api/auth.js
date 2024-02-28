import express from "express";

import { registerSchema, loginSchema } from "../../shemas/user.js";

import validateBody from "../../middlewares/validateBody.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";
import authenticate from "../../middlewares/authenticate.js";

import controllers from "../../controllers/auth.js";

const router = express.Router();

router.post(
  "/signup",
  isEmptyBody,
  validateBody(registerSchema),
  controllers.signUp
);

router.post(
  "/signin",
  isEmptyBody,
  validateBody(loginSchema),
  controllers.signIn
);

router.get("/current", authenticate, controllers.getCurrentUser);

router.post("/logout", authenticate, controllers.logoutUser);

router.get("/dashboard", controllers.getDashboards);

router.post("/dashboard", controllers.createDashboard);

router.post("/dashboard/addDataToBoard", controllers.addDataToBoard);

export default router;
