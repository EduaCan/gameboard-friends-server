const { Schema, model, mongoose } = require("mongoose");


const eventSchema = new Schema(
  {
    location: {
      type: String,
      trim: true,
      required: true,
    },
    game: {
      type: String,
      required: true
    },
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Event = model("Event", eventSchema);

module.exports = Event;
