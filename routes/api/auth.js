import express from "express";

import validateBody from "../../middlewares/validateBody.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";
import authenticate from "../../middlewares/authenticate.js";

import controllers from "../../controllers/auth.js";

const router = express.Router();

router.get("/dashboard", controllers.getDashboards);

router.post("/dashboard", controllers.createDashboard);

router.post("/dashboard/addDataToBoard", controllers.addDataToBoard);

router.get("/dashboard/:dashboardId", controllers.getDashboardById);

export default router;
