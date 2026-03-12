const router = require("express").Router();
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

// Get watchlist
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user.watchlist || []);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Add to watchlist
router.post("/", auth, async (req, res) => {
  try {
    const { movieId } = req.body;
    const user = await User.findById(req.userId);

    // Check if already in watchlist
    const exists = user.watchlist.some((item) => item.movieId === movieId);
    if (exists) {
      return res.status(400).json({ error: "Already in watchlist" });
    }

    user.watchlist.push({ movieId });
    await user.save();
    res.json(user.watchlist);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Remove from watchlist
router.delete("/:movieId", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.watchlist = user.watchlist.filter(
      (item) => item.movieId !== req.params.movieId
    );
    await user.save();
    res.json(user.watchlist);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
