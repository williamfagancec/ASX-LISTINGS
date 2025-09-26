import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { 
  TrendingUp, 
  Activity, 
  Building, 
  Clock, 
  BarChart3, 
  Calendar as CalendarIcon,
  Brain
} from "lucide-react";
import { 
  useMarketData,
  useIpoCalendar,
  useLatestMarketSentiment
} from "@/hooks/useASXData";

export function MarketIntelligenceSection() {
  // Fetch market intelligence data at component top level
  const { data: marketData, isLoading: marketDataLoading } = useMarketData(undefined, 10);
  const { data: ipoCalendar, isLoading: ipoCalendarLoading } = useIpoCalendar(undefined, 5);
  const { data: latestSentiment, isLoading: sentimentLoading } = useLatestMarketSentiment();

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Market Intelligence Dashboard</h2>
        <p className="text-lg text-muted-foreground">
          Real-time market data, IPO analytics, and timing insights for your listing strategy.
        </p>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card data-testid="market-metric-asx">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ASX 200 Index</p>
                <p className="text-lg font-bold">{latestSentiment?.asxIndex || '7,200'}</p>
                <p className="text-xs text-green-600">
                  {latestSentiment?.indexChangePercent || '+0.8%'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card data-testid="market-metric-sentiment">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted rounded-lg">
                <Activity className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Market Sentiment</p>
                <p className="text-lg font-bold">
                  {latestSentiment?.marketSentimentScore || 75}/100
                </p>
                <p className="text-xs text-blue-600">Positive</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card data-testid="market-metric-ipos">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted rounded-lg">
                <Building className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active IPOs</p>
                <p className="text-lg font-bold">{ipoCalendar?.length || 8}</p>
                <p className="text-xs text-purple-600">This Quarter</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card data-testid="market-metric-timing">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted rounded-lg">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">IPO Timing</p>
                <p className="text-lg font-bold">Favorable</p>
                <p className="text-xs text-orange-600">Q1 2025</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Market Data & IPO Calendar */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Market Data */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              Top Performing Stocks
            </CardTitle>
          </CardHeader>
          <CardContent>
            {marketDataLoading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-lg animate-pulse">
                    <div className="space-y-1">
                      <div className="h-4 bg-muted rounded w-20"></div>
                      <div className="h-3 bg-muted rounded w-32"></div>
                    </div>
                    <div className="h-6 bg-muted rounded w-16"></div>
                  </div>
                ))}
              </div>
            ) : marketData && marketData.length > 0 ? (
              <div className="space-y-3">
                {marketData.slice(0, 5).map((stock, index) => (
                  <div key={stock.id} className="flex items-center justify-between p-3 border rounded-lg hover-elevate">
                    <div>
                      <h4 className="font-medium text-sm">{stock.symbol}</h4>
                      <p className="text-xs text-muted-foreground">{stock.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${stock.sharePrice}</p>
                      <p className={`text-xs ${stock.priceChangePercent?.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {stock.priceChangePercent}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {/* Demo data when no real data available */}
                {[
                  { symbol: 'CSL', name: 'CSL Limited', price: '$285.50', change: '+2.3%' },
                  { symbol: 'BHP', name: 'BHP Group', price: '$42.15', change: '+1.8%' },
                  { symbol: 'CBA', name: 'Commonwealth Bank', price: '$110.20', change: '+1.2%' },
                  { symbol: 'WBC', name: 'Westpac Banking', price: '$28.75', change: '+0.9%' },
                  { symbol: 'ANZ', name: 'ANZ Group', price: '$29.40', change: '+0.7%' }
                ].map((stock, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover-elevate" data-testid={`stock-${stock.symbol}`}>
                    <div>
                      <h4 className="font-medium text-sm">{stock.symbol}</h4>
                      <p className="text-xs text-muted-foreground">{stock.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{stock.price}</p>
                      <p className="text-xs text-green-600">{stock.change}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* IPO Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-purple-500" />
              Upcoming IPO Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            {ipoCalendarLoading ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="p-3 border rounded-lg animate-pulse">
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                      <div className="h-3 bg-muted rounded w-1/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : ipoCalendar && ipoCalendar.length > 0 ? (
              <div className="space-y-3">
                {ipoCalendar.map((ipo, index) => (
                  <div key={ipo.id} className="p-3 border rounded-lg hover-elevate">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{ipo.companyName}</h4>
                      <Badge variant="outline">{ipo.status}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{ipo.sector}</p>
                    <p className="text-xs font-medium">
                      Expected: {ipo.expectedListingDate ? format(new Date(ipo.expectedListingDate), 'MMM dd, yyyy') : 'TBD'}
                    </p>
                    {ipo.expectedMarketCap && (
                      <p className="text-xs text-muted-foreground">Market Cap: {ipo.expectedMarketCap}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {/* Demo data when no real data available */}
                {[
                  { name: 'TechCorp Australia', sector: 'Technology', date: '2025-02-15', cap: '$450M', status: 'Announced' },
                  { name: 'GreenEnergy Solutions', sector: 'Clean Energy', date: '2025-03-10', cap: '$280M', status: 'Pricing' },
                  { name: 'HealthTech Innovations', sector: 'Healthcare', date: '2025-03-25', cap: '$320M', status: 'Announced' },
                  { name: 'Mining Ventures Ltd', sector: 'Resources', date: '2025-04-12', cap: '$620M', status: 'Announced' }
                ].map((ipo, index) => (
                  <div key={index} className="p-3 border rounded-lg hover-elevate" data-testid={`ipo-${index}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{ipo.name}</h4>
                      <Badge variant="outline">{ipo.status}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{ipo.sector}</p>
                    <p className="text-xs font-medium">Expected: {format(new Date(ipo.date), 'MMM dd, yyyy')}</p>
                    <p className="text-xs text-muted-foreground">Market Cap: {ipo.cap}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Market Insights & Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-emerald-500" />
            Market Insights & IPO Timing Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3 text-sm">Current Market Conditions</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Strong investor appetite for tech IPOs</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Low volatility environment favorable for listings</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">Moderate sector competition in Q1 2025</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Institutional demand remains strong</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3 text-sm">Recommendations</h4>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">Optimal Timing Window</p>
                  <p className="text-xs text-green-700 dark:text-green-300">Q1 2025 presents favorable conditions for your IPO launch</p>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">Sector Analysis</p>
                  <p className="text-xs text-blue-700 dark:text-blue-300">Your industry shows 23% higher valuations vs. last quarter</p>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg">
                  <p className="text-sm font-medium text-purple-800 dark:text-purple-200 mb-1">Competitive Landscape</p>
                  <p className="text-xs text-purple-700 dark:text-purple-300">Limited direct competitors planning IPOs in your timeframe</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}