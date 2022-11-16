const { expressjwt: jwt } = require("express-jwt");

//Middleware para comprobar la validez del token
const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  requestProperty: "payload",
  getToken: (req) => {
    //si no recibe token
    if (req.headers === undefined || req.headers.authorization === undefined) {
      console.log("no hay token");
      return null;
    }
    //si el token existe, extrelo del string y retornalo a la funcion
    const tokenArray = req.headers.authorization.split(" ");
    const tokenType = tokenArray[0];
    const token = tokenArray[1];
    //si el token es del tipo incorrecto
    if (tokenType !== "Bearer") {
      console.log("token incorrecto");
      return null;
    }

    //a partir de este punto el token ha sido recibido
    //para validarlo lo retornamos de la funcion
    console.log("el token ha sido entregado");
    return token;
  },
});


module.exports = isAuthenticated;
