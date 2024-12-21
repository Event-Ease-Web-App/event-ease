import GoogleCaptchaWrapper from "@/components/ReCaptchaWrapper";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <GoogleCaptchaWrapper>{children}</GoogleCaptchaWrapper>
    </div>
  );
}
