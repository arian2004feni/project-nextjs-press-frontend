"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function subscribePremium() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "user not logged in",
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/subscription/checkout`,
    {
      method: "POST",
      headers: {
        // Authorization: accessToken as string
        // Authorization: `Bearer ${accessToken}`
        Cookie: `accessToken=${accessToken}`,
      },
    },
  );

  const result: {
    success: boolean;
    message: string;
    data: {
      paymentUrl: string;
    };
  } = await res.json();

  if (result.success && result.data.paymentUrl) {
    redirect(result.data.paymentUrl);
  }

  return result;
}
