/**
 * @openapi
 * /api/hello:
 *   get:
 *     description: Hello world in Swagger
 *     responses:
 *       200:
 *         description: Returns a hello world
 */
export function GET() {
  return Response.json({ hello: "world" });
}
