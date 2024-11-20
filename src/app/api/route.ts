/**
 * GET /api
 * Sanity Check endpoint
 */

import JSend from "./JSend";

export async function GET() {
   return JSend.success({
      message: "Hello from the NextJS API"
   })
}
