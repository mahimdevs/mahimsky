import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface Investment {
  id: string;
  name: string;
  symbol: string;
  invested_amount: number;
  entry_price: number;
  quantity: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export const useInvestments = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInvestments = async () => {
    try {
      const { data, error } = await supabase
        .from('investments')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setInvestments(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch investments');
    } finally {
      setLoading(false);
    }
  };

  const addInvestment = async (investment: Omit<Investment, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('investments')
      .insert([investment])
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const updateInvestment = async (id: string, updates: Partial<Investment>) => {
    const { data, error } = await supabase
      .from('investments')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const deleteInvestment = async (id: string) => {
    const { error } = await supabase
      .from('investments')
      .delete()
      .eq('id', id);

    if (error) throw error;
  };

  useEffect(() => {
    fetchInvestments();

    // Set up realtime subscription
    const channel = supabase
      .channel('investments-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'investments'
        },
        (payload) => {
          console.log('Realtime update:', payload);
          
          if (payload.eventType === 'INSERT') {
            setInvestments(prev => [...prev, payload.new as Investment]);
          } else if (payload.eventType === 'UPDATE') {
            setInvestments(prev => 
              prev.map(inv => inv.id === payload.new.id ? payload.new as Investment : inv)
            );
          } else if (payload.eventType === 'DELETE') {
            setInvestments(prev => prev.filter(inv => inv.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    investments,
    loading,
    error,
    addInvestment,
    updateInvestment,
    deleteInvestment,
    refetch: fetchInvestments
  };
};
