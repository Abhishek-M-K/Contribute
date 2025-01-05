import { auth } from "@/auth";
import jwt from "jsonwebtoken";

export async function getBearerToken() {
  const session = await auth();
  const token = jwt.sign(
    session?.user as any,
    process.env.JWT_SECRET as string
  );

  return token;
}
