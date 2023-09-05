import { dbConnection } from "@/dbConfig/connection";
import Post from "@/models/social/post";
import Comment from "@/models/social/post/comment";
import sharePost from "@/models/social/share/share";
import User from "@/models/user";
import { NextResponse } from "next/server";

dbConnection()
export async function GET () {
    try {
        const sharePostData = await sharePost.find()
        .populate({ path: 'userId', model: User })
        .populate({ path: 'commentId', model: Comment })
        .populate({ path: 'postId', model: Post });
        
        return NextResponse.json({msg: 'Shared Post Successfully', sharePostData}, {status: 200})
    } catch (error) {
        console.log(error)
        NextResponse.json({ msg: error.message }, { status: 500 })
    }
}