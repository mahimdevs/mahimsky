import { useState, useEffect, useCallback, useRef, useMemo } from 'react';

interface PriceData {
  symbol: string;
  price: number;
  lastUpdated: Date;
}

interface UseBinancePricesResult {
  prices: Record<string, PriceData>;
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refetch: () => void;
}

const REFRESH_INTERVAL = 60000; // 1 minute auto-refresh

export const useBinancePrices = (symbols: string[]): UseBinancePricesResult => {
  const [prices, setPrices] = useState<Record<string, PriceData>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  
  // Memoize symbols to prevent infinite re-renders
  const symbolsKey = symbols.sort().join(',');
  const stableSymbols = useMemo(() => symbols, [symbolsKey]);
  
  // Track if initial fetch is done
  const hasFetched = useRef(false);

  const fetchPrices = useCallback(async () => {
    if (stableSymbols.length === 0) {
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    setError(null);

    try {
      const pricePromises = stableSymbols.map(async (symbol) => {
        const response = await fetch(
          `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch price for ${symbol}`);
        }
        
        const data = await response.json();
        return {
          symbol: data.symbol,
          price: parseFloat(data.price),
          lastUpdated: new Date(),
        };
      });

      const results = await Promise.all(pricePromises);
      const newPrices: Record<string, PriceData> = {};
      
      results.forEach((result) => {
        newPrices[result.symbol] = result;
      });

      setPrices(newPrices);
      setLastUpdated(new Date());
      hasFetched.current = true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch prices');
    } finally {
      setIsLoading(false);
    }
  }, [stableSymbols]);

  useEffect(() => {
    fetchPrices();
    
    const interval = setInterval(fetchPrices, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchPrices]);

  return {
    prices,
    isLoading,
    error,
    lastUpdated,
    refetch: fetchPrices,
  };
};
