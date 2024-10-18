/**
 * @openapi
 * /api/world:
 *   get:
 *     description: Hello world in Swagger
 *     responses:
 *       200:
 *         description: Returns world
 */
export function GET() {
  return Response.json({ message: "world" });
}
