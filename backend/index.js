require("dotenv").config();
const express = require("express");
const app = express();
const connectApp = require("./database/db.js");
const cors=require('cors')
const routes = require("./routes/index")

app.use(express.json());
app.use(cors())
app.use(routes)





connectApp(app);