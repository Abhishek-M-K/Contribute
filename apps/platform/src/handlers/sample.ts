import { prisma } from "@contribute-api/database";
import * as bcrypt from "bcryptjs";

export async function sampleHandler({ body, set }: any) {
  if (!body) {
    set.status = 400;
    return {
      status: "error",
      message: "Invalid Request",
    };
  }

  const checkExistingUser = await prisma.user.findFirst({
    where: {
      githubProfileId: body.profile.id,
    },
  });

  if (checkExistingUser) {
    set.status = 200;
    return {
      status: "success",
      message: "User already exists",
    };
  }
   
  const user = await prisma.user.create({
    data: {
      githubProfileId: body.profile.id,
      name: body.profile.name,
      username: body.profile.login,
      email: body.profile.email,
      avatar: String(body.profile?.avatar_url),
      githubLink: body.profile.html_url,
      company: String(body.profile?.company),
      location: String(body.profile?.location),
      bio: String(body.profile?.bio),
      access_token: body.access_token,
    },
  });
}
