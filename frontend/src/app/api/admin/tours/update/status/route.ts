import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(
      `${API_URL}/api/v1/admin/tours/update/status`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-App-Key': process.env.API_SECRET!,
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: 'Internal Server Error',
      },
      {
        status: 500,
      }
    );
  }
}