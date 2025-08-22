const express = require("express");
const router = express.Router();
const { createPortfolio, getPortfolios } = require("../controllers/portfolioController");
const { protect } = require("../middleware/auth"); 

router.post("/", protect, createPortfolio);
router.get("/", protect, getPortfolios);

module.exports = router;
