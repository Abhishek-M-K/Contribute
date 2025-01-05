import { PostStatus, prisma } from "@contribute-api/database";

export async function getUsersPosts(params: any, set: any) {
  try {
    const { id } = params;

    if (!id) {
      set.status = 400;
      return {
        status: "error",
        message: "Bad Request",
      };
    }

    const posts = await prisma.post.findMany({
      where: {
        authorId: id,
        status: PostStatus.PUBLISHED,
      },
      include: {
        upvotes: true,
        comments: true,
      },
    });

    if (!posts) {
      set.status = 404;
      return {
        status: "error",
        message: "No Posts Found",
      };
    }

    set.status = 200;
    return {
      status: "success",
      data: posts,
      message: "Posts Fetched for given User Successfully",
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
