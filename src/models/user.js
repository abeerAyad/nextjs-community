import {model, models, Schema} from 'mongoose'
const userSchema = new Schema({
    username:{
        type:String,
        required:[true,'username must be Provided!'],
    },
    email: {
        type:String,
        required:[true,'email must be Provided!'],
        unique:true,
    },
    password: {
        type:String,
        required: [true,'email must be Provided!'],
    },
    role:{
        type:String,
        default:'user'
    },
    isActive:{
        type:Boolean,
    },
    image: {
        type:String,
        data:Buffer,
    },
})

const User = models.users || model('users', userSchema)

export default User
