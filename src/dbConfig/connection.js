import mongoose from 'mongoose';

export async function dbConnection () {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('db connected !')
    } catch (error) {
        console.log(error)
    }
}