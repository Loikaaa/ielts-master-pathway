
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
    
    // Add actual project files and folders to the zip
    const srcFolder = zip.folder('src');
    srcFolder?.file('main.tsx', `
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(<App />);
`);

    srcFolder?.file('App.tsx', `
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminPanel from './pages/AdminPanel';
import FrontPage from './pages/FrontPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminPanel />} />
        <Route path="/*" element={<FrontPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
`);
    
    srcFolder?.file('App.css', `
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', sans-serif;
}
`);

    srcFolder?.file('index.css', `
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary: #3b82f6;
  --primary-dark: #2563eb;
}
`);
    
    // Create directories
    const componentsFolder = srcFolder?.folder('components');
    const pagesFolder = srcFolder?.folder('pages');
    const utilsFolder = srcFolder?.folder('utils');
    
    // Add component files
    componentsFolder?.file('AdminHeader.tsx', `
import React from 'react';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-xl font-bold">CMS Admin</h1>
          </div>
          <nav className="flex space-x-4">
            <Link to="/admin" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100">Dashboard</Link>
            <Link to="/admin/content" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100">Content</Link>
            <Link to="/admin/settings" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100">Settings</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
`);
    
    // Create page templates
    pagesFolder?.file('AdminPanel.tsx', `
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import SourceCodeManager from '../components/admin/SourceCodeManager';
import DatabaseConfig from '../components/admin/DatabaseConfig';

const AdminPanel = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<div className="bg-white p-6 rounded-lg shadow-sm">Welcome to the Admin Panel</div>} />
          <Route path="/code" element={<SourceCodeManager />} />
          <Route path="/database" element={<DatabaseConfig />} />
          <Route path="/settings" element={<div className="bg-white p-6 rounded-lg shadow-sm">Settings Page</div>} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminPanel;
`);

    pagesFolder?.file('FrontPage.tsx', `
import React, { useEffect, useState } from 'react';
import { getSettings } from '../utils/settingsStorage';

const FrontPage = () => {
  const [siteTitle, setSiteTitle] = useState('CMS Website');
  const [siteDescription, setSiteDescription] = useState('Welcome to your CMS website.');
  
  useEffect(() => {
    // Load site settings
    const settings = getSettings();
    if (settings?.site) {
      if (settings.site.title) setSiteTitle(settings.site.title);
      if (settings.site.description) setSiteDescription(settings.site.description);
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">{siteTitle}</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
              <p className="text-lg text-gray-600">{siteDescription}</p>
              <p className="mt-4 text-gray-500">Edit this page by logging into the admin panel.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FrontPage;
`);

    // Add utility files with existing functions
    utilsFolder?.file('fileUtils.ts', `// Exporting the current file for CMS installation`);
    utilsFolder?.file('settingsStorage.ts', `// Exporting the current settings storage functionality`);
    
    const publicFolder = zip.folder('public');
    publicFolder?.file('index.html', `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CMS Site</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`);
    
    // Add installation files
    zip.file('README.md', `# CMS Platform

Thank you for downloading the CMS platform.

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
4. Build for production:
   \`\`\`bash
   npm run build
   \`\`\`
5. Deploy the \`dist\` folder to your web server

## Configuration

- Access the admin panel at \`/admin\`
- Configure your database connection in the admin panel
- Customize your site settings in the admin panel

## Documentation

For more information, visit the documentation at https://docs.cms-platform.com
`);
    
    // Add package.json with required dependencies
    zip.file('package.json', JSON.stringify({
      name: appName,
      version: '1.0.0',
      type: "module",
      scripts: {
        dev: 'vite',
        build: 'tsc && vite build',
        preview: 'vite preview',
        install: 'npm install'
      },
      dependencies: {
        'react': '^18.3.1',
        'react-dom': '^18.3.1',
        'react-router-dom': '^6.26.2',
        'file-saver': '^2.0.5',
        'jszip': '^3.10.1',
        'lucide-react': '^0.462.0',
        'tailwindcss': '^3.4.1',
        'class-variance-authority': '^0.7.0',
        'clsx': '^2.1.0',
        'sonner': '^1.5.0'
      },
      devDependencies: {
        '@types/file-saver': '^2.0.7',
        '@types/react': '^18.3.1',
        '@types/react-dom': '^18.3.1',
        '@vitejs/plugin-react-swc': '^3.6.0',
        'autoprefixer': '^10.4.18',
        'postcss': '^8.4.36',
        'typescript': '^5.4.2',
        'vite': '^5.1.12'
      }
    }, null, 2));
    
    // Add configuration files
    zip.file('vite.config.ts', `
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
`);
    
    zip.file('tsconfig.json', `
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
`);
    
    zip.file('tsconfig.node.json', `
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
`);
    
    zip.file('postcss.config.js', `
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`);
    
    zip.file('tailwind.config.js', `
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
`);

    zip.file('install.js', `
#!/usr/bin/env node
console.log('Starting CMS installation...');
const { execSync } = require('child_process');

try {
  console.log('Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  console.log('Building the application...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('CMS installed successfully!');
  console.log('Run npm run dev to start the development server');
  console.log('Or deploy the dist folder to your web server');
} catch (error) {
  console.error('Installation failed:', error);
}
`);

    // Generate and download the zip file
    const content = await zip.generateAsync({ type: 'blob' });
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
    
    // Use Promise.all to gather all file information
    await Promise.all(
      Object.keys(zipData.files).map(async (filename) => {
        const zipEntry = zipData.files[filename];
        
        // Skip directories
        if (!zipEntry.dir) {
          // Get the file content as a blob to determine size
          const content = await zipEntry.async('blob');
          
          files.push({
            name: zipEntry.name.split('/').pop() || '',
            path: zipEntry.name,
            size: content.size
          });
        }
      })
    );
    
    // Process uploaded files based on file structure
    const projectType = detectProjectType(files);
    const hasCmsStructure = checkForCmsStructure(files);
    
    let result = {
      success: true,
      message: `Processed ${files.length} files successfully`,
      files,
      projectType,
      hasCmsStructure
    };
    
    // In a real implementation, this is where you would:
    // 1. Extract the files to the server
    // 2. Update your application with the new files
    // 3. Potentially rebuild the application
    
    return result;
  } catch (error) {
    console.error('Error processing uploaded source code:', error);
    return {
      success: false,
      message: 'Failed to process the uploaded file. Error: ' + (error instanceof Error ? error.message : String(error))
    };
  }
};

/**
 * Detect the project type based on files structure
 */
const detectProjectType = (files: {name: string, path: string, size: number}[]): string => {
  // Check for package.json
  const packageJson = files.find(file => file.path === 'package.json');
  if (!packageJson) return 'unknown';
  
  // Look for React indicators
  const hasReact = files.some(file => 
    file.path.includes('react') || 
    file.path.endsWith('.jsx') || 
    file.path.endsWith('.tsx')
  );
  
  if (hasReact) {
    // Check for specific React frameworks
    if (files.some(file => file.path.includes('next.config'))) {
      return 'next.js';
    } else if (files.some(file => file.path.includes('vite.config'))) {
      return 'react-vite';
    } else if (files.some(file => file.path.includes('craco.config'))) {
      return 'react-craco';
    } else {
      return 'react';
    }
  }
  
  // Check for other frameworks
  if (files.some(file => file.path.includes('angular.json'))) {
    return 'angular';
  } else if (files.some(file => file.path.includes('vue'))) {
    return 'vue';
  }
  
  return 'unknown';
};

/**
 * Check if the uploaded files contain a CMS structure
 */
const checkForCmsStructure = (files: {name: string, path: string, size: number}[]): boolean => {
  // Check for common CMS folders/files
  const hasCmsAdmin = files.some(file => 
    file.path.includes('/admin/') || 
    file.path.includes('/cms/') ||
    file.path.includes('AdminPanel')
  );
  
  const hasContentModels = files.some(file => 
    file.path.includes('/models/') || 
    file.path.includes('/content/') ||
    file.path.includes('/schema/')
  );
  
  const hasAuthSystem = files.some(file => 
    file.path.includes('/auth/') || 
    file.path.includes('login') ||
    file.path.includes('authenticate')
  );
  
  // Consider it a CMS if it has at least 2 of these features
  let cmsFeatures = 0;
  if (hasCmsAdmin) cmsFeatures++;
  if (hasContentModels) cmsFeatures++;
  if (hasAuthSystem) cmsFeatures++;
  
  return cmsFeatures >= 2;
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

3. **Configure domain**
   - Create a .env file with:
   \`\`\`
   VITE_APP_URL=https://${cleanDomain}
   \`\`\`

4. **Build the application**
   \`\`\`bash
   npm run build
   \`\`\`

5. **Configure web server**
   - Point your web server to the 'dist' directory
   - Set up URL rewriting for SPA navigation

6. **Access the CMS**
   - Frontend: https://${cleanDomain}
   - Admin panel: https://${cleanDomain}/admin

For support, contact support@cms-platform.com
`;
};
