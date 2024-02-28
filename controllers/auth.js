// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import Dashboard from "../models/user.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

dotenv.config();

const { SECRET_KEY } = process.env;

const accessTokenExpires = "24h";

const getDashboards = async (req, res) => {
  try {
    const dashboards = await Dashboard.find();

    res.json({ dashboards });

    console.log(dashboards);
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
      boards: [],
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
    const { dashboardId, boardId, newData } = req.body;

    // Находим дашборд по ID
    const dashboard = await Dashboard.findById(dashboardId);

    if (!dashboard) {
      return res.status(404).json({ error: "Dashboard not found" });
    }

    // Находим board по ID
    const board = dashboard.boards.find((board) => board.id === boardId);

    console.log(dashboard);

    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }

    newData.nameOfBoard = "To Do";

    board.data.push(newData);

    await dashboard.save();

    res.status(200).json({ dashboard });
  } catch (error) {
    console.error("Error adding data to board:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default {
  signUp: ctrlWrapper(signUp),
  signIn: ctrlWrapper(signIn),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  logoutUser: ctrlWrapper(logoutUser),
  getDashboards: ctrlWrapper(getDashboards),
  createDashboard: ctrlWrapper(createDashboard),
  addDataToBoard: ctrlWrapper(addDataToBoard),
};
