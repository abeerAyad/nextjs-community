import { dbConnection } from "@/dbConfig/connection";
import Group from "@/models/social/group/group";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function POST(req) {
  dbConnection()
  const { user } = await getServerSession(req)
  const userData = await User.findOne({ email: user.email })
  try {
    const { title, image, description, status } = await req.json();
    const group = await Group.create({
      title, image, description, status, ownerId: userData._id
    })
    return NextResponse.json({ msg: 'group created successfully', group }, { status: 201 })

  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

}

export async function GET(req) {
  dbConnection()
  try {
    const groups = await Group.find()
    return NextResponse.json({ msg: 'get all groups successfully', groups }, { status: 200 })

  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

}

