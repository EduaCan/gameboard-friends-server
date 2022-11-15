const { Schema, model, mongoose } = require("mongoose");


const commentSchema = new Schema(
  {
    content: {
      type: String
    },
    idGame: {
        type: String,
      },
      idEvent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
      idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
