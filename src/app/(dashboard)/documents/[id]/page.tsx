import ProtectedRoute from "@components/routes/protectedRoutes";
import DocumentsDetail from "@features/dashboard/documents/documentsDetail";
import React from "react";

export default function DocumentDetailPage() {
  return (
    <ProtectedRoute>
      <DocumentsDetail />
    </ProtectedRoute>
  );
}
