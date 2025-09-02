const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const hpp = require("hpp");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const compression = require("compression");

const userRouter = require("./routes/userRoutes");
const menuItemRouter = require("./routes/menuItemRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const orderRouter = require("./routes/orderRoutes");
const heroRoutes = require("./routes/heroRoutes");
const authRoutes = require("./routes/authRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const rateRoutes = require("./routes/rateRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();

// Enable CORS before your routes
app.use(cors());

app.set("trust proxy", 1);

// Set security HTTP headers
app.use(helmet());

//Rate Limiting (Prevent Brute Force & DDoS)**
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later.",
  headers: true,
});

app.use("/api", limiter); // Apply rate limiting to API routes

//Request Size Limiting (Prevent Payload Attacks)**
app.use(express.json({ limit: "10kb" })); // Limit body size

//Prevent Parameter Pollution**
app.use(hpp());

//Prevent NoSQL Injection & XSS Attacks**
app.use(mongoSanitize());
app.use(xss());

//Compression (Reduce Response Size)**
app.use(compression());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

// // Serve uploaded files
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/v1/users", userRouter); // Used for getting next id for each entity
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/items", menuItemRouter);
app.use("/api/v1/about", aboutRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/hero", heroRoutes);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/ratings", rateRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({
    status: "fail",
    message: "Internal Server Error",
  });
});
// console.log(listEndpoints(app));
module.exports = app;
