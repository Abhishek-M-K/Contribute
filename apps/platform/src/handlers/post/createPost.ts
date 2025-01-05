import { prisma } from "@contribute-api/database";

export async function createPost(body: any, set: any) {
  try {
    if (!body || !body.title || !body.content) {
      set.status = 400;
      return {
        status: "error",
        message: "Bad Request",
      };
    }

    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        author: {
          // Later we will replace this with the user fetched from session
          connect: {
            id: body.authorId,
          },
        },
        reviewStatus: body.reviewStatus.toUpperCase(),
        status: body.status.toUpperCase(),
      },
    });

    if (!post) {
      set.status = 500;
      return {
        status: "error",
        message: "Post Creation Failed",
      };
    }

    set.status = 201;
    return {
      status: "success",
      data: post,
      message: "Post Created Successfully",
    };
  } catch (error) {
    console.log(error);
    set.status = 500;
    return {
      status: "error",
      message: "Internal Server Error",
    };
  }
}
