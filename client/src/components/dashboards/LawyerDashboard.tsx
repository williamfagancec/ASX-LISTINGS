import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Scale, 
  FileText,
  CheckCircle,
  AlertTriangle,
  Clock,
  Download,
  Users,
  Building2,
  ArrowRight,
  BookOpen
} from "lucide-react";

interface LawyerDashboardProps {
  activeSection: string;
}

export default function LawyerDashboard({ activeSection }: LawyerDashboardProps) {
  const renderLegalRequirements = () => (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Legal Requirements</h2>
        <p className="text-lg text-muted-foreground">
          Navigate the regulatory framework and legal obligations for ASX listing compliance.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Legal Compliance", value: "85%", icon: Scale, color: "text-purple-600" },
          { label: "Pending Reviews", value: "12", icon: Clock, color: "text-orange-600" },
          { label: "Documents Ready", value: "28/35", icon: FileText, color: "text-blue-600" },
          { label: "Critical Issues", value: "3", icon: AlertTriangle, color: "text-red-600" }
        ].map((metric, index) => (
          <Card key={index} data-testid={`legal-metric-${index}`}>
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
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Critical Legal Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { issue: "Prospectus liability review", severity: "High", due: "3 days" },
                { issue: "Securities compliance audit", severity: "High", due: "1 week" },
                { issue: "Director warranty updates", severity: "Medium", due: "2 weeks" }
              ].map((item, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{item.issue}</h4>
                    <Badge variant={item.severity === 'High' ? 'destructive' : 'secondary'}>
                      {item.severity}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Due in {item.due}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Regulatory Checklist</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { item: "Corporations Act compliance", completed: true },
                { item: "ASIC regulatory filings", completed: true },
                { item: "ASX listing rule review", completed: false },
                { item: "Takeover provisions", completed: false }
              ].map((task, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className={`h-4 w-4 ${task.completed ? 'text-green-600' : 'text-muted-foreground'}`} />
                  <span className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {task.item}
                  </span>
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
        <h2 className="text-2xl font-bold text-foreground mb-4">Legal Documentation</h2>
        <p className="text-lg text-muted-foreground">
          Manage contracts, agreements, and legal documentation for the listing process.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Prospectus Draft", status: "In Review", priority: "High" },
          { title: "Underwriting Agreement", status: "Complete", priority: "High" },
          { title: "Listing Agreement", status: "Draft", priority: "Medium" },
          { title: "Director Warranties", status: "Pending", priority: "High" },
          { title: "Legal Opinions", status: "In Progress", priority: "Medium" },
          { title: "Regulatory Filings", status: "Complete", priority: "Medium" }
        ].map((doc, index) => (
          <Card key={index} className="hover-elevate transition-all duration-200" data-testid={`legal-doc-${index}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-sm">{doc.title}</h3>
                <Badge variant={doc.priority === 'High' ? 'destructive' : 'secondary'} className="text-xs">
                  {doc.priority}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">{doc.status}</Badge>
                <Button variant="ghost" size="sm">
                  <Download className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderDueDiligence = () => (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Due Diligence</h2>
        <p className="text-lg text-muted-foreground">
          Coordinate and track legal due diligence processes and reviews.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {[
          {
            category: "Corporate Structure",
            progress: 90,
            items: ["Entity structure", "Share capital", "Board composition", "Governance"]
          },
          {
            category: "Legal Compliance",
            progress: 75,
            items: ["Regulatory filings", "Litigation review", "IP portfolio", "Contracts"]
          },
          {
            category: "Risk Assessment",
            progress: 60,
            items: ["Legal risks", "Regulatory risks", "Operational risks", "Mitigation"]
          }
        ].map((section, index) => (
          <Card key={index} data-testid={`dd-section-${index}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{section.category}</CardTitle>
                <Badge variant="outline">{section.progress}%</Badge>
              </div>
              <Progress value={section.progress} className="h-2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {section.items.map((item, itemIndex) => (
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

  const renderPrecedents = () => (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Legal Precedents</h2>
        <p className="text-lg text-muted-foreground">
          Access case studies and precedents from successful ASX Gateway listings.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {[
          {
            company: "TechCorp Ltd",
            sector: "Technology",
            year: "2023",
            highlights: ["Complex IP structure", "International operations", "Dual-class shares"]
          },
          {
            company: "GreenEnergy Solutions",
            sector: "Energy",
            year: "2022",
            highlights: ["ESG compliance", "Government approvals", "Infrastructure assets"]
          },
          {
            company: "HealthTech Innovations", 
            sector: "Healthcare",
            year: "2024",
            highlights: ["Regulatory approvals", "Clinical trials", "IP protection"]
          },
          {
            company: "Mining Corp Australia",
            sector: "Resources",
            year: "2023",
            highlights: ["Environmental permits", "Native title", "Joint ventures"]
          }
        ].map((precedent, index) => (
          <Card key={index} className="hover-elevate transition-all duration-200" data-testid={`precedent-${index}`}>
            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="font-semibold text-foreground mb-1">{precedent.company}</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{precedent.sector}</Badge>
                  <Badge variant="outline">Listed {precedent.year}</Badge>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Key Legal Issues</p>
                <div className="space-y-1">
                  {precedent.highlights.map((highlight, hIndex) => (
                    <div key={hIndex} className="flex items-center gap-2">
                      <BookOpen className="h-3 w-3 text-primary" />
                      <span className="text-xs">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                View Case Study
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  switch (activeSection) {
    case 'legal_requirements':
      return renderLegalRequirements();
    case 'documentation':
      return renderDocumentation();
    case 'due_diligence':
      return renderDueDiligence();
    case 'precedents':
      return renderPrecedents();
    default:
      return renderLegalRequirements();
  }
}