const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)

const gameRoutes = require("./game.routes")
router.use("/game", gameRoutes)

module.exports = router;
