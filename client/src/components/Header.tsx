import { Button } from "@/components/ui/button";
import { Bell, Search, Menu, User } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">ASX</span>
              </div>
              <span className="text-xl font-semibold text-foreground">Gateway</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground" data-testid="nav-network">
                Founder Network
              </Button>
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground" data-testid="nav-videos">
                Expert Videos
              </Button>
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground" data-testid="nav-advisers">
                Find Advisers
              </Button>
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground" data-testid="nav-dashboard">
                Dashboard
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
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="button-menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-2">
              <Button variant="ghost" className="justify-start text-muted-foreground hover:text-foreground" data-testid="nav-network-mobile">
                Founder Network
              </Button>
              <Button variant="ghost" className="justify-start text-muted-foreground hover:text-foreground" data-testid="nav-videos-mobile">
                Expert Videos
              </Button>
              <Button variant="ghost" className="justify-start text-muted-foreground hover:text-foreground" data-testid="nav-advisers-mobile">
                Find Advisers
              </Button>
              <Button variant="ghost" className="justify-start text-muted-foreground hover:text-foreground" data-testid="nav-dashboard-mobile">
                Dashboard
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}