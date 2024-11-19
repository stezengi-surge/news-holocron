export const dynamic = 'force-static'
import { NextRequest, NextResponse } from 'next/server';


export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ query: string }>}
) {
  const query = (await params).query
  
  if (!query) {
    return new NextResponse(
      JSON.stringify({ error: "Query parameter is required" }),
      { status: 400 }
    );
  }

  const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${process.env.NEWSAPI_API_KEY}`
  );
  const data = await response.json();

  return NextResponse.json({ data });
}