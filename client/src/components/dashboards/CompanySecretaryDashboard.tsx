import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Calendar,
  CheckCircle,
  AlertTriangle,
  Clock,
  Download,
  Upload,
  Users,
  Building2,
  ArrowRight,
  Shield
} from "lucide-react";

interface CompanySecretaryDashboardProps {
  activeSection: string;
}

export default function CompanySecretaryDashboard({ activeSection }: CompanySecretaryDashboardProps) {
  const renderCompliance = () => (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Compliance Dashboard</h2>
        <p className="text-lg text-muted-foreground">
          Monitor and manage all regulatory requirements and compliance obligations for your ASX listing.
        </p>
      </div>

      {/* Compliance Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Current Compliance", value: "92%", icon: Shield, color: "text-green-600" },
          { label: "Pending Reviews", value: "8", icon: Clock, color: "text-orange-600" },
          { label: "Completed Audits", value: "15", icon: CheckCircle, color: "text-blue-600" },
          { label: "Critical Issues", value: "2", icon: AlertTriangle, color: "text-red-600" }
        ].map((metric, index) => (
          <Card key={index} data-testid={`compliance-metric-${index}`}>
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

      {/* Critical Compliance Areas */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Critical Compliance Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  issue: "Director independence requirements",
                  severity: "High",
                  dueDate: "5 days",
                  status: "In Progress"
                },
                {
                  issue: "Related party transaction disclosure",
                  severity: "Medium",
                  dueDate: "2 weeks",
                  status: "Not Started"
                }
              ].map((item, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{item.issue}</h4>
                    <Badge variant={item.severity === 'High' ? 'destructive' : 'secondary'}>
                      {item.severity}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Due in {item.dueDate}</span>
                    <span className="font-medium">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Recent Completions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { task: "Annual governance review", completed: "2 days ago" },
                { task: "Board composition update", completed: "1 week ago" },
                { task: "Audit committee charter", completed: "2 weeks ago" },
                { task: "Risk management policy", completed: "3 weeks ago" }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium">{item.task}</span>
                  <span className="text-xs text-muted-foreground">{item.completed}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderDocumentation = () => (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Documentation Center</h2>
        <p className="text-lg text-muted-foreground">
          Access and manage all required documentation, forms, and templates for ASX listing compliance.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {[
          {
            category: "Legal Documents",
            documents: [
              { name: "Constitution", status: "current", lastUpdated: "2024-01-15" },
              { name: "Shareholders Agreement", status: "draft", lastUpdated: "2024-02-01" },
              { name: "Board Charter", status: "current", lastUpdated: "2024-01-10" },
              { name: "Code of Conduct", status: "review", lastUpdated: "2023-12-20" }
            ]
          },
          {
            category: "Financial Reports",
            documents: [
              { name: "Annual Financial Report", status: "current", lastUpdated: "2024-02-28" },
              { name: "Half-Year Report", status: "current", lastUpdated: "2024-01-31" },
              { name: "Quarterly Cashflow", status: "current", lastUpdated: "2024-02-15" },
              { name: "Management Accounts", status: "draft", lastUpdated: "2024-02-20" }
            ]
          },
          {
            category: "Disclosure Forms",
            documents: [
              { name: "Continuous Disclosure Policy", status: "current", lastUpdated: "2024-01-05" },
              { name: "Related Party Transactions", status: "review", lastUpdated: "2024-01-20" },
              { name: "Director Interests", status: "current", lastUpdated: "2024-02-10" },
              { name: "Securities Trading Policy", status: "current", lastUpdated: "2024-01-15" }
            ]
          }
        ].map((section, index) => (
          <Card key={index} data-testid={`doc-section-${index}`}>
            <CardHeader>
              <CardTitle className="text-lg">{section.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {section.documents.map((doc, docIndex) => (
                  <div key={docIndex} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded">
                    <div>
                      <h4 className="font-medium text-sm">{doc.name}</h4>
                      <p className="text-xs text-muted-foreground">Updated {doc.lastUpdated}</p>
                    </div>
                    <Badge 
                      variant={
                        doc.status === 'current' ? 'default' :
                        doc.status === 'draft' ? 'secondary' : 'destructive'
                      }
                      className="text-xs"
                    >
                      {doc.status}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                <Download className="h-4 w-4 mr-2" />
                Download All
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderDeadlines = () => (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Key Deadlines Calendar</h2>
        <p className="text-lg text-muted-foreground">
          Stay on top of critical dates and milestones for your ASX listing journey.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-500" />
              Upcoming Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  task: "Board meeting minutes submission",
                  date: "March 15, 2024",
                  daysLeft: 5,
                  priority: "High"
                },
                {
                  task: "Quarterly compliance report",
                  date: "March 31, 2024",
                  daysLeft: 21,
                  priority: "Medium"
                },
                {
                  task: "AGM notice preparation",
                  date: "April 10, 2024",
                  daysLeft: 31,
                  priority: "Medium"
                },
                {
                  task: "Annual return filing",
                  date: "May 1, 2024",
                  daysLeft: 52,
                  priority: "High"
                }
              ].map((deadline, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium text-sm">{deadline.task}</h4>
                    <p className="text-xs text-muted-foreground">{deadline.date}</p>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={deadline.priority === 'High' ? 'destructive' : 'secondary'}
                      className="mb-1"
                    >
                      {deadline.priority}
                    </Badge>
                    <p className="text-xs text-muted-foreground">{deadline.daysLeft} days</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Monthly Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { month: "March 2024", tasks: 8, completed: 5 },
                { month: "April 2024", tasks: 6, completed: 0 },
                { month: "May 2024", tasks: 4, completed: 0 },
                { month: "June 2024", tasks: 7, completed: 0 }
              ].map((month, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-sm">{month.month}</span>
                    <span className="text-sm text-muted-foreground">
                      {month.completed}/{month.tasks} completed
                    </span>
                  </div>
                  <Progress 
                    value={(month.completed / month.tasks) * 100} 
                    className="h-2" 
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderResources = () => (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Compliance Resources</h2>
        <p className="text-lg text-muted-foreground">
          Access guides, templates, and reference materials to support your compliance activities.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "ASX Listing Rules Guide",
            type: "Guide",
            description: "Comprehensive guide to ASX listing requirements and ongoing obligations.",
            category: "Regulatory"
          },
          {
            title: "Corporate Governance Templates",
            type: "Templates", 
            description: "Ready-to-use templates for board charters, policies, and procedures.",
            category: "Governance"
          },
          {
            title: "Continuous Disclosure Handbook",
            type: "Handbook",
            description: "Best practices for meeting continuous disclosure obligations.",
            category: "Disclosure"
          },
          {
            title: "Related Party Transaction Forms",
            type: "Forms",
            description: "Standard forms and procedures for related party transactions.",
            category: "Compliance"
          },
          {
            title: "Board Meeting Minute Templates",
            type: "Templates",
            description: "Professional templates for recording board and committee meetings.",
            category: "Governance"
          },
          {
            title: "Shareholder Communication Guide",
            type: "Guide",
            description: "Guidelines for effective shareholder communications and AGMs.",
            category: "Communications"
          }
        ].map((resource, index) => (
          <Card key={index} className="hover-elevate transition-all duration-200" data-testid={`resource-${index}`}>
            <CardContent className="p-6">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{resource.type}</Badge>
                  <Badge variant="secondary" className="text-xs">{resource.category}</Badge>
                </div>
                <h3 className="font-semibold text-foreground mb-2">{resource.title}</h3>
                <p className="text-sm text-muted-foreground">{resource.description}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  switch (activeSection) {
    case 'compliance':
      return renderCompliance();
    case 'documentation':
      return renderDocumentation();
    case 'deadlines':
      return renderDeadlines();
    case 'resources':
      return renderResources();
    default:
      return renderCompliance();
  }
}