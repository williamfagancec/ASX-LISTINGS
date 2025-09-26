import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, TrendingDown, Building2, DollarSign, BarChart3, Filter } from "lucide-react";
import { useState } from "react";

// TODO: This would connect to real ASX data APIs
const companies = [
  {
    id: "CBA",
    name: "Commonwealth Bank of Australia",
    sector: "Banks",
    price: 102.45,
    change: 1.25,
    changePercent: 1.23,
    marketCap: "174.8B",
    volume: "2.1M",
    peRatio: 15.2,
    description: "Australia's leading provider of financial services including retail, business and institutional banking."
  },
  {
    id: "BHP",
    name: "BHP Group Limited",
    sector: "Materials",
    price: 45.67,
    change: -0.89,
    changePercent: -1.91,
    marketCap: "231.2B",
    volume: "8.5M",
    peRatio: 12.8,
    description: "Global resources company involved in the extraction and processing of minerals, oil and gas."
  },
  {
    id: "CSL",
    name: "CSL Limited",
    sector: "Health Care",
    price: 284.12,
    change: 3.45,
    changePercent: 1.23,
    marketCap: "129.4B",
    volume: "542K",
    peRatio: 28.4,
    description: "Global biotechnology company that develops and delivers innovative medicines."
  },
  {
    id: "WOW",
    name: "Woolworths Group Limited",
    sector: "Consumer Staples",
    price: 33.28,
    change: 0.12,
    changePercent: 0.36,
    marketCap: "40.2B",
    volume: "1.8M",
    peRatio: 22.1,
    description: "Leading Australian and New Zealand food and everyday needs retailer."
  },
  {
    id: "TLS",
    name: "Telstra Group Limited",
    sector: "Telecommunication Services",
    price: 4.12,
    change: -0.08,
    changePercent: -1.90,
    marketCap: "49.1B",
    volume: "12.3M",
    peRatio: 18.7,
    description: "Australia's leading telecommunications and technology company."
  },
  {
    id: "ANZ",
    name: "Australia and New Zealand Banking Group",
    sector: "Banks",
    price: 28.94,
    change: 0.67,
    changePercent: 2.37,
    marketCap: "88.5B",
    volume: "5.2M",
    peRatio: 13.9,
    description: "Major Australian bank providing a range of banking and financial services."
  }
];

const sectors = ["All", "Banks", "Materials", "Health Care", "Consumer Staples", "Telecommunication Services", "Technology", "Energy"];

const marketStats = [
  { label: "All Ordinaries", value: "7,842.3", change: "+0.8%", trending: "up" },
  { label: "ASX 200", value: "7,654.2", change: "+0.6%", trending: "up" },
  { label: "Total Volume", value: "1.2B", change: "+12.3%", trending: "up" },
  { label: "Market Cap", value: "$2.8T", change: "+1.1%", trending: "up" }
];

export default function AsxExplorer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState("All");
  const [watchlist, setWatchlist] = useState<string[]>([]);

  const handleAddToWatchlist = (companyId: string) => {
    if (watchlist.includes(companyId)) {
      setWatchlist(watchlist.filter(id => id !== companyId));
    } else {
      setWatchlist([...watchlist, companyId]);
    }
  };

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === "All" || company.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            ASX Explorer
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore ASX-listed companies, track market performance, and discover investment opportunities 
            across all sectors of the Australian Securities Exchange.
          </p>
        </div>

        {/* Market Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {marketStats.map((stat, index) => (
            <Card key={index} data-testid={`market-stat-${index}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    stat.trending === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trending === 'up' ? 
                      <TrendingUp className="h-4 w-4" /> : 
                      <TrendingDown className="h-4 w-4" />
                    }
                    <span>{stat.change}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search companies by name or ASX code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              data-testid="input-search-companies"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2" data-testid="button-filters">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>

        {/* Sector Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {sectors.map((sector) => (
            <Button
              key={sector}
              variant={selectedSector === sector ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSector(sector)}
              data-testid={`sector-${sector.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {sector}
            </Button>
          ))}
        </div>

        {/* Company Listings */}
        <div className="space-y-4">
          {filteredCompanies.map((company) => (
            <Card key={company.id} className="hover-elevate transition-all duration-200" data-testid={`company-${company.id}`}>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-12 gap-4 items-center">
                  {/* Company Info */}
                  <div className="md:col-span-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{company.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{company.id}</span>
                          <Badge variant="secondary" className="text-xs">{company.sector}</Badge>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{company.description}</p>
                  </div>

                  {/* Price Info */}
                  <div className="md:col-span-3">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-foreground">${company.price}</div>
                      <div className={`flex items-center justify-end gap-1 text-sm ${
                        company.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {company.change >= 0 ? 
                          <TrendingUp className="h-3 w-3" /> : 
                          <TrendingDown className="h-3 w-3" />
                        }
                        <span>${Math.abs(company.change)} ({Math.abs(company.changePercent)}%)</span>
                      </div>
                    </div>
                  </div>

                  {/* Market Data */}
                  <div className="md:col-span-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Market Cap</p>
                        <p className="font-medium">{company.marketCap}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Volume</p>
                        <p className="font-medium">{company.volume}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">P/E Ratio</p>
                        <p className="font-medium">{company.peRatio}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="md:col-span-2">
                    <div className="flex flex-col gap-2">
                      <Button 
                        variant={watchlist.includes(company.id) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleAddToWatchlist(company.id)}
                        data-testid={`button-watchlist-${company.id}`}
                      >
                        {watchlist.includes(company.id) ? 'In Watchlist' : 'Add to Watchlist'}
                      </Button>
                      <Button variant="ghost" size="sm" data-testid={`button-view-${company.id}`}>
                        <BarChart3 className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg" data-testid="button-load-more-companies">
            Load More Companies
          </Button>
        </div>
      </div>
    </section>
  );
}