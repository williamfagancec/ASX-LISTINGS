import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  DollarSign, 
  TrendingUp,
  FileSpreadsheet,
  PieChart,
  Calendar,
  AlertCircle,
  CheckCircle,
  Calculator,
  BarChart3,
  Target
} from "lucide-react";

interface CFODashboardProps {
  activeSection: string;
}

export default function CFODashboard({ activeSection }: CFODashboardProps) {
  const renderFinancialMetrics = () => (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Financial Overview</h2>
        <p className="text-lg text-muted-foreground">
          Monitor key financial metrics and IPO readiness indicators.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Revenue Growth", value: "+23%", icon: TrendingUp, color: "text-green-600" },
          { label: "EBITDA Margin", value: "18.5%", icon: PieChart, color: "text-blue-600" },
          { label: "Cash Position", value: "$12.5M", icon: DollarSign, color: "text-emerald-600" },
          { label: "Burn Rate", value: "$850K/mo", icon: Calculator, color: "text-orange-600" }
        ].map((metric, index) => (
          <Card key={index} data-testid={`financial-metric-${index}`}>
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
              <Target className="h-5 w-5 text-blue-500" />
              IPO Readiness Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">82%</div>
                <Progress value={82} className="h-3" />
              </div>
              <div className="space-y-2">
                {[
                  { area: "Financial Reporting", score: 95 },
                  { area: "Audit Readiness", score: 90 },
                  { area: "Forecasting", score: 75 },
                  { area: "Compliance", score: 70 }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{item.area}</span>
                    <span className="text-sm font-medium">{item.score}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Financial Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { task: "Q3 Financial Statements", status: "completed", due: "Completed" },
                { task: "Audit Preparation", status: "in_progress", due: "2 weeks" },
                { task: "Pro Forma Financials", status: "pending", due: "1 month" },
                { task: "Valuation Analysis", status: "pending", due: "6 weeks" }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {item.status === 'completed' ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-orange-600" />
                    )}
                    <span className="text-sm">{item.task}</span>
                  </div>
                  <Badge variant={item.status === 'completed' ? 'default' : 'secondary'}>
                    {item.due}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderReporting = () => (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Financial Reporting</h2>
        <p className="text-lg text-muted-foreground">
          Manage financial reports and documentation for ASX listing requirements.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: "Annual Report", period: "FY2024", status: "Published", priority: "High" },
          { name: "Half-Year Report", period: "H1 2024", status: "Draft", priority: "High" },
          { name: "Quarterly Report", period: "Q3 2024", status: "Complete", priority: "Medium" },
          { name: "Pro Forma Statements", period: "2024-2026", status: "In Progress", priority: "High" },
          { name: "Cash Flow Forecast", period: "24 months", status: "Review", priority: "Medium" },
          { name: "Audit Report", period: "FY2024", status: "Final", priority: "High" }
        ].map((report, index) => (
          <Card key={index} className="hover-elevate transition-all duration-200" data-testid={`report-${index}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-sm">{report.name}</h3>
                <Badge variant={report.priority === 'High' ? 'destructive' : 'secondary'} className="text-xs">
                  {report.priority}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{report.period}</p>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">{report.status}</Badge>
                <Button variant="ghost" size="sm">
                  <FileSpreadsheet className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderBudgeting = () => (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Budget & Forecasting</h2>
        <p className="text-lg text-muted-foreground">
          Plan and track budgets leading up to and post-IPO.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {[
          {
            category: "Operating Budget",
            current: 15200000,
            target: 18000000,
            variance: "+18.4%"
          },
          {
            category: "Capital Expenditure", 
            current: 2800000,
            target: 3500000,
            variance: "+25.0%"
          },
          {
            category: "IPO Costs",
            current: 850000,
            target: 1200000,
            variance: "+41.2%"
          }
        ].map((budget, index) => (
          <Card key={index} data-testid={`budget-${index}`}>
            <CardHeader>
              <CardTitle className="text-lg">{budget.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Current</span>
                  <span className="font-medium">${(budget.current / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Target</span>
                  <span className="font-medium">${(budget.target / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Variance</span>
                  <span className="font-medium text-green-600">{budget.variance}</span>
                </div>
                <Progress value={(budget.current / budget.target) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderCompliance = () => (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Financial Compliance</h2>
        <p className="text-lg text-muted-foreground">
          Ensure financial compliance with ASX listing rules and regulations.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {[
          {
            title: "Accounting Standards",
            items: [
              { name: "AASB Compliance", status: "current" },
              { name: "IFRS Alignment", status: "current" },
              { name: "Audit Standards", status: "review" },
              { name: "Disclosure Rules", status: "current" }
            ]
          },
          {
            title: "Reporting Requirements",
            items: [
              { name: "Continuous Disclosure", status: "current" },
              { name: "Corporate Governance", status: "current" },
              { name: "Risk Management", status: "review" },
              { name: "Related Party Disclosures", status: "current" }
            ]
          }
        ].map((section, index) => (
          <Card key={index} data-testid={`compliance-${index}`}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between">
                    <span className="text-sm">{item.name}</span>
                    <Badge variant={item.status === 'current' ? 'default' : 'secondary'}>
                      {item.status}
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
    case 'financial_metrics':
      return renderFinancialMetrics();
    case 'reporting':
      return renderReporting();
    case 'budgeting':
      return renderBudgeting();
    case 'compliance':
      return renderCompliance();
    default:
      return renderFinancialMetrics();
  }
}