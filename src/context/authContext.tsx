"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "editor";
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  signup: (
    name: string,
    email: string,
    password: string,
    role: string
  ) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAdmin: boolean;
  isEditor: boolean;
  isUser: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter()

  useEffect(() => {
    // Check for saved user data in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    try {
      // In a real app, you would verify credentials on the server
      // For this demo, we'll fetch users and find a match
      const response = await axios.get(
        "https://6789c95bdd587da7ac27a32b.mockapi.io/users"
      );
      const users = response.data;

      const matchedUser = users.find(
        (u: any) => u.email === email && u.password === password
      );

      if (!matchedUser) {
        throw new Error("Invalid email or password");
      }

      // Create user object with necessary data
      const loggedInUser: User = {
        id: matchedUser.id,
        name: matchedUser.name,
        email: matchedUser.email,
        role: matchedUser.role || "user", // Default to 'user' if role is not present
      };

      // Save to state and localStorage
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));

      return loggedInUser;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    role: string
  ) => {
    // This function is implemented in the SignupForm component
    // But we define it here for completeness
    try {
      const response = await axios.post(
        "https://6789c95bdd587da7ac27a32b.mockapi.io/users",
        {
          name,
          email,
          password,
          role,
        }
      );

      return response.data;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  const logout = () => {
    router.push("/");
    setUser(null);
    localStorage.removeItem("user");

  };

  // Role-based helper properties
  const isAdmin = user?.role === "admin";
  const isEditor = user?.role === "editor" || user?.role === "admin"; // Admins can do what editors can
  const isUser = !!user; // Anyone logged in is at least a user

  const value = {
    user,
    login,
    signup,
    logout,
    isLoading,
    isAdmin,
    isEditor,
    isUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
