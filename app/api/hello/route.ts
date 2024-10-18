/**
 * @openapi
 * /api/hello:
 *   get:
 *     description: Call to /hello!
 *     responses:
 *       200:
 *         description: Returns something
 */
export function GET() {
  return Response.json({ message: "Hello, world!" });
}
