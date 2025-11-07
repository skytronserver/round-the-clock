import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, CreditCard, Printer, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Billing = () => {
  const { toast } = useToast();
  const location = useLocation();
  const saleData = location.state?.saleData;
  
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isPaid, setIsPaid] = useState(false);

  const handlePayment = () => {
    if (!paymentMethod) {
      toast({
        title: "Payment Method Required",
        description: "Please select a payment method",
        variant: "destructive",
      });
      return;
    }

    setIsPaid(true);
    toast({
      title: "Payment Successful",
      description: "Bill has been generated successfully",
    });
  };

  const handlePrint = () => {
    window.print();
    toast({
      title: "Printing",
      description: "Bill is being printed...",
    });
  };

  if (!saleData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">No Sale Data</h1>
            <Link to="/mis/sale">
              <Button>Go to Sale</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="mb-8">
          <Link to="/mis/sale" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Sale
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <CreditCard className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-3xl">Billing</CardTitle>
                    <CardDescription>Complete payment and generate bill</CardDescription>
                  </div>
                </div>
                {isPaid && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-6 h-6" />
                    <span className="font-semibold">Paid</span>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Bill Details */}
              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <div className="flex justify-between items-center border-b pb-4">
                  <div>
                    <h3 className="text-xl font-bold">Round The Clock</h3>
                    <p className="text-sm text-gray-600">Invoice #{Date.now().toString().slice(-6)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Date: {saleData.formData.saleDate}</p>
                    <p className="text-sm text-gray-600">Outlet: {saleData.formData.outletName}</p>
                  </div>
                </div>

                {saleData.formData.customerName && (
                  <div>
                    <p className="font-semibold">Customer: {saleData.formData.customerName}</p>
                    {saleData.formData.customerPhone && (
                      <p className="text-sm text-gray-600">Phone: {saleData.formData.customerPhone}</p>
                    )}
                  </div>
                )}

                {/* Items Table */}
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {saleData.items.map((item: any) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.itemName}</TableCell>
                          <TableCell>{item.quantity} {item.unit}</TableCell>
                          <TableCell>₹{item.pricePerUnit}</TableCell>
                          <TableCell className="text-right">₹{item.totalPrice}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Totals */}
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-semibold">₹{(saleData.total / 1.05).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (5%):</span>
                    <span className="font-semibold">₹{(saleData.total - (saleData.total / 1.05)).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-xl font-bold">Grand Total:</span>
                    <span className="text-2xl font-bold text-blue-600">₹{saleData.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              {!isPaid && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="paymentMethod">Payment Method *</Label>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="card">Credit/Debit Card</SelectItem>
                        <SelectItem value="upi">UPI</SelectItem>
                        <SelectItem value="wallet">Digital Wallet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={handlePayment} className="w-full" size="lg">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Complete Payment
                  </Button>
                </div>
              )}

              {/* Action Buttons */}
              {isPaid && (
                <div className="flex gap-4">
                  <Button onClick={handlePrint} variant="outline" className="flex-1">
                    <Printer className="w-4 h-4 mr-2" />
                    Print Bill
                  </Button>
                  <Link to="/mis/sale" className="flex-1">
                    <Button className="w-full">New Sale</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Billing;
