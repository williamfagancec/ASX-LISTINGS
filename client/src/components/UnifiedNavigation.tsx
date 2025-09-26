import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, BarChart3, TrendingUp, Users, Bell, Menu, User, ChevronDown } from "lucide-react";
import { useState } from "react";

interface UnifiedNavigationProps {
  activeSection: 'accelerator' | 'explorer' | 'oneview';
  onSectionChange: (section: 'accelerator' | 'explorer' | 'oneview') => void;
}

export default function UnifiedNavigation({ activeSection, onSectionChange }: UnifiedNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const sections = [
    {
      id: 'accelerator' as const,
      name: 'ASX Gateway',
      description: 'IPO preparation ecosystem',
      icon: TrendingUp
    },
    {
      id: 'explorer' as const,
      name: 'ASX Explorer',
      description: 'Discover ASX companies',
      icon: Search
    },
    {
      id: 'oneview' as const,
      name: 'ASX OneView',
      description: 'Unified market analytics',
      icon: BarChart3
    }
  ];

  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Main Brand */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">ASX</span>
              </div>
              <div>
                <span className="text-xl font-semibold text-foreground">Gateway</span>
                <Badge variant="secondary" className="ml-2 text-xs">Beta</Badge>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <div className="relative">
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                  data-testid="nav-products"
                >
                  Products
                  <ChevronDown className="h-4 w-4" />
                </Button>
                
                {/* Products Dropdown */}
                {isProductsOpen && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-background border rounded-lg shadow-lg p-2 z-50">
                    {sections.map((section) => {
                      const IconComponent = section.icon;
                      return (
                        <Button
                          key={section.id}
                          variant={activeSection === section.id ? "secondary" : "ghost"}
                          className="w-full justify-start p-3 h-auto"
                          onClick={() => {
                            onSectionChange(section.id);
                            setIsProductsOpen(false);
                          }}
                          data-testid={`nav-${section.id}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center">
                              <IconComponent className="h-4 w-4 text-primary" />
                            </div>
                            <div className="text-left">
                              <div className="font-medium">{section.name}</div>
                              <div className="text-xs text-muted-foreground">{section.description}</div>
                            </div>
                          </div>
                        </Button>
                      );
                    })}
                  </div>
                )}
              </div>
              
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground" data-testid="nav-marketplace">
                Marketplace
              </Button>
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground" data-testid="nav-insights">
                Insights
              </Button>
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground" data-testid="nav-support">
                Support
              </Button>
            </nav>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Button size="icon" variant="ghost" className="hidden sm:flex" data-testid="button-search">
              <Search className="h-5 w-5" />
            </Button>
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
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="button-menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <div className="space-y-2">
              {sections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <Button
                    key={section.id}
                    variant={activeSection === section.id ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      onSectionChange(section.id);
                      setIsMenuOpen(false);
                    }}
                    data-testid={`nav-mobile-${section.id}`}
                  >
                    <IconComponent className="h-4 w-4 mr-2" />
                    {section.name}
                  </Button>
                );
              })}
              <Button variant="ghost" className="w-full justify-start" data-testid="nav-mobile-marketplace">
                Marketplace
              </Button>
              <Button variant="ghost" className="w-full justify-start" data-testid="nav-mobile-insights">
                Insights
              </Button>
              <Button variant="ghost" className="w-full justify-start" data-testid="nav-mobile-support">
                Support
              </Button>
            </div>
          </div>
        )}

        {/* Section Indicator */}
        <div className="hidden md:block py-2 border-t">
          <div className="flex items-center gap-2">
            {sections.map((section) => {
              const IconComponent = section.icon;
              if (section.id === activeSection) {
                return (
                  <div key={section.id} className="flex items-center gap-2 text-sm">
                    <IconComponent className="h-4 w-4 text-primary" />
                    <span className="font-medium text-foreground">{section.name}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{section.description}</span>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
      
      {/* Overlay for dropdown */}
      {isProductsOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsProductsOpen(false)}
        />
      )}
    </header>
  );
}