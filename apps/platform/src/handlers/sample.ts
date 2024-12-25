import { prisma } from "@contribute-api/database";
import * as bcrypt from "bcryptjs";

export async function sampleHandler() {
  const pass = await bcrypt.hash("password", 10);
  await prisma.user.create({
    data: {
      name: "Test Abhishek",
      email: "abhishek.test@gmail.com",
      password: pass,
    },
  });
}
