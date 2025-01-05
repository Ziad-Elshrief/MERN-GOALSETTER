const express = require("express");
const path = require("path");
const cors = require("cors");
const port = process.env.PORT | 5000;
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const bp = require("body-parser");

connectDB();
const app = express();

let corsOptions = {
  origin: [process.env.FRONTEND_DEV_URL],
};

app.use(cors(corsOptions));

app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "dist", "index.html")
    )
  );
} else {
  app.get("/", (req, res) =>
    res.send("Please convert to production enviroment")
  );
}
app.use(errorHandler);
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
