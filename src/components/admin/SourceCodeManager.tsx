
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { 
  downloadSourceCode, 
  processUploadedSourceCode, 
  formatFileSize,
  verifyDomainCompatibility,
  generateInstallationInstructions
} from "@/utils/fileUtils";
import { 
  Download, 
  Upload, 
  RefreshCw, 
  Code, 
  FileCode, 
  CheckCircle, 
  AlertCircle, 
  Globe, 
  Server, 
  HardDrive,
  FileText
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const SourceCodeManager: React.FC = () => {
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);
  const [fileName, setFileName] = useState('cms-source.zip');
  const [appName, setAppName] = useState('my-cms-application');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<{
    success?: boolean;
    message?: string;
    files?: {name: string, path: string, size: number}[];
    projectType?: string;
    hasCmsStructure?: boolean;
  } | null>(null);
  const [targetDomain, setTargetDomain] = useState('');
  const [installationType, setInstallationType] = useState<'clean' | 'update'>('clean');
  const [installInstructions, setInstallInstructions] = useState('');
  
  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const success = await downloadSourceCode(fileName, appName);
      if (success) {
        toast({
          title: "Download Started",
          description: "Your CMS package is being downloaded.",
          variant: "default",
        });
      } else {
        throw new Error("Failed to generate download");
      }
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Download Failed",
        description: "There was an error generating the CMS package.",
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
    setInstallInstructions('');
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
      
      // If successful, clear any previous installation instructions
      if (result.success) {
        setInstallInstructions('');
      }
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
  
  const handleGenerateInstructions = () => {
    if (!targetDomain) {
      toast({
        title: "Domain Required",
        description: "Please enter a target domain for installation.",
        variant: "destructive",
      });
      return;
    }
    
    // Verify domain compatibility
    const compatibility = verifyDomainCompatibility(targetDomain);
    
    if (!compatibility.compatible) {
      toast({
        title: "Domain Incompatible",
        description: compatibility.message,
        variant: "destructive",
      });
      return;
    }
    
    // Generate installation instructions
    const instructions = generateInstallationInstructions(targetDomain);
    setInstallInstructions(instructions);
    
    toast({
      title: "Instructions Generated",
      description: `Installation instructions for ${targetDomain} have been generated.`,
    });
  };
  
  const copyInstructions = () => {
    navigator.clipboard.writeText(installInstructions);
    toast({
      title: "Copied to Clipboard",
      description: "Installation instructions copied to clipboard.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">CMS Installation Manager</h2>
      </div>
      
      <Tabs defaultValue="download" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="download">Download CMS</TabsTrigger>
          <TabsTrigger value="upload">Upload Package</TabsTrigger>
          <TabsTrigger value="install">Installation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="download" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Download CMS Package</CardTitle>
              <CardDescription>
                Download a packaged version of the CMS that can be installed on any domain.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="filename">Package Filename</Label>
                  <Input 
                    id="filename" 
                    value={fileName} 
                    onChange={(e) => setFileName(e.target.value)}
                    placeholder="cms-source.zip"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="appname">Application Name</Label>
                  <Input 
                    id="appname" 
                    value={appName} 
                    onChange={(e) => setAppName(e.target.value)}
                    placeholder="my-cms-application"
                  />
                </div>
              </div>
              
              <div className="rounded-md bg-muted p-4">
                <div className="flex items-center gap-3">
                  <FileCode className="h-5 w-5 text-muted-foreground" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">CMS Package</p>
                    <p className="text-sm text-muted-foreground">
                      Includes all necessary files to run the CMS on any domain
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
                    Download CMS Package
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="upload" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload CMS Package</CardTitle>
              <CardDescription>
                Upload a CMS package to verify and prepare for installation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="upload-file">CMS Package (ZIP)</Label>
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
                        {uploadResult.success ? 'Package Analysis Complete' : 'Package Analysis Failed'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {uploadResult.message}
                      </p>
                    </div>
                  </div>
                  
                  {uploadResult.success && uploadResult.projectType && (
                    <div className="mt-3 space-y-1">
                      <p className="text-sm font-medium">Project Analysis:</p>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Type:</span> {uploadResult.projectType}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">CMS Structure:</span> {uploadResult.hasCmsStructure ? 'Detected' : 'Not detected'}
                      </p>
                    </div>
                  )}
                  
                  {uploadResult.success && uploadResult.files && uploadResult.files.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">Files in package ({uploadResult.files.length}):</p>
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
                    <p className="text-sm font-medium leading-none">Package Verification</p>
                    <p className="text-sm text-muted-foreground">
                      Upload a CMS package to verify its contents and compatibility
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
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Analyze Package
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="install" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Installation Instructions</CardTitle>
              <CardDescription>
                Generate installation instructions for your target domain
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="target-domain" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" /> Target Domain
                </Label>
                <Input 
                  id="target-domain" 
                  value={targetDomain} 
                  onChange={(e) => setTargetDomain(e.target.value)}
                  placeholder="example.com"
                />
                <p className="text-xs text-muted-foreground">
                  Enter the domain where you want to install the CMS
                </p>
              </div>
              
              <div className="space-y-2">
                <Label>Installation Type</Label>
                <RadioGroup 
                  value={installationType} 
                  onValueChange={(value) => setInstallationType(value as 'clean' | 'update')}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="clean" id="clean" />
                    <Label htmlFor="clean" className="cursor-pointer flex items-center gap-2">
                      <Server className="h-4 w-4" /> Clean Installation
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="update" id="update" />
                    <Label htmlFor="update" className="cursor-pointer flex items-center gap-2">
                      <HardDrive className="h-4 w-4" /> Update Existing CMS
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Button 
                onClick={handleGenerateInstructions}
                variant="outline"
                className="w-full"
              >
                <FileText className="mr-2 h-4 w-4" /> Generate Instructions
              </Button>
              
              {installInstructions && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="instructions">Installation Instructions</Label>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={copyInstructions}
                    >
                      Copy
                    </Button>
                  </div>
                  <Textarea 
                    id="instructions"
                    value={installInstructions}
                    readOnly
                    className="font-mono text-sm h-[300px]"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SourceCodeManager;
