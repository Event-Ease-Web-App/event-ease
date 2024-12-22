"use client";
import GoogleCaptchaWrapper from "@/components/ReCaptchaWrapper";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const { currentUser } = useAuth();
  useEffect(() => {
    if (currentUser) {
      router.push("/");
    }
  }, [router, currentUser]);

  return (
    <div>
      <GoogleCaptchaWrapper>{children}</GoogleCaptchaWrapper>
    </div>
  );
}
