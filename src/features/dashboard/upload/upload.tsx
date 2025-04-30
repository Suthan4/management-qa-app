'use client';

import { FileUploader } from '@/components/documents/FileUploader';

export default function Upload() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Upload Document</h1>
        <p className="text-muted-foreground mt-1">
          Upload a document to add to your library
        </p>
      </div>
      
      <FileUploader />
    </div>
  );
}