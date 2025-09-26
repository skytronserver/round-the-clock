import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2, ShoppingCart, Download, Printer, Bluetooth } from 'lucide-react';
import { toast } from 'sonner';

// Web Bluetooth API type declarations
declare global {
  interface Navigator {
    bluetooth?: {
      requestDevice(options: any): Promise<any>;
    };
  }
}

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
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const validateName = (name: string) => {
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    return nameRegex.test(name.trim());
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile number format
    return phoneRegex.test(phone.trim());
  };

  const handleNameChange = (value: string) => {
    setCustomerName(value);
    if (value.trim() && !validateName(value)) {
      setNameError('Name must be 2-50 characters, letters only');
    } else {
      setNameError('');
    }
  };

  const handlePhoneChange = (value: string) => {
    setCustomerPhone(value);
    if (value.trim() && !validatePhone(value)) {
      setPhoneError('Enter a valid 10-digit mobile number starting with 6-9');
    } else {
      setPhoneError('');
    }
  };

  const handleCustomerInfoSubmit = () => {
    const trimmedName = customerName.trim();
    const trimmedPhone = customerPhone.trim();

    if (!trimmedName || !trimmedPhone) {
      toast.error('Please fill in both name and phone number');
      return;
    }

    if (!validateName(trimmedName)) {
      toast.error('Please enter a valid name (2-50 characters, letters only)');
      return;
    }

    if (!validatePhone(trimmedPhone)) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }

    setCustomerInfo({ name: trimmedName, phone: trimmedPhone });
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

  const generateThermalPrintData = () => {
    const total = getTotalPrice();
    const currentDate = new Date().toLocaleString();
    
    // ESC/POS commands for thermal printer
    const ESC = '\x1B';
    const GS = '\x1D';
    const LF = '\x0A';
    const CR = '\x0D';
    
    let printData = '';
    
    // Initialize printer
    printData += ESC + '@'; // Initialize
    printData += ESC + 'a' + '\x01'; // Center alignment
    
    // Header
    printData += ESC + '!' + '\x18'; // Double height and width
    printData += 'ROUND THE CLOCK' + LF;
    printData += ESC + '!' + '\x00'; // Normal size
    printData += 'Food Available 24/7' + LF;
    printData += 'Tel: +1-234-567-8900' + LF;
    printData += LF;
    
    // Separator line
    printData += '--------------------------------' + LF;
    
    // Date and customer info
    printData += ESC + 'a' + '\x00'; // Left alignment
    printData += `Date: ${currentDate}` + LF;
    printData += `Customer: ${customerName}` + LF;
    printData += `Phone: ${customerPhone}` + LF;
    printData += '--------------------------------' + LF;
    
    // Items
    state.items.forEach(item => {
      const itemPrice = parseFloat(item.price.replace(/[^\d.]/g, ''));
      const itemTotal = (itemPrice * item.quantity).toFixed(2);
      
      printData += item.name + LF;
      printData += `${item.quantity} x ${item.price}`;
      printData += ' '.repeat(Math.max(1, 32 - (`${item.quantity} x ${item.price}` + `₹${itemTotal}`).length));
      printData += `₹${itemTotal}` + LF;
    });
    
    printData += '--------------------------------' + LF;
    
    // Total
    printData += ESC + 'a' + '\x01'; // Center alignment
    printData += ESC + '!' + '\x18'; // Double height and width
    printData += 'TOTAL:' + LF;
    printData += `₹${total.toFixed(2)}` + LF;
    printData += ESC + '!' + '\x00'; // Normal size
    printData += LF;
    
    // Footer
    printData += 'Thank you for your order!' + LF;
    printData += 'Visit us again soon!' + LF;
    printData += LF + LF + LF;
    
    // Cut paper
    printData += GS + 'V' + '\x42' + '\x00';
    
    return printData;
  };

  const handleThermalPrint = async () => {
    try {
      // Check if Web Bluetooth is supported
      if (!navigator.bluetooth) {
        toast.error('Bluetooth is not supported on this device');
        return;
      }

      // Request Bluetooth device
      const device = await navigator.bluetooth.requestDevice({
        filters: [
          { services: ['000018f0-0000-1000-8000-00805f9b34fb'] }, // Generic printer service
          { namePrefix: 'POS' },
          { namePrefix: 'Thermal' },
          { namePrefix: 'Receipt' }
        ],
        optionalServices: ['000018f0-0000-1000-8000-00805f9b34fb']
      });

      toast.info('Connecting to thermal printer...');

      // Connect to GATT server
      const server = await device.gatt?.connect();
      if (!server) {
        throw new Error('Failed to connect to printer');
      }

      // Get service and characteristic
      const service = await server.getPrimaryService('000018f0-0000-1000-8000-00805f9b34fb');
      const characteristic = await service.getCharacteristic('00002af1-0000-1000-8000-00805f9b34fb');

      // Generate thermal print data
      const printData = generateThermalPrintData();
      const encoder = new TextEncoder();
      const data = encoder.encode(printData);

      // Send data to printer in chunks (thermal printers have limited buffer)
      const chunkSize = 20;
      for (let i = 0; i < data.length; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize);
        await characteristic.writeValue(chunk);
        // Small delay between chunks
        await new Promise(resolve => setTimeout(resolve, 50));
      }

      // Disconnect
      server.disconnect();
      toast.success('Receipt printed successfully on thermal printer!');

    } catch (error) {
      console.error('Thermal print error:', error);
      if (error instanceof Error) {
        if (error.message.includes('User cancelled')) {
          toast.info('Bluetooth connection cancelled');
        } else {
          toast.error(`Thermal print failed: ${error.message}`);
        }
      } else {
        toast.error('Failed to print on thermal printer');
      }
    }
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

            <div className="space-y-2">
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
              <Button onClick={handleThermalPrint} className="w-full" variant="outline">
                <Bluetooth className="h-4 w-4 mr-2" />
                Print to Thermal Printer (Bluetooth)
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
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Enter your name"
                    className={nameError ? "border-red-500" : ""}
                    required
                  />
                  {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
                </div>
                <div>
                  <Label htmlFor="customerPhone">Phone Number *</Label>
                  <Input
                    id="customerPhone"
                    value={customerPhone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="Enter 10-digit mobile number"
                    className={phoneError ? "border-red-500" : ""}
                    maxLength={10}
                    required
                  />
                  {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
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
                disabled={!customerName.trim() || !customerPhone.trim() || !!nameError || !!phoneError}
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
