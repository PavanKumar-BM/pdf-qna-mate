import { useState } from "react";
import { StudyMateHeader } from "@/components/StudyMateHeader";
import { PDFUploader } from "@/components/PDFUploader";
import { ChatInterface } from "@/components/ChatInterface";
import { SessionHistory } from "@/components/SessionHistory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, MessageCircle, History } from "lucide-react";

const Index = () => {
  const [hasDocuments] = useState(true); // Simulate having documents for demo

  return (
    <div className="min-h-screen hero-gradient">
      <StudyMateHeader />
      
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Upload & Documents */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <PDFUploader />
              <div className="hidden lg:block">
                <SessionHistory />
              </div>
            </div>
          </div>

          {/* Right Panel - Chat Interface */}
          <div className="lg:col-span-2">
            <div className="h-[calc(100vh-12rem)]">
              <ChatInterface hasDocuments={hasDocuments} />
            </div>
          </div>

          {/* Mobile History - Show in tabs on small screens */}
          <div className="lg:hidden col-span-1">
            <Tabs defaultValue="chat" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="chat" className="flex items-center space-x-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>Chat</span>
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center space-x-2">
                  <History className="h-4 w-4" />
                  <span>History</span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="chat">
                <ChatInterface hasDocuments={hasDocuments} />
              </TabsContent>
              <TabsContent value="history">
                <SessionHistory />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
