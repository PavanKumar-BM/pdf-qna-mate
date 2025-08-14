import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, FileText, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  sources?: {
    document: string;
    page: number;
    snippet: string;
  }[];
}

interface ChatInterfaceProps {
  hasDocuments: boolean;
}

export const ChatInterface = ({ hasDocuments }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || !hasDocuments || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: crypto.randomUUID(),
        type: 'ai',
        content: `I understand you're asking about "${input.trim()}". Based on your uploaded documents, here's what I found:

This is a comprehensive explanation that would be generated from your PDF documents. The AI would analyze the content and provide contextual answers with specific references to the source material.

Key points:
• Detailed explanation based on document content
• Cross-referenced information from multiple sources
• Academic context and examples`,
        timestamp: new Date(),
        sources: [
          {
            document: "Lecture_Notes_Chapter_5.pdf",
            page: 23,
            snippet: "This concept is fundamental to understanding..."
          },
          {
            document: "Textbook_Advanced_Topics.pdf", 
            page: 156,
            snippet: "Research shows that this approach yields..."
          }
        ]
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!hasDocuments) {
    return (
      <Card className="p-12 text-center card-gradient">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Bot className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="mb-2 text-xl font-semibold">Ready to Help!</h3>
        <p className="text-muted-foreground">
          Upload your PDF documents to start asking questions and get AI-powered answers.
        </p>
      </Card>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4 flex items-center space-x-2">
        <Bot className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">AI Assistant</h3>
        <Badge variant="secondary" className="ml-auto">
          {messages.length / 2} questions asked
        </Badge>
      </div>

      <Card className="flex-1 flex flex-col shadow-card">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Bot className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Ask me anything about your uploaded documents!</p>
                <p className="text-sm mt-1">I'll provide detailed answers with source references.</p>
              </div>
            )}
            
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] space-y-2`}>
                  <div className="flex items-center space-x-2">
                    {message.type === 'user' ? (
                      <User className="h-4 w-4 text-primary ml-auto" />
                    ) : (
                      <Bot className="h-4 w-4 text-accent" />
                    )}
                    <span className="text-xs text-muted-foreground flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatTime(message.timestamp)}</span>
                    </span>
                  </div>
                  
                  <div className={`px-4 py-3 transition-smooth ${
                    message.type === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'
                  }`}>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>

                  {message.sources && message.sources.length > 0 && (
                    <div className="space-y-2 mt-2">
                      <p className="text-xs font-medium text-muted-foreground flex items-center space-x-1">
                        <FileText className="h-3 w-3" />
                        <span>Sources:</span>
                      </p>
                      {message.sources.map((source, idx) => (
                        <Card key={idx} className="p-2 bg-secondary/50 border-secondary">
                          <div className="text-xs">
                            <p className="font-medium text-secondary-foreground">
                              {source.document} - Page {source.page}
                            </p>
                            <p className="text-muted-foreground mt-1 italic">
                              "{source.snippet}..."
                            </p>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%]">
                  <div className="flex items-center space-x-2 mb-2">
                    <Bot className="h-4 w-4 text-accent" />
                    <span className="text-xs text-muted-foreground">Thinking...</span>
                  </div>
                  <div className="chat-bubble-ai px-4 py-3">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </ScrollArea>

        <div className="border-t p-4">
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a question about your documents..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="ai-gradient border-0 shadow-elegant hover:shadow-glow transition-all"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Press Enter to send • Shift+Enter for new line
          </p>
        </div>
      </Card>
    </div>
  );
};