import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";

// Role-Based Navigation
import RoleBasedNavigation from "@/components/RoleBasedNavigation";
import Footer from "@/components/Footer";

// Role-Specific Dashboards
import FounderDashboard from "@/components/dashboards/FounderDashboard";
import CompanySecretaryDashboard from "@/components/dashboards/CompanySecretaryDashboard";
import LawyerDashboard from "@/components/dashboards/LawyerDashboard";
import CFODashboard from "@/components/dashboards/CFODashboard";
import BoardMemberDashboard from "@/components/dashboards/BoardMemberDashboard";
import AdviserDashboard from "@/components/dashboards/AdviserDashboard";

// Types
import { Role } from "@shared/schema";

function App() {
  const [currentRole, setCurrentRole] = useState<Role>('founder');
  const [activeSection, setActiveSection] = useState<string>('overview');

  const renderRoleDashboard = () => {
    switch (currentRole) {
      case 'founder':
        return <FounderDashboard activeSection={activeSection} />;
      case 'company_secretary':
        return <CompanySecretaryDashboard activeSection={activeSection} />;
      case 'lawyer':
        return <LawyerDashboard activeSection={activeSection} />;
      case 'cfo':
        return <CFODashboard activeSection={activeSection} />;
      case 'board_member':
        return <BoardMemberDashboard activeSection={activeSection} />;
      case 'adviser':
        return <AdviserDashboard activeSection={activeSection} />;
      default:
        return <FounderDashboard activeSection={activeSection} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <RoleBasedNavigation 
            currentRole={currentRole}
            onRoleChange={setCurrentRole}
            activeSection={activeSection} 
            onSectionChange={setActiveSection}
          />
          <main className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {renderRoleDashboard()}
            </div>
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
