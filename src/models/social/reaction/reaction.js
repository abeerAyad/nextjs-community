import { model, models, Schema } from 'mongoose'
const reactionSchema = new Schema({
  reactIcon: {
    type: String,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'posts'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Reaction = models.reactions || model('reactions', reactionSchema)

export default Reaction
