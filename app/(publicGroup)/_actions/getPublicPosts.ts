"use server";

export default async function getPublicPosts() {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/posts`, {
    cache: "force-cache",
    next: {
      revalidate: 60 * 60, // Revalidate every hour
      tags: ["public-posts"], // Tag for cache invalidation
    },
  });
  const result = await res.json();
  return result;
}
