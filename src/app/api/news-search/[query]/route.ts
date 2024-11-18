export const dynamic = 'force-static'
 
export async function GET(request, { params }) {
  const { query } = params; // Access the dynamic segment `query`

  if (!query) {
    return new Response(
      JSON.stringify({ error: "Query parameter is required" }),
      { status: 400 }
    );
  }

    const response = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${process.env.NEWSAPI_API_KEY}`
    );
    const data = await response.json();
 
  return Response.json({ data })
}