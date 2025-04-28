'use client';

import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/useToast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Send, MessageSquare, Loader2, Copy, CheckCheck, Info } from 'lucide-react';
import { answerQuery } from '@/lib/mock-data';
import { QAQuery, DocumentSource } from '@/lib/types';
import { useAuth } from '@/context/authContext';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export function QAInterface() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const [conversation, setConversation] = useState<QAQuery[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [conversation]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim() || isLoading) return;
    
    const userQuery: QAQuery = {
      id: `temp-${Date.now()}`,
      question: query,
      userId: user?.id || 'unknown',
      createdAt: new Date().toISOString(),
    };
    
    setConversation(prev => [...prev, userQuery]);
    setIsLoading(true);
    setQuery('');
    
    try {
      // In a real app, we would send the query to an API
      // Here we're using our mock function
      const response = await answerQuery(userQuery.id, userQuery.question);
      
      setConversation(prev => [
        ...prev.filter(q => q.id !== userQuery.id),
        userQuery,
        response,
      ]);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to get an answer. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCopyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      },
      () => {
        toast({
          title: 'Copy failed',
          description: 'Failed to copy text to clipboard',
          });
      }
    );
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-10rem)]">
      <div className="flex-1 overflow-auto pb-4 pr-2 space-y-6">
        {conversation.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Ask me anything about your documents</h3>
            <p className="text-muted-foreground max-w-md">
              I'm your AI assistant trained on your documents. Ask me questions and I'll provide answers
              with references to the source documents.
            </p>
          </div>
        ) : (
          conversation.map((message, index) => (
            <div
              key={`${message.id}-${index}`}
              className={cn(
                "flex items-start max-w-4xl mx-auto transition-opacity",
                message.answer ? "animate-in fade-in" : ""
              )}
            >
              {/* Avatar */}
              <div 
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0",
                  message.answer 
                    ? "bg-primary/10 text-primary" 
                    : "bg-secondary text-secondary-foreground"
                )}
              >
                {message.answer ? (
                  <MessageSquare className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-semibold">
                    {user?.name?.substring(0, 2) || 'U'}
                  </span>
                )}
              </div>
              
              {/* Message Content */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center">
                  <span className="font-medium text-sm">
                    {message.answer ? 'AI Assistant' : user?.name || 'User'}
                  </span>
                </div>
                
                {/* Message Body */}
                <div className="relative group">
                  <div className={cn(
                    "p-4 rounded-lg prose prose-sm max-w-none",
                    message.answer 
                      ? "bg-card border shadow-sm" 
                      : "bg-muted"
                  )}>
                    <p>{message.answer || message.question}</p>
                    
                    {/* Sources */}
                    {message.answer && message.sources && message.sources.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-muted">
                        <h4 className="text-sm font-medium flex items-center gap-1 mb-2">
                          <Info className="h-4 w-4" />
                          Sources
                        </h4>
                        <div className="space-y-2">
                          {message.sources.map((source: DocumentSource, sourceIndex: number) => (
                            <div key={sourceIndex} className="bg-muted/50 p-2 rounded text-xs">
                              <div className="font-medium mb-1">{source.documentTitle}</div>
                              <p className="italic text-muted-foreground">"{source.excerpt}"</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Copy Button */}
                  {message.answer && (
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleCopyToClipboard(message.answer!, index)}
                            >
                              {copiedIndex === index ? (
                                <CheckCheck className="h-4 w-4 text-green-500" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                              <span className="sr-only">Copy</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{copiedIndex === index ? 'Copied!' : 'Copy to clipboard'}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="flex items-start max-w-4xl mx-auto animate-in fade-in">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-primary">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <span className="font-medium text-sm">AI Assistant</span>
              </div>
              <div className="p-4 mt-2 rounded-lg bg-card border shadow-sm">
                <div className="flex space-x-2 items-center">
                  <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  <span className="text-sm text-muted-foreground ml-2">Generating answer...</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t pt-4">
        <form onSubmit={handleSubmit} className="relative">
          <Textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a question about your documents..."
            className="resize-none pr-14 min-h-[80px]"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-4 bottom-3"
            disabled={!query.trim() || isLoading}
          >
            <Send className="h-5 w-5" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
        <div className="text-xs text-muted-foreground mt-2 text-center">
          AI responses are generated based on your uploaded documents.
        </div>
      </div>
    </div>
  );
}