import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  MessageCircle, 
  Calendar, 
  Star,
  Building2,
  GraduationCap,
  Briefcase,
  Trophy,
  Heart,
  Share2,
  UserPlus,
  Video,
  Coffee,
  Handshake,
  TrendingUp,
  MapPin,
  Clock,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { 
  useResources,
  useCompanies
} from "@/hooks/useASXData";

export function EnhancedFounderNetwork() {
  const { data: resources, isLoading: resourcesLoading } = useResources();
  const { data: companies, isLoading: companiesLoading } = useCompanies();

  // Mock data for enhanced networking features
  const founderConnections = [
    {
      id: "1",
      name: "Sarah Chen",
      title: "Founder & CEO",
      company: "TechFlow Solutions",
      industry: "FinTech",
      stage: "Series B",
      location: "Sydney",
      avatar: "/api/placeholder/40/40",
      expertise: ["Digital Banking", "AI/ML", "Compliance"],
      connection: "2nd degree",
      mutualConnections: 5,
      recentActivity: "Shared insights on regulatory compliance",
      isOnline: true
    },
    {
      id: "2", 
      name: "David Rodriguez",
      title: "Co-Founder",
      company: "GreenTech Innovations",
      industry: "Clean Energy",
      stage: "IPO Planning",
      location: "Melbourne",
      avatar: "/api/placeholder/40/40",
      expertise: ["Renewable Energy", "ESG", "Public Markets"],
      connection: "1st degree",
      mutualConnections: 12,
      recentActivity: "Recently completed Series C funding",
      isOnline: false
    },
    {
      id: "3",
      name: "Emily Watson",
      title: "Founder",
      company: "HealthData Analytics",
      industry: "Healthcare",
      stage: "Series A",
      location: "Brisbane",
      avatar: "/api/placeholder/40/40",
      expertise: ["Healthcare Tech", "Data Analytics", "B2B SaaS"],
      connection: "1st degree",
      mutualConnections: 8,
      recentActivity: "Launched new product feature",
      isOnline: true
    }
  ];

  const mentorAdvisers = [
    {
      id: "1",
      name: "Michael Thompson",
      title: "Former CEO, ASX Listed Company",
      company: "RetailCorp (Exited 2019)",
      expertise: ["IPO Strategy", "Public Company Leadership", "Investor Relations"],
      experience: "20+ years",
      avatar: "/api/placeholder/40/40",
      rating: 4.9,
      sessions: 156,
      availability: "Available this week",
      price: "$350/hour"
    },
    {
      id: "2",
      name: "Jennifer Liu",
      title: "Investment Director",
      company: "Venture Capital Partners",
      expertise: ["Fundraising", "Due Diligence", "Market Strategy"],
      experience: "15+ years",
      avatar: "/api/placeholder/40/40",
      rating: 4.8,
      sessions: 89,
      availability: "Booking for next month",
      price: "$280/hour"
    },
    {
      id: "3",
      name: "Robert Kim",
      title: "CFO & Board Member",
      company: "Multiple ASX Companies",
      expertise: ["Financial Planning", "Audit & Compliance", "Board Governance"],
      experience: "18+ years",
      avatar: "/api/placeholder/40/40",
      rating: 5.0,
      sessions: 203,
      availability: "Limited availability",
      price: "$400/hour"
    }
  ];

  const networkingEvents = [
    {
      id: "1",
      title: "ASX Listing Masterclass",
      type: "Workshop",
      date: "2025-01-25",
      time: "9:00 AM - 5:00 PM",
      location: "Sydney CBD",
      attendees: 45,
      maxAttendees: 50,
      price: "$550",
      organizer: "ASX Education",
      description: "Comprehensive workshop covering all aspects of ASX listing process"
    },
    {
      id: "2",
      title: "Founder Networking Breakfast",
      type: "Networking",
      date: "2025-01-18",
      time: "7:30 AM - 9:30 AM", 
      location: "Melbourne",
      attendees: 28,
      maxAttendees: 40,
      price: "Free",
      organizer: "Startup Victoria",
      description: "Monthly networking event for startup founders and entrepreneurs"
    },
    {
      id: "3",
      title: "IPO Success Stories Panel",
      type: "Panel Discussion",
      date: "2025-02-02",
      time: "6:00 PM - 8:00 PM",
      location: "Brisbane",
      attendees: 67,
      maxAttendees: 100,
      price: "$45",
      organizer: "Tech Entrepreneurs QLD",
      description: "Learn from founders who successfully took their companies public"
    }
  ];

  const communityDiscussions = [
    {
      id: "1",
      title: "Best practices for IPO roadshow preparation?",
      author: "Alex Chen",
      company: "DataVision AI",
      replies: 12,
      likes: 28,
      timeAgo: "2 hours ago",
      tags: ["IPO", "Roadshow", "Investor Relations"],
      hasNewReplies: true
    },
    {
      id: "2",
      title: "Managing board composition during growth phase",
      author: "Maria Santos",
      company: "EcoTech Solutions",
      replies: 8,
      likes: 19,
      timeAgo: "5 hours ago",
      tags: ["Governance", "Board Management", "Growth"],
      hasNewReplies: false
    },
    {
      id: "3",
      title: "Regulatory compliance checklist for ASX listing",
      author: "David Park",
      company: "FinanceFlow",
      replies: 15,
      likes: 42,
      timeAgo: "1 day ago",
      tags: ["Compliance", "Regulatory", "ASX"],
      hasNewReplies: true
    }
  ];

  const successStories = [
    {
      id: "1",
      founder: "Lisa Chang",
      company: "CloudTech Solutions",
      listingDate: "2024-03-15",
      initialValuation: "$180M",
      currentValuation: "$240M",
      sector: "Technology",
      story: "Successfully transitioned from Series C startup to ASX-listed company, focusing on cloud infrastructure solutions.",
      keyLessons: ["Importance of regulatory preparation", "Building strong investor relationships", "Maintaining growth momentum"]
    },
    {
      id: "2", 
      founder: "James Wilson",
      company: "Green Energy Australia",
      listingDate: "2024-01-08",
      initialValuation: "$320M",
      currentValuation: "$450M",
      sector: "Clean Energy",
      story: "Led renewable energy company through successful IPO during challenging market conditions.",
      keyLessons: ["ESG compliance as competitive advantage", "Strategic timing of public listing", "Stakeholder communication"]
    }
  ];

  const getConnectionBadgeColor = (connection: string) => {
    switch (connection) {
      case "1st degree": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "2nd degree": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Founder Network & Community</h2>
        <p className="text-lg text-muted-foreground">
          Connect with fellow founders, mentors, and industry experts on your IPO journey.
        </p>
      </div>

      {/* Network Overview Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold text-foreground">156</div>
            <p className="text-sm text-muted-foreground">Network Connections</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <MessageCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold text-foreground">24</div>
            <p className="text-sm text-muted-foreground">Active Conversations</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold text-foreground">3</div>
            <p className="text-sm text-muted-foreground">Upcoming Events</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="h-8 w-8 mx-auto mb-2 text-orange-500" />
            <div className="text-2xl font-bold text-foreground">12</div>
            <p className="text-sm text-muted-foreground">Mentor Sessions</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="connections" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="connections">Connections</TabsTrigger>
          <TabsTrigger value="mentors">Mentors</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
          <TabsTrigger value="stories">Success Stories</TabsTrigger>
        </TabsList>

        {/* Founder Connections */}
        <TabsContent value="connections" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {founderConnections.map((founder) => (
              <Card key={founder.id} className="hover-elevate transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={founder.avatar} alt={founder.name} />
                        <AvatarFallback>{founder.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      {founder.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{founder.name}</h3>
                      <p className="text-sm text-muted-foreground">{founder.title}</p>
                      <p className="text-sm font-medium text-primary">{founder.company}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Industry:</span>
                      <span className="font-medium">{founder.industry}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Stage:</span>
                      <Badge variant="outline">{founder.stage}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Location:</span>
                      <span className="font-medium">{founder.location}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <Badge className={getConnectionBadgeColor(founder.connection)} variant="outline">
                      {founder.connection}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {founder.mutualConnections} mutual connections
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {founder.expertise.slice(0, 2).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {founder.expertise.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{founder.expertise.length - 2}
                      </Badge>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground mb-4">{founder.recentActivity}</p>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                    <Button size="sm" variant="outline">
                      <UserPlus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Mentors & Advisers */}
        <TabsContent value="mentors" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentorAdvisers.map((mentor) => (
              <Card key={mentor.id} className="hover-elevate transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={mentor.avatar} alt={mentor.name} />
                      <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{mentor.name}</h3>
                      <p className="text-sm text-muted-foreground">{mentor.title}</p>
                      <p className="text-sm font-medium text-primary">{mentor.company}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(mentor.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-sm font-medium">{mentor.rating}</span>
                    <span className="text-sm text-muted-foreground">({mentor.sessions} sessions)</span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Experience:</span>
                      <span className="font-medium">{mentor.experience}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Rate:</span>
                      <span className="font-medium">{mentor.price}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {mentor.expertise.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <p className="text-xs text-muted-foreground mb-4">{mentor.availability}</p>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <Coffee className="h-4 w-4 mr-2" />
                      Book Session
                    </Button>
                    <Button size="sm" variant="outline">
                      <Video className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Networking Events */}
        <TabsContent value="events" className="space-y-6">
          <div className="space-y-4">
            {networkingEvents.map((event) => (
              <Card key={event.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">{event.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Attendees:</span>
                            <span className="font-medium">{event.attendees}/{event.maxAttendees}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Price:</span>
                            <span className="font-medium">{event.price}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Organizer:</span>
                            <span className="font-medium">{event.organizer}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4">
                      <Badge variant="outline" className="mb-2">{event.type}</Badge>
                      <div className="space-y-2">
                        <Button className="w-full">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Register
                        </Button>
                        <Button variant="outline" size="sm" className="w-full">
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Community Discussions */}
        <TabsContent value="community" className="space-y-6">
          <div className="space-y-4">
            {communityDiscussions.map((discussion) => (
              <Card key={discussion.id} className="hover-elevate transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-foreground hover:text-primary cursor-pointer">
                      {discussion.title}
                    </h3>
                    {discussion.hasNewReplies && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        New Replies
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span>by <strong className="text-foreground">{discussion.author}</strong></span>
                    <span>from {discussion.company}</span>
                    <span>{discussion.timeAgo}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {discussion.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{discussion.replies} replies</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        <span>{discussion.likes} likes</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Join Discussion
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Success Stories */}
        <TabsContent value="stories" className="space-y-6">
          <div className="space-y-6">
            {successStories.map((story) => (
              <Card key={story.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <Trophy className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-1">{story.company}</h3>
                      <p className="text-sm text-muted-foreground">Founded by {story.founder}</p>
                      <Badge variant="outline" className="mt-1">{story.sector}</Badge>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-4 text-sm">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="font-bold text-lg text-green-600">{story.initialValuation}</div>
                      <div className="text-muted-foreground">IPO Valuation</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="font-bold text-lg text-blue-600">{story.currentValuation}</div>
                      <div className="text-muted-foreground">Current Value</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="font-bold text-lg text-purple-600">
                        {new Date(story.listingDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </div>
                      <div className="text-muted-foreground">Listed</div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">{story.story}</p>

                  <div>
                    <h4 className="font-medium text-foreground mb-2">Key Lessons:</h4>
                    <ul className="space-y-1">
                      {story.keyLessons.map((lesson, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          {lesson}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Connect with Founder
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Case Study
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}