import { Elysia, t } from "elysia";
import { getUsersPosts } from "../handlers/post/getUsersPost";
import { createPost } from "../handlers/post/createPost";
import {
  updatePostInfo,
  updateUpvotesCount,
} from "../handlers/post/updatePost";
import { getLatestPosts } from "../handlers/post/getLatestPosts";

export const PostRoutes = new Elysia()
  .get("/", ({ params, set }: any) => {
    return getLatestPosts(set);
  })
  .get("/:id", ({ params, set }: any) => {
    return getUsersPosts(params, set);
  })
  .post("/", ({ body, set }: any) => {
    return createPost(body, set);
  })
  .patch("/:id/edit", ({ params, body, set }: any) => {
    return updatePostInfo(params, body, set);
  })
  .patch("/:id/upvote", ({ params, set }: any) => {
    return updateUpvotesCount(params, set);
  });
