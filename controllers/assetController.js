const Asset = require("../models/Asset");
const Portfolio = require("../models/Portfolio");

// ✅ Add asset to a portfolio
exports.addAsset = async (req, res) => {
  try {
    const { portfolio, type, name, quantity, purchasePrice, currentPrice } = req.body;

    // Check if portfolio exists
    const selectedPortfolio = await Portfolio.findById(portfolio);
    if (!selectedPortfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    const existingAsset = await Asset.findOne({ portfolio: selectedPortfolio._id, name });
    if (existingAsset) {
      return res.status(400).json({ message: "Asset already exists in this portfolio" });
    }

    const asset = await Asset.create({
      portfolio: selectedPortfolio._id,
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

// ✅ Get assets by portfolio
exports.getAssetsByPortfolio = async (req, res) => {
  try {
    const { portfolioId } = req.params;

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

// ✅ Update asset
exports.updateAsset = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    console.log(id);
    const asset = await Asset.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    res.json({
      message: "Asset updated successfully",
      asset,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete asset
exports.deleteAsset = async (req, res) => {
  try {
    const { id } = req.params;

    const asset = await Asset.findByIdAndDelete(id);

    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    res.json({ message: "Asset deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
