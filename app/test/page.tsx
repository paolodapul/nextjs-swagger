import { glob } from "glob";
import swaggerJSDoc from "swagger-jsdoc";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default async function Page() {
  const routeFiles = (
    await glob("**/route.ts", {
      ignore: "node_modules/**",
    })
  ).map((r) => `${process.cwd() + "/" + r}`);

  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Hello World",
        version: "1.0.0",
      },
    },
    apis: [...routeFiles], // files containing annotations as above
  };

  const openapiSpecification = swaggerJSDoc(options);

  return <SwaggerUI spec={openapiSpecification} />;
}
