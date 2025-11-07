import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface PurchaseRequest {
  id: string;
  requestId: string;
  outletName: string;
  requestDate: string;
  vendorName: string;
  totalAmount: number;
  itemsCount: number;
  status: 'pending' | 'approved' | 'rejected';
  items: Array<{
    itemName: string;
    quantity: number;
    unit: string;
    pricePerUnit: number;
  }>;
  notes?: string;
}

const PurchaseApproval = () => {
  const { toast } = useToast();
  const [selectedRequest, setSelectedRequest] = useState<PurchaseRequest | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const [requests, setRequests] = useState<PurchaseRequest[]>([
    {
      id: '1',
      requestId: 'PR-2024-001',
      outletName: 'Main Branch',
      requestDate: '2024-11-06',
      vendorName: 'Fresh Supplies Co.',
      totalAmount: 15000,
      itemsCount: 3,
      status: 'pending',
      items: [
        { itemName: 'Tomatoes', quantity: 50, unit: 'kg', pricePerUnit: 80 },
        { itemName: 'Onions', quantity: 30, unit: 'kg', pricePerUnit: 60 },
        { itemName: 'Potatoes', quantity: 40, unit: 'kg', pricePerUnit: 50 },
      ],
      notes: 'Urgent requirement for weekend rush',
    },
    {
      id: '2',
      requestId: 'PR-2024-002',
      outletName: 'Downtown Branch',
      requestDate: '2024-11-06',
      vendorName: 'Dairy Fresh Ltd.',
      totalAmount: 8500,
      itemsCount: 2,
      status: 'pending',
      items: [
        { itemName: 'Milk', quantity: 50, unit: 'l', pricePerUnit: 70 },
        { itemName: 'Paneer', quantity: 20, unit: 'kg', pricePerUnit: 300 },
      ],
    },
    {
      id: '3',
      requestId: 'PR-2024-003',
      outletName: 'Airport Branch',
      requestDate: '2024-11-05',
      vendorName: 'Spice World',
      totalAmount: 12000,
      itemsCount: 4,
      status: 'approved',
      items: [
        { itemName: 'Garam Masala', quantity: 10, unit: 'kg', pricePerUnit: 400 },
        { itemName: 'Turmeric', quantity: 15, unit: 'kg', pricePerUnit: 250 },
        { itemName: 'Red Chili', quantity: 12, unit: 'kg', pricePerUnit: 350 },
        { itemName: 'Coriander Powder', quantity: 10, unit: 'kg', pricePerUnit: 200 },
      ],
    },
    {
      id: '4',
      requestId: 'PR-2024-004',
      outletName: 'Mall Branch',
      requestDate: '2024-11-05',
      vendorName: 'Meat Masters',
      totalAmount: 18000,
      itemsCount: 2,
      status: 'rejected',
      items: [
        { itemName: 'Chicken', quantity: 40, unit: 'kg', pricePerUnit: 250 },
        { itemName: 'Mutton', quantity: 20, unit: 'kg', pricePerUnit: 650 },
      ],
      notes: 'Price too high compared to regular vendor',
    },
  ]);

  const handleApprove = (requestId: string) => {
    setRequests(requests.map(req => 
      req.id === requestId ? { ...req, status: 'approved' as const } : req
    ));
    
    toast({
      title: "Purchase Approved",
      description: "The purchase request has been approved and outlet can proceed.",
    });
    
    setSelectedRequest(null);
  };

  const handleReject = (requestId: string) => {
    if (!rejectionReason.trim()) {
      toast({
        title: "Rejection Reason Required",
        description: "Please provide a reason for rejection.",
        variant: "destructive",
      });
      return;
    }

    setRequests(requests.map(req => 
      req.id === requestId ? { ...req, status: 'rejected' as const, notes: rejectionReason } : req
    ));
    
    toast({
      title: "Purchase Rejected",
      description: "The purchase request has been rejected.",
      variant: "destructive",
    });
    
    setSelectedRequest(null);
    setRejectionReason('');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-500"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'approved':
        return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const approvedRequests = requests.filter(r => r.status === 'approved');
  const rejectedRequests = requests.filter(r => r.status === 'rejected');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="mb-8">
          <Link to="/mis/purchase" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Purchase
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Purchase Approvals</h1>
          <p className="text-gray-600">Review and approve outlet purchase requests</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Requests</p>
                  <p className="text-3xl font-bold text-yellow-600">{pendingRequests.length}</p>
                </div>
                <Clock className="w-12 h-12 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Approved</p>
                  <p className="text-3xl font-bold text-green-600">{approvedRequests.length}</p>
                </div>
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Rejected</p>
                  <p className="text-3xl font-bold text-red-600">{rejectedRequests.length}</p>
                </div>
                <XCircle className="w-12 h-12 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <CardTitle>Purchase Requests</CardTitle>
            <CardDescription>Review outlet purchase requests and approve or reject them</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pending" className="space-y-6">
              <TabsList>
                <TabsTrigger value="pending">Pending ({pendingRequests.length})</TabsTrigger>
                <TabsTrigger value="approved">Approved ({approvedRequests.length})</TabsTrigger>
                <TabsTrigger value="rejected">Rejected ({rejectedRequests.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="space-y-4">
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Request ID</TableHead>
                        <TableHead>Outlet</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Vendor</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">{request.requestId}</TableCell>
                          <TableCell>{request.outletName}</TableCell>
                          <TableCell>{request.requestDate}</TableCell>
                          <TableCell>{request.vendorName}</TableCell>
                          <TableCell>{request.itemsCount} items</TableCell>
                          <TableCell className="font-semibold">₹{request.totalAmount.toLocaleString()}</TableCell>
                          <TableCell>{getStatusBadge(request.status)}</TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setSelectedRequest(request)}
                                >
                                  Review
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-3xl">
                                <DialogHeader>
                                  <DialogTitle>Purchase Request Details - {request.requestId}</DialogTitle>
                                  <DialogDescription>
                                    Review the purchase request from {request.outletName}
                                  </DialogDescription>
                                </DialogHeader>
                                
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-sm text-gray-600">Outlet</Label>
                                      <p className="font-medium">{request.outletName}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm text-gray-600">Request Date</Label>
                                      <p className="font-medium">{request.requestDate}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm text-gray-600">Vendor</Label>
                                      <p className="font-medium">{request.vendorName}</p>
                                    </div>
                                    <div>
                                      <Label className="text-sm text-gray-600">Total Amount</Label>
                                      <p className="font-medium text-lg">₹{request.totalAmount.toLocaleString()}</p>
                                    </div>
                                  </div>

                                  {request.notes && (
                                    <div>
                                      <Label className="text-sm text-gray-600">Notes</Label>
                                      <p className="text-sm bg-gray-50 p-3 rounded">{request.notes}</p>
                                    </div>
                                  )}

                                  <div>
                                    <Label className="text-sm text-gray-600 mb-2 block">Items</Label>
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead>Item Name</TableHead>
                                          <TableHead>Quantity</TableHead>
                                          <TableHead>Unit</TableHead>
                                          <TableHead>Price/Unit</TableHead>
                                          <TableHead>Total</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {request.items.map((item, idx) => (
                                          <TableRow key={idx}>
                                            <TableCell>{item.itemName}</TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                            <TableCell>{item.unit}</TableCell>
                                            <TableCell>₹{item.pricePerUnit}</TableCell>
                                            <TableCell className="font-semibold">
                                              ₹{(item.quantity * item.pricePerUnit).toLocaleString()}
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </div>

                                  <div>
                                    <Label htmlFor="rejectionReason">Rejection Reason (if rejecting)</Label>
                                    <Textarea
                                      id="rejectionReason"
                                      value={rejectionReason}
                                      onChange={(e) => setRejectionReason(e.target.value)}
                                      placeholder="Enter reason for rejection"
                                      rows={3}
                                    />
                                  </div>
                                </div>

                                <DialogFooter>
                                  <Button
                                    variant="destructive"
                                    onClick={() => handleReject(request.id)}
                                  >
                                    <XCircle className="w-4 h-4 mr-2" />
                                    Reject
                                  </Button>
                                  <Button
                                    onClick={() => handleApprove(request.id)}
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Approve
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                      {pendingRequests.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center text-gray-500 py-8">
                            No pending requests
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="approved" className="space-y-4">
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Request ID</TableHead>
                        <TableHead>Outlet</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Vendor</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {approvedRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">{request.requestId}</TableCell>
                          <TableCell>{request.outletName}</TableCell>
                          <TableCell>{request.requestDate}</TableCell>
                          <TableCell>{request.vendorName}</TableCell>
                          <TableCell>{request.itemsCount} items</TableCell>
                          <TableCell className="font-semibold">₹{request.totalAmount.toLocaleString()}</TableCell>
                          <TableCell>{getStatusBadge(request.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="rejected" className="space-y-4">
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Request ID</TableHead>
                        <TableHead>Outlet</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Vendor</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Reason</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rejectedRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">{request.requestId}</TableCell>
                          <TableCell>{request.outletName}</TableCell>
                          <TableCell>{request.requestDate}</TableCell>
                          <TableCell>{request.vendorName}</TableCell>
                          <TableCell>{request.itemsCount} items</TableCell>
                          <TableCell className="font-semibold">₹{request.totalAmount.toLocaleString()}</TableCell>
                          <TableCell>{getStatusBadge(request.status)}</TableCell>
                          <TableCell className="text-sm text-gray-600">{request.notes}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PurchaseApproval;
