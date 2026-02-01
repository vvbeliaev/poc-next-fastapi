import { LoginForm } from "@/features/auth";

export default function LoginPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-[400px]">
        <LoginForm />
      </div>
    </div>
  );
}
