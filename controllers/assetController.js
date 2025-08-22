const Asset = require("../models/Asset");
const Portfolio = require("../models/Portfolio");

// Add asset to a portfolio
exports.addAsset = async (req, res) => {
  try {
    const { portfolioId, type, name, quantity, purchasePrice, currentPrice } = req.body;

    // Check if portfolio exists
    const portfolio = await Portfolio.findById(portfolioId);
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    const existingAsset = await Asset.findOne({ portfolio: portfolioId, name });
    if (existingAsset) {
      return res.status(400).json({ message: "Asset already exists in this portfolio" });
    }

    const asset = await Asset.create({
      portfolio: portfolioId,
      type,
      name,
      quantity,
      purchasePrice,
      currentPrice: currentPrice || 0
    });

    res.status(201).json({
      message: "Asset added successfully",
      asset
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get assets by portfolio
exports.getAssetsByPortfolio = async (req, res) => {
  try {
    const { portfolioId } = req.params;

    // Check if portfolio exists
    const portfolio = await Portfolio.findById(portfolioId);
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    const assets = await Asset.find({ portfolio: portfolioId });
    res.json({
      message: "Assets fetched successfully",
      assets
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
