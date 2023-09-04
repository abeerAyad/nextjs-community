import { dbConnection } from "@/dbConfig/connection";
import GroupPosts from "@/models/social/group/groupPost";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function POST(req, { params: { id } }) {
  dbConnection()
  const { user } = await getServerSession(req)
  const userData = await User.findOne({ email: user.email })

  try {
    const { content, images } = await req.json();
    const groupPost = await GroupPosts.create({
      content,
      images,
      userId: userData._id,
      groupId: id
    })
    return NextResponse.json({ msg: 'group created successfully', groupPost }, { status: 201 })

  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

}

export async function GET(req, { params: { id } }) {
  dbConnection()
  console.log('am here');
  try {
    const groupPosts = await GroupPosts.find({ groupId: id }).populate('userId')
    return NextResponse.json({ msg: 'group created successfully', groupPosts }, { status: 200 })

  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

}

