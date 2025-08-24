const express = require("express");
const router = express.Router();
const { addAsset, getAssetsByPortfolio, updateAsset, deleteAsset } = require("../controllers/assetController");
const { protect } = require("../middleware/auth");

router.post("/", protect, addAsset);                  
router.get("/:portfolioId", protect, getAssetsByPortfolio); 
router.put("/:id", protect, updateAsset);             
router.delete("/:id", protect, deleteAsset);         

module.exports = router;
