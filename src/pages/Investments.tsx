import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useBinancePrices } from "@/hooks/useBinancePrices";
import { 
  TrendingUp, 
  TrendingDown, 
  RefreshCw, 
  Shield, 
  AlertTriangle,
  Clock,
  Database,
  Calculator,
  Info
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Investment data - manually entered
const investments = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    tradingPair: "BTCUSDT",
    invested: 1000,
    entryPrice: 42000,
    quantity: 0.0238,
    status: "Active" as const,
  },
  {
    id: 2,
    name: "Ethereum",
    symbol: "ETH",
    tradingPair: "ETHUSDT",
    invested: 500,
    entryPrice: 2200,
    quantity: 0.227,
    status: "Active" as const,
  },
  {
    id: 3,
    name: "Solana",
    symbol: "SOL",
    tradingPair: "SOLUSDT",
    invested: 300,
    entryPrice: 95,
    quantity: 3.158,
    status: "Holding" as const,
  },
];

const Investments = () => {
  const tradingPairs = investments.map((inv) => inv.tradingPair);
  const { prices, isLoading, error, lastUpdated, refetch } = useBinancePrices(tradingPairs);

  const calculatePL = (investment: typeof investments[0]) => {
    const priceData = prices[investment.tradingPair];
    if (!priceData) return { currentValue: 0, pl: 0, plPercent: 0 };

    const currentValue = priceData.price * investment.quantity;
    const pl = currentValue - investment.invested;
    const plPercent = (pl / investment.invested) * 100;

    return { currentValue, pl, plPercent };
  };

  const totalInvested = investments.reduce((sum, inv) => sum + inv.invested, 0);
  const totalCurrentValue = investments.reduce((sum, inv) => {
    const { currentValue } = calculatePL(inv);
    return sum + currentValue;
  }, 0);
  const totalPL = totalCurrentValue - totalInvested;
  const totalPLPercent = (totalPL / totalInvested) * 100;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-12">
        {/* Page Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Investments & Performance
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-4">
            This page documents where my capital is invested and how it is performing. 
            All data is updated in real-time using live market prices.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
            <Info className="w-4 h-4 flex-shrink-0" />
            <span>
              This is for transparency and learning purposes only — not financial advice.
            </span>
          </div>
        </div>

        {/* Portfolio Summary */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Invested
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-foreground">
                  {formatCurrency(totalInvested)}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Current Value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-foreground">
                  {isLoading ? "Loading..." : formatCurrency(totalCurrentValue)}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total P/L
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  {!isLoading && (
                    <>
                      {totalPL >= 0 ? (
                        <TrendingUp className="w-5 h-5 text-green-500" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-500" />
                      )}
                      <span className={`text-2xl font-bold ${totalPL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {formatCurrency(totalPL)} ({totalPLPercent.toFixed(2)}%)
                      </span>
                    </>
                  )}
                  {isLoading && <span className="text-2xl font-bold">Loading...</span>}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Update Info */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4 bg-muted/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>
                Last updated: {lastUpdated ? lastUpdated.toLocaleString() : 'Never'}
              </span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={refetch}
              disabled={isLoading}
              className="gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh Prices
            </Button>
          </div>
          {error && (
            <div className="mt-2 text-sm text-red-500 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              {error}
            </div>
          )}
        </div>

        {/* How It Works */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                How the System Works
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="flex items-start gap-2">
                    <span className="text-primary font-medium">1.</span>
                    Investment amount and entry price are entered manually
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-primary font-medium">2.</span>
                    Current market prices are fetched from Binance API
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="flex items-start gap-2">
                    <span className="text-primary font-medium">3.</span>
                    P/L and percentage change are calculated dynamically
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-primary font-medium">4.</span>
                    Prices refresh automatically every 60 seconds
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Investment Table */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Investment Portfolio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset</TableHead>
                      <TableHead>Pair</TableHead>
                      <TableHead className="text-right">Invested</TableHead>
                      <TableHead className="text-right">Entry Price</TableHead>
                      <TableHead className="text-right">Current Price</TableHead>
                      <TableHead className="text-right">Current Value</TableHead>
                      <TableHead className="text-right">P/L</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {investments.map((investment) => {
                      const priceData = prices[investment.tradingPair];
                      const { currentValue, pl, plPercent } = calculatePL(investment);
                      const isProfit = pl >= 0;

                      return (
                        <TableRow key={investment.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium text-foreground">{investment.name}</p>
                              <p className="text-xs text-muted-foreground">{investment.symbol}</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {investment.tradingPair}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {formatCurrency(investment.invested)}
                          </TableCell>
                          <TableCell className="text-right text-muted-foreground">
                            {formatPrice(investment.entryPrice)}
                          </TableCell>
                          <TableCell className="text-right">
                            {isLoading ? (
                              <span className="text-muted-foreground">Loading...</span>
                            ) : priceData ? (
                              formatPrice(priceData.price)
                            ) : (
                              <span className="text-muted-foreground">N/A</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {isLoading ? '...' : formatCurrency(currentValue)}
                          </TableCell>
                          <TableCell className="text-right">
                            {!isLoading && priceData && (
                              <div className={`flex items-center justify-end gap-1 ${isProfit ? 'text-green-500' : 'text-red-500'}`}>
                                {isProfit ? (
                                  <TrendingUp className="w-4 h-4" />
                                ) : (
                                  <TrendingDown className="w-4 h-4" />
                                )}
                                <div className="text-right">
                                  <p className="font-medium">{formatCurrency(pl)}</p>
                                  <p className="text-xs">({plPercent.toFixed(2)}%)</p>
                                </div>
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={investment.status === 'Active' ? 'default' : 'secondary'}
                            >
                              {investment.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calculation Method */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Calculation Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="font-medium text-foreground mb-1">Current Value</p>
                  <code className="text-xs text-muted-foreground">
                    Current Price × Quantity
                  </code>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="font-medium text-foreground mb-1">Profit/Loss</p>
                  <code className="text-xs text-muted-foreground">
                    Current Value − Invested Amount
                  </code>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="font-medium text-foreground mb-1">P/L Percentage</p>
                  <code className="text-xs text-muted-foreground">
                    (P/L ÷ Invested Amount) × 100
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Source */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Data Source
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground">
                    <span className="font-medium text-foreground">Provider:</span> Binance Public API
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-medium text-foreground">API Type:</span> Public, keyless
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">
                    <span className="font-medium text-foreground">Base Currency:</span> USDT
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-medium text-foreground">Refresh Rate:</span> 60 seconds
                  </p>
                </div>
              </div>
              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground font-mono break-all">
                  Endpoint: https://api.binance.com/api/v3/ticker/price
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Disclosure */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-amber-500/20 bg-amber-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                <Shield className="w-5 h-5" />
                Important Disclosure
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 mt-0.5 text-amber-500 flex-shrink-0" />
                  This page tracks personal capital only — no investment advice or guaranteed returns.
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 mt-0.5 text-amber-500 flex-shrink-0" />
                  Cryptocurrency markets are highly volatile and involve significant risk of loss.
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 mt-0.5 text-amber-500 flex-shrink-0" />
                  Prices are sourced from third-party APIs and may be delayed or inaccurate.
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 mt-0.5 text-amber-500 flex-shrink-0" />
                  Past performance does not guarantee future results.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Investments;
