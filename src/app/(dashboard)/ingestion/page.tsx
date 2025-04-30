import ProtectedRoute from "@components/routes/protectedRoutes";
import Ingestion from "@features/dashboard/ingestion/ingestion";
import React from "react";

export default function IngestionPage() {
  return (
    <ProtectedRoute>
      <Ingestion />
    </ProtectedRoute>
  );
}
