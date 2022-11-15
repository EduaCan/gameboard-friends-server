const router = require("express").Router()
const isAuthenticated = require("../middlewares/auth.middlewares");
const Comment = require("../models/Comment.model");

// GET "/api/comment/game/:gameid" => encontrar los comments de un juego
router.get("/game/:gameid", isAuthenticated, async (req, res, next) => {
    const {gameid}= req.params
    try {
        const response = await Comment.find({idGame: gameid}).populate("idUser")
        console.log("COMMENTS",response)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }

})

// GET "/api/comment/event/:eventid" => encontrar los comments de un evento
router.get("/event/:eventid", isAuthenticated, async (req, res, next) => {
    const {eventid}= req.params
    try {
        const response = await Comment.find({idEvent: eventid}).populate("idUser")
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }

})


// POST "/api/comment/:gameid" => crear un comment para un juego y agregar a la BD
router.post("/:gameid", isAuthenticated, async (req, res, next) => {
    const {content} = req.body
    const {gameid}= req.params

    const newComment = {
        content: content,
        idUser: req.payload._id,
        idGame:gameid
    }
    try {
        const response = await Comment.create(newComment)
        res.status(200).json("Comment created")
    } catch (error) {
        next(error)
    }
})

// POST "/api/comment/event/:eventid" => crear un comment para un evento y agregar a la BD
router.post("/event/:eventid", isAuthenticated, async (req, res, next) => {
    const {content} = req.body
    const {eventid}= req.params
    
    const newComment = {
        content: content,
        idUser: req.payload._id,
        idEvent:eventid
    }
    try {
        const response = await Comment.create(newComment)
        res.status(200).json("Comment created")
    } catch (error) {
        next(error)
    }
})

// PATCH "/api/comment/:commentid" => modificar un comment
router.patch("/:commentid", isAuthenticated, async (req, res, next) => {
    const {content} = req.body
    const {commentid}= req.params
    try {
        await Comment.findByIdAndUpdate(commentid, { content: content })
        res.status(200).json("Coment updated")
    } catch (error) {
        next(error)
    }
})

// DELETE "/api/comment/:commentid" => modificar un comment
router.delete("/:commentid", isAuthenticated, async (req, res, next) => {
    const {commentid}= req.params
    try {
        await Comment.findByIdAndDelete(commentid)
        res.status(200).json("Comment deleted")
        
    } catch (error) {
        next(error)
    }
})


module.exports = router;