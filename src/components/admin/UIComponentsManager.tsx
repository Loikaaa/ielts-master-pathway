
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Palette, 
  Search, 
  Plus, 
  LayoutGrid, 
  Code, 
  Copy, 
  Check,
  AlertCircle
} from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';

const UIComponentsManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('components');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  
  // Sample UI components
  const uiComponents = [
    { id: 1, name: 'Primary Button', category: 'buttons', status: 'stable' },
    { id: 2, name: 'Card Component', category: 'containers', status: 'stable' },
    { id: 3, name: 'Navigation Menu', category: 'navigation', status: 'stable' },
    { id: 4, name: 'Form Input', category: 'forms', status: 'stable' },
    { id: 5, name: 'Alert Dialog', category: 'overlays', status: 'stable' },
    { id: 6, name: 'Data Table', category: 'data', status: 'beta' },
    { id: 7, name: 'Modal Window', category: 'overlays', status: 'beta' },
    { id: 8, name: 'Accordion', category: 'containers', status: 'beta' },
    { id: 9, name: 'Tooltip', category: 'overlays', status: 'draft' }
  ];
  
  // Sample themes
  const themes = [
    { id: 1, name: 'Light Default', active: true },
    { id: 2, name: 'Dark Modern', active: false },
    { id: 3, name: 'Corporate Blue', active: false },
    { id: 4, name: 'Vintage Warm', active: false }
  ];
  
  const filteredComponents = uiComponents.filter(component => 
    component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    component.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const copyToClipboard = (code: string, id: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id.toString());
    setTimeout(() => setCopiedCode(null), 2000);
    toast.success('Code copied to clipboard');
  };
  
  const getComponentCode = (component: any) => {
    // Example code snippets for different components
    const codeSnippets: Record<string, string> = {
      'Primary Button': '<Button variant="primary">Click Me</Button>',
      'Card Component': '<Card><CardHeader><CardTitle>Title</CardTitle></CardHeader><CardContent>Content here</CardContent></Card>',
      'Navigation Menu': '<NavigationMenu>...</NavigationMenu>',
      'Form Input': '<Input placeholder="Enter text" />',
      'Alert Dialog': '<AlertDialog>...</AlertDialog>',
      'Data Table': '<Table>...</Table>',
      'Modal Window': '<Dialog>...</Dialog>',
      'Accordion': '<Accordion>...</Accordion>',
      'Tooltip': '<Tooltip>...</Tooltip>'
    };
    
    return codeSnippets[component.name] || '<Component />';
  };
  
  const changeTheme = (themeId: number) => {
    // In a real app, this would update the active theme
    toast.success(`Theme changed successfully`);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5 text-primary" />
          UI Components Manager
        </CardTitle>
        <CardDescription>
          Browse, customize and implement UI components across your application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="themes">Theme Settings</TabsTrigger>
            <TabsTrigger value="custom">Custom Components</TabsTrigger>
          </TabsList>
          
          <TabsContent value="components">
            <div className="flex justify-between items-center mb-4">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search components..." 
                  className="pl-8" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="buttons">Buttons</SelectItem>
                  <SelectItem value="containers">Containers</SelectItem>
                  <SelectItem value="navigation">Navigation</SelectItem>
                  <SelectItem value="forms">Forms</SelectItem>
                  <SelectItem value="overlays">Overlays</SelectItem>
                  <SelectItem value="data">Data Display</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {filteredComponents.length > 0 ? (
                filteredComponents.map((component) => (
                  <div key={component.id} className="border rounded-lg p-4 transition-all hover:shadow-md">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{component.name}</h3>
                        {component.status === 'stable' ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700">Stable</Badge>
                        ) : component.status === 'beta' ? (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">Beta</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Draft</Badge>
                        )}
                      </div>
                      <Badge variant="secondary">{component.category}</Badge>
                    </div>
                    
                    <div className="bg-muted rounded-md p-3 mt-2 relative">
                      <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
                        {getComponentCode(component)}
                      </pre>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="absolute top-2 right-2"
                        onClick={() => copyToClipboard(getComponentCode(component), component.id)}
                      >
                        {copiedCode === component.id.toString() ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" onClick={() => toast.success(`Component preview would open here`)}>
                        Preview
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => toast.success(`Component usage documentation would open here`)}>
                        Usage Docs
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  No components found matching your search criteria.
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="themes">
            <Alert className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Theme Settings</AlertTitle>
              <AlertDescription>
                Changes to theme settings will affect the entire application interface.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Active Theme</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {themes.map((theme) => (
                    <Card 
                      key={theme.id} 
                      className={`border ${theme.active ? 'border-primary ring-2 ring-primary ring-opacity-50' : ''} cursor-pointer hover:shadow-md transition-all`}
                      onClick={() => changeTheme(theme.id)}
                    >
                      <CardContent className="p-4 flex flex-col items-center">
                        <div className={`w-full h-20 rounded-md mb-2 ${
                          theme.name.includes('Dark') ? 'bg-zinc-800' : 
                          theme.name.includes('Blue') ? 'bg-blue-100' :
                          theme.name.includes('Warm') ? 'bg-amber-100' : 'bg-gray-100'
                        }`}></div>
                        <p className="font-medium text-center">{theme.name}</p>
                        {theme.active && (
                          <Badge variant="outline" className="mt-2 bg-primary/10 text-primary">Active</Badge>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Theme Customization</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="primary-color">Primary Color</Label>
                      <div className="flex mt-1">
                        <Input id="primary-color" type="color" value="#0066FF" className="w-12 h-10 p-1" />
                        <Input value="#0066FF" className="flex-1 ml-2" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="secondary-color">Secondary Color</Label>
                      <div className="flex mt-1">
                        <Input id="secondary-color" type="color" value="#6B7280" className="w-12 h-10 p-1" />
                        <Input value="#6B7280" className="flex-1 ml-2" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="accent-color">Accent Color</Label>
                      <div className="flex mt-1">
                        <Input id="accent-color" type="color" value="#10B981" className="w-12 h-10 p-1" />
                        <Input value="#10B981" className="flex-1 ml-2" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="font-family">Font Family</Label>
                      <Select defaultValue="inter">
                        <SelectTrigger>
                          <SelectValue placeholder="Select font family" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inter">Inter</SelectItem>
                          <SelectItem value="roboto">Roboto</SelectItem>
                          <SelectItem value="poppins">Poppins</SelectItem>
                          <SelectItem value="opensans">Open Sans</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="border-radius">Border Radius</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger>
                          <SelectValue placeholder="Select border radius" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None (0px)</SelectItem>
                          <SelectItem value="small">Small (4px)</SelectItem>
                          <SelectItem value="medium">Medium (8px)</SelectItem>
                          <SelectItem value="large">Large (16px)</SelectItem>
                          <SelectItem value="full">Full (9999px)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                      <Switch id="dark-mode" />
                    </div>
                  </div>
                  
                  <Button onClick={() => toast.success('Theme settings saved successfully')}>
                    Save Theme Settings
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="custom">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Custom Components</h3>
              <Button onClick={() => toast.success('This would open the component creator')}>
                <Plus className="h-4 w-4 mr-2" />
                Create Component
              </Button>
            </div>
            
            <Alert className="mb-4">
              <Code className="h-4 w-4" />
              <AlertTitle>Custom Components</AlertTitle>
              <AlertDescription>
                Create and manage your application-specific UI components here.
              </AlertDescription>
            </Alert>
            
            <div className="border rounded-lg p-6 text-center">
              <LayoutGrid className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="font-medium mt-4">No custom components yet</h3>
              <p className="text-muted-foreground mt-1 mb-4">
                Create your first custom component to see it here
              </p>
              <Button variant="outline" onClick={() => toast.success('This would open the component creator')}>
                Create Component
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UIComponentsManager;
