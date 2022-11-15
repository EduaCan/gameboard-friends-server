const router = require("express").Router()
const isAuthenticated = require("../middlewares/auth.middlewares");
const User = require("../models/User.model");


// PATCH "/user/:userid" => para modificar el usuario su propia contrasenya o el admin
// router.patch("/:userid", isAuthenticated, async (req, res, next) => {
//     const {userid} = req.params
//     const {password, newPassword, newPassword1} = req.body
//     //comprobamos si el user intenta modificar su propio user
//     //si es otro, para hacerlo tiene que ser admin, de lo contrario GET OUT!
//     try {
        
//         if(userid === req.payload._id || isUserAdmin(req.payload) ) {

//             await User.findByIdAndUpdate(userid) //! Terminar con la validacion y actualizacion
//         } else {
//             return;
//         }
//     } catch (error) {
//         next(error)
//     }
// })

// PATCH "/user/game/:gameid" => Añadir un game a favoritos
router.patch("/game/:gameid", isAuthenticated, async (req, res, next) => {
    const {gameid} = req.params
    try {
        await User.findByIdAndUpdate(req.payload._id,  {$addToSet: {favGames: gameid} })
        res.status(200).json("Game added to Favorites")
    } catch (error) {
        next(error)
    }
})

// GET "/user/favorites/" => Recibir la lista de juegos favoritos
router.get("/favorites", isAuthenticated, async (req, res, next) => {
    try {
        console.log(req.payload._id)
        const response = await User.findById(req.payload._id).select("favGames")
        console.log(response.favGames)
        res.status(200).json(response.favGames)
    } catch (error) {
        next(error)
    }
})

module.exports = router;