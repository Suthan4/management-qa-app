"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/lib/types";
import {
  login as authLogin,
  signup as authSignup,
  logout as authLogout,
  getCurrentUser,
  AuthState,
} from "@/lib/auth";
import { useRouter } from "next/navigation";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<User>;
  signup: (name: string, email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Create context
const AuthContext = createContext<AuthContextType>({
  ...initialState,
  login: () => Promise.reject("Not implemented"),
  signup: () => Promise.reject("Not implemented"),
  logout: () => Promise.reject("Not implemented"),
});

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AuthState>(initialState);
 const route = useRouter();
  // Initialize: Check if user is already logged in
  useEffect(() => {
    const initAuth = () => {
      const user = getCurrentUser();

      setState({
        user,
        isAuthenticated: !!user,
        isLoading: false,
        error: null,
      });
    };

    initAuth();
  }, []);

  // Login handler
  const login = async (email: string, password: string) => {
    setState({
      ...state,
      isLoading: true,
      error: null,
    });

    try {
      const user = await authLogin(email, password);

      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return user;
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        error: error instanceof Error ? error.message : "Login failed",
      });

      throw error;
    }
  };

  // Signup handler
  const signup = async (name: string, email: string, password: string) => {
    setState({
      ...state,
      isLoading: true,
      error: null,
    });

    try {
      const user = await authSignup(name, email, password);

      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return user;
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        error: error instanceof Error ? error.message : "Signup failed",
      });

      throw error;
    }
  };

  // Logout handler
  const logout = async () => {
    setState({
      ...state,
      isLoading: true,
      error: null,
    });

    try {
      await authLogout();

      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
route.push("/")
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        error: error instanceof Error ? error.message : "Logout failed",
      });

      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
