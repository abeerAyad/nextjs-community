import { verify } from "jsonwebtoken";

export async function getUserData(req) {
    try {
        const token = req.cookies.get('token')?.value || ''

        const decodedToken =  verify(token, process.env.TOKEN_SECRET)

        return decodedToken

    } catch (error) {
        
         throw new Error(error.message)
    }
}