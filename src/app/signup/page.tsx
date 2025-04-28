import Link from "next/link";
import { SignupForm } from "@/components/auth/SignupForm";
import { GradientBackground } from "@/components/layout/gradientBackground";
import { FileText } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <GradientBackground />

      <div className="w-full max-w-md mx-auto mb-8 text-center">
        <Link href="/" className="inline-flex items-center space-x-2">
          <FileText className="h-6 w-6 text-primary" />
          <span className="font-bold text-2xl">DocuAI</span>
        </Link>
      </div>

      <SignupForm />
    </div>
  );
}
