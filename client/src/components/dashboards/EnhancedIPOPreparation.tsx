import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { 
  CheckCircle, 
  Clock, 
  FileText, 
  Users, 
  DollarSign, 
  Shield, 
  Calendar,
  AlertTriangle,
  Building,
  Briefcase,
  TrendingUp,
  Target,
  ChevronRight,
  Download,
  Upload,
  Eye,
  Plus,
  Loader2
} from "lucide-react";
import { 
  useTasks, 
  useUserProgress,
  useUpdateProgress
} from "@/hooks/useASXData";
import { useToast } from "@/hooks/use-toast";

export function EnhancedIPOPreparation() {
  const DEMO_USER_ID = "founder_demo";
  const { data: founderTasks, isLoading: tasksLoading } = useTasks("Founder/CEO");
  const { data: userProgress, isLoading: progressLoading } = useUserProgress(DEMO_USER_ID);
  const updateProgressMutation = useUpdateProgress();
  const { toast } = useToast();

  // Handle task completion toggle
  const handleTaskToggle = async (taskId: string, isCurrentlyCompleted: boolean) => {
    try {
      await updateProgressMutation.mutateAsync({
        userId: DEMO_USER_ID,
        taskId,
        completed: !isCurrentlyCompleted
      });
      
      toast({
        title: !isCurrentlyCompleted ? "Task completed!" : "Task marked incomplete",
        description: !isCurrentlyCompleted ? "Great progress on your IPO journey!" : "Task has been unmarked",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update task status. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Group tasks by category for preparation view
  const tasksByCategory = founderTasks?.reduce((acc, task) => {
    if (!acc[task.category]) {
      acc[task.category] = [];
    }
    acc[task.category].push(task);
    return acc;
  }, {} as Record<string, typeof founderTasks>) || {};

  const categories = Object.keys(tasksByCategory);

  // Calculate overall progress
  const totalTasks = founderTasks?.length || 0;
  const completedTasks = founderTasks?.filter(task =>
    userProgress?.some(progress => progress.taskId === task.id && progress.completed)
  ).length || 0;
  const overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // IPO Readiness Assessment Data
  const readinessMetrics = [
    {
      category: "Financial Preparedness",
      score: 85,
      status: "strong",
      items: ["3-year audited financials", "Revenue growth tracking", "Cash flow management", "Valuation analysis"]
    },
    {
      category: "Governance & Compliance",
      score: 72,
      status: "moderate",
      items: ["Board composition", "Audit committee", "Risk management", "Compliance framework"]
    },
    {
      category: "Market Readiness",
      score: 68,
      status: "needs-improvement",
      items: ["Market positioning", "Competitive analysis", "Growth strategy", "Investor materials"]
    },
    {
      category: "Operational Excellence",
      score: 78,
      status: "moderate",
      items: ["Management team", "Key systems", "Scalability plans", "Risk mitigation"]
    }
  ];

  // Document Preparation Workspace
  const documentCategories = [
    {
      title: "Financial Documents",
      icon: DollarSign,
      documents: [
        { name: "Audited Financial Statements (3 years)", status: "completed", dueDate: "2024-12-15" },
        { name: "Management Accounts", status: "in-progress", dueDate: "2025-01-10" },
        { name: "Cash Flow Projections", status: "pending", dueDate: "2025-01-20" },
        { name: "Valuation Report", status: "pending", dueDate: "2025-02-01" }
      ]
    },
    {
      title: "Legal & Governance",
      icon: Shield,
      documents: [
        { name: "Prospectus Draft", status: "in-progress", dueDate: "2025-01-15" },
        { name: "Corporate Constitution", status: "completed", dueDate: "2024-11-30" },
        { name: "Board Resolutions", status: "completed", dueDate: "2024-12-05" },
        { name: "Material Contracts Review", status: "pending", dueDate: "2025-01-25" }
      ]
    },
    {
      title: "Market & Business",
      icon: TrendingUp,
      documents: [
        { name: "Business Plan Update", status: "in-progress", dueDate: "2025-01-12" },
        { name: "Market Analysis Report", status: "pending", dueDate: "2025-01-18" },
        { name: "Competitive Landscape", status: "pending", dueDate: "2025-01-22" },
        { name: "Risk Assessment", status: "completed", dueDate: "2024-12-20" }
      ]
    }
  ];

  // Compliance Milestones
  const complianceMilestones = [
    {
      phase: "Pre-IPO Planning",
      status: "completed",
      tasks: [
        "Board resolution to proceed with IPO",
        "Appointment of key advisers",
        "Initial due diligence planning"
      ],
      completedDate: "2024-11-15"
    },
    {
      phase: "Documentation Phase",
      status: "in-progress",
      tasks: [
        "Prospectus preparation",
        "Financial statement finalization",
        "Legal structure optimization"
      ],
      targetDate: "2025-01-31"
    },
    {
      phase: "Regulatory Submission",
      status: "pending",
      tasks: [
        "ASIC lodgement",
        "ASX listing application",
        "Regulatory approvals"
      ],
      targetDate: "2025-02-28"
    },
    {
      phase: "Marketing & Roadshow",
      status: "pending",
      tasks: [
        "Investor presentation preparation",
        "Roadshow planning",
        "Analyst briefings"
      ],
      targetDate: "2025-03-31"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-600 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800";
      case "in-progress": return "text-blue-600 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800";
      case "pending": return "text-orange-600 bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800";
      default: return "text-gray-600 bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-800";
    }
  };

  const getReadinessColor = (status: string) => {
    switch (status) {
      case "strong": return "text-green-600";
      case "moderate": return "text-blue-600";
      case "needs-improvement": return "text-orange-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">IPO Preparation Hub</h2>
        <p className="text-lg text-muted-foreground">
          Comprehensive preparation workspace for your ASX listing journey.
        </p>
      </div>

      {/* Overall Progress Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-500" />
            IPO Preparation Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-1">{overallProgress}%</div>
              <p className="text-sm text-muted-foreground">Overall Progress</p>
              <Progress value={overallProgress} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">{completedTasks}</div>
              <p className="text-sm text-muted-foreground">Tasks Completed</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">{totalTasks - completedTasks}</div>
              <p className="text-sm text-muted-foreground">Tasks Remaining</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">Q1 2025</div>
              <p className="text-sm text-muted-foreground">Target IPO</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="checklist" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="checklist">Task Checklist</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="readiness">Readiness</TabsTrigger>
        </TabsList>

        {/* Enhanced Task Checklist */}
        <TabsContent value="checklist" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const categoryTasks = tasksByCategory[category];
              const completedCategoryTasks = categoryTasks.filter(task =>
                userProgress?.some(progress => progress.taskId === task.id && progress.completed)
              );
              const progress = categoryTasks.length > 0 
                ? Math.round((completedCategoryTasks.length / categoryTasks.length) * 100)
                : 0;

              return (
                <Card key={category} data-testid={`prep-category-${index}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{category}</CardTitle>
                      <Badge variant="outline">{progress}%</Badge>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {categoryTasks.map((task, taskIndex) => {
                        const isCompleted = userProgress?.some(progress => 
                          progress.taskId === task.id && progress.completed
                        );
                        return (
                          <div key={task.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50">
                            <div 
                              className={`w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center cursor-pointer transition-colors ${
                                isCompleted ? 'bg-green-500 border-green-500 text-white hover:bg-green-600' : 'border-muted-foreground hover:border-primary hover:bg-primary/5'
                              } ${updateProgressMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                              onClick={() => !updateProgressMutation.isPending && handleTaskToggle(task.id, !!isCompleted)}
                              data-testid={`task-checkbox-${task.id}`}
                            >
                              {updateProgressMutation.isPending ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                isCompleted && <CheckCircle className="h-3 w-3" />
                              )}
                            </div>
                            <div className="flex-1">
                              <span 
                                className={`text-sm font-medium cursor-pointer select-none ${isCompleted ? 'line-through text-muted-foreground' : ''}`}
                                onClick={() => !updateProgressMutation.isPending && handleTaskToggle(task.id, !!isCompleted)}
                              >
                                {task.title}
                              </span>
                              <p className="text-xs text-muted-foreground mt-1">
                                Priority: {task.priority} • {task.estimatedTime}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Document Preparation Workspace */}
        <TabsContent value="documents" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {documentCategories.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <category.icon className="h-5 w-5 text-blue-500" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {category.documents.map((doc, docIndex) => (
                    <div key={docIndex} className="border rounded-lg p-3">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-sm font-medium">{doc.name}</h4>
                        <Badge className={getStatusColor(doc.status)} variant="outline">
                          {doc.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Due: {format(new Date(doc.dueDate), 'MMM dd, yyyy')}</span>
                        <div className="flex gap-1">
                          <Button size="icon" variant="ghost" className="h-6 w-6">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-6 w-6">
                            <Upload className="h-3 w-3" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-6 w-6">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Document
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Compliance Timeline */}
        <TabsContent value="compliance" className="space-y-6">
          <div className="space-y-4">
            {complianceMilestones.map((milestone, index) => (
              <Card key={index} data-testid={`compliance-milestone-${index}`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      milestone.status === 'completed' ? 'bg-green-100 dark:bg-green-900 text-green-600' :
                      milestone.status === 'in-progress' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600' :
                      'bg-gray-100 dark:bg-gray-900 text-gray-600'
                    }`}>
                      {milestone.status === 'completed' ? <CheckCircle className="h-6 w-6" /> :
                       milestone.status === 'in-progress' ? <Clock className="h-6 w-6" /> :
                       <Calendar className="h-6 w-6" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{milestone.phase}</h3>
                        <Badge className={getStatusColor(milestone.status)} variant="outline">
                          {milestone.status}
                        </Badge>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-foreground mb-2">Key Tasks:</h4>
                          <ul className="space-y-1">
                            {milestone.tasks.map((task, taskIndex) => (
                              <li key={taskIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                                <div className="w-2 h-2 bg-current rounded-full"></div>
                                {task}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="text-sm">
                          {milestone.completedDate && (
                            <div className="text-green-600">
                              <strong>Completed:</strong> {format(new Date(milestone.completedDate), 'MMM dd, yyyy')}
                            </div>
                          )}
                          {milestone.targetDate && (
                            <div className="text-blue-600">
                              <strong>Target:</strong> {format(new Date(milestone.targetDate), 'MMM dd, yyyy')}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* IPO Readiness Assessment */}
        <TabsContent value="readiness" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {readinessMetrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{metric.category}</span>
                    <Badge className={`${getReadinessColor(metric.status)} font-bold`} variant="outline">
                      {metric.score}%
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={metric.score} className="mb-4" />
                  <div className="space-y-2">
                    {metric.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    <ChevronRight className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Overall Readiness Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-500" />
                Overall IPO Readiness Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-6xl font-bold text-purple-600 mb-2">76%</div>
                <p className="text-lg text-muted-foreground mb-4">IPO Ready - Good Progress</p>
                <Progress value={76} className="mb-4" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <div className="font-bold text-green-600">Strengths</div>
                    <div className="text-green-700 dark:text-green-300">Financial preparation</div>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <div className="font-bold text-blue-600">On Track</div>
                    <div className="text-blue-700 dark:text-blue-300">Governance setup</div>
                  </div>
                  <div className="p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                    <div className="font-bold text-orange-600">Focus Area</div>
                    <div className="text-orange-700 dark:text-orange-300">Market positioning</div>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                    <div className="font-bold text-purple-600">Timeline</div>
                    <div className="text-purple-700 dark:text-purple-300">Q1 2025 target</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}