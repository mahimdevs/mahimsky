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
    <section className="py-8 md:py-12 px-3 md:px-4">
      <div className="max-w-2xl mx-auto">
        <div className="pixel-border bg-card/80 backdrop-blur-sm p-4 md:p-6 rounded-lg">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h3 className="text-sm md:text-lg font-bold text-foreground flex items-center gap-2">
              <span className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
              <span className="hidden sm:inline">Live Portfolio Stats</span>
              <span className="sm:hidden">Portfolio</span>
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => refetch()}
              disabled={isLoading}
              className="text-muted-foreground hover:text-foreground h-8 w-8 p-0"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-2 md:gap-4 mb-4 md:mb-6">
            <div className="bg-muted/50 rounded-lg p-3 md:p-4 text-center">
              <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wide mb-1">
                Invested
              </p>
              {isLoading ? (
                <Skeleton className="h-6 md:h-7 w-20 md:w-24 mx-auto" />
              ) : (
                <p className="text-base md:text-xl font-bold text-foreground">
                  {formatCurrency(stats.totalInvested)}
                </p>
              )}
            </div>
            <div className="bg-muted/50 rounded-lg p-3 md:p-4 text-center">
              <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wide mb-1">
                Current
              </p>
              {isLoading ? (
                <Skeleton className="h-6 md:h-7 w-20 md:w-24 mx-auto" />
              ) : (
                <p className="text-base md:text-xl font-bold text-foreground">
                  {formatCurrency(stats.currentValue)}
                </p>
              )}
            </div>
          </div>

          {/* P/L Display */}
          <div className={`rounded-lg p-3 md:p-4 text-center mb-3 md:mb-4 ${
            isProfit ? 'bg-neon-green/10 border border-neon-green/30' : 'bg-red-500/10 border border-red-500/30'
          }`}>
            {isLoading ? (
              <Skeleton className="h-6 md:h-8 w-28 md:w-32 mx-auto" />
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                <div className="flex items-center gap-1">
                  {isProfit ? (
                    <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-neon-green" />
                  ) : (
                    <TrendingDown className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
                  )}
                  <span className={`text-lg md:text-2xl font-bold ${isProfit ? 'text-neon-green' : 'text-red-500'}`}>
                    {isProfit ? '+' : ''}{stats.plPercent.toFixed(2)}%
                  </span>
                </div>
                <span className={`text-xs md:text-sm ${isProfit ? 'text-neon-green/80' : 'text-red-500/80'}`}>
                  ({isProfit ? '+' : ''}{formatCurrency(stats.pl)})
                </span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
            <span className="order-2 sm:order-1">Updated: {formatTime(lastUpdated)}</span>
            <Link 
              to="/investments" 
              className="order-1 sm:order-2 flex items-center gap-1 text-neon-cyan hover:text-neon-cyan/80 transition-colors font-medium"
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