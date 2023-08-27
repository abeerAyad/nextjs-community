import { model, models, Schema, mongoose } from "mongoose";

const postSchema = new Schema({
   content: {
    type: String,
   },

   images: [{
    type: String
    }],

    status: {
        type :String,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    
    createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Post = models.posts || model('posts', postSchema)

export default Post;
