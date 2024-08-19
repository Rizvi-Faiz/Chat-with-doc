import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  console.log("hello");
  try {
    const { message } = await req.json();

    const API_KEY = process.env.GEMINI_API_KEY;
    const GEMINI_API_URL = process.env.GEMINI_API_URL;

    if (!API_KEY || !GEMINI_API_URL) {
      return NextResponse.json({ error: 'API key or URL is not defined' }, { status: 500 });
    }

    const url = `${GEMINI_API_URL}?key=${API_KEY}`;
    const body = JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: message,
            },
          ],
        },
      ],
    });

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyA4DVrF0PDLs0ZIAFl8d7Nr1Bag8FRAh6s`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    });
    // const res = await response.json();

    // console.log(res["data"]["candidates"]["0"]["content"]["parts"]["0"]["text"]);
    if (!response.ok) {
      const errorDetail = await response.text();
      return NextResponse.json({ error: `Failed to get response from Gemini API: ${errorDetail}` }, { status: response.status });
    }

    const result = await response.json();
    console.log(result)
    return NextResponse.json({ answer: result["candidates"]["0"]["content"]["parts"]["0"]["text"] });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: `Error fetching response from Gemini API: ${error.message}` }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Error fetching response from Gemini API' }, { status: 500 });
    }
  }
}
