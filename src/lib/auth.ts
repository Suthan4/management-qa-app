// Authentication utilities
import { User } from "./types";
import { mockUsers } from "./mock-data";

// Interface for auth state
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Mock login function
export async function login(email: string, password: string): Promise<User> {
  const user = mockUsers.find((u) => u.email === email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Store the user in localStorage to persist the session
  localStorage.setItem("currentUser", JSON.stringify(user));

  return user;
}

// Mock signup function
export async function signup(
  name: string,
  email: string,
  password: string
): Promise<User> {
  // Check if user already exists
  const existingUser = mockUsers.find((u) => u.email === email);

  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  // Create a new user
  const newUser: User = {
    id: `${mockUsers.length + 1}`,
    email,
    name,
    role: "user", // Default role
    createdAt: new Date().toISOString(),
  };



  // Store the user in localStorage
  localStorage.setItem("currentUser", JSON.stringify(newUser));

  return newUser;
}

// Logout function
export async function logout(): Promise<void> {
  // Clear the localStorage
  localStorage.removeItem("currentUser");
  return Promise.resolve();
}

// Function to get the current user
export function getCurrentUser(): User | null {
  if (typeof window === "undefined") {
    return null;
  }

  const userJson = localStorage.getItem("currentUser");

  if (!userJson) {
    return null;
  }

  try {
    return JSON.parse(userJson) as User;
  } catch (e) {
    console.error("Failed to parse user from localStorage", e);
    return null;
  }
}
