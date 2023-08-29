import { dbConnection } from "@/dbConfig/connection";
import Post from "@/models/social/post";
import { NextResponse } from "next/server";

dbConnection()

export async function DELETE(req, { params: { id } }) {
    try {
        const deletedPost = await Post.deleteOne( {_id: id});
        return NextResponse.json({ msg: 'Delete Post Successfully!', deletedPost}, { status: 200})

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error:error.message }, { status: 500 }) 
    }
}

export async function GET(req,{ params: {id} }) {
    try {
        const post = await Post.findOne({ _id: id }).populate('userId');
console.log(post,'hhhh')
console.log(id,'hhhh')

        return NextResponse.json({msg:'Get Single Post', post}, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({error: error.message}, {status:500})
    }
}