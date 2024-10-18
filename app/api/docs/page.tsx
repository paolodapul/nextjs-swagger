import fs from "fs/promises";
import { Stats } from "fs";
import path from "path";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import swaggerJsdoc from "swagger-jsdoc";

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

export default async function Page() {
  const routeFiles = await findRouteFilesRecursive(process.cwd());

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

  return <SwaggerUI spec={openapiSpecification} />;
}
