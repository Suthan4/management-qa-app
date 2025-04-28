import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { Document } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { FileText, Clock, Tag } from 'lucide-react';
import { cva } from 'class-variance-authority';

const statusVariants = cva("", {
  variants: {
    status: {
      pending: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-600",
      processing: "bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-600",
      complete: "bg-green-500/20 text-green-700 dark:text-green-400 border-green-600",
      failed: "bg-red-500/20 text-red-700 dark:text-red-400 border-red-600",
    },
  },
  defaultVariants: {
    status: "pending",
  },
});

interface DocumentCardProps {
  document: Document;
  className?: string;
}

export function DocumentCard({ document, className }: DocumentCardProps) {
  const { id, title, description, fileName, fileSize, fileType, uploadedAt, status, tags } = document;
  
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
    <Card className={cn('transition-all hover:shadow-md', className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="line-clamp-1">{title}</CardTitle>
          <Badge className={cn("ml-2", statusVariants({ status }))}>{status}</Badge>
        </div>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center text-sm text-muted-foreground space-x-4">
          <div className="flex items-center">
            <FileText className="h-4 w-4 mr-1 opacity-70" />
            <span>{getDocumentType(fileType)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 opacity-70" />
            <span>{formatDistanceToNow(new Date(uploadedAt), { addSuffix: true })}</span>
          </div>
        </div>
        <div className="mt-4 flex items-start">
          <Tag className="h-4 w-4 mr-2 mt-0.5 opacity-70" />
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <div className="text-xs text-muted-foreground">
          {formatFileSize(fileSize)}
        </div>
        <Link
          href={`/documents/${id}`}
          className="text-xs font-medium text-primary hover:underline"
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
}