import Post from "@/models/social/post";
import Comment from "@/models/social/post/comment";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req, { params: { id } }) {
    const { user } = await getServerSession(req)
    const userData = await User.findOne({ email: user.email })
    try {
        const { comment, image } = await req.json();

        const commentData = await Comment.create({
            comment,
            image,
            postId: id,
            userId: userData?._id
        })
        return NextResponse.json({ msg: 'comment created successfully', commentData }, { status: 201 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}



export async function DELETE(req, { params: { id } }) {
    try {
        const deletedComment = await Comment.deleteOne({ _id: id });
        return NextResponse.json({ msg: 'Delete Comment Successfully!', deletedComment }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}



export async function GET(req, { params: { id } }) {
    try {
        const comments = await Comment.find({ postId: id }).populate('userId').populate('postId');
        return NextResponse.json({ msg: 'get comment successfully', comments }, { status: 200 });
    } catch (error) {
        console.log(error, 'llll');
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}