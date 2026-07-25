import { NextResponse } from "next/server";


const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const response = await fetch(
    `${API_URL}/api/v1/social/admin/${id}`,
    {
      method: "DELETE",
      headers: {
        "X-App-Key": process.env.API_SECRET!,
      },
    }
  );

  const data = await response.json();

  return NextResponse.json(data, {
    status: response.status,
  });
}

export async function PUT(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;
  const body = await request.json();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/social/admin/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-App-Key": process.env.API_SECRET!,
      },
      body: JSON.stringify(body),
    }
  );

  const data = await response.json();

  return NextResponse.json(data, {
    status: response.status,
  });
}