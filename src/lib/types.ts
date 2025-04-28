
// User related types
export type UserRole = "admin" | "user" | "guest";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
}

// Document related types
export type DocumentStatus = "pending" | "processing" | "complete" | "failed";

export interface Document {
  id: string;
  title: string;
  description: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadedBy: string;
  uploadedAt: string;
  status: DocumentStatus;
  tags: string[];
}

// Ingestion related types
export interface IngestionJob {
  id: string;
  documentId: string;
  status: DocumentStatus;
  progress: number;
  startedAt: string;
  completedAt?: string;
  error?: string;
}

// Q&A related types
export interface QAQuery {
  id: string;
  question: string;
  answer?: string;
  userId?: string;
  createdAt: string;
  sources?: DocumentSource[]
}

export interface DocumentSource {
  documentId: string;
  documentTitle: string;
  excerpt: string;
  relevanceScore: number;
}
