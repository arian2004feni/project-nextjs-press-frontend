"use server";

export default async function getPublicPosts({
  query,
}: {
  query?: { [key: string]: string | string[] | undefined };
}) {
  const params = new URLSearchParams();
  // if (query) {
  //   for (const key in query) {
  //     const value = query[key];
  //     if (Array.isArray(value)) {
  //       value.forEach((v) => params.append(key, v));
  //     } else if (value) {
  //       params.append(key, value);
  //     }
  //   }
  // }

  if (query && query.searchTerm) {
    params.set("searchTerm", query.searchTerm as string);
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/posts?${params.toString()}`,
    {
      cache: "force-cache",
      next: {
        revalidate: 60 * 60, // Revalidate every hour
        tags: ["public-posts"], // Tag for cache invalidation
      },
    },
  );
  const result = await res.json();
  return result;
}
