import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Building2, 
  FileText, 
  Scale, 
  Calculator, 
  Users, 
  GraduationCap,
  ChevronDown,
  Menu,
  Bell,
  User,
  CheckCircle
} from "lucide-react";
import { useState } from "react";
import { ROLES, Role } from "@shared/schema";

interface RoleBasedNavigationProps {
  currentRole: Role;
  onRoleChange: (role: Role) => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function RoleBasedNavigation({ 
  currentRole, 
  onRoleChange, 
  activeSection, 
  onSectionChange 
}: RoleBasedNavigationProps) {
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const roleConfig = {
    founder: {
      icon: Building2,
      color: 'bg-blue-500',
      sections: [
        { id: 'overview', name: 'Overview', description: 'Strategic roadmap and timeline' },
        { id: 'preparation', name: 'IPO Preparation', description: 'Key milestones and checklist' },
        { id: 'market-intelligence', name: 'Market Intelligence', description: 'Real-time market data and IPO analytics' },
        { id: 'network', name: 'Founder Network', description: 'Connect with other founders' },
        { id: 'advisers', name: 'Find Advisers', description: 'Expert guidance and support' }
      ]
    },
    company_secretary: {
      icon: FileText,
      color: 'bg-green-500',
      sections: [
        { id: 'compliance', name: 'Compliance', description: 'Regulatory requirements' },
        { id: 'documentation', name: 'Documentation', description: 'Forms and templates' },
        { id: 'deadlines', name: 'Key Deadlines', description: 'Important dates and milestones' },
        { id: 'resources', name: 'Resources', description: 'Guides and references' }
      ]
    },
    lawyer: {
      icon: Scale,
      color: 'bg-purple-500',
      sections: [
        { id: 'legal_requirements', name: 'Legal Requirements', description: 'Regulatory framework' },
        { id: 'documentation', name: 'Legal Documentation', description: 'Contracts and agreements' },
        { id: 'due_diligence', name: 'Due Diligence', description: 'Legal review process' },
        { id: 'precedents', name: 'Precedents', description: 'Case studies and examples' }
      ]
    },
    cfo: {
      icon: Calculator,
      color: 'bg-orange-500',
      sections: [
        { id: 'financials', name: 'Financial Requirements', description: 'Reporting and metrics' },
        { id: 'valuation', name: 'Valuation', description: 'Company valuation tools' },
        { id: 'reporting', name: 'Reporting', description: 'Financial reporting requirements' },
        { id: 'metrics', name: 'Key Metrics', description: 'KPIs and benchmarks' }
      ]
    },
    board_member: {
      icon: Users,
      color: 'bg-red-500',
      sections: [
        { id: 'governance', name: 'Governance', description: 'Board responsibilities' },
        { id: 'meetings', name: 'Meetings', description: 'Board meeting management' },
        { id: 'oversight', name: 'Oversight', description: 'Strategic oversight tools' },
        { id: 'reports', name: 'Reports', description: 'Reporting and updates' }
      ]
    },
    adviser: {
      icon: GraduationCap,
      color: 'bg-cyan-500',
      sections: [
        { id: 'client_tools', name: 'Client Tools', description: 'Resources for your clients' },
        { id: 'marketplace', name: 'Adviser Marketplace', description: 'Connect with companies' },
        { id: 'resources', name: 'Resources', description: 'Professional development' },
        { id: 'network', name: 'Adviser Network', description: 'Connect with peers' }
      ]
    }
  };

  const currentConfig = roleConfig[currentRole];
  const IconComponent = currentConfig.icon;

  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Role Selector */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">ASX</span>
              </div>
              <div>
                <span className="text-xl font-semibold text-foreground">Listings</span>
                <Badge variant="secondary" className="ml-2 text-xs">Beta</Badge>
              </div>
            </div>

            {/* Role Selector */}
            <div className="relative">
              <Button 
                variant="outline" 
                className="flex items-center gap-3 h-10"
                onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
                data-testid="role-selector"
              >
                <div className={`w-6 h-6 ${currentConfig.color} rounded-md flex items-center justify-center`}>
                  <IconComponent className="h-3 w-3 text-white" />
                </div>
                <span className="hidden sm:inline">{ROLES[currentRole]}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
              
              {/* Role Dropdown */}
              {isRoleMenuOpen && (
                <Card className="absolute top-full left-0 mt-2 w-80 z-50">
                  <CardContent className="p-2">
                    <div className="space-y-1">
                      {Object.entries(ROLES).map(([roleKey, roleName]) => {
                        const config = roleConfig[roleKey as Role];
                        const RoleIcon = config.icon;
                        return (
                          <Button
                            key={roleKey}
                            variant={currentRole === roleKey ? "secondary" : "ghost"}
                            className="w-full justify-start p-3 h-auto"
                            onClick={() => {
                              onRoleChange(roleKey as Role);
                              setIsRoleMenuOpen(false);
                            }}
                            data-testid={`role-${roleKey}`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 ${config.color} rounded-lg flex items-center justify-center`}>
                                <RoleIcon className="h-4 w-4 text-white" />
                              </div>
                              <div className="text-left">
                                <div className="font-medium">{roleName}</div>
                                <div className="text-xs text-muted-foreground">
                                  {config.sections.length} sections available
                                </div>
                              </div>
                            </div>
                          </Button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {currentConfig.sections.map((section) => (
              <Button
                key={section.id}
                variant={activeSection === section.id ? "secondary" : "ghost"}
                onClick={() => onSectionChange(section.id)}
                data-testid={`nav-${section.id}`}
                className="text-sm"
              >
                {section.name}
              </Button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Button size="icon" variant="ghost" className="hidden sm:flex" data-testid="button-notifications">
              <Bell className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost" data-testid="button-profile">
              <User className="h-5 w-5" />
            </Button>
            <Button 
              size="icon" 
              variant="ghost" 
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <div className="space-y-2">
              {currentConfig.sections.map((section) => (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    onSectionChange(section.id);
                    setIsMobileMenuOpen(false);
                  }}
                  data-testid={`nav-mobile-${section.id}`}
                >
                  {section.name}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Section Indicator */}
        <div className="hidden md:block py-2 border-t">
          <div className="flex items-center gap-2 text-sm">
            <IconComponent className="h-4 w-4 text-primary" />
            <span className="font-medium text-foreground">{ROLES[currentRole]}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">
              {currentConfig.sections.find(s => s.id === activeSection)?.description || 'Dashboard'}
            </span>
          </div>
        </div>
      </div>
      
      {/* Overlay for role dropdown */}
      {isRoleMenuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsRoleMenuOpen(false)}
        />
      )}
    </header>
  );
}