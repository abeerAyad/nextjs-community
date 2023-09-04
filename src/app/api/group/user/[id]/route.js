import { dbConnection } from "@/dbConfig/connection";
import Group from "@/models/social/group/group";
import { NextResponse } from "next/server";



export async function GET(req, { params: { id } }) {
  dbConnection()

  try {
    const groups = await Group.find({ _id: id }).populate('ownerId')
    return NextResponse.json({ msg: 'get groups successfully', groups }, { status: 200 })

  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

}