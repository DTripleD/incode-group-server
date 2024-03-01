let controllers = require("../../controllers/todo.ts");

let express = require("express");

const router = express.Router();

router.get("/dashboard", controllers.getDashboards);

router.post("/dashboard", controllers.createDashboard);

router.post("/dashboard/addDataToBoard", controllers.addDataToBoard);

router.delete("/dashboard/deleteItem", controllers.deleteItem);

router.get("/dashboard/:dashboardId", controllers.getDashboardById);

router.post("/dashboard/updateBoards", controllers.updateBoards);

router.delete("/dashboard/:dashboardId", controllers.deleteDashboard);

router.put("/dashboard", controllers.updateDashboardTitle);

router.put("/dashboard/updateItemTitle", controllers.updateItemTitle);

module.exports = router;
