"use client";

import { SignInButton, SignOutButton, useSession } from "@clerk/nextjs";

export default function Home() {
  const { isSignedIn } = useSession();
  // console.log(isSignedIn);

  return <main className="">welcome to the home page</main>;
}
