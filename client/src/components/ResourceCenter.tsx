import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, BookOpen, TrendingUp, ExternalLink } from "lucide-react";
import { useState } from "react";

// TODO: remove mock data
const resourceCategories = [
  "All", "Financial Planning", "Legal Templates", "Market Research", "Case Studies", "Checklists"
];

const resources = [
  {
    id: 1,
    title: "IPO Readiness Checklist",
    category: "Checklists",
    type: "PDF",
    size: "2.3 MB",
    downloads: 1540,
    description: "Comprehensive 50-point checklist covering all aspects of IPO preparation.",
    featured: true,
    icon: FileText
  },
  {
    id: 2,
    title: "Financial Model Template",
    category: "Financial Planning",
    type: "Excel",
    size: "1.8 MB",
    downloads: 892,
    description: "Professional financial modeling template used by investment banks.",
    featured: true,
    icon: TrendingUp
  },
  {
    id: 3,
    title: "ASX Listing Requirements Guide",
    category: "Legal Templates",
    type: "PDF",
    size: "5.2 MB",
    downloads: 1245,
    description: "Complete guide to ASX listing requirements and documentation.",
    featured: false,
    icon: BookOpen
  },
  {
    id: 4,
    title: "Tech Sector IPO Case Study",
    category: "Case Studies",
    type: "PDF",
    size: "3.1 MB",
    downloads: 673,
    description: "Detailed analysis of successful tech IPOs in Australia.",
    featured: false,
    icon: FileText
  },
  {
    id: 5,
    title: "Market Research Template",
    category: "Market Research",
    type: "Word",
    size: "0.8 MB",
    downloads: 456,
    description: "Template for conducting comprehensive market analysis.",
    featured: false,
    icon: TrendingUp
  },
  {
    id: 6,
    title: "Due Diligence Workbook",
    category: "Legal Templates",
    type: "Excel",
    size: "2.7 MB",
    downloads: 789,
    description: "Comprehensive workbook for managing due diligence process.",
    featured: true,
    icon: FileText
  }
];

export default function ResourceCenter() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [downloadedResources, setDownloadedResources] = useState<number[]>([]);

  const handleDownload = (resourceId: number) => {
    console.log(`Downloading resource ${resourceId}`);
    setDownloadedResources([...downloadedResources, resourceId]);
  };

  const filteredResources = selectedCategory === "All" 
    ? resources 
    : resources.filter(resource => resource.category === selectedCategory);

  const featuredResources = resources.filter(resource => resource.featured);

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Resource Center
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Download templates, guides, and case studies to accelerate your IPO preparation. 
            All resources are created by industry experts and proven in real IPO scenarios.
          </p>
        </div>

        {/* Featured Resources */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-foreground mb-6">Featured Resources</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredResources.map((resource) => {
              const IconComponent = resource.icon;
              return (
                <Card key={resource.id} className="hover-elevate transition-all duration-200 border-accent/20" data-testid={`featured-resource-${resource.id}`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-5 w-5 text-accent" />
                      </div>
                      <Badge className="bg-accent text-accent-foreground">Featured</Badge>
                    </div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <span>{resource.type} • {resource.size}</span>
                      <span>{resource.downloads.toLocaleString()} downloads</span>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => handleDownload(resource.id)}
                      disabled={downloadedResources.includes(resource.id)}
                      data-testid={`button-download-featured-${resource.id}`}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      {downloadedResources.includes(resource.id) ? 'Downloaded' : 'Download'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {resourceCategories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              data-testid={`filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* All Resources */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.filter(resource => !resource.featured || selectedCategory !== "All").map((resource) => {
            const IconComponent = resource.icon;
            return (
              <Card key={resource.id} className="hover-elevate transition-all duration-200" data-testid={`resource-${resource.id}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground mb-1 line-clamp-1">{resource.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{resource.description}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        <span>{resource.type} • {resource.size}</span>
                        <span>{resource.downloads} downloads</span>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full text-xs"
                        onClick={() => handleDownload(resource.id)}
                        disabled={downloadedResources.includes(resource.id)}
                        data-testid={`button-download-${resource.id}`}
                      >
                        <Download className="h-3 w-3 mr-1" />
                        {downloadedResources.includes(resource.id) ? 'Downloaded' : 'Download'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* External Resources */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-foreground mb-6">Additional Resources</h3>
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <Button variant="outline" className="p-6 h-auto flex flex-col items-center gap-2" data-testid="button-asx-website">
              <ExternalLink className="h-5 w-5" />
              <span className="font-medium">ASX Official Website</span>
              <span className="text-xs text-muted-foreground">Complete listing information</span>
            </Button>
            <Button variant="outline" className="p-6 h-auto flex flex-col items-center gap-2" data-testid="button-regulatory-guides">
              <ExternalLink className="h-5 w-5" />
              <span className="font-medium">Regulatory Guides</span>
              <span className="text-xs text-muted-foreground">ASIC guidance documents</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}