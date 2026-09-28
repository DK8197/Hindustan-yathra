import { NextResponse } from 'next/server';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function POST(
  request: Request
) {
  try {
    const formData =
      await request.formData();

    const response = await fetch(
      `${API_URL}/api/v1/admin/upload-excel`,
      {
        method: 'POST',
        headers: {
          'X-App-Key':
            process.env.API_SECRET!,
        },
        body: formData,
      }
    );

    const responseText = await response.text();
    let data: unknown;

    try {
      data = responseText ? JSON.parse(responseText) : {};
    } catch {
      const isHtml = /<\s*!doctype\s+html|<\s*html/i.test(responseText);
      data = {
        success: false,
        message: isHtml
          ? `Backend upload failed with HTTP ${response.status}. Check the backend logs for the import error.`
          : responseText.slice(0, 500) || `Backend upload failed with HTTP ${response.status}.`,
      };
    }

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          'Internal Server Error',
      },
      {
        status: 500,
      }
    );
  }
}