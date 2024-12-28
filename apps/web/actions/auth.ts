"use server";

import { signIn, signOut } from "@/auth";
import { prisma } from "@contribute-api/database";
import { AuthError } from "@auth/core/errors";
import { revalidatePath } from "next/cache";
import { LoginSchemaType } from "@repo/ui/schema/login";
import { redirect } from "next/dist/server/api-utils";

const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// export const login = async (provider: string) => {
//   await signIn(provider, { redirectTo: "/" });
//   revalidatePath("/");
// };

export async function login(provider: string) {
  try {
    await signIn(provider, {
      redirectTo: "/welcome",
      redirect: true,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Authentication failed" };
    }
    throw error;
  }
}

export const logout = async () => {
  await signOut({ redirectTo: "/" });
  revalidatePath("/");
};

export const loginWithCreds = async (formData: LoginSchemaType) => {
  console.log(formData);
  const rawFormData = {
    email: formData.email,
    password: formData.password,
    redirectTo: "/welcome",
    redirect: true,
  };

  const existingUser = await getUserByEmail(formData.email as string);
  console.log(existingUser);

  try {
    await signIn("credentials", rawFormData);
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
  revalidatePath("/");
};
