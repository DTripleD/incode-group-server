import { Schema, model } from "mongoose";

import handleMongooseError from "../helpers/handleMongooseError.js";

import emailRegexp from "../helpers/regExp.js";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegexp,
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    accessToken: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

const boardSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  nameOfBoard: {
    type: String,
    required: true,
    default: "To Do", // Задаем значение по умолчанию
  },
  data: [
    {
      id: String,
      title: String,
      description: String,
    },
  ],
});

const dashboardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  boards: [boardSchema],
});

const Dashboard = model("Dashboard", dashboardSchema);

export default Dashboard;

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

// export default User;
