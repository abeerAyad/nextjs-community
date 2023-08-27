import Post from "@/models/social/post";
import Comment from "@/models/social/post/comment";
import savedElements from "@/models/social/post/savedElement";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req, { params: { id } }) {
    const { user } = await getServerSession(req)
    const userData = await User.findOne({ email: user.email })
    const commentId = await Comment.find({postId: id})

    try {
        const savedElement = await savedElements.create({
            commentId,
            postId: id,
            userId: userData._id
        })
        return NextResponse.json({ msg: 'Saved Element successfully', savedElement }, { status: 201 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
}
}

