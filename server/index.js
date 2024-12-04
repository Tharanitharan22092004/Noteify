const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const noteRouter = require("./routes/note");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/note", noteRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
