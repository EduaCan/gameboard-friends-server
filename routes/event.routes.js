const router = require("express").Router()
const isAuthenticated = require("../middlewares/auth.middlewares");
const User = require("../models/User.model");
const Event = require("../models/Event.model");



// POST "/api/event/:gameid" => crear un evento y agregar a la BD
router.post("/:gameid", isAuthenticated, async (req, res, next) => {
    const { location } = req.body
    const {gameid} = req.params
    
    try {
        const userCreator = await User.findOne({username : req.payload.username})
        
        const newEvent = {
            location: location,
            players: [userCreator._id],
            game: gameid
        }

        await Event.create(newEvent)
        res.status(200).json("Event created successfuly")
    } catch (error) {
        next(error)
    }

})

// GET "/api/event/:eventid" => encontrar un event por su id
router.get("/:eventid",  async (req, res, next) => {  //! isAuthenticated???
    const {eventid} = req.params

    try {
        const foundEvent = await Event.findById(eventid).populate("players")
        
        res.status(200).json(foundEvent)
    } catch (error) {
        next(error)
    }
})






module.exports = router;