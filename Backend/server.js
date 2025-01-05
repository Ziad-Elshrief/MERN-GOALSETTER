const express = require("express");
const cors = require('cors')
const port =process.env.PORT |  5000;
const {errorHandler} = require("./middleware/errorMiddleware")
const connectDB = require('./config/db')
const bp = require('body-parser')

connectDB()
const app = express();

let corsOptions = {
  origin : ['http://localhost:5173'],
}

app.use(cors(corsOptions))

app.use(bp.json())
app.use(bp.urlencoded({ extended: false }))
app.use(errorHandler)
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
