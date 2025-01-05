import { prisma } from "@contribute-api/database";

export async function updatePostInfo(params: any, body: any, set: any) {
  try {
    const { id } = params;

    if (!id || !body) {
      set.status = 400;
      return {
        status: "error",
        message: "Bad Request",
      };
    }

    const post = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        status: body?.status.toUpperCase(),
        reviewStatus: body?.reviewStatus.toUpperCase(),
        title: body?.title,
        content: body?.content,
      },
    });

    if (!post) {
      set.status = 500;
      return {
        status: "error",
        message: "Post Update Failed",
      };
    }

    set.status = 200;
    return {
      status: "success",
      data: post,
      message: "Post Updated Successfully",
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

export async function updateUpvotesCount(params: any, set: any) {
  try {
    const { id, userId } = params;

    if (!id || !userId) {
      set.status = 400;
      return {
        status: "error",
        message: "Bad Request",
      };
    }

    const transaction = await prisma.$transaction(async (ctx) => {
      const postExists = await ctx.post.findUnique({
        where: {
          id,
        },
        include: {
          upvotes: true,
        },
      });

      if (!postExists) {
        set.status = 404;
        return {
          status: "error",
          message: "Post Not Found",
        };
      }

      const upvoteExists = postExists.upvotes.find(
        (upvote) => upvote.userId === userId
      );

      let updatedPost: any;
      if (upvoteExists) {
        updatedPost = await ctx.post.update({
          where: {
            id,
          },
          data: {
            upvotes: {
              disconnect: {
                id: upvoteExists.id,
              },
            },
          },
          include: {
            _count: {
              select: {
                upvotes: true,
                comments: true,
              },
            },
          },
        });

        await ctx.upvotes.delete({
          where: {
            id: upvoteExists.id,
          },
        });
      } else {
        const upvote = await ctx.upvotes.create({
          data: {
            userId: userId,
            postId: id,
          },
        });

        updatedPost = await ctx.post.update({
          where: {
            id,
          },
          data: {
            upvotes: {
              connect: {
                id: upvote.id,
              },
            },
          },
          include: {
            _count: {
              select: {
                upvotes: true,
                comments: true,
              },
            },
          },
        });
      }

      if (!updatedPost) {
        set.status = 500;
        return {
          status: "error",
          message: "Failed to update upvotes",
        };
      }

      return { updatedPost };
    });

    if (!transaction || !transaction.updatedPost) {
      set.status = 500;
      return {
        status: "error",
        message: "Failed to update upvotes",
      };
    }

    set.status = 200;
    return {
      status: "success",
      data: transaction.updatedPost,
      message: "Upvoted Successfully",
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
