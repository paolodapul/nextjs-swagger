import openApiSpec from "./openapi.json";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function Page() {
  return <SwaggerUI spec={openApiSpec} />;
}
