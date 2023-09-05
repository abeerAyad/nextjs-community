import { model, models, Schema } from "mongoose";

const sharePostSchema = new Schema({
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
    isShared: {
        type: Boolean,
        default: true,
    }
});

const sharePost = models.share || model('share', sharePostSchema);

export default sharePost;
