import { Elysia } from "elysia";
import swagger from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";

export const platform = new Elysia({
  name: "platform",
})
  .use(
    cors({
      methods: ["GET", "POST", "PUT", "DELETE"],
      origin: "*", // Allow all origins
    })
  )
  .use(
    swagger({
      path: "/docs",
      documentation: {
        info: {
          title: "Platform API",
          description: "Documentation for ContributeIO Platform API",
          version: "1.0.0",
        },
      },
    })
  )
  .get("/", () => "Hello from Abhishek 👋 ")
  .listen(8888);

console.log(
  `🦊 Platform server is running on http://${platform.server?.hostname}:${platform.server?.port}`
);
