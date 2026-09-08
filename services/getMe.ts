import { cookies } from "next/headers";

export const getMe = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "user not logged in",
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/me`, {
    headers: {
      // Authorization: accessToken as string
      // Authorization: `Bearer ${accessToken}`
      Cookie: `accessToken=${accessToken}`,
    },
  });

  const result = res.json();

  return result;
};
