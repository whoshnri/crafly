"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectOnLoad() {
  const router = useRouter();

  useEffect(() => {
    router.push("/prelaunch");
  }, [router]);

  return null;
}
