import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MapPin, Briefcase, Award, MessageCircle } from "lucide-react";
import { useState } from "react";

// TODO: remove mock data
const advisers = [
  {
    id: 1,
    name: "David Thompson",
    title: "Former CFO, ASX Listed Companies",
    specialties: ["Financial Planning", "IPO Strategy", "Investor Relations"],
    location: "Sydney",
    experience: "15+ years",
    rating: 4.9,
    reviews: 47,
    hourlyRate: "$500",
    avatar: "/api/placeholder/64/64",
    bio: "Veteran CFO with 3 successful IPOs. Specializes in financial modeling and investor presentations.",
    certifications: ["CPA", "AICD"],
    availability: "Available this week",
    responseTime: "2 hours"
  },
  {
    id: 2,
    name: "Lisa Chang",
    title: "IPO Legal Specialist",
    specialties: ["Legal Compliance", "Corporate Governance", "Securities Law"],
    location: "Melbourne",
    experience: "12+ years",
    rating: 4.8,
    reviews: 32,
    hourlyRate: "$450",
    avatar: "/api/placeholder/64/64",
    bio: "Senior legal counsel with expertise in ASX listing requirements and corporate governance.",
    certifications: ["LLB", "Admitted Solicitor"],
    availability: "Available next week",
    responseTime: "4 hours"
  },
  {
    id: 3,
    name: "James Wilson",
    title: "Investment Banking Director",
    specialties: ["Market Strategy", "Valuation", "Due Diligence"],
    location: "Sydney",
    experience: "18+ years",
    rating: 4.9,
    reviews: 63,
    hourlyRate: "$650",
    avatar: "/api/placeholder/64/64",
    bio: "Former investment banker with experience in 20+ IPOs across technology and healthcare sectors.",
    certifications: ["CFA", "MBA"],
    availability: "Limited availability",
    responseTime: "1 hour"
  }
];

export default function AdviserMarketplace() {
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [contactedAdvisers, setContactedAdvisers] = useState<number[]>([]);

  const handleContact = (adviserId: number) => {
    console.log(`Contacting adviser ${adviserId}`);
    setContactedAdvisers([...contactedAdvisers, adviserId]);
  };

  const specialties = ["All", "Financial Planning", "Legal Compliance", "Market Strategy", "IPO Strategy", "Investor Relations"];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Find Your Perfect Adviser
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with accredited professionals who've guided companies through successful IPOs. 
            Get personalized advice tailored to your industry and stage.
          </p>
        </div>

        {/* Specialty Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {specialties.map((specialty) => (
            <Button
              key={specialty}
              variant={selectedSpecialty === specialty ? "default" : "outline"}
              onClick={() => setSelectedSpecialty(specialty)}
              data-testid={`filter-${specialty.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {specialty}
            </Button>
          ))}
        </div>

        {/* Adviser Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advisers.map((adviser) => (
            <Card key={adviser.id} className="hover-elevate transition-all duration-200" data-testid={`card-adviser-${adviser.id}`}>
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={adviser.avatar} alt={adviser.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {adviser.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-foreground">{adviser.name}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{adviser.title}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-current text-yellow-500" />
                        <span className="text-sm font-medium">{adviser.rating}</span>
                        <span className="text-xs text-muted-foreground">({adviser.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-4">{adviser.bio}</p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex flex-wrap gap-1">
                    {adviser.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {adviser.certifications.map((cert) => (
                      <Badge key={cert} variant="outline" className="text-xs">
                        <Award className="h-3 w-3 mr-1" />
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3" />
                    <span>{adviser.location}</span>
                    <span>•</span>
                    <Briefcase className="h-3 w-3" />
                    <span>{adviser.experience}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">{adviser.hourlyRate}/hour</span>
                    <span className="text-xs">{adviser.availability}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    className="flex-1" 
                    onClick={() => handleContact(adviser.id)}
                    disabled={contactedAdvisers.includes(adviser.id)}
                    data-testid={`button-contact-${adviser.id}`}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {contactedAdvisers.includes(adviser.id) ? 'Contacted' : 'Contact'}
                  </Button>
                  <Button variant="outline" size="sm" data-testid={`button-view-profile-${adviser.id}`}>
                    View Profile
                  </Button>
                </div>
                
                <div className="text-xs text-muted-foreground mt-2 text-center">
                  Typically responds in {adviser.responseTime}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" data-testid="button-load-more-advisers">
            View All Advisers
          </Button>
        </div>
      </div>
    </section>
  );
}