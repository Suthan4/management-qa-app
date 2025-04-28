'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getDocument } from '@/lib/mock-data';
import { Document } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  ArrowLeft, 
  Clock, 
  Download, 
  FileText, 
  MessageSquare, 
  Tag, 
  Trash2, 
  User 
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@hooks/useToast';




export default function DocumentDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { toast } = useToast();
  const [document, setDocument] = useState<Document | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!params.id) return;
    const fetchDocument = async () => {
      try {
        const doc = await getDocument(params?.id);
        setDocument(doc);
      } catch (error) {
        console.error('Failed to fetch document:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDocument();
  }, [params.id]);
  
  const handleDelete = () => {
    // In a real app, we would make an API call to delete the document
    toast({
      title: 'Document deleted',
      description: 'The document has been successfully deleted',
    });
    router.push('/documents');
  };
  
  const handleDownload = () => {
    // In a real app, we would download the actual file
    toast({
      title: 'Download started',
      description: 'Your document is being downloaded',
    });
  };
  
  const handleAskAI = () => {
    router.push('/qa');
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }
  
  if (!document) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-2">Document Not Found</h2>
        <p className="text-muted-foreground mb-6">The document you are looking for does not exist.</p>
        <Button asChild>
          <a href="/documents">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Documents
          </a>
        </Button>
      </div>
    );
  }
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-600';
      case 'processing':
        return 'bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-600';
      case 'complete':
        return 'bg-green-500/20 text-green-700 dark:text-green-400 border-green-600';
      case 'failed':
        return 'bg-red-500/20 text-red-700 dark:text-red-400 border-red-600';
      default:
        return '';
    }
  };
  
  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  // Format document type from mime type
  const getDocumentType = (mimeType: string): string => {
    if (mimeType.includes('pdf')) return 'PDF';
    if (mimeType.includes('word')) return 'Word';
    if (mimeType.includes('spreadsheet') || mimeType.includes('excel')) return 'Excel';
    if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) return 'PowerPoint';
    if (mimeType.includes('text')) return 'Text';
    return 'Document';
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <Button 
        variant="ghost" 
        className="mb-8" 
        onClick={() => router.push('/documents')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Documents
      </Button>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{document.title}</CardTitle>
                  <CardDescription className="mt-1">{document.description}</CardDescription>
                </div>
                <Badge className={cn("ml-2", getStatusClass(document.status))}>{document.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 gap-y-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">File Name</p>
                  <p className="font-medium">{document.fileName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">File Type</p>
                  <p className="font-medium">{getDocumentType(document.fileType)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">File Size</p>
                  <p className="font-medium">{formatFileSize(document.fileSize)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Upload Date</p>
                  <p className="font-medium">{format(new Date(document.uploadedAt), 'PPP')}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <p className="text-sm text-muted-foreground mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {document.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button variant="outline" onClick={handleDelete}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
              <div className="space-x-2">
                <Button variant="outline" onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button onClick={handleAskAI}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Ask AI
                </Button>
              </div>
            </CardFooter>
          </Card>
          
          {/* Document Preview Card (placeholder) */}
          <Card>
            <CardHeader>
              <CardTitle>Document Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg h-80 flex items-center justify-center">
                <div className="text-center">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground/60" />
                  <p className="text-muted-foreground">
                    Preview not available for this document.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Activity Card */}
          <Card>
            <CardHeader>
              <CardTitle>Activity</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-3 bg-primary/10 p-2 rounded-full">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Document uploaded</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(document.uploadedAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 bg-primary/10 p-2 rounded-full">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Processing started</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(document.uploadedAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
                
                {document.status === 'complete' && (
                  <div className="flex items-start">
                    <div className="mr-3 bg-primary/10 p-2 rounded-full">
                      <CheckIcon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Processing completed</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(document.uploadedAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Related Documents Card */}
          <Card>
            <CardHeader>
              <CardTitle>Related Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                No related documents found.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}