
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { downloadSourceCode, processUploadedSourceCode, formatFileSize } from "@/utils/fileUtils";
import { Download, Upload, RefreshCw, Code, FileCode, CheckCircle, AlertCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const SourceCodeManager: React.FC = () => {
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);
  const [fileName, setFileName] = useState('ielts-master-pathway-source.zip');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<{
    success?: boolean;
    message?: string;
    files?: {name: string, path: string, size: number}[];
  } | null>(null);
  
  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const success = await downloadSourceCode(fileName);
      if (success) {
        toast({
          title: "Download Started",
          description: "Your source code package is being downloaded.",
          variant: "default",
        });
      } else {
        throw new Error("Failed to generate download");
      }
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Download Failed",
        description: "There was an error generating the source code package.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setUploadedFile(file);
    // Reset upload result when file changes
    setUploadResult(null);
  };
  
  const handleUpload = async () => {
    if (!uploadedFile) {
      toast({
        title: "No File Selected",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Process the uploaded file
      const result = await processUploadedSourceCode(uploadedFile);
      
      setUploadResult(result);
      
      toast({
        title: result.success ? "Upload Processed" : "Upload Failed",
        description: result.message,
        variant: result.success ? "default" : "destructive",
      });
    } catch (error) {
      console.error("Upload processing error:", error);
      
      setUploadResult({
        success: false,
        message: "Failed to process upload: " + (error instanceof Error ? error.message : "Unknown error")
      });
      
      toast({
        title: "Upload Processing Failed",
        description: "There was an error processing the uploaded file.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Source Code Management</h2>
      </div>
      
      <Tabs defaultValue="download" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="download">Download Source Code</TabsTrigger>
          <TabsTrigger value="upload">Upload to Website</TabsTrigger>
        </TabsList>
        
        <TabsContent value="download" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Download Source Code</CardTitle>
              <CardDescription>
                Download a packaged version of the application source code.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="filename">File Name</Label>
                <Input 
                  id="filename" 
                  value={fileName} 
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="Enter file name"
                />
              </div>
              
              <div className="rounded-md bg-muted p-4">
                <div className="flex items-center gap-3">
                  <FileCode className="h-5 w-5 text-muted-foreground" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Source Code Package</p>
                    <p className="text-sm text-muted-foreground">
                      Includes all necessary files to run the application
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleDownload} 
                disabled={isDownloading}
                className="w-full"
              >
                {isDownloading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Download Source Code
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="upload" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload to Website</CardTitle>
              <CardDescription>
                Upload the modified source code to your website. 
                You can upload the ZIP file you downloaded from GitHub or this application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="upload-file">Source Code Package</Label>
                <Input 
                  id="upload-file" 
                  type="file" 
                  accept=".zip"
                  onChange={handleFileChange}
                />
                {uploadedFile && (
                  <p className="text-sm text-muted-foreground">
                    {uploadedFile.name} ({formatFileSize(uploadedFile.size)})
                  </p>
                )}
              </div>
              
              {uploadResult && (
                <div className={`rounded-md ${uploadResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'} p-4 mt-4`}>
                  <div className="flex items-center gap-3">
                    {uploadResult.success ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {uploadResult.success ? 'Upload Processed Successfully' : 'Upload Processing Failed'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {uploadResult.message}
                      </p>
                    </div>
                  </div>
                  
                  {uploadResult.success && uploadResult.files && uploadResult.files.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">Files in package:</p>
                      <ScrollArea className="h-40 rounded border p-2">
                        <ul className="text-sm">
                          {uploadResult.files.map((file, index) => (
                            <li key={index} className="py-1 border-b last:border-0">
                              <div className="flex justify-between">
                                <span className="font-mono">{file.path}</span>
                                <span className="text-muted-foreground">{formatFileSize(file.size)}</span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </ScrollArea>
                    </div>
                  )}
                </div>
              )}
              
              <div className="rounded-md bg-muted p-4">
                <div className="flex items-center gap-3">
                  <Code className="h-5 w-5 text-muted-foreground" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">GitHub Downloads</p>
                    <p className="text-sm text-muted-foreground">
                      You can upload a ZIP file downloaded directly from GitHub or exported from this application
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleUpload} 
                disabled={isUploading || !uploadedFile}
                className="w-full"
              >
                {isUploading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Process Upload
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SourceCodeManager;
