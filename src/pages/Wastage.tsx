import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash, Save } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface WastageItem {
  id: string;
  itemName: string;
  wastedQty: string;
  unit: string;
  reason: string;
  estimatedValue: string;
}

const Wastage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    wastageDate: new Date().toISOString().split('T')[0],
    outletName: '',
    reportedBy: '',
    remarks: '',
  });

  const [items, setItems] = useState<WastageItem[]>([
    { id: '1', itemName: '', wastedQty: '', unit: '', reason: '', estimatedValue: '' }
  ]);

  const handleAddItem = () => {
    const newItem: WastageItem = {
      id: Date.now().toString(),
      itemName: '',
      wastedQty: '',
      unit: '',
      reason: '',
      estimatedValue: ''
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleItemChange = (id: string, field: keyof WastageItem, value: string) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const calculateTotalLoss = () => {
    return items.reduce((sum, item) => sum + parseFloat(item.estimatedValue || '0'), 0).toFixed(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast({
      title: "Wastage Recorded",
      description: "Wastage has been logged and inventory updated",
    });

    // Reset form
    setFormData({
      wastageDate: new Date().toISOString().split('T')[0],
      outletName: '',
      reportedBy: '',
      remarks: '',
    });
    setItems([{ id: '1', itemName: '', wastedQty: '', unit: '', reason: '', estimatedValue: '' }]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="mb-8">
          <Link to="/mis/inventory" className="inline-flex items-center text-amber-600 hover:text-amber-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Inventory
          </Link>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-amber-100 p-3 rounded-lg">
                  <Trash className="w-8 h-8 text-amber-600" />
                </div>
                <div>
                  <CardTitle className="text-3xl">Wastage Tracking</CardTitle>
                  <CardDescription>Record and track wasted or damaged items</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="wastageDate">Wastage Date *</Label>
                    <Input
                      id="wastageDate"
                      name="wastageDate"
                      type="date"
                      value={formData.wastageDate}
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
                    <Label htmlFor="reportedBy">Reported By *</Label>
                    <Input
                      id="reportedBy"
                      name="reportedBy"
                      value={formData.reportedBy}
                      onChange={handleChange}
                      required
                      placeholder="Enter name"
                    />
                  </div>
                </div>

                {/* Items Section */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-lg font-semibold">Wasted Items</Label>
                    <Button type="button" onClick={handleAddItem} variant="outline" size="sm">
                      Add Item
                    </Button>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item Name</TableHead>
                          <TableHead>Wasted Qty</TableHead>
                          <TableHead>Unit</TableHead>
                          <TableHead>Reason</TableHead>
                          <TableHead>Est. Value (₹)</TableHead>
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
                                value={item.wastedQty}
                                onChange={(e) => handleItemChange(item.id, 'wastedQty', e.target.value)}
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
                              <Select
                                value={item.reason}
                                onValueChange={(value) => handleItemChange(item.id, 'reason', value)}
                              >
                                <SelectTrigger className="w-40">
                                  <SelectValue placeholder="Select reason" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="expired">Expired</SelectItem>
                                  <SelectItem value="damaged">Damaged</SelectItem>
                                  <SelectItem value="spoiled">Spoiled</SelectItem>
                                  <SelectItem value="overcooked">Overcooked</SelectItem>
                                  <SelectItem value="contaminated">Contaminated</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                step="0.01"
                                value={item.estimatedValue}
                                onChange={(e) => handleItemChange(item.id, 'estimatedValue', e.target.value)}
                                placeholder="Value"
                                className="w-28"
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

                {/* Total Loss */}
                <div className="flex justify-end">
                  <Card className="w-64 bg-amber-50">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Total Loss:</span>
                        <span className="text-2xl font-bold text-amber-600">₹{calculateTotalLoss()}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Remarks */}
                <div>
                  <Label htmlFor="remarks">Additional Remarks</Label>
                  <Textarea
                    id="remarks"
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                    placeholder="Enter any additional notes about the wastage"
                    rows={3}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Record Wastage
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

export default Wastage;
