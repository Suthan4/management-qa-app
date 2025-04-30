"use client";

import { useEffect, useState } from "react";
import { getDocuments } from "@/lib/mock-data";
import { Document } from "@/lib/types";
import { DocumentGrid } from "@/components/documents/DocumentGrid";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Upload } from "lucide-react";
import Link from "next/link";

export default function Documents() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const docs = await getDocuments();
        setDocuments(docs);
      } catch (error) {
        console.error("Failed to fetch documents:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
          <p className="text-muted-foreground mt-1">
            Manage and organize your uploaded documents
          </p>
        </div>
        <Button asChild>
          <Link href="/upload">
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <DocumentsLoading />
      ) : (
        <DocumentGrid documents={documents} />
      )}
    </div>
  );
}

function DocumentsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-40" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-40 w-full rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
