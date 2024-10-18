/**
 * @openapi
 * /api/hello:
 *   get:
 *     description: Call to /api/hello!
 *     responses:
 *       200:
 *         description: Returns "Hello!"
 */
export function GET() {
  return Response.json({ message: "Hello!" });
}
