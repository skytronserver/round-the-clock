import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ClipboardCheck, Save } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface CheckItem {
  id: string;
  itemName: string;
  expectedQty: string;
  actualQty: string;
  unit: string;
  quality: string;
  status: 'pass' | 'fail' | 'pending';
}

const Check = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    checkDate: new Date().toISOString().split('T')[0],
    checkedBy: '',
    location: '',
    checkType: '',
    remarks: '',
  });

  const [items, setItems] = useState<CheckItem[]>([
    { id: '1', itemName: 'Tomatoes', expectedQty: '50', actualQty: '', unit: 'kg', quality: '', status: 'pending' },
    { id: '2', itemName: 'Onions', expectedQty: '30', actualQty: '', unit: 'kg', quality: '', status: 'pending' },
    { id: '3', itemName: 'Rice', expectedQty: '100', actualQty: '', unit: 'kg', quality: '', status: 'pending' },
  ]);

  const handleItemChange = (id: string, field: keyof CheckItem, value: string) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // Auto-determine status based on quantity and quality
        if (field === 'actualQty' || field === 'quality') {
          const expected = parseFloat(updatedItem.expectedQty);
          const actual = parseFloat(updatedItem.actualQty);
          const quality = updatedItem.quality;
          
          if (actual && quality) {
            if (actual >= expected && (quality === 'good' || quality === 'excellent')) {
              updatedItem.status = 'pass';
            } else {
              updatedItem.status = 'fail';
            }
          }
        }
        
        return updatedItem;
      }
      return item;
    }));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pass':
        return <Badge className="bg-green-500">Pass</Badge>;
      case 'fail':
        return <Badge className="bg-red-500">Fail</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const allChecked = items.every(item => item.actualQty && item.quality);
    if (!allChecked) {
      toast({
        title: "Incomplete Check",
        description: "Please check all items before submitting",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Check Completed",
      description: "Quality check completed. Items ready for dispatch.",
    });

    // Reset form
    setFormData({
      checkDate: new Date().toISOString().split('T')[0],
      checkedBy: '',
      location: '',
      checkType: '',
      remarks: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="mb-8">
          <Link to="/mis/inventory" className="inline-flex items-center text-teal-600 hover:text-teal-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Inventory
          </Link>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-teal-100 p-3 rounded-lg">
                  <ClipboardCheck className="w-8 h-8 text-teal-600" />
                </div>
                <div>
                  <CardTitle className="text-3xl">Quality Check</CardTitle>
                  <CardDescription>Perform quality and quantity checks before dispatch</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <Label htmlFor="checkDate">Check Date *</Label>
                    <Input
                      id="checkDate"
                      name="checkDate"
                      type="date"
                      value={formData.checkDate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="checkedBy">Checked By *</Label>
                    <Input
                      id="checkedBy"
                      name="checkedBy"
                      value={formData.checkedBy}
                      onChange={handleChange}
                      required
                      placeholder="Enter name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Select
                      value={formData.location}
                      onValueChange={(value) => setFormData({ ...formData, location: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="warehouse">Warehouse</SelectItem>
                        <SelectItem value="centralized">Centralized Facility</SelectItem>
                        <SelectItem value="main">Main Branch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="checkType">Check Type *</Label>
                    <Select
                      value={formData.checkType}
                      onValueChange={(value) => setFormData({ ...formData, checkType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pre-dispatch">Pre-Dispatch</SelectItem>
                        <SelectItem value="quality">Quality Check</SelectItem>
                        <SelectItem value="stock">Stock Verification</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Items Check Table */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Items to Check</Label>
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item Name</TableHead>
                          <TableHead>Expected Qty</TableHead>
                          <TableHead>Actual Qty</TableHead>
                          <TableHead>Unit</TableHead>
                          <TableHead>Quality</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {items.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.itemName}</TableCell>
                            <TableCell>{item.expectedQty}</TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                step="0.01"
                                value={item.actualQty}
                                onChange={(e) => handleItemChange(item.id, 'actualQty', e.target.value)}
                                placeholder="0"
                                className="w-24"
                              />
                            </TableCell>
                            <TableCell>{item.unit}</TableCell>
                            <TableCell>
                              <Select
                                value={item.quality}
                                onValueChange={(value) => handleItemChange(item.id, 'quality', value)}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue placeholder="Quality" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="excellent">Excellent</SelectItem>
                                  <SelectItem value="good">Good</SelectItem>
                                  <SelectItem value="average">Average</SelectItem>
                                  <SelectItem value="poor">Poor</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>{getStatusBadge(item.status)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {/* Remarks */}
                <div>
                  <Label htmlFor="remarks">Remarks / Observations</Label>
                  <Textarea
                    id="remarks"
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                    placeholder="Enter any observations or issues found during check"
                    rows={3}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Complete Check
                  </Button>
                  <Link to="/mis/dispatch">
                    <Button type="button" variant="outline">
                      Proceed to Dispatch
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

export default Check;
