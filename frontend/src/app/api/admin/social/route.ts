
import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const headers = () => ({
  "Content-Type": "application/json",
  "X-App-Key": process.env.API_SECRET ?? "",
});

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/api/v1/social/admin/`, {
      headers: headers(),
      cache: "no-store",
    });

    return new NextResponse(await response.text(), {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("content-type") ?? "application/json",
      },
    });
  } catch (error) {
    console.error("Fetch social links failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch social links" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();

    const response = await fetch(`${API_URL}/api/v1/social/admin/`, {
      method: "POST",
      headers: headers(),
      body,
      cache: "no-store",
    });

    return new NextResponse(await response.text(), {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("content-type") ?? "application/json",
      },
    });
  } catch (error) {
    console.error("Add social link failed:", error);
    return NextResponse.json(
      { error: "Failed to add social link" },
      { status: 500 }
    );
  }
}
