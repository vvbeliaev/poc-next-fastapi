import { RegisterForm } from "@/features/auth";

export default function RegisterPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-[400px]">
        <RegisterForm />
      </div>
    </div>
  );
}
