import { model, models, Schema } from "mongoose";

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
        type:Schema.Types.ObjectId,
        ref:'users'
    }
})

const Post = models.posts || model('posts', postSchema)

export default Post;
