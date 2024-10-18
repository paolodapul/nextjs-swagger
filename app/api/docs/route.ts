import { ApiReference } from "@scalar/nextjs-api-reference";
import openApiSpec from "./openapi.json";

const config = {
  spec: {
    content: openApiSpec,
  },
};

export const GET = ApiReference(config);
