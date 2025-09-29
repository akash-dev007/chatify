const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const {app,server} = require('./socket')
const port = 3000;
require("dotenv").config();
const cookieParser = require("cookie-parser");
const allRoutes = require('./src/routers/index')

app.use(cors({
  origin: "http://localhost:5173",
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  // allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
// Middleware to parse JSON bodies
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true,limit:'10mb' }));

// user router
app.use(allRoutes);
// Sample route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start the server and connect to the database

mongoose
  .connect(
    "mongodb+srv://akash102dev:akash007@cluster0.au0jok9.mongodb.net/test?retryWrites=true&w=majority",
    { dbName: "CHAT_APP_3" }
  )
  .then(() => {
    console.log("Database connected");
    server.listen(3000, () => {
      console.log(`Server is running`);
    });
  });

 