"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileX, ArrowLeft } from "lucide-react";
import { GradientBackground } from "@components/layout/gradientBackground";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <GradientBackground />

      <div className="w-full max-w-md mx-auto text-center space-y-8">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <FileX className="h-10 w-10 text-primary" />
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-bold">Page Not Found</h1>
          <p className="text-muted-foreground">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <Button asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
