import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Filter, MapPin, Building, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

// TODO: remove mock data
const founders = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "CEO",
    company: "TechFlow Solutions",
    industry: "FinTech",
    location: "Sydney",
    stage: "Series A",
    avatar: "/api/placeholder/64/64",
    bio: "Building the future of payment infrastructure with 10+ years in financial services.",
    connections: 42
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    title: "Founder & CTO",
    company: "GreenEnergy Dynamics",
    industry: "CleanTech",
    location: "Melbourne",
    stage: "Pre-Series A",
    avatar: "/api/placeholder/64/64",
    bio: "Revolutionizing renewable energy storage with cutting-edge battery technology.",
    connections: 38
  },
  {
    id: 3,
    name: "Emily Watson",
    title: "CEO & Co-founder",
    company: "HealthAnalytics Pro",
    industry: "HealthTech",
    location: "Brisbane",
    stage: "Series B",
    avatar: "/api/placeholder/64/64",
    bio: "Transforming healthcare delivery through AI-powered diagnostic tools.",
    connections: 67
  }
];

export default function FounderNetwork() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");

  const handleConnect = (founderId: number) => {
    console.log(`Connecting with founder ${founderId}`);
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Connect with Fellow Founders
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Build relationships with other company leaders on their IPO journey. 
            Share experiences, learn from each other, and grow your network.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search founders by name, company, or industry..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              data-testid="input-search-founders"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2" data-testid="button-filter">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Founder Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {founders.map((founder) => (
            <Card key={founder.id} className="hover-elevate transition-all duration-200" data-testid={`card-founder-${founder.id}`}>
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={founder.avatar} alt={founder.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {founder.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-foreground">{founder.name}</h3>
                    <p className="text-muted-foreground text-sm">{founder.title}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Building className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{founder.company}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="secondary">{founder.industry}</Badge>
                  <Badge variant="outline">{founder.stage}</Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-4">{founder.bio}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{founder.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{founder.connections} connections</span>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => handleConnect(founder.id)}
                    data-testid={`button-connect-${founder.id}`}
                  >
                    Connect
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" data-testid="button-load-more">
            Load More Founders
          </Button>
        </div>
      </div>
    </section>
  );
}