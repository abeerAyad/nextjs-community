import { model, models, Schema, mongoose } from "mongoose";

const postSchema = new Schema({
   comment: {
    type: String,
   },

   image: {
    type:String
   },
   postId: {
    type: Schema.Types.ObjectId,
        ref:'posts'
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref:'users'
    },
    
    createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Comment = models.comments || model('comments', postSchema)

export default Comment;
