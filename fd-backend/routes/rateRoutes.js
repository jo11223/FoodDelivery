// import express from "express";
// import {
//   addOrUpdateRating,
//   getRatingsForMenuItem,
//   getMyRatings,
//   deleteRating
// } from "../controllers/rateController.js";
// import { protect } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.post("/", protect, addOrUpdateRating);
// router.get("/menu-item/:id", getRatingsForMenuItem);
// router.get("/my", protect, getMyRatings);
// router.delete("/:id", protect, deleteRating);

// export default router;
// //

// rateRoutes.js
const express = require("express");
const {
  updateRating,
  getRatingsForMenuItem,
  getMyRatings,
  deleteRating,
} = require("../controllers/rateController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", updateRating);
router.get("/menu-item/:id", getRatingsForMenuItem);
router.get("/my", protect, getMyRatings);
router.delete("/:id", deleteRating);

module.exports = router;
