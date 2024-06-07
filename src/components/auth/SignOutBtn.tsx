"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useClerk } from "@clerk/nextjs";

export default function SignOutBtn() {
  
  const { signOut } = useClerk();

  const router = useRouter();
  const handleSignOut = async () => {
    const response = await fetch("/api/sign-out", {
      method: "POST",
      redirect: "manual",
    });

    if (response.status === 0) {
      // redirected
      // when using `redirect: "manual"`, response status 0 is returned
      return router.refresh();
    }
  };
  
  return (
    <Button variant={"destructive"} onClick={() => signOut({ redirectUrl: '/' })}>
          Sign out
    </Button>
  );
}
