import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, Package, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface InwardItem {
  id: string;
  itemName: string;
  orderedQty: string;
  receivedQty: string;
  unit: string;
  status: 'pending' | 'partial' | 'complete';
}

const Inward = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    purchaseOrderId: '',
    receivedDate: new Date().toISOString().split('T')[0],
    receivedBy: '',
    supplierName: '',
    invoiceNumber: '',
    remarks: '',
  });

  // Mock data - in real app, this would come from the purchase order
  const [items, setItems] = useState<InwardItem[]>([
    { id: '1', itemName: 'Tomatoes', orderedQty: '50', receivedQty: '', unit: 'kg', status: 'pending' },
    { id: '2', itemName: 'Onions', orderedQty: '30', receivedQty: '', unit: 'kg', status: 'pending' },
    { id: '3', itemName: 'Rice', orderedQty: '100', receivedQty: '', unit: 'kg', status: 'pending' },
  ]);

  const handleItemChange = (id: string, receivedQty: string) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const ordered = parseFloat(item.orderedQty);
        const received = parseFloat(receivedQty) || 0;
        
        let status: 'pending' | 'partial' | 'complete' = 'pending';
        if (received === 0) status = 'pending';
        else if (received < ordered) status = 'partial';
        else status = 'complete';

        return { ...item, receivedQty, status };
      }
      return item;
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const allReceived = items.every(item => parseFloat(item.receivedQty) > 0);
    if (!allReceived) {
      toast({
        title: "Incomplete Inward",
        description: "Please enter received quantities for all items.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Inward Completed",
      description: "Items have been received and added to inventory.",
    });

    // Reset form
    setFormData({
      purchaseOrderId: '',
      receivedDate: new Date().toISOString().split('T')[0],
      receivedBy: '',
      supplierName: '',
      invoiceNumber: '',
      remarks: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'complete':
        return <Badge className="bg-green-500">Complete</Badge>;
      case 'partial':
        return <Badge className="bg-yellow-500">Partial</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="mb-8">
          <Link to="/mis" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to MIS Dashboard
          </Link>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <Package className="w-8 h-8 text-indigo-600" />
                </div>
                <div>
                  <CardTitle className="text-3xl">Inward Management</CardTitle>
                  <CardDescription>Receive and record purchased items into inventory</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="purchaseOrderId">Purchase Order ID *</Label>
                    <Select
                      value={formData.purchaseOrderId}
                      onValueChange={(value) => setFormData({ ...formData, purchaseOrderId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select PO" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PO-2024-001">PO-2024-001</SelectItem>
                        <SelectItem value="PO-2024-002">PO-2024-002</SelectItem>
                        <SelectItem value="PO-2024-003">PO-2024-003</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="receivedDate">Received Date *</Label>
                    <Input
                      id="receivedDate"
                      name="receivedDate"
                      type="date"
                      value={formData.receivedDate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="receivedBy">Received By *</Label>
                    <Input
                      id="receivedBy"
                      name="receivedBy"
                      value={formData.receivedBy}
                      onChange={handleChange}
                      required
                      placeholder="Enter name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="supplierName">Supplier Name *</Label>
                    <Input
                      id="supplierName"
                      name="supplierName"
                      value={formData.supplierName}
                      onChange={handleChange}
                      required
                      placeholder="Enter supplier name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="invoiceNumber">Invoice Number *</Label>
                    <Input
                      id="invoiceNumber"
                      name="invoiceNumber"
                      value={formData.invoiceNumber}
                      onChange={handleChange}
                      required
                      placeholder="Enter invoice number"
                    />
                  </div>
                </div>

                {/* Items Table */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Items to Receive</Label>
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item Name</TableHead>
                          <TableHead>Ordered Qty</TableHead>
                          <TableHead>Received Qty</TableHead>
                          <TableHead>Unit</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {items.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.itemName}</TableCell>
                            <TableCell>{item.orderedQty}</TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                step="0.01"
                                value={item.receivedQty}
                                onChange={(e) => handleItemChange(item.id, e.target.value)}
                                placeholder="0"
                                className="w-24"
                              />
                            </TableCell>
                            <TableCell>{item.unit}</TableCell>
                            <TableCell>{getStatusBadge(item.status)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {/* Remarks */}
                <div>
                  <Label htmlFor="remarks">Remarks / Notes</Label>
                  <Textarea
                    id="remarks"
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                    placeholder="Enter any remarks about the received items (damages, quality issues, etc.)"
                    rows={3}
                  />
                </div>

                {/* Info Card */}
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-semibold text-blue-900">Inventory Update</p>
                        <p className="text-sm text-blue-700">
                          Upon submission, received items will be automatically added to the inventory system.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Complete Inward
                  </Button>
                  <Link to="/mis">
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

export default Inward;
