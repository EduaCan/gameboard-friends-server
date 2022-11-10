const router = require("express").Router()
const Game = require("../models/Game.model");
const axios = require("axios")


// GET "/api/game" => recibir la lista de juegos de la API
router.get("/", async (req,res, next)=>{
    try {
        const response = await axios.get("https://api.boardgameatlas.com/api/search?order_by=rank&ascending=false&client_id=UanG7JRGxH")
        
        res.status(200).json(response.data.games)
    } catch (error) {
        next(error)
    }
})

// GET "/api/game/:gameid" => recibir la lista de juegos de la API
router.get("/:gameid", async (req,res, next)=>{
    try {
        const {gameid} = req.params
        const response = await axios.get(`https://api.boardgameatlas.com/api/search?id=${gameid}&client_id=UanG7JRGxH`)
       
        // const newGame = {
        //     name: "wrong name",//response.games[0].name,
        //     apiId: response.games[0].id,
        //     price: response.games[0].price,
        //     yearPublished: response.games[0].year_published,
        //     minPlayers: response.games[0].min_players,
        //     maxPlayers: response.games[0].max_players,
        //     minPlayTime:response.games[0].min_playtime,
        //     maxPlayTime:response.games[0].max_playtime,
        //     minAge: response.games[0].min_age,
        //     description: response.games[0].description,
        //     image: response.games[0].image_url,
        //     publisher:response.games[0].publisher,
        // }
        // await Game.create(newGame)
        // console.log(response.data.games)
        res.status(200).json(response.data.games[0])
    } catch (error) {
        next(error)
    }
})




module.exports = router;