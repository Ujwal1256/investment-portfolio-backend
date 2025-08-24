const Portfolio = require("../models/Portfolio");

// Create new portfolio
exports.createPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.create({
      user: req.user.id, 
      name: req.body.name,
      description: req.body.description
    });
    res.status(201).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all portfolios for logged-in user
exports.getPortfolios = async (req, res) => {
  try {
    const userId = req.query.user || req.user; 
    console.log("userId", userId);
    const portfolios = await Portfolio.find({ user: userId });
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
