const router = require("express").Router()
const {isAuthenticated} = require("../middlewares/auth.middlewares");
const User = require("../models/User.model");


// PATCH "/user/:userid" => para modificar el usuario su propia contrasenya o el admin
route.patch("/:userid", isAuthenticated, async (req, res, next) => {
    const {userid} = req.params
    const {password, newPassword, newPassword1} = req.body
    //comprobamos si el user intenta modificar su propio user
    //si es otro, para hacerlo tiene que ser admin, de lo contrario GET OUT!
    try {
        
        if(userid === req.payload._id || isUserAdmin(req.payload) ) {

            await User.findByIdAndUpdate()
        } else {
            return;
        }
    } catch (error) {
        next(error)
    }
})

// GET "/user/:userid" => para obtner la info del user
route.patch("/:userid", isAuthenticated, async (req, res, next) => {})