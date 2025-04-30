import ProtectedRoute from "@components/routes/protectedRoutes";
import Upload from "@features/dashboard/upload/upload";
import React from "react";

export default function UploadPage() {
  return (
    <ProtectedRoute>
      <Upload />
    </ProtectedRoute>
  );
}
