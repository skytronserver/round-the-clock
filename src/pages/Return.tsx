import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Save } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface ReturnItem {
  id: string;
  itemName: string;
  returnQty: string;
  unit: string;
  reason: string;
}

const Return = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    returnDate: new Date().toISOString().split('T')[0],
    outletName: '',
    returnType: '',
    remarks: '',
  });

  const [items, setItems] = useState<ReturnItem[]>([
    { id: '1', itemName: '', returnQty: '', unit: '', reason: '' }
  ]);

  const handleAddItem = () => {
    const newItem: ReturnItem = {
      id: Date.now().toString(),
      itemName: '',
      returnQty: '',
      unit: '',
      reason: ''
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleItemChange = (id: string, field: keyof ReturnItem, value: string) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast({
      title: "Return Processed",
      description: "Items have been returned to inventory",
    });

    // Reset form
    setFormData({
      returnDate: new Date().toISOString().split('T')[0],
      outletName: '',
      returnType: '',
      remarks: '',
    });
    setItems([{ id: '1', itemName: '', returnQty: '', unit: '', reason: '' }]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="mb-8">
          <Link to="/mis/inventory" className="inline-flex items-center text-red-600 hover:text-red-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Inventory
          </Link>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-3 rounded-lg">
                  <RotateCcw className="w-8 h-8 text-red-600" />
                </div>
                <div>
                  <CardTitle className="text-3xl">Return Management</CardTitle>
                  <CardDescription>Process returned items and update inventory</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="returnDate">Return Date *</Label>
                    <Input
                      id="returnDate"
                      name="returnDate"
                      type="date"
                      value={formData.returnDate}
                      onChange={handleChange}
                      required
                    />
                  </div>

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
                    <Label htmlFor="returnType">Return Type *</Label>
                    <Select
                      value={formData.returnType}
                      onValueChange={(value) => setFormData({ ...formData, returnType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="customer">Customer Return</SelectItem>
                        <SelectItem value="supplier">Supplier Return</SelectItem>
                        <SelectItem value="internal">Internal Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Items Section */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-lg font-semibold">Return Items</Label>
                    <Button type="button" onClick={handleAddItem} variant="outline" size="sm">
                      Add Item
                    </Button>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item Name</TableHead>
                          <TableHead>Return Quantity</TableHead>
                          <TableHead>Unit</TableHead>
                          <TableHead>Reason</TableHead>
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
                                value={item.returnQty}
                                onChange={(e) => handleItemChange(item.id, 'returnQty', e.target.value)}
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
                                  <SelectItem value="kg">Kg</SelectItem>
                                  <SelectItem value="g">Gram</SelectItem>
                                  <SelectItem value="l">Liter</SelectItem>
                                  <SelectItem value="pcs">Pieces</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <Input
                                value={item.reason}
                                onChange={(e) => handleItemChange(item.id, 'reason', e.target.value)}
                                placeholder="Reason"
                              />
                            </TableCell>
                            <TableCell>
                              {items.length > 1 && (
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleRemoveItem(item.id)}
                                >
                                  Remove
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {/* Remarks */}
                <div>
                  <Label htmlFor="remarks">Additional Remarks</Label>
                  <Textarea
                    id="remarks"
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                    placeholder="Enter any additional notes"
                    rows={3}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Process Return
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

export default Return;
