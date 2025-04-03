
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUserProgress, StudySession } from '@/contexts/UserProgressContext';
import { CheckCircle, Clock, Edit, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface EditScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditScheduleDialog: React.FC<EditScheduleDialogProps> = ({ open, onOpenChange }) => {
  const { userProgress, completeStudySession, deleteStudySession } = useUserProgress();
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);
  
  const handleComplete = (sessionId: string) => {
    completeStudySession(sessionId);
    toast({
      title: "Session completed",
      description: "Great job completing your study session!"
    });
  };
  
  const confirmDelete = (sessionId: string) => {
    setSessionToDelete(sessionId);
  };
  
  const handleDelete = () => {
    if (sessionToDelete) {
      deleteStudySession(sessionToDelete);
      toast({
        title: "Session deleted",
        description: "Study session has been removed from your schedule."
      });
      setSessionToDelete(null);
    }
  };
  
  const cancelDelete = () => {
    setSessionToDelete(null);
  };
  
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Study Schedule</DialogTitle>
            <DialogDescription>
              View and manage your scheduled study sessions
            </DialogDescription>
          </DialogHeader>
          
          <div className="max-h-[400px] overflow-y-auto">
            {userProgress.studySessions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No study sessions scheduled yet.</p>
                <Button variant="outline" className="mt-4" onClick={() => onOpenChange(false)}>
                  Add Sessions
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {userProgress.studySessions.map((session) => (
                  <div key={session.id} className="flex justify-between items-center p-3 bg-accent/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${session.complete ? 'bg-green-100' : 'bg-amber-100'}`}>
                        {session.complete ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <Clock className="h-5 w-5 text-amber-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{session.date}</h3>
                        <p className="text-sm text-muted-foreground">{session.focus}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right mr-2">
                        <span className="text-sm font-medium">{session.time}</span>
                        <span className="text-xs block text-muted-foreground">
                          {session.complete ? 'Completed' : 'Upcoming'}
                        </span>
                      </div>
                      {!session.complete && (
                        <Button variant="ghost" size="icon" onClick={() => handleComplete(session.id)} title="Mark as complete">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => confirmDelete(session.id)} title="Delete session">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={!!sessionToDelete} onOpenChange={(open) => !open && cancelDelete()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this study session from your schedule.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EditScheduleDialog;
