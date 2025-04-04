
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UploadCloud, Database, DownloadCloud, Calendar, Clock, Check, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { saveSettings, getSettings } from '@/utils/settingsStorage';

interface BackupSchedule {
  frequency: 'daily' | 'weekly' | 'monthly' | 'manual';
  day?: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  time: string;
  retention: number;
  enabled: boolean;
}

interface BackupSettings {
  automaticBackups: boolean;
  backupSchedule: BackupSchedule;
  backupLocation: 'local' | 'cloud';
  cloudProvider?: 'aws' | 'google' | 'azure';
  cloudBucket?: string;
  cloudKey?: string;
  cloudSecret?: string;
}

interface BackupRecord {
  id: string;
  date: string;
  time: string;
  size: string;
  source: 'automatic' | 'manual';
  status: 'success' | 'failed';
  location: 'local' | 'cloud';
}

const DEFAULT_BACKUP_SETTINGS: BackupSettings = {
  automaticBackups: false,
  backupSchedule: {
    frequency: 'weekly',
    day: 'sunday',
    time: '00:00',
    retention: 30,
    enabled: false
  },
  backupLocation: 'local'
};

const MOCK_BACKUPS: BackupRecord[] = [
  {
    id: 'backup-1',
    date: '2025-04-03',
    time: '02:00:00',
    size: '24.5 MB',
    source: 'automatic',
    status: 'success',
    location: 'local'
  },
  {
    id: 'backup-2',
    date: '2025-03-27',
    time: '02:00:00',
    size: '23.8 MB',
    source: 'automatic',
    status: 'success',
    location: 'local'
  },
  {
    id: 'backup-3',
    date: '2025-03-20',
    time: '02:00:00',
    size: '23.1 MB',
    source: 'automatic',
    status: 'success',
    location: 'local'
  }
];

const BackupRestoreSettings = () => {
  const [backupSettings, setBackupSettings] = useState<BackupSettings>(DEFAULT_BACKUP_SETTINGS);
  const [backups, setBackups] = useState<BackupRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [backupInProgress, setBackupInProgress] = useState(false);
  const [restoreInProgress, setRestoreInProgress] = useState(false);

  useEffect(() => {
    // Load existing backup settings
    const settings = getSettings() || {};
    const savedBackupSettings = settings.backup || DEFAULT_BACKUP_SETTINGS;
    setBackupSettings(savedBackupSettings);
    
    // Load backup records (in a real app, these would come from an API)
    setBackups(MOCK_BACKUPS);
  }, []);

  const handleScheduleChange = (key: string, value: any) => {
    setBackupSettings(prev => ({
      ...prev,
      backupSchedule: {
        ...prev.backupSchedule,
        [key]: value
      }
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('cloud')) {
      setBackupSettings(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      setBackupSettings(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    if (name === 'automaticBackups') {
      setBackupSettings(prev => ({
        ...prev,
        automaticBackups: checked,
        backupSchedule: {
          ...prev.backupSchedule,
          enabled: checked
        }
      }));
    } else {
      setBackupSettings(prev => ({
        ...prev,
        [name]: checked
      }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setBackupSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveSettings = () => {
    setIsLoading(true);
    
    try {
      const settings = getSettings() || {};
      settings.backup = backupSettings;
      saveSettings(settings);
      
      toast.success('Backup settings saved successfully');
    } catch (error) {
      console.error('Error saving backup settings:', error);
      toast.error('Failed to save backup settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackupNow = () => {
    setBackupInProgress(true);
    
    // Simulate backup process
    setTimeout(() => {
      const newBackup: BackupRecord = {
        id: `backup-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toTimeString().split(' ')[0],
        size: '25.2 MB',
        source: 'manual',
        status: 'success',
        location: backupSettings.backupLocation
      };
      
      setBackups([newBackup, ...backups]);
      setBackupInProgress(false);
      toast.success('Backup completed successfully');
    }, 3000);
  };

  const handleRestoreBackup = (backupId: string) => {
    if (window.confirm('Are you sure you want to restore this backup? This will overwrite your current data.')) {
      setRestoreInProgress(true);
      
      // Find the backup details for the toast
      const backup = backups.find(b => b.id === backupId);
      
      // Simulate restore process
      setTimeout(() => {
        setRestoreInProgress(false);
        toast.success(`Backup from ${backup?.date} restored successfully`);
      }, 3000);
    }
  };

  const handleDeleteBackup = (backupId: string) => {
    if (window.confirm('Are you sure you want to delete this backup?')) {
      // Filter out the deleted backup
      const updatedBackups = backups.filter(backup => backup.id !== backupId);
      setBackups(updatedBackups);
      toast.success('Backup deleted successfully');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UploadCloud className="h-5 w-5 text-primary" />
          Backup & Restore
        </CardTitle>
        <CardDescription>
          Configure automatic backups and restore data when needed
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Backup Configuration</h3>
          
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="automatic-backups" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Enable Automatic Backups
            </Label>
            <Switch
              id="automatic-backups"
              checked={backupSettings.automaticBackups}
              onCheckedChange={(checked) => handleSwitchChange('automaticBackups', checked)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="frequency">Backup Frequency</Label>
              <Select 
                disabled={!backupSettings.automaticBackups}
                value={backupSettings.backupSchedule.frequency}
                onValueChange={(value) => handleScheduleChange('frequency', value)}
              >
                <SelectTrigger id="frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="manual">Manual Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {backupSettings.backupSchedule.frequency === 'weekly' && (
              <div className="space-y-2">
                <Label htmlFor="day">Day of Week</Label>
                <Select 
                  disabled={!backupSettings.automaticBackups}
                  value={backupSettings.backupSchedule.day}
                  onValueChange={(value) => handleScheduleChange('day', value)}
                >
                  <SelectTrigger id="day">
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monday">Monday</SelectItem>
                    <SelectItem value="tuesday">Tuesday</SelectItem>
                    <SelectItem value="wednesday">Wednesday</SelectItem>
                    <SelectItem value="thursday">Thursday</SelectItem>
                    <SelectItem value="friday">Friday</SelectItem>
                    <SelectItem value="saturday">Saturday</SelectItem>
                    <SelectItem value="sunday">Sunday</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="time" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Backup Time
              </Label>
              <Input
                id="time"
                type="time"
                value={backupSettings.backupSchedule.time}
                onChange={(e) => handleScheduleChange('time', e.target.value)}
                disabled={!backupSettings.automaticBackups}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="retention" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Retention Period (days)
              </Label>
              <Input
                id="retention"
                type="number"
                min="1"
                max="365"
                value={backupSettings.backupSchedule.retention}
                onChange={(e) => handleScheduleChange('retention', parseInt(e.target.value))}
                disabled={!backupSettings.automaticBackups}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="backupLocation">Backup Location</Label>
            <Select 
              value={backupSettings.backupLocation}
              onValueChange={(value) => handleSelectChange('backupLocation', value)}
            >
              <SelectTrigger id="backupLocation">
                <SelectValue placeholder="Select storage location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="local">Local Storage</SelectItem>
                <SelectItem value="cloud">Cloud Storage</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {backupSettings.backupLocation === 'cloud' && (
            <div className="space-y-4 border p-4 rounded-md">
              <h4 className="font-medium">Cloud Storage Configuration</h4>
              
              <div className="space-y-2">
                <Label htmlFor="cloudProvider">Cloud Provider</Label>
                <Select 
                  value={backupSettings.cloudProvider || 'aws'}
                  onValueChange={(value) => handleSelectChange('cloudProvider', value)}
                >
                  <SelectTrigger id="cloudProvider">
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aws">Amazon S3</SelectItem>
                    <SelectItem value="google">Google Cloud Storage</SelectItem>
                    <SelectItem value="azure">Azure Blob Storage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cloudBucket">Bucket/Container Name</Label>
                <Input
                  id="cloudBucket"
                  name="cloudBucket"
                  placeholder="my-backup-bucket"
                  value={backupSettings.cloudBucket || ''}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cloudKey">Access Key/ID</Label>
                  <Input
                    id="cloudKey"
                    name="cloudKey"
                    placeholder="Access Key"
                    value={backupSettings.cloudKey || ''}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cloudSecret">Secret Key</Label>
                  <Input
                    id="cloudSecret"
                    name="cloudSecret"
                    placeholder="Secret Key"
                    type="password"
                    value={backupSettings.cloudSecret || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Available Backups</h3>
            <Button 
              onClick={handleBackupNow}
              disabled={backupInProgress}
              className="gap-2"
            >
              <UploadCloud className={`h-4 w-4 ${backupInProgress ? 'animate-spin' : ''}`} />
              {backupInProgress ? 'Backing Up...' : 'Backup Now'}
            </Button>
          </div>
          
          {backups.length === 0 ? (
            <div className="text-center p-6 border rounded-md">
              <p className="text-muted-foreground">No backups available</p>
            </div>
          ) : (
            <div className="space-y-2">
              {backups.map((backup) => (
                <div key={backup.id} className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex h-2 w-2 rounded-full ${backup.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <p className="font-medium">{backup.date} at {backup.time}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span>{backup.size}</span>
                      <span className="capitalize">{backup.source}</span>
                      <span className="capitalize">{backup.location} storage</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleRestoreBackup(backup.id)}
                      disabled={restoreInProgress}
                      className="gap-1"
                    >
                      <DownloadCloud className={`h-4 w-4 ${restoreInProgress ? 'animate-spin' : ''}`} />
                      {restoreInProgress ? 'Restoring...' : 'Restore'}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-destructive"
                      onClick={() => handleDeleteBackup(backup.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSaveSettings} 
          disabled={isLoading}
          className="ml-auto"
        >
          {isLoading ? 'Saving...' : 'Save Backup Settings'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BackupRestoreSettings;
