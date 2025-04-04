
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { downloadSourceCode } from "@/utils/fileUtils";
import { Download, Upload, RefreshCw, Code, FileCode } from "lucide-react";

const SourceCodeManager: React.FC = () => {
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);
  const [fileName, setFileName] = useState('ielts-master-pathway-source.zip');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
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
  };
  
  const handleUpload = () => {
    if (!uploadedFile) {
      toast({
        title: "No File Selected",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      toast({
        title: "Upload Successful",
        description: `${uploadedFile.name} has been uploaded successfully.`,
        variant: "default",
      });
      setIsUploading(false);
      setUploadedFile(null);
    }, 2000);
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
                    {uploadedFile.name} ({(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB)
                  </p>
                )}
              </div>
              
              <div className="rounded-md bg-muted p-4">
                <div className="flex items-center gap-3">
                  <Code className="h-5 w-5 text-muted-foreground" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Website Deployment</p>
                    <p className="text-sm text-muted-foreground">
                      The file will be extracted and deployed to your website
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
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload to Website
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
