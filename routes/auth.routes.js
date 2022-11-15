const router = require("express").Router()
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middlewares/auth.middlewares");




// POST "/api/auth/signup" => registrar a un usuario (recibiendo email y contraseña)
router.post("/signup", async (req, res, next) => {
    const {username, email, password, password2} = req.body   

    //VALIDACIONES
    // Algun campo vacio
    if ( !username || !email || !password || !password2) {
        res.status(400).json({ errorMessage: "You must fill all the fields" })
        return
    }
    // Coincidan las dos contraseñas
    if (password !== password2) {
        res.status(400).json({ errorMessage: "Passwords don't match" })
        return;
      }

    // Fortaleza de la contraseña
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  if (passwordRegex.test(password) === false) {
    res.status(400).json({ errorMessage: "Password must be 8 characters long, at least 1 Capital letter and 1 number"})
    return;
  }
  //Email tenga estructura correcta
  const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
  if (emailRegex.test(email) === false) {
    res.status(400).json({ errorMessage: "Email format isn't correct"})
    return;
  }
  
  try {
    // Que no esté actualmente registrado en la DB
    const foundUser = await User.findOne({$or: [ { username: username }, { email: email } ]});
    if (foundUser !== null) {
      res.status(400).json({ errorMessage: "Credentials already exist"})
      return;
    }
    //.Todo correcto, creamos el usuario
    //codificar la contraseña
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const newUser = {
        username:username,
        email: email,
        password: hashPassword 
      }
      await User.create(newUser)
    
      res.status(201).json("User registered")

  } catch (error) {
    next(error)
  }
})

// POST "/api/auth/login" => validar credenciales del usuario
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body

  // Validar que todos los campos esten llenos
  if (!username  || !password ) {
    res.status(400).json({ errorMessage: "You must fill all the fields" })
    return; 
  }

  try {
    // Validar que el nombre de usuario exista
    const foundUser = await User.findOne({username: username})
    if (foundUser === null) {
      res.status(400).json({errorMessage: "Wrong credentials U"}) //! quitar U
      return;
    }

    // Validar que la contraseña sea correcta
    const isPasswordValid = await bcrypt.compare(password, foundUser.password)
    if (isPasswordValid === false) {
      res.status(400).json({errorMessage: "Wrong credentials P"}) //! quitar P
      return;
    }
    //Definimos payload con la información relevante del usuario
    const payload = {
        _id: foundUser._id,
        username : foundUser.username,
        email: foundUser.email,
        role : foundUser.role
      }
      //Creamos el token
      const authToken = jwt.sign(
        payload, 
        process.env.TOKEN_SECRET, 
        { algorithm: "HS256", expiresIn: "24h" }  //token valido por 24 horas
      )

      res.status(200).json({ authToken: authToken })

  } catch (error) {
    next(error)
  }
})

//PATCH "api/auth/newpassword" => Para que el usuario pueda cambiar la contraseña
router.patch("/newpassword", isAuthenticated, async (req, res, next) => {
  const { oldPassword, password, password2} = req.body

  // Validar que todos los campos esten llenos
  if (!oldPassword  || !password || !password2) {
    res.status(400).json({ errorMessage: "You must fill all the fields" })
    return; 
  }
  // Coincidan las dos contraseñas
  if (password !== password2) {
    res.status(400).json({ errorMessage: "Passwords don't match" })
    return;
  }
  // Fortaleza de la contraseña
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  if (passwordRegex.test(password) === false) {
    res.status(400).json({ errorMessage: "Password must be 8 characters long, at least 1 Capital letter and 1 number"})
    return;
  }

  try {
    // Validar que la contraseña sea correcta
    const foundUser = await User.findById(req.payload._id)
    const isPasswordValid = await bcrypt.compare(oldPassword, foundUser.password)
    if (isPasswordValid === false) {
      res.status(400).json({errorMessage: "Wrong old Password"}) //! quitar P
      return;
    }

    //codificar la contraseña
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    //contraseña actualizada
    await User.findByIdAndUpdate(req.payload._id, {password: hashPassword})

    res.status(200).json("Password Updated")

  } catch (error) {
    next(error)
  }

})


// GET "/api/auth/verify" => para que el BE le diga al FE si el usuario ya ha sido validado
router.get("/verify", isAuthenticated, (req, res, next) => {

  res.status(200).json({user: req.payload})
})

module.exports = router;