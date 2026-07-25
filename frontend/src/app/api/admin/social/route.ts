import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function GET() {
  try {
    console.log("API_URL:", API_URL);
    console.log("API_SECRET:", process.env.API_SECRET);

    const response = await fetch(
      `${API_URL}/api/v1/social/admin/`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-App-Key": process.env.API_SECRET!,
        },
        cache: "no-store",
      }
    );

    // console.log("Flask Status:", response.status);

    const text = await response.text();

    // console.log("Flask Response:", text);

    return new NextResponse(text, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}