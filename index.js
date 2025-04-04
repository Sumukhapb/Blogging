const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
require("dotenv").config();

const cookiePaser = require("cookie-parser");
const { checkForAuthentication } = require("./middlewares/authentication");

const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");

const app = express();
const PORT = process.env.PORT

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookiePaser());
app.use(checkForAuthentication("token"));
app.use(express.static(path.resolve("./public")));

app.get("/", async (req, res) => {
  const allBlog = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlog,
  });
});

app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
