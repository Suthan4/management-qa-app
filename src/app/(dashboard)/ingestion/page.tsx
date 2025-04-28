'use client';

import { useEffect, useState } from 'react';
import { getIngestionJobs } from '@/lib/mock-data';
import { IngestionJob } from '@/lib/types';
import { IngestionList } from '@/components/ingestion/IngestionList';

export default function IngestionPage() {
  const [jobs, setJobs] = useState<IngestionJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const data = await getIngestionJobs();
      setJobs(data);
    } catch (error) {
      console.error('Failed to fetch ingestion jobs:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchJobs();
    
    // Set up an interval to refresh the list
    const intervalId = setInterval(() => {
      fetchJobs();
    }, 5000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Ingestion Management</h1>
        <p className="text-muted-foreground mt-1">
          Monitor and manage document ingestion processes
        </p>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-20">
          <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : (
        <IngestionList jobs={jobs} onRefresh={fetchJobs} />
      )}
    </div>
  );
}