import { PostStatus, prisma } from "@contribute-api/database";

export async function getLatestPosts(set: any) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        status: PostStatus.PUBLISHED,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 25,
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
      message: "Posts Fetched Successfully",
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
