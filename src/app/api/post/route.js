import { dbConnection } from "@/dbConfig/connection";
import Post from "@/models/social/post";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

dbConnection()

export async function POST(req) {
    const { user } = await getServerSession(req)
    const userData = await User.findOne({ email: user.email })
    try {

        const { content, images, status } = await req.json();
        const post = await Post.create({
            content, images, status, userId: userData._id
        })
        return NextResponse.json({ msg: 'post created successfully', post }, { status: 201 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}

