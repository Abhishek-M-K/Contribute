import { Elysia, t } from "elysia";
import jwt from "@elysiajs/jwt";
import bearer from "@elysiajs/bearer";
import { PostRoutes } from "./postRoutes";

export const RouteTable = new Elysia({
  prefix: "/api/v1",
})
  .use(jwt({ name: "jwt", secret: String(process.env.JWT_SECRET)! }))
  .use(bearer())
  .guard(
    // Guard To Be Implemented
    {},

    (app) => app.group("/posts", (RouteTable) => RouteTable.use(PostRoutes))
  );
