"use client";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/action/authAction";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  async function handleLogout() {
    const result = await logout();
    if (result.success) {
      console.log(result.message);
      router.push("/login");
    } else {
      console.log(result.message);
    }
  }
  return (
    <>
      <h1 className="font-bold text-4xl">Home</h1>
      <div>
        <Link href={"/signup"}>Signup</Link>
        <Link href={"/login"}>Login</Link>
        <Link href={"/doctor/dashboard"}>Doctor Dashboard</Link>
        <Link href={"/patient/dashboard"}>patient Dashboard</Link>
        <Button onClick={handleLogout} className="cursor-pointer px-5 ml-5">
          Logout
        </Button>
      </div>
    </>
  );
}
