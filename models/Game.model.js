const { Schema, model, mongoose } = require("mongoose");


const gameSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    apiId: String,
    description: String,
    price: Number,
    yearPublished: Number,
    minPlayers: Number,
    maxPlayers: Number,
    minPlayTime: Number,
    maxPlayTime: Number,
    minAge: Number,
    publisher: String,
    image: {
      type: String,
      default: "https://res.cloudinary.com/dgsjejaed/image/upload/v1666701992/cat-toys/q3fi1deeyjznzy6athzy.png"
    },
    
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Game = model("Game", gameSchema);

module.exports = Game;
