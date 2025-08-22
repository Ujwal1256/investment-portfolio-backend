const express = require("express");
const router = express.Router();
const { addAsset, getAssetsByPortfolio } = require("../controllers/assetController");
const { protect } = require("../middleware/auth");

router.post("/", protect, addAsset);
router.get("/:portfolioId", protect, getAssetsByPortfolio);

module.exports = router;
