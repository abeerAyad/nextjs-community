const { Schema, model, models } = require("mongoose");

const groupSchema = new Schema({
  title: {
    type: String,
  },

  image: {
    type: String
  },

  description: {
    type: String,
  },
  status: {
    type: String,
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Group = models.groups || model('groups', groupSchema)

export default Group
