import dbConn from "@/utils/dbConn";
import Contact from "@/models/contact";
import {NextResponse} from "next/server";

export async function POST(req, res) {
  try {

    const body = await req.json();
    await dbConn();

    const result= await Contact.create(body);

    return NextResponse.json(
        result,
        { status : 200 },
    )

  }catch (e) {
    console.log(e);
    return NextResponse.json(
        { message: "Server error, please try again!" },
        { status : 500 },
    )
  }
}