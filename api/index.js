const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
// routes
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const moviesRoutes = require("./routes/movies");
const listsRoutes = require("./routes/lists");

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/movies", moviesRoutes);
app.use("/api/lists", listsRoutes);

app.listen(8800, () => {
  console.log("server running on port 8800");
});
