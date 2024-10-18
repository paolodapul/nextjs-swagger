# Documenting API Endpoints on Next.js Route Handlers using Swagger UI

1. Create a server component that will display the Swagger doc e.g. `app/api/docs/page.tsx`
2. Within the server component, implement the following:

```typescript
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import swaggerJsdoc from "swagger-jsdoc";
```

3. To be able to use the imports above, install the libraries and their corresponding typedefs.
4. Create a function that will recursively check your `app` directory of `route.ts` files and will push all found file paths into an array.

```typescript
async function findRouteFilesRecursive(dir: string): Promise<string[]> {
  let results: string[] = [];
  const files: string[] = await fs.readdir(dir); // Asynchronously read the directory

  const promises = files.map(async (file) => {
    const filePath: string = path.join(dir, file);
    const stat: Stats = await fs.stat(filePath); // Asynchronously get file stats

    if (stat.isDirectory()) {
      // Recursively search in subdirectories
      const subDirResults = await findRouteFilesRecursive(filePath);
      results = results.concat(subDirResults);
    } else if (file === "route.ts") {
      // If it's a file and matches 'route.ts'
      results.push(filePath);
    }
  });

  await Promise.all(promises); // Wait for all promises to resolve
  return results;
}
```

5. Create an OpenAPI specification that will describe your OpenAPI project.

```typescript
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hello World",
      version: "1.0.0",
    },
  },
  apis: routeFiles,
};

const openapiSpecification = swaggerJsdoc(options);
```

6. You can then pass the return value of `swaggerJsdoc(options)` to your Swagger React component.

```typescript
return <SwaggerUI spec={openapiSpecification} />;
```

7. For each of your route handler, use a JSDoc annotation to define the OpenAPI specification of your endpoint.

```typescript
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
```

---

# Notes

- Swagger takes care of calling your route handlers using the base URL, even if you don't explicitly define it on your `options` object.
- You can render the documentation component as a server component.
- Still breaks when using Turbopack for some reason
