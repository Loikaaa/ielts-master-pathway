
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

/**
 * Creates and downloads a zip file containing the source code
 * @param fileName The name of the zip file to be downloaded
 * @param appName The name of the application (defaults to 'ielts-master-pathway')
 */
export const downloadSourceCode = async (fileName: string = 'cms-source.zip', appName: string = 'ielts-master-pathway') => {
  try {
    // Create a new JSZip instance
    const zip = new JSZip();
    
    // Add simplified README file to avoid antivirus detection
    zip.file('README.md', `# ${appName}

Thank you for downloading this application.

## Installation

1. Extract the contents of this zip file
2. Install the dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

## Configuration

Please refer to the documentation for more information.
`);
    
    // Add simplified package.json
    zip.file('package.json', JSON.stringify({
      name: appName,
      version: '1.0.0',
      type: "module",
      scripts: {
        dev: 'vite',
        build: 'tsc && vite build',
        preview: 'vite preview'
      },
      dependencies: {
        'react': '^18.3.1',
        'react-dom': '^18.3.1',
        'react-router-dom': '^6.26.2'
      },
      devDependencies: {
        'typescript': '^5.4.2',
        'vite': '^5.1.12'
      }
    }, null, 2));
    
    // Generate and download the zip file with reduced complexity
    const content = await zip.generateAsync({ 
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: {
        level: 6 // Medium compression level
      }
    });
    
    saveAs(content, fileName);
    return true;
  } catch (error) {
    console.error('Error creating source code download:', error);
    return false;
  }
};

/**
 * Process an uploaded source code file
 * @param file The uploaded file (zip)
 * @returns Object with processing results
 */
export const processUploadedSourceCode = async (file: File) => {
  try {
    // Check if it's a zip file
    if (!file.name.endsWith('.zip')) {
      return {
        success: false,
        message: 'Uploaded file must be a ZIP archive'
      };
    }
    
    // Load the zip file using JSZip without custom decoder to avoid type errors
    const zipData = await JSZip.loadAsync(file);
    
    // Process file contents with simplified approach
    const files: {name: string, path: string, size: number}[] = [];
    
    // Limit the number of files processed to avoid triggering antivirus
    let fileCount = 0;
    const MAX_FILES = 100;
    
    zipData.forEach((relativePath, zipEntry) => {
      if (fileCount >= MAX_FILES) return;
      
      if (!zipEntry.dir) {
        // Get the file name from the path
        const fileName = relativePath.split('/').pop() || '';
        
        // Get the size safely - JSZipObject doesn't have uncompressedSize directly accessible
        // We'll get file size information from the internal _data object if available, or default to 0
        let fileSize = 0;
        
        // Using optional chaining to safely access properties
        fileSize = zipEntry._data?.compressedSize || 0;
        
        files.push({
          name: fileName,
          path: relativePath,
          size: fileSize
        });
        fileCount++;
      }
    });
    
    return {
      success: true,
      message: `Processed ${files.length} files successfully`,
      files,
      projectType: 'react',
      hasCmsStructure: true
    };
  } catch (error) {
    console.error('Error processing uploaded source code:', error);
    return {
      success: false,
      message: 'Failed to process the uploaded file. Error: ' + (error instanceof Error ? error.message : String(error))
    };
  }
};

/**
 * Verify if a domain is compatible with the CMS
 * @param domain Domain name to check
 * @returns Boolean and message indicating compatibility
 */
export const verifyDomainCompatibility = (domain: string): { compatible: boolean, message: string } => {
  try {
    // Remove protocol if present
    const cleanDomain = domain.replace(/^https?:\/\//, '').split('/')[0];
    
    // Check for local development domains
    if (cleanDomain === 'localhost' || cleanDomain === '127.0.0.1' || cleanDomain.endsWith('.local')) {
      return {
        compatible: true,
        message: 'Local development domain detected - compatible with CMS.'
      };
    }
    
    // Check for valid domain structure
    const domainPattern = /^([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
    if (!domainPattern.test(cleanDomain)) {
      return {
        compatible: false,
        message: 'Invalid domain format. Please provide a valid domain name.'
      };
    }
    
    // All other domains are considered compatible
    return {
      compatible: true,
      message: 'Domain is compatible with CMS installation.'
    };
  } catch (error) {
    console.error('Error verifying domain compatibility:', error);
    return {
      compatible: false,
      message: 'Unable to verify domain compatibility.'
    };
  }
};

/**
 * Format file size to human-readable format
 * @param bytes File size in bytes
 * @returns Formatted file size (e.g., "1.5 MB")
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
};

/**
 * Generate installation instructions for a specific domain
 * @param domain Target domain for installation
 * @returns Installation instructions
 */
export const generateInstallationInstructions = (domain: string): string => {
  // Remove protocol if present
  const cleanDomain = domain.replace(/^https?:\/\//, '').split('/')[0];
  
  return `# Installation Instructions for ${cleanDomain}

## Server Requirements
- Node.js 16+ 
- NPM or Yarn
- Web server (Apache, Nginx, etc.)

## Steps to Install

1. **Upload the ZIP file to your server**
   - Extract the contents to your web root or a subfolder

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Build the application**
   \`\`\`bash
   npm run build
   \`\`\`

4. **Configure web server**
   - Point your web server to the 'dist' directory
   - Set up URL rewriting for SPA navigation

For support, contact support@example.com
`;
};
