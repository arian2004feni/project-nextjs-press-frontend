"use server";

import { cookies } from "next/headers";

export default async function getPublicPosts() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "user not logged in",
    };
  }
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/posts`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "force-cache",
    next: {
      revalidate: 60 * 60, // Revalidate every hour
      tags: ["public-posts"], // Tag for cache invalidation
    },
  });
  const result = await res.json();
  return result;
}
