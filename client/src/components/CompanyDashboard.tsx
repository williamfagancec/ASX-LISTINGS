import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, AlertCircle, TrendingUp, Target, Calendar } from "lucide-react";

// TODO: remove mock data
const readinessMetrics = [
  { name: "Financial Statements", progress: 85, status: "in_progress", description: "3-year audited financials complete" },
  { name: "Legal Compliance", progress: 92, status: "completed", description: "Corporate structure optimized" },
  { name: "Market Position", progress: 67, status: "in_progress", description: "Competitive analysis in progress" },
  { name: "Team Readiness", progress: 45, status: "needs_attention", description: "Key hires needed" }
];

const nextSteps = [
  { task: "Complete Q3 financial audit", deadline: "Oct 15, 2024", priority: "high" },
  { task: "Finalize board composition", deadline: "Oct 30, 2024", priority: "medium" },
  { task: "Prepare investor presentation", deadline: "Nov 15, 2024", priority: "high" },
  { task: "Engage underwriter consultations", deadline: "Dec 1, 2024", priority: "medium" }
];

const milestones = [
  { name: "IPO Readiness Assessment", completed: true, date: "Sep 1, 2024" },
  { name: "Financial Audit Q1-Q2", completed: true, date: "Sep 15, 2024" },
  { name: "Legal Structure Review", completed: true, date: "Sep 30, 2024" },
  { name: "Market Analysis", completed: false, date: "Oct 31, 2024" },
  { name: "IPO Application", completed: false, date: "Jan 15, 2025" }
];

export default function CompanyDashboard() {
  const handleTaskAction = (taskIndex: number) => {
    console.log(`Action taken on task ${taskIndex}`);
  };

  const overallProgress = Math.round(readinessMetrics.reduce((acc, metric) => acc + metric.progress, 0) / readinessMetrics.length);

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Your IPO Journey Dashboard
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Track your progress, manage next steps, and stay on course for your successful public launch.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Overall Progress */}
          <Card className="lg:col-span-2" data-testid="card-overall-progress">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                IPO Readiness Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-foreground mb-2">{overallProgress}%</div>
                <div className="text-muted-foreground">Overall Readiness</div>
                <Progress value={overallProgress} className="mt-4" />
              </div>
              
              <div className="space-y-4">
                {readinessMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg" data-testid={`metric-${index}`}>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-foreground">{metric.name}</h4>
                        {metric.status === 'completed' && <CheckCircle className="h-4 w-4 text-green-500" />}
                        {metric.status === 'in_progress' && <Clock className="h-4 w-4 text-yellow-500" />}
                        {metric.status === 'needs_attention' && <AlertCircle className="h-4 w-4 text-red-500" />}
                      </div>
                      <p className="text-sm text-muted-foreground">{metric.description}</p>
                      <Progress value={metric.progress} className="mt-2" />
                    </div>
                    <div className="ml-4 text-sm font-medium text-foreground">
                      {metric.progress}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card data-testid="card-next-steps">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {nextSteps.map((step, index) => (
                  <div key={index} className="p-3 border rounded-lg hover-elevate transition-all duration-200" data-testid={`next-step-${index}`}>
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-foreground text-sm">{step.task}</h4>
                      <Badge variant={step.priority === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                        {step.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{step.deadline}</p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full text-xs"
                      onClick={() => handleTaskAction(index)}
                      data-testid={`button-task-${index}`}
                    >
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Milestone Timeline */}
          <Card className="lg:col-span-3" data-testid="card-milestones">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                IPO Timeline & Milestones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center gap-4" data-testid={`milestone-${index}`}>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      milestone.completed 
                        ? 'bg-green-500 border-green-500' 
                        : 'border-muted-foreground bg-background'
                    }`}>
                      {milestone.completed && <CheckCircle className="h-3 w-3 text-white" />}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-medium ${
                        milestone.completed ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {milestone.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">{milestone.date}</p>
                    </div>
                    {milestone.completed && (
                      <Badge variant="secondary">Completed</Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}