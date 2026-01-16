import { useMemo } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, TrendingDown, RefreshCw, ExternalLink } from "lucide-react";
import { useInvestments } from "@/hooks/useInvestments";
import { useBinancePrices } from "@/hooks/useBinancePrices";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const LiveStatsWidget = () => {
  const { investments, loading: investmentsLoading } = useInvestments();
  
  const symbols = useMemo(() => 
    investments?.map(inv => inv.symbol).filter(Boolean) || [], 
    [investments]
  );
  
  const { prices, isLoading: pricesLoading, lastUpdated, refetch } = useBinancePrices(symbols);

  const isLoading = investmentsLoading || pricesLoading;

  const stats = useMemo(() => {
    if (!investments || investments.length === 0) {
      return { totalInvested: 0, currentValue: 0, pl: 0, plPercent: 0 };
    }

    let totalInvested = 0;
    let currentValue = 0;

    investments.forEach(inv => {
      const invested = inv.invested_amount || 0;
      const quantity = inv.quantity || 0;
      const priceStr = prices[inv.symbol]?.price;
      const currentPrice = priceStr ? parseFloat(String(priceStr)) : inv.entry_price;
      
      totalInvested += invested;
      currentValue += quantity * currentPrice;
    });

    const pl = currentValue - totalInvested;
    const plPercent = totalInvested > 0 ? (pl / totalInvested) * 100 : 0;

    return { totalInvested, currentValue, pl, plPercent };
  }, [investments, prices]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatTime = (date: Date | null) => {
    if (!date) return "Never";
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  const isProfit = stats.pl >= 0;

  return (
    <section className="py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="pixel-border bg-card/80 backdrop-blur-sm p-6 rounded-lg">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <span className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
              Live Portfolio Stats
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => refetch()}
              disabled={isLoading}
              className="text-muted-foreground hover:text-foreground"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                Total Invested
              </p>
              {isLoading ? (
                <Skeleton className="h-7 w-24 mx-auto" />
              ) : (
                <p className="text-xl font-bold text-foreground">
                  {formatCurrency(stats.totalInvested)}
                </p>
              )}
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                Current Value
              </p>
              {isLoading ? (
                <Skeleton className="h-7 w-24 mx-auto" />
              ) : (
                <p className="text-xl font-bold text-foreground">
                  {formatCurrency(stats.currentValue)}
                </p>
              )}
            </div>
          </div>

          {/* P/L Display */}
          <div className={`rounded-lg p-4 text-center mb-4 ${
            isProfit ? 'bg-neon-green/10 border border-neon-green/30' : 'bg-red-500/10 border border-red-500/30'
          }`}>
            {isLoading ? (
              <Skeleton className="h-8 w-32 mx-auto" />
            ) : (
              <div className="flex items-center justify-center gap-2">
                {isProfit ? (
                  <TrendingUp className="w-5 h-5 text-neon-green" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-500" />
                )}
                <span className={`text-2xl font-bold ${isProfit ? 'text-neon-green' : 'text-red-500'}`}>
                  {isProfit ? '+' : ''}{stats.plPercent.toFixed(2)}%
                </span>
                <span className={`text-sm ${isProfit ? 'text-neon-green/80' : 'text-red-500/80'}`}>
                  ({isProfit ? '+' : ''}{formatCurrency(stats.pl)})
                </span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Updated: {formatTime(lastUpdated)}</span>
            <Link 
              to="/investments" 
              className="flex items-center gap-1 text-neon-cyan hover:text-neon-cyan/80 transition-colors"
            >
              View Full Portfolio
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveStatsWidget;
