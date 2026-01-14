import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Investment } from '@/hooks/useInvestments';

interface InvestmentFormProps {
  investment?: Investment;
  onSubmit: (data: Omit<Investment, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export const InvestmentForm = ({ investment, onSubmit, onCancel, isLoading }: InvestmentFormProps) => {
  const [formData, setFormData] = useState({
    name: investment?.name || '',
    symbol: investment?.symbol || '',
    invested_amount: investment?.invested_amount?.toString() || '',
    entry_price: investment?.entry_price?.toString() || '',
    quantity: investment?.quantity?.toString() || '',
    status: investment?.status || 'Active'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      name: formData.name,
      symbol: formData.symbol.toUpperCase(),
      invested_amount: parseFloat(formData.invested_amount),
      entry_price: parseFloat(formData.entry_price),
      quantity: parseFloat(formData.quantity),
      status: formData.status
    });
  };

  const calculateQuantity = () => {
    const amount = parseFloat(formData.invested_amount);
    const price = parseFloat(formData.entry_price);
    if (amount && price) {
      setFormData(prev => ({ ...prev, quantity: (amount / price).toString() }));
    }
  };

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-lg">
          {investment ? 'Edit Investment' : 'Add New Investment'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Asset Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Bitcoin"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="symbol">Trading Pair</Label>
              <Input
                id="symbol"
                value={formData.symbol}
                onChange={(e) => setFormData(prev => ({ ...prev, symbol: e.target.value.toUpperCase() }))}
                placeholder="e.g., BTCUSDT"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="invested_amount">Invested Amount ($)</Label>
              <Input
                id="invested_amount"
                type="number"
                step="0.01"
                value={formData.invested_amount}
                onChange={(e) => setFormData(prev => ({ ...prev, invested_amount: e.target.value }))}
                onBlur={calculateQuantity}
                placeholder="0.00"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="entry_price">Entry Price ($)</Label>
              <Input
                id="entry_price"
                type="number"
                step="0.00000001"
                value={formData.entry_price}
                onChange={(e) => setFormData(prev => ({ ...prev, entry_price: e.target.value }))}
                onBlur={calculateQuantity}
                placeholder="0.00"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                step="0.00000001"
                value={formData.quantity}
                onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                placeholder="Auto-calculated"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Holding">Holding</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? 'Saving...' : investment ? 'Update' : 'Add Investment'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
