
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
