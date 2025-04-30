"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredRole?: "admin" | "editor" | "user";
};

export default function ProtectedRoute({
  children,
  requiredRole = "user",
}: ProtectedRouteProps) {
  const { user, isLoading, isAdmin, isEditor, isUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      // If not logged in at all, redirect to login
      if (!isUser) {
        router.push("/login");
        return;
      }

      // Check role-based access
      if (
        (requiredRole === "admin" && !isAdmin) ||
        (requiredRole === "editor" && !isEditor)
      ) {
        // Redirect to unauthorized page or dashboard
        router.push("/unauthorized");
      }
    }
  }, [isLoading, isUser, isAdmin, isEditor, requiredRole, router]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Show unauthorized message if no redirect happened but access is still denied
  if (
    !isUser ||
    (requiredRole === "admin" && !isAdmin) ||
    (requiredRole === "editor" && !isEditor)
  ) {
    return null; // The useEffect will handle the redirect
  }

  // If authorized, render the children
  return <>{children}</>;
}
