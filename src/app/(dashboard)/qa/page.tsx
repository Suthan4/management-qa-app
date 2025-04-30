import ProtectedRoute from "@components/routes/protectedRoutes";
import Faq from "@features/dashboard/qa/faq";
import React from "react";

export default function QAPage() {
  return (
    <ProtectedRoute>
      <Faq />
    </ProtectedRoute>
  );
}
