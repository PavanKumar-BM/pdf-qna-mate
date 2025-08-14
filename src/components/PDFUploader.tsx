import { useState, useCallback } from "react";
import { FileText, Upload, X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  status: 'uploading' | 'processed' | 'error';
}

export const PDFUploader = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const processFiles = useCallback((fileList: FileList) => {
    const newFiles: UploadedFile[] = Array.from(fileList)
      .filter(file => file.type === 'application/pdf')
      .map(file => ({
        id: crypto.randomUUID(),
        name: file.name,
        size: file.size,
        status: 'uploading' as const
      }));

    if (newFiles.length === 0) {
      toast({
        title: "Invalid file type",
        description: "Please upload PDF files only.",
        variant: "destructive"
      });
      return;
    }

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate processing
    newFiles.forEach(file => {
      setTimeout(() => {
        setFiles(prev => prev.map(f => 
          f.id === file.id ? { ...f, status: 'processed' } : f
        ));
        toast({
          title: "PDF processed",
          description: `${file.name} is ready for questions!`
        });
      }, 2000 + Math.random() * 1000);
    });
  }, [toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  }, [processFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  }, [processFiles]);

  const removeFile = useCallback((fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  }, []);

  const formatFileSize = (bytes: number) => {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6">
      <Card className={`card-gradient border-2 border-dashed transition-all duration-300 ${
        dragActive 
          ? 'border-primary bg-primary/5 shadow-glow' 
          : 'border-border hover:border-primary/50'
      }`}>
        <div
          className="p-8 text-center"
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ai-gradient shadow-glow">
            <Upload className="h-8 w-8 text-white" />
          </div>
          
          <h3 className="mb-2 text-xl font-semibold">Upload Your Study Materials</h3>
          <p className="mb-4 text-muted-foreground">
            Drag and drop your PDF files here, or click to browse
          </p>
          
          <input
            type="file"
            id="file-upload"
            className="hidden"
            multiple
            accept=".pdf"
            onChange={handleFileInput}
          />
          
          <Button 
            asChild
            className="ai-gradient border-0 shadow-elegant hover:shadow-glow transition-all"
          >
            <label htmlFor="file-upload" className="cursor-pointer">
              Choose PDF Files
            </label>
          </Button>
          
          <p className="mt-3 text-sm text-muted-foreground">
            Supports: PDF files up to 10MB each
          </p>
        </div>
      </Card>

      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-lg font-semibold">Uploaded Documents</h4>
          {files.map((file) => (
            <Card key={file.id} className="p-4 shadow-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {file.status === 'uploading' && (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
                  )}
                  {file.status === 'processed' && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};