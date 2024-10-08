const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const app = express();
const color = require("colors");
connectDB();
const userRoute = require("./routes/User");
const bodyparser = require("body-parser");

const Port = process.env.Port;

app.use(bodyparser.json());
app.use(cors());
app.use("/User", userRoute);
// app.use("/Content", contentRoute);
app.listen(Port, () => console.log(`Server running on port ${Port}`.red));
