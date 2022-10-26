const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

//Settings
dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT;
const urlRouter = require("./routes/url.js");
const indexRouter = require("./routes/index.js");

//Routes
app.use("/", indexRouter);
app.use("/url", urlRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port: ${PORT}`);

  mongoose
    .connect(process.env.DB_CONNECTION_STRING)
    .then(() => console.log("Connected to Database"))
    .catch((error) => console.log(error));
});
