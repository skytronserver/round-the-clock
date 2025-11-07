import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Plus, Trash2, Receipt } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface SaleItem {
  id: string;
  itemName: string;
  quantity: string;
  unit: string;
  pricePerUnit: string;
  totalPrice: string;
}

const Sale = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    outletName: '',
    saleDate: new Date().toISOString().split('T')[0],
    customerName: '',
    customerPhone: '',
    saleType: '',
  });
  const [items, setItems] = useState<SaleItem[]>([
    { id: '1', itemName: '', quantity: '', unit: '', pricePerUnit: '', totalPrice: '0' }
  ]);

  const handleAddItem = () => {
    const newItem: SaleItem = {
      id: Date.now().toString(),
      itemName: '',
      quantity: '',
      unit: '',
      pricePerUnit: '',
      totalPrice: '0'
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleItemChange = (id: string, field: keyof SaleItem, value: string) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        if (field === 'quantity' || field === 'pricePerUnit') {
          const qty = parseFloat(field === 'quantity' ? value : updatedItem.quantity) || 0;
          const price = parseFloat(field === 'pricePerUnit' ? value : updatedItem.pricePerUnit) || 0;
          updatedItem.totalPrice = (qty * price).toFixed(2);
        }
        
        return updatedItem;
      }
      return item;
    }));
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + parseFloat(item.totalPrice || '0'), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.05; // 5% tax
  };

  const calculateGrandTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast({
      title: "Sale Recorded",
      description: "Proceeding to billing...",
    });

    // Navigate to billing page with sale data
    navigate('/mis/billing', { state: { saleData: { formData, items, total: calculateGrandTotal() } } });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="mb-8">
          <Link to="/mis/inventory" className="inline-flex items-center text-emerald-600 hover:text-emerald-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Inventory
          </Link>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-emerald-100 p-3 rounded-lg">
                  <ShoppingCart className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <CardTitle className="text-3xl">Sale</CardTitle>
                  <CardDescription>Record sales and generate billing</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="outletName">Outlet *</Label>
                    <Select
                      value={formData.outletName}
                      onValueChange={(value) => setFormData({ ...formData, outletName: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select outlet" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main">Main Branch</SelectItem>
                        <SelectItem value="downtown">Downtown Branch</SelectItem>
                        <SelectItem value="airport">Airport Branch</SelectItem>
                        <SelectItem value="mall">Mall Branch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="saleDate">Sale Date *</Label>
                    <Input
                      id="saleDate"
                      name="saleDate"
                      type="date"
                      value={formData.saleDate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="saleType">Sale Type *</Label>
                    <Select
                      value={formData.saleType}
                      onValueChange={(value) => setFormData({ ...formData, saleType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dine-in">Dine In</SelectItem>
                        <SelectItem value="takeaway">Takeaway</SelectItem>
                        <SelectItem value="delivery">Delivery</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="customerName">Customer Name</Label>
                    <Input
                      id="customerName"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                      placeholder="Enter customer name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="customerPhone">Customer Phone</Label>
                    <Input
                      id="customerPhone"
                      name="customerPhone"
                      value={formData.customerPhone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                {/* Items Section */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-lg font-semibold">Sale Items</Label>
                    <Button type="button" onClick={handleAddItem} variant="outline" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Item
                    </Button>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item Name</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Unit</TableHead>
                          <TableHead>Price/Unit</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {items.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <Input
                                value={item.itemName}
                                onChange={(e) => handleItemChange(item.id, 'itemName', e.target.value)}
                                required
                                placeholder="Item name"
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                step="0.01"
                                value={item.quantity}
                                onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
                                required
                                placeholder="Qty"
                                className="w-24"
                              />
                            </TableCell>
                            <TableCell>
                              <Select
                                value={item.unit}
                                onValueChange={(value) => handleItemChange(item.id, 'unit', value)}
                              >
                                <SelectTrigger className="w-24">
                                  <SelectValue placeholder="Unit" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pcs">Pcs</SelectItem>
                                  <SelectItem value="plate">Plate</SelectItem>
                                  <SelectItem value="kg">Kg</SelectItem>
                                  <SelectItem value="l">Liter</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                step="0.01"
                                value={item.pricePerUnit}
                                onChange={(e) => handleItemChange(item.id, 'pricePerUnit', e.target.value)}
                                required
                                placeholder="Price"
                                className="w-24"
                              />
                            </TableCell>
                            <TableCell className="font-semibold">₹{item.totalPrice}</TableCell>
                            <TableCell>
                              {items.length > 1 && (
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  onClick={() => handleRemoveItem(item.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {/* Totals */}
                <div className="flex justify-end">
                  <Card className="w-80 bg-emerald-50">
                    <CardContent className="pt-6 space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span className="font-semibold">₹{calculateSubtotal().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax (5%):</span>
                        <span className="font-semibold">₹{calculateTax().toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between items-center">
                        <span className="text-lg font-semibold">Grand Total:</span>
                        <span className="text-2xl font-bold text-emerald-600">₹{calculateGrandTotal().toFixed(2)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex items-center gap-2">
                    <Receipt className="w-4 h-4" />
                    Proceed to Billing
                  </Button>
                  <Link to="/mis/inventory">
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Sale;
