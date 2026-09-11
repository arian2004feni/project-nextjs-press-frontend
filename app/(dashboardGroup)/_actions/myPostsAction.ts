import { cookies } from "next/headers";

export const getMyPosts = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "user not logged in",
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/posts/my-posts`, {
    headers: {
      // Authorization: accessToken as string
      // Authorization: `Bearer ${accessToken}`
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24,
      tags: ["my-posts"],
    },
  });

  const result = res.json();

  return result;
};
