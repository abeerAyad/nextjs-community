const { Schema, model, models } = require("mongoose");

const groupSchema = new Schema({
  content: {
    type: String,
  },

  images: [{
    type: String
  }],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  groupId: {
    type: Schema.Types.ObjectId,
    ref: 'groups'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const GroupPosts = models.groupPosts || model('groupPosts', groupSchema)

export default GroupPosts
