const dotenv = require("dotenv");
const Dashboard = require("../models/todo.ts");
const ctrlWrapper = require("../helpers/ctrlWrapper.ts");
const { v4: uuidv4 } = require("uuid");

dotenv.config();

const getDashboards = async (req, res) => {
  try {
    const dashboards = await Dashboard.find();

    res.json({ dashboards });
  } catch (error) {
    console.error("Error fetching dashboards:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createDashboard = async (req, res) => {
  try {
    const { title } = req.body;

    const newDashboard = new Dashboard({
      title,
      boards: {
        toDo: {
          title: "To Do",
          items: [],
          id: uuidv4(),
        },
        inProgress: {
          title: "In Progress",
          items: [],
          id: uuidv4(),
        },
        done: {
          title: "Done",
          items: [],
          id: uuidv4(),
        },
      },
    });

    const savedDashboard = await newDashboard.save();

    res.status(201).json({ dashboard: savedDashboard });
  } catch (error) {
    console.error("Error creating dashboard:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addDataToBoard = async (req, res) => {
  try {
    const { dashboardId, newData } = req.body;

    const dashboard = await Dashboard.findById(dashboardId);

    if (!dashboard) {
      return res.status(404).json({ error: "Dashboard not found" });
    }

    const toDoBoard = dashboard.boards.toDo;

    if (!toDoBoard) {
      return res.status(404).json({ error: "ToDo Board not found" });
    }

    newData.id = uuidv4();

    toDoBoard.items.push(newData);

    await dashboard.save();

    res.status(200).json({ dashboard });
  } catch (error) {
    console.error("Error adding data to ToDo board:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getDashboardById = async (req, res) => {
  try {
    const { dashboardId } = req.params;

    const dashboard = await Dashboard.findById(dashboardId);

    if (!dashboard) {
      return res.status(404).json({ error: "Dashboard not found" });
    }

    res.status(200).json({ dashboard });
  } catch (error) {
    console.error("Error fetching dashboard by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateBoards = async (req, res) => {
  try {
    const { dashboardId, newBoards } = req.body;

    const dashboard = await Dashboard.findById(dashboardId);

    if (!dashboard) {
      return res.status(404).json({ error: "Dashboard not found" });
    }

    dashboard.boards = newBoards;

    const updatedDashboard = await dashboard.save();

    res.status(200).json({ dashboard: updatedDashboard });
  } catch (error) {
    console.error("Error updating boards:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteDashboard = async (req, res) => {
  try {
    const { dashboardId } = req.params;

    const deletedDashboard = await Dashboard.findByIdAndDelete(dashboardId);

    if (!deletedDashboard) {
      return res.status(404).json({ error: "Dashboard not found" });
    }

    res.status(200).json({ message: "Dashboard deleted successfully" });
  } catch (error) {
    console.error("Error deleting dashboard:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateDashboardTitle = async (req, res) => {
  try {
    const { newTitle, dashboardId } = req.body;

    const dashboard = await Dashboard.findByIdAndUpdate(
      dashboardId,
      { $set: { title: newTitle } },
      { new: true }
    );

    if (!dashboard) {
      return res.status(404).json({ error: "Dashboard not found" });
    }

    res.status(200).json({ dashboard });
  } catch (error) {
    console.error("Error updating dashboard title:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateItemTitle = async (req, res) => {
  try {
    const { dashboardId, itemId, newTitle, newDescription } = req.body;

    const dashboard = await Dashboard.findById(dashboardId);

    if (!dashboard) {
      return res.status(404).json({ error: "Dashboard not found" });
    }

    for (const boardId of Object.keys(dashboard.boards)) {
      const board = dashboard.boards[boardId];
      const itemIndex = board.items.findIndex(
        (item) => item._id.toString() === itemId
      );

      if (itemIndex !== -1) {
        board.items[itemIndex].title = newTitle;
        board.items[itemIndex].description = newDescription;

        await dashboard.save();

        return res.status(200).json({ dashboard });
      }
    }

    return res.status(404).json({ error: "Item not found" });
  } catch (error) {
    console.error("Error updating item title:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { dashboardId, itemId } = req.body;

    console.log(dashboardId);

    const dashboard = await Dashboard.findById(dashboardId);

    console.log(Dashboard);

    if (!dashboard) {
      return res.status(404).json({ error: "Dashboard not found" });
    }

    for (const boardId of Object.keys(dashboard.boards)) {
      const board = dashboard.boards[boardId];
      const itemIndex = board.items.findIndex(
        (item) => item._id.toString() === itemId
      );

      if (itemIndex !== -1) {
        board.items.splice(itemIndex, 1);

        await dashboard.save();

        return res.status(200).json({ dashboard });
      }
    }

    return res.status(404).json({ error: "Item not found" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getDashboards: ctrlWrapper(getDashboards),
  createDashboard: ctrlWrapper(createDashboard),
  addDataToBoard: ctrlWrapper(addDataToBoard),
  getDashboardById: ctrlWrapper(getDashboardById),
  updateBoards: ctrlWrapper(updateBoards),
  deleteDashboard: ctrlWrapper(deleteDashboard),
  updateDashboardTitle: ctrlWrapper(updateDashboardTitle),
  updateItemTitle: ctrlWrapper(updateItemTitle),
  deleteItem: ctrlWrapper(deleteItem),
};
