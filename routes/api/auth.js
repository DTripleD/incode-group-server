import express from "express";

import controllers from "../../controllers/auth.js";

const router = express.Router();

router.get("/dashboard", controllers.getDashboards);

router.post("/dashboard", controllers.createDashboard);

router.post("/dashboard/addDataToBoard", controllers.addDataToBoard);

router.get("/dashboard/:dashboardId", controllers.getDashboardById);

router.post("/dashboard/updateBoards", controllers.updateBoards);

router.delete("/dashboard", controllers.deleteDashboard);

router.put("/dashboard", controllers.updateDashboardTitle);

export default router;
