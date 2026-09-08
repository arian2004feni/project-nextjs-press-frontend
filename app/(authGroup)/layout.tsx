import { Navbar } from "@/components/shared/Navbar";
import { getMe } from "@/services/getMe";

export default async function AuthGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMe();
  return (
    <>
      <Navbar user={user} />
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </>
  );
}
