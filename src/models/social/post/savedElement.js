import { model, models, Schema, mongoose } from "mongoose";

const savedElementsSchema = new Schema({
   postId: {
    type: Schema.Types.ObjectId,
        ref:'posts'
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref:'users'
    },
    commentId: {
        type: Schema.Types.ObjectId,
        ref:'comments'
    },
    createdAt: {
    type: Date,
    default: Date.now,
  },
})

const savedElements = models.savedElements || model('savedElements', savedElementsSchema)

export default savedElements;