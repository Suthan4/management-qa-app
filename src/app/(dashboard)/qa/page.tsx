import { QAInterface } from '@/components/qa/QAInterface';

export default function QAPage() {
  return (
    <div className="pb-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Ask AI</h1>
        <p className="text-muted-foreground mt-1">
          Ask questions about your documents and get accurate answers
        </p>
      </div>
      
      <QAInterface />
    </div>
  );
}