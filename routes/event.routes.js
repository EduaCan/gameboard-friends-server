const router = require("express").Router()
const isAuthenticated = require("../middlewares/auth.middlewares");
const User = require("../models/User.model");
const Event = require("../models/Event.model");



// POST "/api/event/:game" => crear un evento y agragar a la BD
router.post("/:game", isAuthenticated, async (req, res, next) => {
    const { location } = req.body
    const {game} = req.params
    const userCreator = await User.findOne({username : req.payload.username})

    const newEvent = {
        location: location,
        players: [userCreator._id],
        game: game
    }
    console.log("location",location,"game",game)
    await Event.create(newEvent)
    res.status(200).json("Event created successfuly")

})








module.exports = router;