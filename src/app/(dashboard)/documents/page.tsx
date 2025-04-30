import ProtectedRoute from "@components/routes/protectedRoutes";
import Documents from "@features/dashboard/documents/documents";
import React from "react";

export default function DocumentsPage() {
  return (
    <ProtectedRoute>
      <Documents />
    </ProtectedRoute>
  );
}
