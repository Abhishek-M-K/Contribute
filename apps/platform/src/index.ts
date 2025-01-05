import { Elysia } from "elysia";
import swagger from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
import { RouteTable } from "./routes/routeTable";

export const platform = new Elysia({
  name: "platform",
})
  .use(
    cors({
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
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
  .post("/auth/github", ({ body }: any) => {
    console.log("Github Auth Body:", body);
  })
  .use(RouteTable)
  .listen(8888);

console.log(
  `🦊 Platform server is running on http://${platform.server?.hostname}:${platform.server?.port}`
);
