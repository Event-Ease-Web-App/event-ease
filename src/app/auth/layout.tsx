import GoogleCaptchaWrapper from "@/components/ReCaptchaWrapper";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <GoogleCaptchaWrapper>{children}</GoogleCaptchaWrapper>
    </main>
  );
}
