const router = require("express").Router()
const isAuthenticated = require("../middlewares/auth.middlewares");
const Comment = require("../models/Comment.model");

// POST "/api/comment/:gameid" => crear un comment para un juego y agregar a la BD
router.post("/:gameid", isAuthenticated, async (req, res, next) => {
    const {content} = req.body
    const {gameid}= req.params
    //! la misma ruta deberia valer para crear comments de eventos
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

// PATCH "/api/comment/:commentid" => modificar un comment
router.patch("/:commentid", isAuthenticated, async (req, res, next) => {
    const {content} = req.body
    const {commentid}= req.params
    //! la misma ruta deberia valer para modificar comments de eventos
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