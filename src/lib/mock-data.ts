import {
  Document,
  DocumentStatus,
  IngestionJob,
  QAQuery,
  User,
  UserRole,
} from "./types";
import { v4 as uuidv4 } from "uuid";

// Mock users
export const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@example.com",
    name: "Admin User",
    role: "admin" as UserRole,
    createdAt: new Date(2023, 0, 15).toISOString(),
  },
  {
    id: "2",
    email: "user@example.com",
    name: "Regular User",
    role: "user" as UserRole,
    createdAt: new Date(2023, 1, 20).toISOString(),
  },
  {
    id: "3",
    email: "guest@example.com",
    name: "Guest User",
    role: "guest" as UserRole,
    createdAt: new Date(2023, 2, 25).toISOString(),
  },
];

// Mock documents
export const mockDocuments: Document[] = [
  {
    id: "1",
    title: "Annual Report 2023",
    description: "Financial and operational performance for fiscal year 2023",
    fileName: "annual_report_2023.pdf",
    fileSize: 3145728, // 3MB
    fileType: "application/pdf",
    uploadedBy: "1",
    uploadedAt: new Date(2023, 11, 15).toISOString(),
    status: "complete" as DocumentStatus,
    tags: ["finance", "report", "annual"],
  },
  {
    id: "2",
    title: "Product Roadmap",
    description: "Strategic product roadmap for next 12 months",
    fileName: "product_roadmap_2024.docx",
    fileSize: 2097152, // 2MB
    fileType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    uploadedBy: "1",
    uploadedAt: new Date(2023, 10, 10).toISOString(),
    status: "complete" as DocumentStatus,
    tags: ["product", "strategy", "roadmap"],
  },
  {
    id: "3",
    title: "Customer Survey Results",
    description: "Analysis of customer satisfaction survey Q4 2023",
    fileName: "customer_survey_q4_2023.xlsx",
    fileSize: 1048576, // 1MB
    fileType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    uploadedBy: "2",
    uploadedAt: new Date(2023, 9, 5).toISOString(),
    status: "processing" as DocumentStatus,
    tags: ["customer", "survey", "analysis"],
  },
  {
    id: "4",
    title: "Legal Contract Template",
    description: "Standard legal contract template for vendors",
    fileName: "legal_contract_template.pdf",
    fileSize: 524288, // 512KB
    fileType: "application/pdf",
    uploadedBy: "1",
    uploadedAt: new Date(2023, 8, 1).toISOString(),
    status: "pending" as DocumentStatus,
    tags: ["legal", "contract", "template"],
  },
];

// Mock ingestion jobs
export const mockIngestionJobs: IngestionJob[] = [
  {
    id: "1",
    documentId: "1",
    status: "complete" as DocumentStatus,
    progress: 100,
    startedAt: new Date(2023, 11, 15, 10, 30).toISOString(),
    completedAt: new Date(2023, 11, 15, 10, 45).toISOString(),
  },
  {
    id: "2",
    documentId: "2",
    status: "complete" as DocumentStatus,
    progress: 100,
    startedAt: new Date(2023, 10, 10, 14, 15).toISOString(),
    completedAt: new Date(2023, 10, 10, 14, 25).toISOString(),
  },
  {
    id: "3",
    documentId: "3",
    status: "processing" as DocumentStatus,
    progress: 65,
    startedAt: new Date(2023, 9, 5, 9, 0).toISOString(),
  },
  {
    id: "4",
    documentId: "4",
    status: "pending" as DocumentStatus,
    progress: 0,
    startedAt: new Date(2023, 8, 1, 11, 45).toISOString(),
  },
];

// Mock Q&A queries
export const mockQueries: QAQuery[] = [
  {
    id: "1",
    question: "What were the financial highlights from the 2023 annual report?",
    answer:
      "The 2023 annual report showed a 15% increase in revenue compared to 2022, with total revenue reaching $45.2 million. Operating profits increased by 12% to $9.8 million, while net profit margin remained stable at 21.7%. The company also reported a reduction in debt by $5 million and an increase in R&D spending by 18%.",
    userId: "2",
    createdAt: new Date(2023, 11, 20, 13, 30).toISOString(),
    sources: [
      {
        documentId: "1",
        documentTitle: "Annual Report 2023",
        excerpt:
          "Financial highlights include a 15% year-over-year revenue growth to $45.2 million and 12% increase in operating profits to $9.8 million.",
        relevanceScore: 0.95,
      },
      {
        documentId: "1",
        documentTitle: "Annual Report 2023",
        excerpt:
          "The company maintained a healthy net profit margin of 21.7% while reducing overall debt by $5 million.",
        relevanceScore: 0.88,
      },
    ],
  },
  {
    id: "2",
    question:
      "What are the key features planned in the product roadmap for Q2 2024?",
    answer:
      "The Q2 2024 product roadmap focuses on three key features: 1) Implementation of AI-powered recommendations, 2) Redesign of the user dashboard for improved UX, and 3) Introduction of a new mobile app with offline capabilities. The AI recommendations feature is scheduled for April, the dashboard redesign for May, and the mobile app release for June.",
    userId: "1",
    createdAt: new Date(2023, 11, 12, 10, 15).toISOString(),
    sources: [
      {
        documentId: "2",
        documentTitle: "Product Roadmap",
        excerpt:
          "Q2 2024 will see the rollout of our AI-powered recommendation engine in April, followed by a complete redesign of the user dashboard in May.",
        relevanceScore: 0.92,
      },
      {
        documentId: "2",
        documentTitle: "Product Roadmap",
        excerpt:
          "June 2024 is targeted for the release of our new mobile application with comprehensive offline capabilities.",
        relevanceScore: 0.87,
      },
    ],
  },
];

// Helper functions to mimic API operations
export function getUsers() {
  return Promise.resolve([...mockUsers]);
}

export function getUser(id: string) {
  const user = mockUsers.find((u) => u.id === id);
  return Promise.resolve(user ? { ...user } : null);
}

export function createUser(userData: Omit<User, "id" | "createdAt">) {
  const newUser = {
    ...userData,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };
  return Promise.resolve({ ...newUser });
}

export function getDocuments() {
  return Promise.resolve([...mockDocuments]);
}

export function getDocument(id: string) {
  const document = mockDocuments.find((d) => d.id === id);
  return Promise.resolve(document ? { ...document } : null);
}

export function createDocument(
  documentData: Omit<Document, "id" | "uploadedAt" | "status">
) {
  const newDocument = {
    ...documentData,
    id: uuidv4(),
    uploadedAt: new Date().toISOString(),
    status: "pending" as DocumentStatus,
  };
  return Promise.resolve({ ...newDocument });
}

export function getIngestionJobs() {
  return Promise.resolve([...mockIngestionJobs]);
}

export function getIngestionJob(id: string) {
  const job = mockIngestionJobs.find((j) => j.id === id);
  return Promise.resolve(job ? { ...job } : null);
}

export function createIngestionJob(documentId: string) {
  const newJob = {
    id: uuidv4(),
    documentId,
    status: "pending" as DocumentStatus,
    progress: 0,
    startedAt: new Date().toISOString(),
  };
  return Promise.resolve({ ...newJob });
}

export function getQueries() {
  return Promise.resolve([...mockQueries]);
}

export function getQuery(id: string) {
  const query = mockQueries.find((q) => q.id === id);
  return Promise.resolve(query ? { ...query } : null);
}

export function createQuery(
  queryData: Omit<QAQuery, "id" | "answer" | "createdAt" | "sources">
) {
  const newQuery = {
    ...queryData,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };
  return Promise.resolve({ ...newQuery });
}

export function answerQuery(id: string, question: string) {
  // This is where we would connect to an AI service
  // For now, we'll return a mock response based on the question

  let answer = "";
  let sources:any = [];

  if (
    question.toLowerCase().includes("financial") ||
    question.toLowerCase().includes("report")
  ) {
    answer =
      "The 2023 annual report showed a 15% increase in revenue compared to 2022, with total revenue reaching $45.2 million. Operating profits increased by 12% to $9.8 million.";
    sources = [
      {
        documentId: "1",
        documentTitle: "Annual Report 2023",
        excerpt:
          "Financial highlights include a 15% year-over-year revenue growth to $45.2 million and 12% increase in operating profits to $9.8 million.",
        relevanceScore: 0.95,
      },
    ];
  } else if (
    question.toLowerCase().includes("product") ||
    question.toLowerCase().includes("roadmap")
  ) {
    answer =
      "The Q2 2024 product roadmap focuses on three key features: 1) Implementation of AI-powered recommendations, 2) Redesign of the user dashboard for improved UX, and 3) Introduction of a new mobile app with offline capabilities.";
    sources = [
      {
        documentId: "2",
        documentTitle: "Product Roadmap",
        excerpt:
          "Q2 2024 will see the rollout of our AI-powered recommendation engine in April, followed by a complete redesign of the user dashboard in May.",
        relevanceScore: 0.92,
      },
    ];
  } else if (
    question.toLowerCase().includes("customer") ||
    question.toLowerCase().includes("survey")
  ) {
    answer =
      "The Q4 2023 customer survey showed an overall satisfaction score of 8.7/10, a 0.5 point improvement from Q3. The highest rated features were ease of use (9.2/10) and customer support (9.0/10).";
    sources = [
      {
        documentId: "3",
        documentTitle: "Customer Survey Results",
        excerpt:
          "Overall satisfaction reached 8.7/10 in Q4, with ease of use (9.2) and customer support (9.0) being the highest rated aspects.",
        relevanceScore: 0.91,
      },
    ];
  } else {
    answer =
      "I couldn't find specific information about that in the available documents. Please try a different question or upload relevant documents.";
    sources = [];
  }

  return Promise.resolve({
    id,
    question,
    answer,
    createdAt: new Date().toISOString(),
    sources,
  });
}
