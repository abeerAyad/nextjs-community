import { dbConnection } from "@/dbConfig/connection";
import Post from "@/models/social/post";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { user } = await getServerSession(req)
  const userData = await User.findOne({ email: user.email })
  try {
    const posts = await Post.find({ userId: userData._id }).populate('userId');



    return NextResponse.json({ msg: 'Get Single Post', posts }, { status: 200 })

  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}