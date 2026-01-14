import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useInvestments, Investment } from '@/hooks/useInvestments';
import { InvestmentForm } from '@/components/InvestmentForm';
import { useBinancePrices } from '@/hooks/useBinancePrices';
import { Plus, Pencil, Trash2, RefreshCw, TrendingUp, TrendingDown, Wifi } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const InvestmentsAdmin = () => {
  const { investments, loading, addInvestment, updateInvestment, deleteInvestment } = useInvestments();
  const [showForm, setShowForm] = useState(false);
  const [editingInvestment, setEditingInvestment] = useState<Investment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const symbols = investments.map(inv => inv.symbol);
  const { prices, lastUpdated, refetch: refetchPrices } = useBinancePrices(symbols);

  const handleAdd = async (data: Omit<Investment, 'id' | 'created_at' | 'updated_at'>) => {
    setIsSubmitting(true);
    try {
      await addInvestment(data);
      setShowForm(false);
      toast({ title: 'Success', description: 'Investment added successfully' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to add investment', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (data: Omit<Investment, 'id' | 'created_at' | 'updated_at'>) => {
    if (!editingInvestment) return;
    setIsSubmitting(true);
    try {
      await updateInvestment(editingInvestment.id, data);
      setEditingInvestment(null);
      toast({ title: 'Success', description: 'Investment updated successfully' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update investment', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this investment?')) return;
    try {
      await deleteInvestment(id);
      toast({ title: 'Success', description: 'Investment deleted successfully' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete investment', variant: 'destructive' });
    }
  };

  const calculatePL = (investment: Investment) => {
    const currentPrice = prices[investment.symbol]?.price || investment.entry_price;
    const currentValue = currentPrice * investment.quantity;
    const pl = currentValue - investment.invested_amount;
    const plPercent = (pl / investment.invested_amount) * 100;
    return { currentPrice, currentValue, pl, plPercent };
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const totalInvested = investments.reduce((sum, inv) => sum + inv.invested_amount, 0);
  const totalCurrentValue = investments.reduce((sum, inv) => {
    const { currentValue } = calculatePL(inv);
    return sum + currentValue;
  }, 0);
  const totalPL = totalCurrentValue - totalInvested;
  const totalPLPercent = totalInvested > 0 ? (totalPL / totalInvested) * 100 : 0;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Investment Admin Panel</h1>
              <p className="text-muted-foreground mt-1 flex items-center gap-2">
                <Wifi className="w-4 h-4 text-green-500" />
                Real-time updates enabled
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={refetchPrices} size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Prices
              </Button>
              <Button onClick={() => setShowForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Investment
              </Button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Invested</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{formatCurrency(totalInvested)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Current Value</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{formatCurrency(totalCurrentValue)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total P/L</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-2xl font-bold flex items-center gap-2 ${totalPL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {totalPL >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                  {formatCurrency(totalPL)}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">P/L Percentage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-2xl font-bold ${totalPLPercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {totalPLPercent >= 0 ? '+' : ''}{totalPLPercent.toFixed(2)}%
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Last Updated */}
          {lastUpdated && (
            <p className="text-sm text-muted-foreground text-center">
              Prices last updated: {lastUpdated.toLocaleString()}
            </p>
          )}

          {/* Form */}
          {(showForm || editingInvestment) && (
            <InvestmentForm
              investment={editingInvestment || undefined}
              onSubmit={editingInvestment ? handleUpdate : handleAdd}
              onCancel={() => {
                setShowForm(false);
                setEditingInvestment(null);
              }}
              isLoading={isSubmitting}
            />
          )}

          {/* Investments Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Investments</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-center py-8 text-muted-foreground">Loading investments...</p>
              ) : investments.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground">No investments yet. Add your first one!</p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Asset</TableHead>
                        <TableHead>Symbol</TableHead>
                        <TableHead className="text-right">Invested</TableHead>
                        <TableHead className="text-right">Entry Price</TableHead>
                        <TableHead className="text-right">Current Price</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead className="text-right">Current Value</TableHead>
                        <TableHead className="text-right">P/L</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {investments.map((investment) => {
                        const { currentPrice, currentValue, pl, plPercent } = calculatePL(investment);
                        return (
                          <TableRow key={investment.id}>
                            <TableCell className="font-medium">{investment.name}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{investment.symbol}</Badge>
                            </TableCell>
                            <TableCell className="text-right">{formatCurrency(investment.invested_amount)}</TableCell>
                            <TableCell className="text-right">${investment.entry_price.toFixed(2)}</TableCell>
                            <TableCell className="text-right">${currentPrice.toFixed(2)}</TableCell>
                            <TableCell className="text-right">{investment.quantity.toFixed(6)}</TableCell>
                            <TableCell className="text-right">{formatCurrency(currentValue)}</TableCell>
                            <TableCell className={`text-right font-medium ${pl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                              {formatCurrency(pl)} ({plPercent >= 0 ? '+' : ''}{plPercent.toFixed(2)}%)
                            </TableCell>
                            <TableCell>
                              <Badge variant={investment.status === 'Active' ? 'default' : 'secondary'}>
                                {investment.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex gap-1 justify-end">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => setEditingInvestment(investment)}
                                >
                                  <Pencil className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDelete(investment.id)}
                                  className="text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default InvestmentsAdmin;
