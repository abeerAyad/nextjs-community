import { dbConnection } from "@/dbConfig/connection";
import Post from "@/models/social/post";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

dbConnection()

export async function POST(req) {
    const { user } = await getServerSession(req)
    console.log(user)
    const userData = await User.findOne({ email: user.email })
    try {
console.log('llll')
        const { content, images, status } = await req.json();
        console.log("🚀 ~ file: route.js:16 ~ POST ~ images:", images)
        const post = await Post.create({
            content, images, status, userId: userData._id
        })
        return NextResponse.json({ msg: 'post created successfully', post }, { status: 201 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}

export async function GET(req) {
    try {
        const posts = await Post.find().populate('userId');

        return NextResponse.json({msg:'get posts successfully',posts}, {status:200})

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error:error.message }, { status: 500 })
    }
}

