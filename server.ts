let app = require("./app.ts");
let mongoose = require("mongoose");
let dotenv = require("dotenv");

mongoose.set("strictQuery", true);

dotenv.config();

const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(8000, () => {
      console.log("Database connection successful");
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
