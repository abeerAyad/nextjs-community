import { dbConnection } from "@/dbConfig/connection";
import User from "@/models/user";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

dbConnection()
export async function POST(req) {
    try {
        const { username, email, image, password } = await req.json();
        const userIsExisted = await User.findOne({ email });

        if (userIsExisted) {
            return NextResponse.json({ msg: 'user already exist' }, { status: 400 })
        }

        const hashedPassword = await hash(password, 10)

        await User.create({
            username,
            email,
            image,
            password: hashedPassword
        })
        return NextResponse.json({ msg: 'user created successfully' }, { status: 201 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ msg: error.massage }, { status: 500 })
    }
}