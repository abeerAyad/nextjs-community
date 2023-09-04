import { dbConnection } from "@/dbConfig/connection";
import Reaction from "@/models/social/reaction/reaction";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function POST(req, { params: { id } }) {
  dbConnection()
  const { user } = await getServerSession(req)
  const userData = await User.findOne({ email: user.email })
  try {
    const { reactIcon } = await req.json();
    const postReaction = await Reaction.create({
      reactIcon, postId: id, userId: userData._id
    })
    return NextResponse.json({ msg: 'reaction created successfully', postReaction }, { status: 201 })

  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

}
export async function GET(req, { params: { id } }) {
  dbConnection()
  try {
    const postReactions = await Reaction.find({ postId: id }).populate('postId').populate('userId')
    return NextResponse.json({ msg: 'get reactions successfully', postReactions }, { status: 201 })

  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

}