import { dbConnection } from "@/dbConfig/connection";
import Group from "@/models/social/group/group";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function GET(req) {
  dbConnection()
  const { user } = await getServerSession(req)
  const userData = await User.findOne({ email: user.email })
  try {
    const groups = await Group.find({ ownerId: userData._id }).populate('ownerId')
    return NextResponse.json({ msg: 'group created successfully', groups }, { status: 201 })

  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

}