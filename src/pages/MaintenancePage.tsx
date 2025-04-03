
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, AlertTriangle } from 'lucide-react';
import { getMaintenanceMessage } from '@/utils/settingsStorage';

const MaintenancePage = () => {
  // Get the maintenance message from our utility function
  const maintenanceMessage = getMaintenanceMessage();
  
  useEffect(() => {
    console.log('Rendering maintenance page with message:', maintenanceMessage);
    // Log to make sure this component is being rendered
    document.title = 'Site Under Maintenance';
  }, [maintenanceMessage]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4">
      <div className="mx-auto flex max-w-md flex-col items-center justify-center space-y-6 text-center">
        <div className="rounded-full bg-yellow-100 p-3">
          <AlertTriangle className="h-12 w-12 text-yellow-600" />
        </div>
        
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Site Under Maintenance</h1>
        
        <p className="text-muted-foreground">{maintenanceMessage}</p>
        
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </Button>
          <Button asChild>
            <a href="https://status.ieltsmaster.app" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              System Status
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;
