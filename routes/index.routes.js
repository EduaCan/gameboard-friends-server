const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

//Rutas de autentificacion
const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)

//Rutas de la Api
const gameRoutes = require("./game.routes")
router.use("/game", gameRoutes)

//Rutas de eventos
const eventRoutes = require("./event.routes")
router.use("/event", eventRoutes)

//Rutas de commentarios
const commentRoutes = require("./comment.routes")
router.use("/comment", commentRoutes)

//Rutas de usuario
const userRoutes = require("./user.routes")
router.use("/user", userRoutes)

module.exports = router;
