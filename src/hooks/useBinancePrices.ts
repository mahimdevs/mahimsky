import { useState, useEffect, useCallback, useRef } from 'react';

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
  // Memoize symbols key first to prevent infinite re-renders (don't mutate original array)
  const symbolsKey = [...symbols].sort().join(',');
  
  const [prices, setPrices] = useState<Record<string, PriceData>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  
  // Use ref to store stable symbols
  const symbolsRef = useRef<string[]>(symbols);
  
  // Update ref when symbols actually change
  useEffect(() => {
    symbolsRef.current = symbols;
  }, [symbolsKey]);

  const fetchPrices = useCallback(async () => {
    const currentSymbols = symbolsRef.current;
    if (currentSymbols.length === 0) {
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    setError(null);

    try {
      const pricePromises = currentSymbols.map(async (symbol) => {
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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch prices');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrices();
    
    const interval = setInterval(fetchPrices, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [symbolsKey, fetchPrices]);

  return {
    prices,
    isLoading,
    error,
    lastUpdated,
    refetch: fetchPrices,
  };
};
