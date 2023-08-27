import { model, models, Schema } from "mongoose";

const savedElementsSchema = new Schema({
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'posts'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    commentId: [{
        type: Schema.Types.ObjectId,
        ref: 'comments'
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const SavedElements = models.savedElements || model('savedElements', savedElementsSchema)

export default SavedElements;