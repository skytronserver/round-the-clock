import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2, ShoppingCart, Download, Printer } from 'lucide-react';
import { toast } from 'sonner';

const CartModal = () => {
  const { 
    state, 
    updateQuantity, 
    removeItem, 
    clearCart, 
    closeCart, 
    setCustomerInfo, 
    getTotalPrice 
  } = useCart();

  const [customerName, setCustomerName] = useState(state.customerInfo.name);
  const [customerPhone, setCustomerPhone] = useState(state.customerInfo.phone);
  const [showReceipt, setShowReceipt] = useState(false);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleCustomerInfoSubmit = () => {
    if (!customerName.trim() || !customerPhone.trim()) {
      toast.error('Please fill in both name and phone number');
      return;
    }

    setCustomerInfo({ name: customerName, phone: customerPhone });
    setShowReceipt(true);
    toast.success('Order confirmed! Receipt generated.');
  };
  const generateReceiptHTML = () => {
    const total = getTotalPrice();
    const currentDate = new Date().toLocaleString();
    
    return `
      <div style="width: 5cm; max-width: 5cm; font-family: monospace; font-size: 12px; line-height: 1.4; margin: 0; padding: 0; box-sizing: border-box;">
        <div style="text-align: center; margin-bottom: 10px;">
          <h2 style="margin: 0; font-size: 16px; font-weight: bold;">ROUND THE CLOCK</h2>
          <p style="margin: 2px 0; font-size: 10px;">Food Available 24/7</p>
          <p style="margin: 0; font-size: 10px;">Tel: +1-234-567-8900</p>
        </div>
        
        <div style="border-top: 1px dashed #000; border-bottom: 1px dashed #000; padding: 5px 0; margin: 5px 0;">
          <p style="margin: 0; font-size: 10px;">Date: ${currentDate}</p>
          <p style="margin: 0; font-size: 10px;">Customer: ${customerName}</p>
          <p style="margin: 0; font-size: 10px;">Phone: ${customerPhone}</p>
        </div>

        <div style="margin: 5px 0;">
          ${state.items.map(item => `
            <div style="margin-bottom: 10px;">
              <div style="display: flex; justify-content: space-between; font-weight: bold;">
                <span>${item.name}</span>
              </div>
              <div style="display: flex; justify-content: space-around; font-size: 10px;">
                <span>${item.quantity} x ${item.price}</span>
                <span>₹${(parseFloat(item.price.replace(/[^\d.]/g, '')) * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          `).join('')}
        </div>

        <div style="border-top: 1px dashed #000; padding: 5px 0; margin: 5px 0;">
          <div style="text-align: center; font-weight: bold;">
            <div style="font-size: 14px; margin-bottom: 3px;">TOTAL:</div>
            <div style="font-size: 16px;">₹${total.toFixed(2)}</div>
          </div>
        </div>

        <div style="text-align: center; margin-top: 5px; font-size: 10px;">
          <p style="margin: 0;">Thank you for your order!</p>
          <p style="margin: 0;">Visit us again soon!</p>
        </div>
      </div>
    `;
  };

  const handleDownloadReceipt = () => {
    const receiptHTML = generateReceiptHTML();
    const blob = new Blob([`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Receipt - Round The Clock</title>
        <style>
          body { margin: 0; padding: 0; }
          @media print {
            body { margin: 0; }
          }
        </style>
      </head>
      <body>
        ${receiptHTML}
      </body>
      </html>
    `], { type: 'text/html' });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${Date.now()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Receipt downloaded successfully!');
  };

  const handlePrintReceipt = () => {
    const receiptHTML = generateReceiptHTML();
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Print Receipt</title>
          <style>
            * { box-sizing: border-box; }
            body { 
              margin: 0; 
              padding: 0; 
              width: 5cm;
              max-width: 5cm;
              font-family: monospace;
            }
            @media print {
              body { 
                margin: 0; 
                padding: 0;
                width: 5cm;
                max-width: 5cm;
              }
              @page { 
                size: 5.5cm auto; 
                margin: 0; 
              }
            }
            @media screen {
              body {
                margin: 10px auto;
                border: 1px solid #ccc;
                background: white;
              }
            }
          </style>
        </head>
        <body>
          ${receiptHTML}
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
    toast.success('Receipt sent to printer!');
  };

  const handleNewOrder = () => {
    clearCart();
    setCustomerName('');
    setCustomerPhone('');
    setShowReceipt(false);
    closeCart();
    toast.success('Ready for new order!');
  };

  if (showReceipt) {
    return (
      <Dialog open={state.isCartOpen} onOpenChange={closeCart}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Order Receipt
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div 
              className="border rounded-lg p-4 bg-gray-50 text-sm max-h-max"
              style={{ height: 'max-content' }}
              dangerouslySetInnerHTML={{ __html: generateReceiptHTML() }}
            />

            <div className="flex gap-2">
              <Button onClick={handleDownloadReceipt} className="flex-1" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button onClick={handlePrintReceipt} className="flex-1" variant="outline">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
            </div>

            <Button onClick={handleNewOrder} className="w-full">
              New Order
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={state.isCartOpen} onOpenChange={closeCart}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Your Order ({state.items.length} items)
          </DialogTitle>
        </DialogHeader>

        {state.items.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingCart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Cart Items */}
            <div className="space-y-3">
              {state.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            {/* Total */}
            <div className="flex justify-between items-center font-bold text-lg">
              <span>Total:</span>
              <span>₹{getTotalPrice().toFixed(2)}</span>
            </div>

            <Separator />

            {/* Customer Information Form */}
            <div className="space-y-4">
              <h3 className="font-medium">Customer Information</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="customerName">Name *</Label>
                  <Input
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="customerPhone">Phone Number *</Label>
                  <Input
                    id="customerPhone"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4">
              <Button 
                variant="outline" 
                onClick={clearCart}
                className="flex-1"
              >
                Clear Cart
              </Button>
              <Button 
                onClick={handleCustomerInfoSubmit}
                className="flex-1"
                disabled={!customerName.trim() || !customerPhone.trim()}
              >
                Confirm Order
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CartModal;
