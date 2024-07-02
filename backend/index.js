const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/database");
const router = require("./routes");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const multer = require("multer");

const app = express();

// Configure CORS
app.use(
  cors({
    origin: "https://chirag-khaitan-ecommerce.vercel.app",
    credentials: true,
  })
);

// Increase payload size limit
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Use cookie parser
app.use(cookieParser());

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Use router
app.use("/api", upload.single("ProfilePic"), router);


const PORT = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at Port ${PORT}`);
  });
});
