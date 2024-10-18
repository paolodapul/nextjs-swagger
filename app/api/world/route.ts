/**
 * @openapi
 * /api/world:
 *   get:
 *     description: Call to /api/world!
 *     responses:
 *       200:
 *         description: Returns "World"
 */
export function GET() {
  return Response.json({ message: "World" });
}
