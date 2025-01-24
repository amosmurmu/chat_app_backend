import createError from "http-errors";
import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import path from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config();

const PORT = process.env.PORT || 3000;
// console.log(__dirname);
// view engine setup
app.set("views", join(__dirname, "src/views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist/")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.use(express.json());
server.listen(PORT, () => {
  connectDB();
  console.log("server is running on PORT : " + PORT);
});

export default app;
