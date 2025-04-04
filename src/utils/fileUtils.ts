
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

/**
 * Creates and downloads a zip file containing the source code
 * @param fileName The name of the zip file to be downloaded
 */
export const downloadSourceCode = async (fileName: string = 'ielts-master-pathway-source.zip') => {
  try {
    // Create a new JSZip instance
    const zip = new JSZip();
    
    // Add placeholder files and folders to the zip
    // In a real implementation, this would include actual project files
    const srcFolder = zip.folder('src');
    srcFolder?.file('main.tsx', '// Main entry point');
    srcFolder?.file('App.tsx', '// Main application component');
    
    const componentsFolder = srcFolder?.folder('components');
    componentsFolder?.file('index.ts', '// Components export');
    
    const pagesFolder = srcFolder?.folder('pages');
    pagesFolder?.file('index.tsx', '// Pages');
    
    const publicFolder = zip.folder('public');
    publicFolder?.file('index.html', '<!DOCTYPE html><html><head><title>IELTS Master Pathway</title></head><body><div id="root"></div></body></html>');
    
    // Add readme file
    zip.file('README.md', '# IELTS Master Pathway\n\nThank you for downloading the source code.\n\n## Installation\n\n```bash\nnpm install\nnpm run dev\n```');
    
    // Add package.json
    zip.file('package.json', JSON.stringify({
      name: 'ielts-master-pathway',
      version: '1.0.0',
      scripts: {
        dev: 'vite',
        build: 'vite build',
        serve: 'vite preview'
      },
      dependencies: {
        'react': '^18.3.1',
        'react-dom': '^18.3.1',
        'react-router-dom': '^6.26.2'
      }
    }, null, 2));
    
    // Generate the zip file
    const content = await zip.generateAsync({ type: 'blob' });
    
    // Trigger the download
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
    
    // Read the zip file
    const zipData = await JSZip.loadAsync(file);
    
    // Process file contents
    const files: {name: string, path: string, size: number}[] = [];
    
    await Promise.all(
      Object.keys(zipData.files).map(async (filename) => {
        const zipEntry = zipData.files[filename];
        
        // Skip directories
        if (!zipEntry.dir) {
          files.push({
            name: zipEntry.name.split('/').pop() || '',
            path: zipEntry.name,
            size: zipEntry._data.uncompressedSize
          });
        }
      })
    );
    
    // In a real implementation, this is where you would:
    // 1. Extract the files to the server
    // 2. Update your application with the new files
    // 3. Potentially rebuild the application
    
    return {
      success: true,
      message: `Processed ${files.length} files successfully`,
      files
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
