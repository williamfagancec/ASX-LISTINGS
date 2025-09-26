import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Star,
  Briefcase,
  Clock,
  TrendingUp,
  Calendar,
  MessageSquare,
  Award,
  Target,
  DollarSign
} from "lucide-react";

interface AdviserDashboardProps {
  activeSection: string;
}

export default function AdviserDashboard({ activeSection }: AdviserDashboardProps) {
  const renderClients = () => (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Client Portfolio</h2>
        <p className="text-lg text-muted-foreground">
          Manage your IPO advisory clients and track their listing progress.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Clients", value: "12", icon: Users, color: "text-blue-600" },
          { label: "Avg Rating", value: "4.8", icon: Star, color: "text-yellow-600" },
          { label: "Success Rate", value: "94%", icon: Award, color: "text-green-600" },
          { label: "Revenue YTD", value: "$2.4M", icon: DollarSign, color: "text-emerald-600" }
        ].map((metric, index) => (
          <Card key={index} data-testid={`client-metric-${index}`}>
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
            <CardTitle>Active Client Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { company: "TechVenture Inc", stage: "Due Diligence", progress: 75, value: "$45M" },
                { company: "GreenTech Solutions", stage: "Preparation", progress: 45, value: "$28M" },
                { company: "HealthCorp Ltd", stage: "Documentation", progress: 85, value: "$62M" },
                { company: "DataFlow Systems", stage: "Application", progress: 95, value: "$35M" }
              ].map((client, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{client.company}</h4>
                    <Badge variant="secondary">{client.value}</Badge>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">{client.stage}</span>
                    <span className="text-xs font-medium">{client.progress}%</span>
                  </div>
                  <Progress value={client.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Successes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { company: "InnovateTech", listed: "Nov 2024", value: "$120M", return: "+23%" },
                { company: "CleanEnergy Corp", listed: "Sep 2024", value: "$85M", return: "+18%" },
                { company: "BioMed Solutions", listed: "Jul 2024", value: "$95M", return: "+31%" }
              ].map((success, index) => (
                <div key={index} className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm">{success.company}</h4>
                    <Badge variant="default">{success.return}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Listed {success.listed}</span>
                    <span>{success.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Advisory Services</h2>
        <p className="text-lg text-muted-foreground">
          Showcase your expertise and service offerings to potential clients.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            service: "IPO Strategy & Planning",
            expertise: "Expert",
            clients: 45,
            avgDuration: "8-12 months",
            pricing: "$25k-50k"
          },
          {
            service: "Due Diligence Support",
            expertise: "Expert", 
            clients: 38,
            avgDuration: "3-6 months",
            pricing: "$15k-30k"
          },
          {
            service: "Regulatory Compliance",
            expertise: "Advanced",
            clients: 42,
            avgDuration: "Ongoing",
            pricing: "$5k-15k/mo"
          },
          {
            service: "Valuation Advisory",
            expertise: "Expert",
            clients: 35,
            avgDuration: "2-4 months", 
            pricing: "$20k-40k"
          },
          {
            service: "Board Advisory",
            expertise: "Expert",
            clients: 28,
            avgDuration: "12+ months",
            pricing: "$10k-25k/mo"
          },
          {
            service: "Post-IPO Support",
            expertise: "Advanced",
            clients: 22,
            avgDuration: "6-12 months",
            pricing: "$8k-20k/mo"
          }
        ].map((service, index) => (
          <Card key={index} className="hover-elevate transition-all duration-200" data-testid={`service-${index}`}>
            <CardContent className="p-4">
              <div className="mb-3">
                <h3 className="font-semibold text-sm mb-2">{service.service}</h3>
                <div className="flex items-center gap-2">
                  <Badge variant={service.expertise === 'Expert' ? 'default' : 'secondary'}>
                    {service.expertise}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{service.clients} clients</span>
                </div>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span>{service.avgDuration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pricing:</span>
                  <span className="font-medium">{service.pricing}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderSchedule = () => (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Schedule & Meetings</h2>
        <p className="text-lg text-muted-foreground">
          Manage your client meetings and advisory commitments.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Meetings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { 
                  time: "2:00 PM Today", 
                  client: "TechVenture Inc", 
                  type: "IPO Strategy Review",
                  duration: "60 min"
                },
                { 
                  time: "10:00 AM Tomorrow", 
                  client: "GreenTech Solutions", 
                  type: "Due Diligence Prep",
                  duration: "90 min"
                },
                { 
                  time: "3:30 PM Dec 16", 
                  client: "HealthCorp Ltd", 
                  type: "Board Advisory",
                  duration: "45 min"
                },
                { 
                  time: "11:00 AM Dec 17", 
                  client: "DataFlow Systems", 
                  type: "Valuation Discussion",
                  duration: "60 min"
                }
              ].map((meeting, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{meeting.client}</h4>
                    <Badge variant="outline">{meeting.duration}</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mb-1">{meeting.type}</div>
                  <div className="text-xs font-medium">{meeting.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">32 hrs</div>
                <div className="text-sm text-muted-foreground">Available this week</div>
                <Progress value={68} className="h-2 mt-2" />
              </div>
              <div className="space-y-2">
                {[
                  { day: "Monday", slots: 3, booked: 2 },
                  { day: "Tuesday", slots: 4, booked: 4 },
                  { day: "Wednesday", slots: 3, booked: 1 },
                  { day: "Thursday", slots: 4, booked: 3 },
                  { day: "Friday", slots: 2, booked: 2 }
                ].map((day, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span>{day.day}</span>
                    <span className="text-muted-foreground">{day.booked}/{day.slots} slots</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderResources = () => (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Resources & Tools</h2>
        <p className="text-lg text-muted-foreground">
          Access advisory tools, templates, and market insights.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {[
          {
            title: "Advisory Templates",
            items: [
              { name: "IPO Readiness Checklist", type: "Checklist", updated: "Nov 2024" },
              { name: "Due Diligence Framework", type: "Template", updated: "Oct 2024" },
              { name: "Valuation Model", type: "Spreadsheet", updated: "Nov 2024" },
              { name: "Board Pack Template", type: "Template", updated: "Sep 2024" }
            ]
          },
          {
            title: "Market Intelligence",
            items: [
              { name: "ASX IPO Pipeline", type: "Report", updated: "Nov 2024" },
              { name: "Sector Analysis Q4", type: "Analysis", updated: "Nov 2024" },
              { name: "Valuation Benchmarks", type: "Data", updated: "Oct 2024" },
              { name: "Regulatory Updates", type: "Newsletter", updated: "Dec 2024" }
            ]
          }
        ].map((section, index) => (
          <Card key={index} data-testid={`resources-${index}`}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.type} • {item.updated}</div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Briefcase className="h-3 w-3" />
                    </Button>
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
    case 'clients':
      return renderClients();
    case 'services':
      return renderServices();
    case 'schedule':
      return renderSchedule();
    case 'resources':
      return renderResources();
    default:
      return renderClients();
  }
}