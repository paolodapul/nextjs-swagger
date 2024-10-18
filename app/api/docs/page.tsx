import fs from "fs/promises";
import { Stats } from "fs";
import path from "path";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import swaggerJsdoc from "swagger-jsdoc";
import { headers } from "next/headers";

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
    } else if (file === "route.ts" && !filePath.includes(".next/")) {
      // If it's a file and matches 'route.ts', and doesn't contain '.next/'
      results.push(filePath);
    }
  });

  await Promise.all(promises); // Wait for all promises to resolve
  return results;
}

export default async function Page() {
  const routeFiles = await findRouteFilesRecursive(process.cwd());

  const headersList = headers();
  const host = headersList.get("host"); // to get domain
  console.log("host", host);

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
