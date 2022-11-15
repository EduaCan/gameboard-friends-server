const router = require("express").Router();
const isAuthenticated = require("../middlewares/auth.middlewares");
const User = require("../models/User.model");

// PATCH "/user/game/:gameid" => Añadir un game a favoritos
router.patch("/game/:gameid", isAuthenticated, async (req, res, next) => {
  const { gameid } = req.params;
  try {
    await User.findByIdAndUpdate(req.payload._id, {
      $addToSet: { favGames: gameid },
    });
    res.status(200).json("Game added to Favorites");
  } catch (error) {
    next(error);
  }
});

// GET "/user/favorites/" => Recibir la lista de juegos favoritos
router.get("/favorites", isAuthenticated, async (req, res, next) => {
  try {
    const response = await User.findById(req.payload._id).select("favGames");
    res.status(200).json(response.favGames);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
