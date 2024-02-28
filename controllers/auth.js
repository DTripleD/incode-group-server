// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import Dashboard from "../models/user.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

import { v4 as uuidv4 } from "uuid";

dotenv.config();

const { SECRET_KEY } = process.env;

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

    const initialData = [
      {
        id: "1",
        title:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent.",
        description: "25-May-2020",
      },
      {
        id: "2",
        title: "Fix Styling",
        description: "26-May-2020",
      },
    ];

    const newDashboard = new Dashboard({
      title,
      boards: {
        toDo: {
          title: "To Do",
          items: initialData,
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

    const toDoBoard = dashboard.boards.toDo; // Используем точечную нотацию

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

export default {
  getDashboards: ctrlWrapper(getDashboards),
  createDashboard: ctrlWrapper(createDashboard),
  addDataToBoard: ctrlWrapper(addDataToBoard),
};
