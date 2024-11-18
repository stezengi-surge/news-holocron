export const dynamic = 'force-static'
 
export async function GET() {
    const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWSAPI_API_KEY}`
    );
    const data = await response.json();
 
  return Response.json({ data })
}