import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, BarChart3, PieChart, Users, Building2, DollarSign, Activity, Globe, Calendar } from "lucide-react";
import { useState } from "react";

// TODO: This would connect to real ASX data APIs and analytics
const portfolioMetrics = [
  { label: "Total Portfolio Value", value: "$2.4M", change: "+5.2%", trending: "up" },
  { label: "Daily P&L", value: "+$12,450", change: "+0.8%", trending: "up" },
  { label: "Total Return", value: "+18.7%", change: "+2.1%", trending: "up" },
  { label: "Active Holdings", value: "23", change: "+2", trending: "up" }
];

const marketMovers = [
  { symbol: "CSL", name: "CSL Limited", price: 284.12, change: +3.45, percent: +1.23 },
  { symbol: "ANZ", name: "ANZ Banking Group", price: 28.94, change: +0.67, percent: +2.37 },
  { symbol: "WOW", name: "Woolworths Group", price: 33.28, change: +0.12, percent: +0.36 },
  { symbol: "BHP", name: "BHP Group", price: 45.67, change: -0.89, percent: -1.91 },
  { symbol: "TLS", name: "Telstra Group", price: 4.12, change: -0.08, percent: -1.90 }
];

const sectorPerformance = [
  { sector: "Banks", allocation: 28, performance: "+2.1%", color: "bg-blue-500" },
  { sector: "Materials", allocation: 22, performance: "-0.8%", color: "bg-orange-500" },
  { sector: "Health Care", allocation: 18, performance: "+3.2%", color: "bg-green-500" },
  { sector: "Consumer Staples", allocation: 15, performance: "+1.1%", color: "bg-purple-500" },
  { sector: "Technology", allocation: 12, performance: "+4.7%", color: "bg-cyan-500" },
  { sector: "Other", allocation: 5, performance: "+0.3%", color: "bg-gray-500" }
];

const recentNews = [
  {
    title: "ASX 200 reaches new yearly high amid strong banking sector performance",
    time: "2 hours ago",
    source: "ASX Market Update",
    impact: "positive"
  },
  {
    title: "BHP announces dividend increase following strong quarterly results", 
    time: "4 hours ago",
    source: "Company Announcement",
    impact: "positive"
  },
  {
    title: "RBA maintains cash rate at 4.35% in latest monetary policy decision",
    time: "1 day ago",
    source: "Economic News",
    impact: "neutral"
  }
];

const upcomingEvents = [
  { event: "CBA Quarterly Results", date: "Oct 25", type: "earnings" },
  { event: "ASX Technology Sector Conference", date: "Nov 2", type: "conference" },
  { event: "BHP Annual General Meeting", date: "Nov 15", type: "meeting" },
  { event: "Monthly Economic Indicators", date: "Nov 30", type: "economic" }
];

export default function AsxOneView() {
  const [viewMode, setViewMode] = useState<"overview" | "detailed">("overview");
  const [selectedTimeframe, setSelectedTimeframe] = useState("1D");

  const timeframes = ["1D", "1W", "1M", "3M", "6M", "1Y"];

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                ASX OneView
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Your comprehensive dashboard for ASX market insights, portfolio analytics, 
                and real-time market intelligence all in one unified view.
              </p>
            </div>
            <div className="flex gap-2">
              {timeframes.map((timeframe) => (
                <Button
                  key={timeframe}
                  variant={selectedTimeframe === timeframe ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTimeframe(timeframe)}
                  data-testid={`timeframe-${timeframe}`}
                >
                  {timeframe}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {portfolioMetrics.map((metric, index) => (
            <Card key={index} data-testid={`portfolio-metric-${index}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                    <p className="text-xl font-bold text-foreground">{metric.value}</p>
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    metric.trending === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.trending === 'up' ? 
                      <TrendingUp className="h-4 w-4" /> : 
                      <TrendingDown className="h-4 w-4" />
                    }
                    <span>{metric.change}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Market Movers */}
          <Card className="lg:col-span-2" data-testid="card-market-movers">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Market Movers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {marketMovers.map((stock, index) => (
                  <div key={stock.symbol} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover-elevate transition-all duration-200" data-testid={`mover-${stock.symbol}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{stock.symbol}</h4>
                        <p className="text-sm text-muted-foreground">{stock.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-foreground">${stock.price}</div>
                      <div className={`flex items-center justify-end gap-1 text-sm ${
                        stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stock.change >= 0 ? 
                          <TrendingUp className="h-3 w-3" /> : 
                          <TrendingDown className="h-3 w-3" />
                        }
                        <span>{stock.change >= 0 ? '+' : ''}${stock.change} ({stock.change >= 0 ? '+' : ''}{stock.percent}%)</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sector Allocation */}
          <Card data-testid="card-sector-allocation">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-primary" />
                Sector Allocation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sectorPerformance.map((sector, index) => (
                  <div key={sector.sector} className="space-y-2" data-testid={`sector-${index}`}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-foreground">{sector.sector}</span>
                      <span className={`font-medium ${
                        sector.performance.startsWith('+') ? 'text-green-600' : 
                        sector.performance.startsWith('-') ? 'text-red-600' : 'text-muted-foreground'
                      }`}>
                        {sector.performance}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={sector.allocation} className="flex-1" />
                      <span className="text-xs text-muted-foreground w-8">{sector.allocation}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Market News */}
          <Card className="lg:col-span-2" data-testid="card-market-news">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Market News & Updates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentNews.map((news, index) => (
                  <div key={index} className="p-3 border rounded-lg hover-elevate transition-all duration-200" data-testid={`news-${index}`}>
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-foreground line-clamp-2 flex-1">{news.title}</h4>
                      <Badge 
                        variant={news.impact === 'positive' ? 'default' : news.impact === 'negative' ? 'destructive' : 'secondary'}
                        className="ml-2 flex-shrink-0"
                      >
                        {news.impact}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{news.source}</span>
                      <span>•</span>
                      <span>{news.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card data-testid="card-upcoming-events">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="p-3 bg-muted/50 rounded-lg" data-testid={`event-${index}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground text-sm line-clamp-2">{event.event}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{event.date}</p>
                      </div>
                      <Badge variant="outline" className="text-xs ml-2">
                        {event.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Analytics Summary */}
          <Card className="lg:col-span-3" data-testid="card-analytics-summary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Performance Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="h-8 w-8 text-green-500" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">Portfolio Growth</h4>
                  <p className="text-2xl font-bold text-green-600">+18.7%</p>
                  <p className="text-sm text-muted-foreground">Year to date</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <DollarSign className="h-8 w-8 text-blue-500" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">Dividend Yield</h4>
                  <p className="text-2xl font-bold text-blue-600">4.2%</p>
                  <p className="text-sm text-muted-foreground">Annual estimate</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="h-8 w-8 text-purple-500" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">Market Rank</h4>
                  <p className="text-2xl font-bold text-purple-600">Top 15%</p>
                  <p className="text-sm text-muted-foreground">Among peers</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}