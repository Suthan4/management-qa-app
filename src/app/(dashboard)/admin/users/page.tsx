import ProtectedRoute from "@components/routes/protectedRoutes";
import UserManagement from "@features/dashboard/admin/users/userManagement";
import React from "react";

export default function UsersPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <UserManagement />
    </ProtectedRoute>
  );
}
