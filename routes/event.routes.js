const router = require("express").Router()
const isAuthenticated = require("../middlewares/auth.middlewares");
const User = require("../models/User.model");
const Event = require("../models/Event.model");



// POST "/api/event/:gameid" => crear un evento y agregar a la BD
router.post("/:gameid", isAuthenticated, async (req, res, next) => {
    const { location } = req.body
    const {gameid} = req.params
    
    try {
        
        
        const newEvent = {
            location: location,
            players: req.payload._id,
            game: gameid
        }

        await Event.create(newEvent)
        res.status(200).json("Event created successfuly")
    } catch (error) {
        next(error)
    }

})


// GET "/api/event/game/:gameid" => encontrar eventos del juego por gameid
router.get("/game/:gameid", isAuthenticated,  async (req, res, next) => {  
    const {gameid} = req.params

    try {
        const foundEvent = await Event.find({game: gameid}).populate("players")
        
        res.status(200).json(foundEvent)
    } catch (error) {
        next(error)
    }
})

// GET "/api/event/user/" => encontrar eventos del usuario
router.get("/user", isAuthenticated,  async (req, res, next) => {  
   

    try {
        const foundEvents = await Event.find({$in: {players: req.payload._id}})
        
        res.status(200).json(foundEvents)
        // res.status(200).json(req.payload) $in
    } catch (error) {
        next(error)
    }
})

// GET "/api/event/:eventid" => encontrar un event por su id
router.get("/:eventid",  isAuthenticated, async (req, res, next) => {  //! isAuthenticated???
    const {eventid} = req.params

    try {
        const foundEvent = await Event.findById(eventid).populate("players")
        
        res.status(200).json(foundEvent)
    } catch (error) {
        next(error)
    }
})

// PATCH "/api/event/:eventid" => modificar un event por su id
router.patch("/:eventid", isAuthenticated, async (req, res, next) => {
    const {eventid} = req.params
    const { location } = req.body
    //! A ver como modifico a los jugadores
    
    try {
        await Event.findByIdAndUpdate(eventid, { location: location })
        res.status(200).json("Event updated")
        
    } catch (error) {
        next(error)
    }



})  

// PATCH "/api/event/:eventid/addplayer" => Agregar un player a un event por su id (eventid)
router.patch("/:eventid/addplayer", isAuthenticated, async (req, res, next) => {
    const {eventid} = req.params
    
    try {
        await Event.findByIdAndUpdate(eventid,  {$addToSet: {players: req.payload._id} })
        res.status(200).json("Player Added")
        
    } catch (error) {
        next(error)
    }



})  

// DELETE "/api/event/:eventid" => borrar un event por su id
router.delete("/:eventid", isAuthenticated, async (req, res, next) => {
    const {eventid} = req.params
        
    try {
        await Event.findByIdAndDelete(eventid)
        res.status(200).json("Event deleted")
        
    } catch (error) {
        next(error)
    }



})  

//PATCH => "/api/event/:eventid" Quitar player de evento
router.patch("/:eventid", isAuthenticated, async (req, res, next) => {
    const {eventid} = req.params
        
    try {
        await Event.findByIdAndUptate(eventid, {$pull: {players:req.payload.username }})
        res.status(200).json("Event deleted")
        
    } catch (error) {
        next(error)
    }



})

module.exports = router;