import Comment from "@/models/social/post/comment";
import SavedElements from "@/models/social/post/savedElement";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req, { params: { id } }) {
    const { user } = await getServerSession(req)
    const userData = await User.findOne({ email: user.email })
    const commentId = await Comment.find({ postId: id }, { _id: 1 })
    const data = commentId.map((comm) => comm._id)

    try {
        const savedElement = await SavedElements.create({
            postId: id,
            userId: userData._id,
            commentId:data,
        })
        console.log(savedElement,'post');
        return NextResponse.json({ msg: 'Saved Element successfully', savedElement }, { status: 201 })

    } catch (error) {
        console.log(error,'post saved')
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

