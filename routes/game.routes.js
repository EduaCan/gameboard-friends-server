const router = require("express").Router();
const axios = require("axios");

// GET "/api/game" => recibir la lista de juegos de la API
router.get("/", async (req, res, next) => {
  try {
    const response = await axios.get(
      `https://api.boardgameatlas.com/api/search?order_by=rank&ascending=false&client_id=${process.env.CLIENT_ID}`
    );

    res.status(200).json(response.data.games);
  } catch (error) {
    next(error);
  }
});

// GET "/api/game/:gameid" => recibir uno o mas juegos de la API
router.get("/:gameid", async (req, res, next) => {
  const { gameid } = req.params;

  try {
    const response = await axios.get(
      `https://api.boardgameatlas.com/api/search?ids=${gameid}&client_id=${process.env.CLIENT_ID}`
    );

    res.status(200).json(response.data.games);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
