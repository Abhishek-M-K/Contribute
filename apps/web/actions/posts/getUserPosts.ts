"use server";

import { auth } from "@/auth";
import jwt from "jsonwebtoken";
import { getBearerToken } from "@/lib/bearerToken";

export async function getUsersPosts() {
  const token = await getBearerToken();

  try {
    const response = await fetch(`${process.env.PLATFORM_API_V1_URL}/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

    return response;
  } catch (error) {
    console.log(error);
  }
}
