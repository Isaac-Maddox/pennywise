/**
 * GET /api
 * Sanity Check endpoint
 */

export async function GET(request: Request) {
   return Response.json({
      message: "Hello from the API",
   });
}
