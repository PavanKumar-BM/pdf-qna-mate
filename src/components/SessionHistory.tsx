import { useState } from "react";
import { History, Download, Trash2, MessageCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Session {
  id: string;
  title: string;
  date: Date;
  questionCount: number;
  documents: string[];
  preview: string;
}

export const SessionHistory = () => {
  const { toast } = useToast();
  const [sessions] = useState<Session[]>([
    {
      id: "1",
      title: "Advanced Calculus Study Session",
      date: new Date(2024, 1, 15),
      questionCount: 12,
      documents: ["Calculus_Textbook.pdf", "Problem_Set_3.pdf"],
      preview: "What is the derivative of x^2 sin(x)? How do you solve integration by parts..."
    },
    {
      id: "2", 
      title: "Molecular Biology Review",
      date: new Date(2024, 1, 14),
      questionCount: 8,
      documents: ["Bio_Lecture_Notes.pdf"],
      preview: "Explain the process of protein synthesis. What are the differences between..."
    },
    {
      id: "3",
      title: "Physics Mechanics Problems",
      date: new Date(2024, 1, 13),
      questionCount: 15,
      documents: ["Physics_Ch4.pdf", "Practice_Problems.pdf", "Lab_Manual.pdf"],
      preview: "Calculate the acceleration of a 5kg object. What is Newton's second law..."
    }
  ]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleDownload = (sessionId: string) => {
    toast({
      title: "Download started",
      description: "Session history is being prepared for download."
    });
  };

  const handleDelete = (sessionId: string) => {
    toast({
      title: "Session deleted",
      description: "Study session has been removed from history."
    });
  };

  if (sessions.length === 0) {
    return (
      <Card className="p-8 text-center card-gradient">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <History className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="mb-2 text-xl font-semibold">No Study Sessions Yet</h3>
        <p className="text-muted-foreground">
          Your Q&A history will appear here after you start asking questions.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <History className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Study History</h3>
        </div>
        <Badge variant="secondary">
          {sessions.length} sessions
        </Badge>
      </div>

      <ScrollArea className="h-[600px]">
        <div className="space-y-3">
          {sessions.map((session) => (
            <Card key={session.id} className="p-4 shadow-card hover:shadow-elegant transition-smooth">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h4 className="font-semibold text-card-foreground">
                      {session.title}
                    </h4>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(session.date)}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MessageCircle className="h-3 w-3" />
                        <span>{session.questionCount} questions</span>
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(session.id)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(session.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {session.preview}
                  </p>
                  
                  <div className="flex flex-wrap gap-1">
                    {session.documents.map((doc, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {doc}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};