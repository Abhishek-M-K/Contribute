import { prisma } from "@contribute-api/database";
import * as bcrypt from "bcryptjs";

export async function sampleHandler({ body, set }: any) {
  return "Doing Nothing 😜";
}
