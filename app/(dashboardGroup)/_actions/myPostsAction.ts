"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

type PostState = {
  success: boolean;
  statusCode: number;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
  // data: {
  //   id: string;
  //   title: string;
  //   content: string;
  //   thumbnail: string;
  //   isFeatured: boolean;
  //   status: string;
  //   tags: string[];
  //   views: number;
  //   createdAt: string;
  //   updatedAt: string;
  //   isPremium: boolean;
  //   authorId: string;
  // };
};

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

export const createPost = async (prevState: PostState, formData: FormData) => {
  const payload = {
    title: formData.get("title"),
    content: formData.get("content"),
    thumbnail: formData.get("thumbnail"),
    tags: (formData.get("tags") as string).split(", "),
    isPremium: formData.get("isPremium") === "on",
  };

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "user not logged in",
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/posts`, {
    method: "POST",
    headers: {
      // Authorization: accessToken as string
      // Authorization: `Bearer ${accessToken}`
      Cookie: `accessToken=${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    revalidateTag("my-posts", {
      expire: 0,
    });
  }
  if (result.success && result.data.isPremium) {
    revalidateTag("premium-posts", {
      expire: 0,
    });
  } else {
    revalidateTag("public-posts", {
      expire: 0,
    });
  }

  return result;
};

export const updatePost = async (postId: string, prevState: PostState, formData: FormData) => {
  const payload = {
    title: formData.get("title"),
    content: formData.get("content"),
    thumbnail: formData.get("thumbnail"),
    tags: (formData.get("tags") as string).split(", "),
    isPremium: formData.get("isPremium") === "on",
  };

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "user not logged in",
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/posts/${postId}`, {
    method: "PATCH",
    headers: {
      // Authorization: accessToken as string
      // Authorization: `Bearer ${accessToken}`
      Cookie: `accessToken=${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    revalidateTag("my-posts", {
      expire: 0,
    });
  }
  if (result.success && result.data.isPremium) {
    revalidateTag("premium-posts", {
      expire: 0,
    });
  } else {
    revalidateTag("public-posts", {
      expire: 0,
    });
  }

  return result;
};
