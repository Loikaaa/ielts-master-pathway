
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useUserProgress } from '@/contexts/UserProgressContext';
import { cn } from "@/lib/utils";
import { toast } from '@/hooks/use-toast';

interface AddSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddSessionDialog: React.FC<AddSessionDialogProps> = ({ open, onOpenChange }) => {
  const { addStudySession } = useUserProgress();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [focus, setFocus] = useState<string>("");
  const [time, setTime] = useState<string>("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !focus || !time) {
      toast({
        title: "Missing information",
        description: "Please fill out all fields to add a study session.",
        variant: "destructive"
      });
      return;
    }
    
    const formattedDate = format(date, "EEEE"); // Day of week format
    const sessionData = {
      date: formattedDate,
      focus,
      time: `${time} hours`,
      complete: false
    };
    
    addStudySession(sessionData);
    toast({
      title: "Session added",
      description: "Your study session has been scheduled."
    });
    onOpenChange(false);
    
    // Reset form
    setDate(new Date());
    setFocus("");
    setTime("");
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Study Session</DialogTitle>
          <DialogDescription>
            Schedule a new study session to track your IELTS preparation.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="focus">Focus Area</Label>
            <Select value={focus} onValueChange={setFocus}>
              <SelectTrigger id="focus">
                <SelectValue placeholder="Select focus area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Reading Practice">Reading Practice</SelectItem>
                <SelectItem value="Writing Task 1">Writing Task 1</SelectItem>
                <SelectItem value="Writing Task 2">Writing Task 2</SelectItem>
                <SelectItem value="Listening">Listening</SelectItem>
                <SelectItem value="Speaking Practice">Speaking Practice</SelectItem>
                <SelectItem value="Vocabulary Building">Vocabulary Building</SelectItem>
                <SelectItem value="Grammar Review">Grammar Review</SelectItem>
                <SelectItem value="Mock Test">Mock Test</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="time">Duration (hours)</Label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger id="time">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.5">0.5</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="1.5">1.5</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="2.5">2.5</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="3.5">3.5</SelectItem>
                <SelectItem value="4">4</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <DialogFooter>
            <Button type="submit">Add Session</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSessionDialog;
