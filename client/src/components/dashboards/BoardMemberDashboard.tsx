import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  FileText,
  ShieldCheck,
  Clock,
  AlertTriangle,
  CheckCircle,
  Vote,
  Eye,
  Calendar,
  TrendingUp
} from "lucide-react";

interface BoardMemberDashboardProps {
  activeSection: string;
}

export default function BoardMemberDashboard({ activeSection }: BoardMemberDashboardProps) {
  const renderGovernance = () => (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Governance Overview</h2>
        <p className="text-lg text-muted-foreground">
          Monitor board governance and oversight responsibilities for IPO readiness.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Board Meetings", value: "12/12", icon: Users, color: "text-blue-600" },
          { label: "Resolutions", value: "24", icon: Vote, color: "text-green-600" },
          { label: "Compliance Score", value: "94%", icon: ShieldCheck, color: "text-emerald-600" },
          { label: "Action Items", value: "3", icon: Clock, color: "text-orange-600" }
        ].map((metric, index) => (
          <Card key={index} data-testid={`governance-metric-${index}`}>
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

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Key Governance Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { issue: "Director independence requirements", priority: "High", status: "In Progress" },
                { issue: "Audit committee composition", priority: "Medium", status: "Resolved" },
                { issue: "Risk management framework", priority: "High", status: "Review" }
              ].map((item, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{item.issue}</h4>
                    <Badge variant={item.priority === 'High' ? 'destructive' : 'secondary'}>
                      {item.priority}
                    </Badge>
                  </div>
                  <Badge variant="outline" className="text-xs">{item.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Board Composition</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-muted rounded-lg">
                  <div className="text-xl font-bold">7</div>
                  <div className="text-sm text-muted-foreground">Total Directors</div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="text-xl font-bold">4</div>
                  <div className="text-sm text-muted-foreground">Independent</div>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { role: "Chairman", name: "John Smith", independent: true },
                  { role: "CEO", name: "Sarah Chen", independent: false },
                  { role: "Non-Executive", name: "Michael Brown", independent: true }
                ].map((director, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div>
                      <span className="font-medium">{director.name}</span>
                      <span className="text-muted-foreground ml-2">({director.role})</span>
                    </div>
                    <Badge variant={director.independent ? 'default' : 'secondary'}>
                      {director.independent ? 'Independent' : 'Executive'}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderMeetings = () => (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Board Meetings</h2>
        <p className="text-lg text-muted-foreground">
          Manage board meetings, agendas, and decision tracking.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { date: "Dec 15, 2024", type: "Regular Board Meeting", status: "Scheduled", items: 8 },
          { date: "Nov 20, 2024", type: "IPO Committee", status: "Completed", items: 6 },
          { date: "Oct 18, 2024", type: "Audit Committee", status: "Completed", items: 5 },
          { date: "Sep 15, 2024", type: "Regular Board Meeting", status: "Completed", items: 7 },
          { date: "Aug 20, 2024", type: "Risk Committee", status: "Completed", items: 4 },
          { date: "Jul 15, 2024", type: "Regular Board Meeting", status: "Completed", items: 9 }
        ].map((meeting, index) => (
          <Card key={index} className="hover-elevate transition-all duration-200" data-testid={`meeting-${index}`}>
            <CardContent className="p-4">
              <div className="mb-3">
                <h3 className="font-semibold text-sm">{meeting.type}</h3>
                <p className="text-xs text-muted-foreground">{meeting.date}</p>
              </div>
              <div className="flex items-center justify-between">
                <Badge variant={meeting.status === 'Scheduled' ? 'secondary' : 'default'}>
                  {meeting.status}
                </Badge>
                <span className="text-xs text-muted-foreground">{meeting.items} items</span>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-3">
                <Eye className="h-3 w-3 mr-1" />
                View
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderOversight = () => (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Risk Oversight</h2>
        <p className="text-lg text-muted-foreground">
          Monitor key risks and oversight responsibilities.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {[
          {
            category: "Financial Risk",
            level: "Medium",
            items: ["Liquidity management", "Credit exposure", "Market volatility", "Currency risk"]
          },
          {
            category: "Operational Risk",
            level: "Low",
            items: ["Process failures", "Technology risks", "Human resources", "Supply chain"]
          },
          {
            category: "Regulatory Risk",
            level: "High",
            items: ["Compliance failures", "Regulatory changes", "Listing requirements", "Disclosure"]
          }
        ].map((risk, index) => (
          <Card key={index} data-testid={`risk-${index}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{risk.category}</CardTitle>
                <Badge variant={risk.level === 'High' ? 'destructive' : risk.level === 'Medium' ? 'secondary' : 'default'}>
                  {risk.level}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {risk.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span className="text-xs">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Board Reports</h2>
        <p className="text-lg text-muted-foreground">
          Access key reports and documentation for board oversight.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {[
          {
            title: "Financial Reports",
            reports: [
              { name: "Monthly Financial Package", date: "Nov 2024", status: "current" },
              { name: "Management Accounts", date: "Nov 2024", status: "current" },
              { name: "Cash Flow Report", date: "Nov 2024", status: "current" },
              { name: "Budget vs Actual", date: "Nov 2024", status: "current" }
            ]
          },
          {
            title: "Governance Reports",
            reports: [
              { name: "Risk Register", date: "Nov 2024", status: "current" },
              { name: "Compliance Report", date: "Nov 2024", status: "current" },
              { name: "Internal Audit Report", date: "Oct 2024", status: "review" },
              { name: "Legal Update", date: "Nov 2024", status: "current" }
            ]
          }
        ].map((section, index) => (
          <Card key={index} data-testid={`reports-${index}`}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {section.reports.map((report, reportIndex) => (
                  <div key={reportIndex} className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">{report.name}</div>
                      <div className="text-xs text-muted-foreground">{report.date}</div>
                    </div>
                    <Badge variant={report.status === 'current' ? 'default' : 'secondary'}>
                      {report.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  switch (activeSection) {
    case 'governance':
      return renderGovernance();
    case 'meetings':
      return renderMeetings();
    case 'oversight':
      return renderOversight();
    case 'reports':
      return renderReports();
    default:
      return renderGovernance();
  }
}