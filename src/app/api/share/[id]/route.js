import Comment from "@/models/social/post/comment";
import sharePost from "@/models/social/share/share";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req, { params: { id } }) {
    const { user } = await getServerSession(req)
    const userData = await User.findOne({ email: user.email })
    const commentId = await Comment.find({ postId: id }, { _id: 1 })
    const data = commentId.map((comm) => comm._id)

    try {
        const sharePostData = await sharePost.create({
            postId: id,
            userId: userData._id,
            commentId:data,
        })
        console.log(sharePostData,'post');
        return NextResponse.json({ msg: 'Shared Post successfully', sharePostData }, { status: 201 })

    } catch (error) {
        console.log(error,'post share')
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

