import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  TrendingUp, 
  CalendarIcon,
  CheckCircle,
  Clock,
  Users,
  Building2,
  FileText,
  Target,
  ArrowRight,
  AlertTriangle,
  GraduationCap,
  Loader2
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { 
  useTasks, 
  useListingStages, 
  useUserProgress, 
  useResources,
  useCompanies,
  calculateTaskProgress,
  getTasksByPriority,
  useUpdateProgress,
  useCreateMeetingRequest,
  useUpdateCompanyTimeline
} from "@/hooks/useASXData";
import { MarketIntelligenceSection } from "./MarketIntelligenceSection";
import { EnhancedIPOPreparation } from "./EnhancedIPOPreparation";
import { EnhancedFounderNetwork } from "./EnhancedFounderNetwork";
import { baseMeetingRequestSchema, ListingStageEnum, updateCompanyTimelineSchema } from "@shared/schema";

interface FounderDashboardProps {
  activeSection: string;
}

// Meeting form schema extending shared base schema  
const meetingFormSchema = baseMeetingRequestSchema.omit({ userId: true, status: true }).extend({
  preferredDate: z.date({
    required_error: "Please select a preferred date",
  }).refine(
    (date) => date > new Date(),
    "Preferred date must be in the future"
  ),
});

type MeetingFormValues = z.infer<typeof meetingFormSchema>;

// Timeline form schema for updating company timeline
const timelineFormSchema = z.object({
  listingStage: ListingStageEnum.optional(),
  targetListingDate: z.date().optional(),
});

type TimelineFormValues = z.infer<typeof timelineFormSchema>;

export default function FounderDashboard({ activeSection }: FounderDashboardProps) {
  const [currentStage, setCurrentStage] = useState("exploration");
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isTimelineModalOpen, setIsTimelineModalOpen] = useState(false);
  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false);
  const { toast } = useToast();
  
  // Meeting form
  const meetingForm = useForm<MeetingFormValues>({
    resolver: zodResolver(meetingFormSchema),
    defaultValues: {
      notes: "",
    },
  });
  
  // For demo purposes, we'll use the first demo user
  const DEMO_USER_ID = "founder_demo"; // This should come from auth context in a real app
  
  // Fetch data using React Query hooks
  const { data: founderTasks, isLoading: tasksLoading, error: tasksError } = useTasks("Founder/CEO");
  const { data: listingStages, isLoading: stagesLoading, error: stagesError } = useListingStages();
  const { data: userProgress, isLoading: progressLoading, error: progressError } = useUserProgress(DEMO_USER_ID);
  const { data: resources, isLoading: resourcesLoading, error: resourcesError } = useResources();
  const { data: companies, isLoading: companiesLoading, error: companiesError } = useCompanies();
  
  // Task completion mutation
  const updateProgressMutation = useUpdateProgress();
  
  // Meeting request mutation
  const createMeetingMutation = useCreateMeetingRequest();
  
  // Timeline form
  const timelineForm = useForm<TimelineFormValues>({
    resolver: zodResolver(timelineFormSchema),
    defaultValues: {},
  });
  
  // Timeline update mutation
  const updateTimelineMutation = useUpdateCompanyTimeline();
  
  // Handle task completion toggle
  const handleTaskToggle = async (taskId: string, currentlyCompleted: boolean) => {
    try {
      await updateProgressMutation.mutateAsync({
        userId: DEMO_USER_ID,
        taskId: taskId,
        completed: !currentlyCompleted,
        notes: `Task ${!currentlyCompleted ? 'completed' : 'marked incomplete'} from dashboard`
      });
      
      toast({
        title: !currentlyCompleted ? "Task Completed" : "Task Marked Incomplete",
        description: !currentlyCompleted ? "Great progress on your IPO journey!" : "Task unmarked as requested",
      });
    } catch (error) {
      console.error('Failed to update task completion:', error);
      toast({
        title: "Error",
        description: "Failed to update task. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle schedule adviser meeting form submission
  const handleScheduleMeeting = async (values: MeetingFormValues) => {
    try {
      // Look up the actual user ID for the demo user
      const userId = "f03c47a7-126a-422c-b1f3-5104fa757864"; // Demo user's actual ID
      
      await createMeetingMutation.mutateAsync({
        userId,
        meetingType: values.meetingType,
        preferredDate: values.preferredDate,
        notes: values.notes || undefined,
      });
      
      toast({
        title: "Meeting Request Submitted",
        description: `Your ${values.meetingType.replace('-', ' ')} meeting request for ${format(values.preferredDate, 'PPP')} has been submitted. You'll receive a calendar invite soon.`,
      });
      
      // Reset form and close modal
      meetingForm.reset();
      setIsScheduleModalOpen(false);
    } catch (error) {
      console.error('Failed to create meeting request:', error);
      toast({
        title: "Error",
        description: "Failed to submit meeting request. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle timeline update form submission
  const handleTimelineUpdate = async (values: TimelineFormValues) => {
    try {
      // For demo purposes, we'll use the first company
      const companyId = companies?.[0]?.id;
      if (!companyId) {
        throw new Error("No company found for timeline update");
      }
      
      await updateTimelineMutation.mutateAsync({
        companyId,
        timelineData: values,
      });
      
      toast({
        title: "Timeline Updated",
        description: "Your IPO timeline has been successfully updated.",
      });
      
      // Reset form and close modal
      timelineForm.reset();
      setIsTimelineModalOpen(false);
    } catch (error) {
      console.error('Failed to update timeline:', error);
      toast({
        title: "Error",
        description: "Failed to update timeline. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Individual loading and error states are handled at section level for better UX

  // Calculate real progress from API data
  const totalTasks = founderTasks?.length || 0;
  const completedTasks = founderTasks?.filter(task => 
    userProgress?.some(progress => 
      progress.taskId === task.id && progress.completed
    )
  ).length || 0;
  
  const overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const highPriorityTasks = founderTasks?.filter(task => task.priority === 'high') || [];
  const mediumPriorityTasks = founderTasks?.filter(task => task.priority === 'medium') || [];
  
  // Calculate stage progress based on listing stages
  const getStageProgress = (stageOrder: number) => {
    if (!founderTasks || !listingStages) return 0;
    const stageTask = listingStages.find(stage => stage.order === stageOrder);
    if (!stageTask) return 0;
    
    const stageTasks = founderTasks.filter(task => task.stageId === stageTask.id);
    if (stageTasks.length === 0) return 0;
    
    const completedStageTasks = stageTasks.filter(task =>
      userProgress?.some(progress => progress.taskId === task.id && progress.completed)
    );
    return Math.round((completedStageTasks.length / stageTasks.length) * 100);
  };

  // Page loads immediately with section-level loading/error handling for better UX

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Progress Overview */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Your IPO Journey Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-4 gap-4">
                {(listingStages?.slice(0, 4) || []).map((stage, index) => {
                  const progress = getStageProgress(stage.order);
                  const status = progress === 100 ? 'completed' : progress > 0 ? 'active' : 'upcoming';
                  return (
                    <div key={stage.id} className="text-center" data-testid={`stage-${stage.name.toLowerCase().replace(/\s+/g, '-')}`}>
                      <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center ${
                        status === 'completed' ? 'bg-green-500 text-white' :
                        status === 'active' ? 'bg-primary text-primary-foreground' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {status === 'completed' && <CheckCircle className="h-6 w-6" />}
                        {status === 'active' && <Clock className="h-6 w-6" />}
                        {status === 'upcoming' && <span className="text-sm font-bold">{index + 1}</span>}
                      </div>
                      <h4 className="font-medium text-sm">{stage.name}</h4>
                      <Progress value={progress} className="mt-2 h-2" />
                      <span className="text-xs text-muted-foreground">{progress}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              Target Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Target Listing Date</span>
                <Badge variant="outline">
                  {companies?.[0]?.targetListingDate 
                    ? format(new Date(companies[0].targetListingDate), 'MMM yyyy')
                    : 'Not set'
                  }
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Days remaining</span>
                  <span className="font-medium">
                    {companies?.[0]?.targetListingDate 
                      ? Math.max(0, Math.ceil((new Date(companies[0].targetListingDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))
                      : '--'
                    }
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Current stage</span>
                  <span className="font-medium capitalize">
                    {companies?.[0]?.listingStage || 'exploration'}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { 
            label: "Tasks Completed", 
            value: `${completedTasks}/${totalTasks}`, 
            icon: CheckCircle, 
            color: "text-green-600" 
          },
          { 
            label: "High Priority Tasks", 
            value: `${highPriorityTasks.length}`, 
            icon: AlertTriangle, 
            color: "text-red-600" 
          },
          { 
            label: "Resources Available", 
            value: `${resources?.length || 0}`, 
            icon: FileText, 
            color: "text-blue-600" 
          },
          { 
            label: "Overall Progress", 
            value: `${overallProgress}%`, 
            icon: Target, 
            color: "text-purple-600" 
          }
        ].map((metric, index) => (
          <Card key={index} data-testid={`metric-${index}`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 bg-muted rounded-lg`}>
                  <metric.icon className={`h-5 w-5 ${metric.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="text-lg font-bold">{metric.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Items */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Priority Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {highPriorityTasks.slice(0, 4).map((task, index) => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg" data-testid={`action-${index}`}>
                  <div>
                    <h4 className="font-medium text-sm">{task.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      {task.category} • {task.estimatedTime || 'No estimate'}
                    </p>
                  </div>
                  <Badge variant="destructive">
                    {task.priority}
                  </Badge>
                </div>
              ))}
              {highPriorityTasks.length === 0 && (
                <div className="text-center py-4 text-muted-foreground">
                  <p className="text-sm">No high priority tasks at the moment</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Dialog open={isScheduleModalOpen} onOpenChange={setIsScheduleModalOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full justify-between" data-testid="button-schedule-adviser">
                    Schedule Adviser Meeting
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Schedule Adviser Meeting</DialogTitle>
                  </DialogHeader>
                  <Form {...meetingForm}>
                    <form onSubmit={meetingForm.handleSubmit(handleScheduleMeeting)} className="space-y-4">
                      <FormField
                        control={meetingForm.control}
                        name="meetingType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Meeting Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select meeting type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="ipo-strategy">IPO Strategy Session</SelectItem>
                                <SelectItem value="compliance-review">Compliance Review</SelectItem>
                                <SelectItem value="financial-planning">Financial Planning</SelectItem>
                                <SelectItem value="market-readiness">Market Readiness Assessment</SelectItem>
                                <SelectItem value="general-consultation">General Consultation</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={meetingForm.control}
                        name="preferredDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Preferred Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                    data-testid="input-preferred-date"
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date < new Date() || date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={meetingForm.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Notes (Optional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Please describe what you'd like to discuss or any specific questions you have..."
                                className="resize-none"
                                rows={3}
                                data-testid="textarea-notes"
                                {...field}
                                value={field.value || ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex gap-3 pt-4">
                        <Button 
                          type="submit" 
                          className="flex-1" 
                          data-testid="button-submit-meeting"
                          disabled={createMeetingMutation.isPending}
                        >
                          {createMeetingMutation.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            "Submit Request"
                          )}
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setIsScheduleModalOpen(false)} 
                          data-testid="button-cancel-meeting"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>

              {/* Timeline Update Modal */}
              <Dialog open={isTimelineModalOpen} onOpenChange={setIsTimelineModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Update IPO Timeline</DialogTitle>
                  </DialogHeader>
                  <Form {...timelineForm}>
                    <form onSubmit={timelineForm.handleSubmit(handleTimelineUpdate)} className="space-y-6">
                      <FormField
                        control={timelineForm.control}
                        name="listingStage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Listing Stage</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-listing-stage">
                                  <SelectValue placeholder="Select your current stage" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="exploration">Exploration</SelectItem>
                                <SelectItem value="preparation">Preparation</SelectItem>
                                <SelectItem value="application">Application</SelectItem>
                                <SelectItem value="listed">Listed</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={timelineForm.control}
                        name="targetListingDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Target Listing Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                    data-testid="button-target-date"
                                  >
                                    {field.value ? format(field.value, "PPP") : "Select target date"}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => date < new Date()}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex gap-3 pt-4">
                        <Button 
                          type="submit" 
                          className="flex-1" 
                          data-testid="button-submit-timeline"
                          disabled={updateTimelineMutation.isPending}
                        >
                          {updateTimelineMutation.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Updating...
                            </>
                          ) : (
                            "Update Timeline"
                          )}
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setIsTimelineModalOpen(false)} 
                          data-testid="button-cancel-timeline"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>

              {/* Full Checklist Modal */}
              <Dialog open={isChecklistModalOpen} onOpenChange={setIsChecklistModalOpen}>
                <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>IPO Preparation Checklist</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    {founderTasks && founderTasks.length > 0 ? (
                      // Group tasks by category
                      Object.entries(
                        founderTasks.reduce((acc, task) => {
                          if (!acc[task.category]) {
                            acc[task.category] = [];
                          }
                          acc[task.category].push(task);
                          return acc;
                        }, {} as Record<string, typeof founderTasks>)
                      ).map(([category, categoryTasks]) => (
                        <div key={category} className="space-y-3">
                          <h3 className="text-lg font-semibold text-foreground capitalize border-b pb-2">
                            {category.replace('-', ' ')}
                          </h3>
                          <div className="grid gap-3">
                            {categoryTasks.map((task) => {
                              const isCompleted = userProgress?.some(
                                progress => progress.taskId === task.id && progress.completed
                              ) || false;
                              
                              return (
                                <Card key={task.id} className="p-4 hover-elevate">
                                  <div className="flex items-start gap-3">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="p-0 h-6 w-6 rounded-full"
                                      onClick={() => handleTaskToggle(task.id, isCompleted)}
                                      disabled={updateProgressMutation.isPending}
                                      data-testid={`checkbox-task-${task.id}`}
                                    >
                                      {isCompleted ? (
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                      ) : (
                                        <div className="h-5 w-5 border-2 border-muted-foreground rounded-full" />
                                      )}
                                    </Button>
                                    <div className="flex-1 space-y-2">
                                      <div className="flex items-center justify-between">
                                        <h4 className={cn(
                                          "font-medium text-sm",
                                          isCompleted && "line-through text-muted-foreground"
                                        )}>
                                          {task.title}
                                        </h4>
                                        <div className="flex items-center gap-2">
                                          <Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}>
                                            {task.priority}
                                          </Badge>
                                          {task.estimatedTime && (
                                            <Badge variant="outline" className="text-xs">
                                              <Clock className="h-3 w-3 mr-1" />
                                              {task.estimatedTime}
                                            </Badge>
                                          )}
                                        </div>
                                      </div>
                                      <p className={cn(
                                        "text-sm text-muted-foreground",
                                        isCompleted && "line-through opacity-60"
                                      )}>
                                        {task.description}
                                      </p>
                                      {task.dependencies && task.dependencies.length > 0 && (
                                        <div className="text-xs text-muted-foreground">
                                          <span className="font-medium">Dependencies:</span> {task.dependencies.join(', ')}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </Card>
                              );
                            })}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No tasks available for your role.</p>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end pt-4 border-t">
                    <Button 
                      onClick={() => setIsChecklistModalOpen(false)}
                      data-testid="button-close-checklist"
                    >
                      Close
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Button 
                variant="outline" 
                className="w-full justify-between" 
                data-testid="button-update-timeline"
                onClick={() => setIsTimelineModalOpen(true)}
              >
                Update Timeline
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-between" 
                data-testid="button-view-checklist"
                onClick={() => setIsChecklistModalOpen(true)}
              >
                View Full Checklist
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );




  const renderAdvisers = () => {
    // Filter resources for templates and regulatory documents that advisers would use
    const adviserResources = resources?.filter(resource => 
      resource.type === 'Template' || resource.type === 'Regulatory Document'
    ) || [];

    return (
      <div className="space-y-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Expert Resources & Templates</h2>
          <p className="text-lg text-muted-foreground">
            Access comprehensive templates and regulatory documents essential for your ASX listing journey.
          </p>
        </div>

        {resourcesLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading expert resources...</span>
          </div>
        )}

        {resourcesError && (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <AlertTriangle className="h-8 w-8 text-destructive" />
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">Failed to load resources</h3>
              <p className="text-muted-foreground mb-4">
                Unable to load expert resources. Please try again.
              </p>
              <Button onClick={() => window.location.reload()} size="sm" data-testid="button-retry-resources">
                <ArrowRight className="h-4 w-4 mr-2" />
                Retry
              </Button>
            </div>
          </div>
        )}

        {!resourcesLoading && !resourcesError && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adviserResources.map((resource, index) => (
              <Card key={resource.id} className="hover-elevate transition-all duration-200" data-testid={`adviser-resource-${index}`}>
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <GraduationCap className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground">{resource.type}</p>
                    <Badge className="mt-1">{resource.category}</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span className="font-medium">{resource.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Access:</span>
                      <span className="font-medium">{resource.isPublic ? 'Public' : 'Members'}</span>
                    </div>
                    {resource.tags && resource.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {resource.tags.slice(0, 2).map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <Button 
                    className="w-full mt-4" 
                    size="sm"
                    onClick={() => {
                      if (resource.url) {
                        window.open(resource.url, '_blank');
                      }
                    }}
                    data-testid={`button-access-resource-${index}`}
                  >
                    Access Resource
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  };

  switch (activeSection) {
    case 'overview':
      return renderOverview();
    case 'preparation':
      return <EnhancedIPOPreparation />;
    case 'market-intelligence':
      return <MarketIntelligenceSection />;
    case 'network':
      return <EnhancedFounderNetwork />;
    case 'advisers':
      return renderAdvisers();
    default:
      return renderOverview();
  }
}