import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Eye, Star } from "lucide-react";
import { useState } from "react";

// TODO: remove mock data
const videoCategories = [
  "All", "IPO Fundamentals", "Legal & Compliance", "Financial Planning", 
  "Market Strategy", "Investor Relations", "Due Diligence"
];

const videos = [
  {
    id: 1,
    title: "IPO Readiness Assessment: Key Indicators Every CEO Should Know",
    expert: "Dr. Jennifer Walsh",
    expertTitle: "Former IPO Director, Goldman Sachs",
    duration: "12:34",
    views: 1240,
    rating: 4.9,
    category: "IPO Fundamentals",
    thumbnail: "/api/placeholder/320/180",
    description: "Learn the critical metrics and operational benchmarks that determine IPO readiness.",
    featured: true
  },
  {
    id: 2,
    title: "Building Your IPO Dream Team: Essential Roles and Responsibilities",
    expert: "Michael Chen",
    expertTitle: "Managing Partner, Venture Capital",
    duration: "18:45",
    views: 890,
    rating: 4.8,
    category: "Market Strategy",
    thumbnail: "/api/placeholder/320/180",
    description: "Discover which key players you need on your team for a successful public offering.",
    featured: false
  },
  {
    id: 3,
    title: "Compliance Deep Dive: Navigating ASX Listing Requirements",
    expert: "Sarah Martinez",
    expertTitle: "Senior Legal Counsel, ASX",
    duration: "25:12",
    views: 756,
    rating: 4.7,
    category: "Legal & Compliance",
    thumbnail: "/api/placeholder/320/180",
    description: "Comprehensive guide to ASX compliance requirements and documentation.",
    featured: false
  },
  {
    id: 4,
    title: "Financial Modeling for IPOs: What Investors Want to See",
    expert: "Robert Kim",
    expertTitle: "CFO, Public Tech Company",
    duration: "22:18",
    views: 623,
    rating: 4.9,
    category: "Financial Planning",
    thumbnail: "/api/placeholder/320/180",
    description: "Master the financial projections and models that attract institutional investors.",
    featured: true
  }
];

export default function VideoLibrary() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [watchedVideos, setWatchedVideos] = useState<number[]>([]);

  const handlePlayVideo = (videoId: number) => {
    console.log(`Playing video ${videoId}`);
    if (!watchedVideos.includes(videoId)) {
      setWatchedVideos([...watchedVideos, videoId]);
    }
  };

  const filteredVideos = selectedCategory === "All" 
    ? videos 
    : videos.filter(video => video.category === selectedCategory);

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Expert Pro Tips Library
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn from industry veterans who've successfully navigated IPOs. 
            Get insider insights and proven strategies to accelerate your journey.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {videoCategories.map((category) => (
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

        {/* Featured Videos Section */}
        {selectedCategory === "All" && (
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-foreground mb-6">Featured Content</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {videos.filter(video => video.featured).map((video) => (
                <Card key={video.id} className="overflow-hidden hover-elevate transition-all duration-200" data-testid={`featured-video-${video.id}`}>
                  <div className="relative">
                    <div className="aspect-video bg-muted relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <Button
                        size="icon"
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background/90 hover:bg-background text-foreground w-16 h-16 rounded-full"
                        onClick={() => handlePlayVideo(video.id)}
                        data-testid={`play-featured-${video.id}`}
                      >
                        <Play className="h-6 w-6 ml-1" />
                      </Button>
                      <div className="absolute bottom-4 left-4 right-4">
                        <Badge className="bg-accent text-accent-foreground mb-2">Featured</Badge>
                        <h4 className="text-white font-semibold text-lg line-clamp-2">{video.title}</h4>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <span className="font-medium">{video.expert}</span>
                      <span>•</span>
                      <span>{video.expertTitle}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{video.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{video.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span>{video.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-current text-yellow-500" />
                          <span>{video.rating}</span>
                        </div>
                      </div>
                      {watchedVideos.includes(video.id) && (
                        <Badge variant="secondary">Watched</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Videos Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.filter(video => selectedCategory !== "All" || !video.featured).map((video) => (
            <Card key={video.id} className="overflow-hidden hover-elevate transition-all duration-200" data-testid={`video-${video.id}`}>
              <div className="relative">
                <div className="aspect-video bg-muted relative">
                  <Button
                    size="icon"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background/90 hover:bg-background text-foreground w-12 h-12 rounded-full"
                    onClick={() => handlePlayVideo(video.id)}
                    data-testid={`play-${video.id}`}
                  >
                    <Play className="h-4 w-4 ml-0.5" />
                  </Button>
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="text-xs">{video.duration}</Badge>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <h4 className="font-semibold text-foreground mb-2 line-clamp-2">{video.title}</h4>
                <div className="text-sm text-muted-foreground mb-3">
                  <div className="font-medium">{video.expert}</div>
                  <div className="text-xs">{video.expertTitle}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{video.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current text-yellow-500" />
                      <span>{video.rating}</span>
                    </div>
                  </div>
                  {watchedVideos.includes(video.id) && (
                    <Badge variant="secondary" className="text-xs">Watched</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}