import { BookOpen, Brain, Sparkles } from "lucide-react";

export const StudyMateHeader = () => {
  return (
    <header className="bg-card border-b border-border shadow-card">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="ai-gradient p-2 rounded-xl shadow-glow">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-accent animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                StudyMate
              </h1>
              <p className="text-sm text-muted-foreground">AI-Powered PDF Q&A Assistant</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Brain className="h-4 w-4" />
            <span className="text-sm font-medium">Powered by AI</span>
          </div>
        </div>
      </div>
    </header>
  );
};