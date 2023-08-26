import { dbConnection } from "@/dbConfig/connection";
import { getUserData } from "@/helpers/verifyToken";
import Post from "@/models/social/post";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

dbConnection()

export async function POST(req) {
    const userData = await getUserData(req);
console.log(userData,'lllll')
    try {

        const { content, images, status } = await req.json();
console.log(userData._id)
        const post = await Post.create({
            content, images, status, userId: userData._id
        })
        return NextResponse.json({msg:'post created successfully', post}, {status:201})

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error:error.message }, { status: 500 })
    }

}

