import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useOrders } from '@/contexts/OrderContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2, ShoppingCart, Download, Printer, Bluetooth } from 'lucide-react';
import { toast } from 'sonner';
import FeedbackForm from './FeedbackForm';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
  
  const { saveOrder } = useOrders();

  const [customerName, setCustomerName] = useState(state.customerInfo.name);
  const [customerPhone, setCustomerPhone] = useState(state.customerInfo.phone);
  const [showReceipt, setShowReceipt] = useState(false);
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [savedOrder, setSavedOrder] = useState<any>(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

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

    const customerInfo = { name: trimmedName, phone: trimmedPhone };
    setCustomerInfo(customerInfo);
    
    // Save the order to the database
    const order = saveOrder(customerInfo, state.items, getTotalPrice());
    setSavedOrder(order);
    
    setShowReceipt(true);
    toast.success(`Order No : ${order.orderNumber} confirmed! Receipt generated.`);
  };
  const generateReceiptHTML = () => {
    const total = getTotalPrice();
    const currentDate = new Date().toLocaleString();
    
    // Generate QR code URL for customer feedback
    const feedbackUrl = `${window.location.origin}/feedback?order=${savedOrder ? savedOrder.orderNumber : 'N/A'}`;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(feedbackUrl)}`;
    
    return `
      <div style="width: 100%; font-family: monospace; font-size: 12px; line-height: 1.4; margin: 0; padding: 0; box-sizing: border-box;">
        <div style="text-align: center; margin-bottom: 10px;">
          <img src="/lovable-uploads/LOKO.png" alt="Round The Clock Logo" style="height: 60px; width: auto; margin: 0 auto 5px auto; display: block;" />
          <p style="margin: 0; font-size: 10px;">Tel: 7576004477</p>
        </div>
        
        <div style="text-align: center; margin: 5px 0;">
          <div style="border-top: 1px solid #000; margin: 5px 0;"></div>
        </div>

        <div style="text-align: left; margin: 5px 0; padding-left: 0;">
          <p style="margin: 0; padding: 0; font-size: 10px;">Order No : ${savedOrder ? savedOrder.orderNumber : 'N/A'}</p>
          <p style="margin: 0; padding: 0; font-size: 10px;">Date: ${currentDate}</p>
          <p style="margin: 0; padding: 0; font-size: 10px;">Customer: ${customerName}</p>
          <p style="margin: 0; padding: 0; font-size: 10px;">Phone: ${customerPhone}</p>
        </div>

        <div style="text-align: center; margin: 5px 0;">
          <div style="border-top: 1px solid #000; margin: 5px 0;"></div>
        </div>

        <div style="margin: 5px 0; padding-left: 0;">
          ${state.items.map(item => {
            const itemPrice = parseFloat(item.price.replace(/[^\d.]/g, ''));
            const itemTotal = (itemPrice * item.quantity).toFixed(2);
            const line1 = item.name;
            const line2 = `${item.quantity} x ₹${itemPrice.toFixed(2)}`;
            const line2Spaces = ' '.repeat(Math.max(1, 32 - (line2.length + `₹${itemTotal}`.length)));
            
            return `
              <div style="margin-bottom: 5px; padding-left: 0;">
                <div style="font-weight: bold; margin: 0; padding: 0;">${line1}</div>
                <div style="font-size: 10px; margin: 0; padding: 0;">${line2}${line2Spaces}₹${itemTotal}</div>
              </div>
            `;
          }).join('')}
        </div>

        <div style="text-align: center; margin: 5px 0;">
          <div style="border-top: 1px solid #000; margin: 5px 0;"></div>
        </div>

        <div style="text-align: center; font-weight: bold; margin: 10px 0;">
          <div style="font-size: 20px;">TOTAL: ₹${total.toFixed(2)}</div>
        </div>

        <div style="text-align: center; margin: 10px 0;">
          <div style="border-top: 1px solid #000; margin: 5px 0;"></div>
        </div>

        <div style="text-align: center; margin: 5px 0; page-break-inside: avoid;">
          <p style="margin: 2px 0; font-weight: 900; font-size: 12px;">We'd love to hear from you!</p>
          <div style="margin: 5px 0;">
            <img src="${qrCodeUrl}" alt="Feedback QR Code" style="width: 60px; height: 60px; margin: 0 auto; display: block; page-break-inside: avoid;" />
          </div>
          <p style="margin: 2px 0; font-weight: bold; font-size: 10px; letter-spacing: 1px;">SCAN ME</p>
          <p style="margin: 0; font-size: 8px; color: #333;">for feedback & reviews</p>
        </div>
      </div>
    `;
  };

  const handleDownloadReceipt = async () => {
    try {
      toast.info('Generating PDF receipt...');
      
      // Create a temporary div with the receipt HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = generateReceiptHTML();
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.top = '-9999px';
      tempDiv.style.width = '58mm';
      tempDiv.style.maxWidth = '58mm';
      tempDiv.style.background = 'white';
      tempDiv.style.padding = '5mm';
      tempDiv.style.fontFamily = 'monospace';
      tempDiv.style.fontSize = '10px';
      tempDiv.style.lineHeight = '1.4';
      tempDiv.style.overflow = 'visible';
      tempDiv.style.height = 'auto';
      document.body.appendChild(tempDiv);

      // Wait a bit for images to load
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Convert HTML to canvas with better settings
      const canvas = await html2canvas(tempDiv, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: tempDiv.scrollWidth,
        height: tempDiv.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        windowWidth: tempDiv.scrollWidth,
        windowHeight: tempDiv.scrollHeight
      });

      // Remove temporary div
      document.body.removeChild(tempDiv);

      // Create PDF with dynamic height
      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = 58;
      const pdfHeight = Math.max(150, (canvas.height * pdfWidth) / canvas.width);
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [pdfWidth, pdfHeight]
      });

      // Calculate dimensions to fit the full content
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add image to PDF ensuring full content is included
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      // Download PDF
      const orderNumber = savedOrder ? savedOrder.orderNumber : Date.now();
      pdf.save(`receipt-${orderNumber}.pdf`);
      
      toast.success('Receipt PDF downloaded successfully!');
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to generate PDF. Please try again.');
    }
  };

  const generateSimpleLogo = () => {
    // Simple ASCII art logo for thermal printer
    return `
    ████████████████████
    ██   DELICIOUS    ██
    ██     FOOD       ██
    ████████████████████
    `;
  };

  // Convert image to ESC/POS bitmap format (reliable thermal printer version)
  const convertImageToBitmap = async (imageUrl: string): Promise<string> => {
    try {
      const ESC = '\x1B';
      const GS = '\x1D';
      
      return new Promise((resolve) => {
        const img = new Image();
        
        img.onload = () => {
          try {
            console.log(`Image loaded successfully: ${img.width}x${img.height}`);
            
            // Create canvas for processing
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            if (!ctx) {
              console.log('Canvas context failed');
              resolve('');
              return;
            }
            
            // Optimal size for thermal printer (58mm paper)
            const maxWidth = 180;
            const maxHeight = 80;
            
            // Calculate scale to fit within bounds
            const scale = Math.min(maxWidth / img.width, maxHeight / img.height, 1);
            const width = Math.floor(img.width * scale);
            const height = Math.floor(img.height * scale);
            
            console.log(`Canvas size: ${width}x${height}, scale: ${scale}`);
            
            // Set canvas size
            canvas.width = width;
            canvas.height = height;
            
            // Fill with white background (important for SVG)
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, width, height);
            
            // Draw the image
            ctx.drawImage(img, 0, 0, width, height);
            
            // Get image data
            const imageData = ctx.getImageData(0, 0, width, height);
            const pixels = imageData.data;
            
            console.log(`Image data extracted: ${pixels.length} bytes`);
            
            // Convert to ESC/POS bitmap
            let bitmapData = '';
            bitmapData += ESC + 'a' + '\x01'; // Center alignment
            
            // Calculate bitmap dimensions (must be multiple of 8 for width)
            const bitmapWidth = Math.ceil(width / 8) * 8;
            const bitmapHeight = height;
            const bytesPerLine = bitmapWidth / 8;
            
            // ESC/POS raster bitmap command
            bitmapData += GS + 'v0'; // GS v 0 (raster bitmap)
            bitmapData += String.fromCharCode(0); // Normal density
            bitmapData += String.fromCharCode(bytesPerLine & 0xFF); // Width in bytes (low)
            bitmapData += String.fromCharCode((bytesPerLine >> 8) & 0xFF); // Width in bytes (high)
            bitmapData += String.fromCharCode(bitmapHeight & 0xFF); // Height (low)
            bitmapData += String.fromCharCode((bitmapHeight >> 8) & 0xFF); // Height (high)
            
            // Convert pixels to bitmap data
            for (let y = 0; y < bitmapHeight; y++) {
              for (let x = 0; x < bitmapWidth; x += 8) {
                let byte = 0;
                
                for (let bit = 0; bit < 8; bit++) {
                  const pixelX = x + bit;
                  
                  if (pixelX < width && y < height) {
                    const pixelIndex = (y * width + pixelX) * 4;
                    const r = pixels[pixelIndex];
                    const g = pixels[pixelIndex + 1];
                    const b = pixels[pixelIndex + 2];
                    const a = pixels[pixelIndex + 3];
                    
                    // Convert to grayscale with alpha blending
                    const alpha = a / 255;
                    const gray = ((r * 0.299 + g * 0.587 + b * 0.114) * alpha) + (255 * (1 - alpha));
                    
                    // Threshold for black/white (lower = more black pixels)
                    if (gray < 180) {
                      byte |= (1 << (7 - bit));
                    }
                  }
                }
                
                bitmapData += String.fromCharCode(byte);
              }
            }
            
            console.log(`Logo bitmap generated: ${width}x${height}, ${bitmapData.length} bytes`);
            resolve(bitmapData);
            
          } catch (canvasError) {
            console.log('Canvas processing error:', canvasError);
            resolve('');
          }
        };
        
        img.onerror = (error) => {
          console.log('Image load error:', error);
          resolve('');
        };
        
        // Load the image (no CORS for local files)
        img.src = imageUrl;
      });
      
    } catch (error) {
      console.log('Bitmap conversion error:', error);
      return '';
    }
  };

  // Generate QR Code for customer feedback
  const generateQRCode = (orderNumber: string): string => {
    const ESC = '\x1B';
    const GS = '\x1D';
    
    // ESC/POS QR Code commands
    let qrData = '';
    qrData += ESC + 'a' + '\x01'; // Center alignment
    
    // QR Code data - feedback page URL with order number
    const qrContent = `${window.location.origin}/feedback?order=${orderNumber}`;
    
    // Set QR Code model (Model 2)
    qrData += GS + '(k\x04\x00\x31\x41\x32\x00'; // Set model 2
    
    // Set QR Code size (size 8)
    qrData += GS + '(k\x03\x00\x31\x43\x08'; // Set size to 8
    
    // Set error correction level (L = 48, M = 49, Q = 50, H = 51)
    qrData += GS + '(k\x03\x00\x31\x45\x31'; // Set error correction to M
    
    // Store QR Code data
    const dataLength = qrContent.length + 3;
    qrData += GS + '(k';
    qrData += String.fromCharCode(dataLength & 0xFF); // Length low byte
    qrData += String.fromCharCode((dataLength >> 8) & 0xFF); // Length high byte
    qrData += '\x31\x50\x30'; // Store QR data function
    qrData += qrContent;
    
    // Print QR Code
    qrData += GS + '(k\x03\x00\x31\x51\x30'; // Print stored QR Code
    qrData += '\x0A\x0A'; // Add line feeds after QR code
    
    return qrData;
  };

  const generateThermalPrintData = async (includeLogo: boolean = false, includeQR: boolean = false) => {
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
    
    // Print header with logo (always include logo and QR)
    try {
      const logoData = await convertImageToBitmap('/lovable-uploads/LOKO.png');
      
      if (logoData && logoData.length > 50) { // Check for substantial data
        console.log('Logo converted successfully, adding to print data');
        printData += logoData + LF;
        printData += ESC + 'a' + '\x01'; // Center alignment
        printData += 'ROUND THE CLOCK' + LF;
        printData += 'Tel: 7576004477' + LF;
        printData += LF;
      } else {
        console.log('Logo conversion returned empty or small data, using enhanced text header');
        // Enhanced text header when logo fails
        printData += ESC + 'a' + '\x01'; // Center alignment
        printData += '================================' + LF;
        printData += '||                            ||' + LF;
        printData += '||      ROUND THE CLOCK       ||' + LF;
        printData += '||     Delicious Food 24/7    ||' + LF;
        printData += '||                            ||' + LF;
        printData += '================================' + LF;
        printData += 'Tel: 7576004477' + LF;
        printData += LF;
      }
    } catch (error) {
      console.log('Logo processing error:', error);
      // Fallback to enhanced text header
      printData += ESC + 'a' + '\x01'; // Center alignment
      printData += '================================' + LF;
      printData += '||                            ||' + LF;
      printData += '||      ROUND THE CLOCK       ||' + LF;
      printData += '||     Delicious Food 24/7    ||' + LF;
      printData += '||                            ||' + LF;
      printData += '================================' + LF;
      printData += 'Tel: 7576004477' + LF;
      printData += LF;
    }
    
    // Separator line
    printData += '--------------------------------' + LF;
    
    // Date and customer info
    printData += ESC + 'a' + '\x00'; // Left alignment
    printData += `Order No : ${savedOrder ? savedOrder.orderNumber : 'N/A'}` + LF;
    printData += `Date: ${currentDate}` + LF;
    printData += `Customer: ${customerName}` + LF;
    printData += `Phone: ${customerPhone}` + LF;
    printData += '--------------------------------' + LF;
    
    // Items
    state.items.forEach(item => {
      const itemPrice = parseFloat(item.price.replace(/[^\d.]/g, ''));
      const itemTotal = (itemPrice * item.quantity).toFixed(2);
      
      printData += item.name + LF;
      printData += `${item.quantity} x Rs.${itemPrice.toFixed(2)}`;
      printData += ' '.repeat(Math.max(1, 32 - (`${item.quantity} x Rs.${itemPrice.toFixed(2)}` + `Rs.${itemTotal}`).length));
      printData += `Rs.${itemTotal}` + LF;
    });
    
    printData += '--------------------------------' + LF;
    
    // Total
    printData += ESC + 'a' + '\x01'; // Center alignment
    printData += ESC + '!' + '\x18'; // Double height and width
    printData += `TOTAL: Rs.${total.toFixed(2)}` + LF;
    printData += ESC + '!' + '\x00'; // Normal size
    printData += LF;
    
    // Footer
    printData += ESC + 'a' + '\x01'; // Center alignment
    printData += ESC + '!' + '\x18'; // Double height and width
    printData += ESC + 'E' + '\x01'; // Bold on
    printData += 'We\'d love to hear from you!' + LF;
    printData += ESC + 'E' + '\x00'; // Bold off
    printData += ESC + '!' + '\x00'; // Normal size
    printData += LF;
    
    // Add QR Code if requested
    if (includeQR && savedOrder) {
      printData += generateQRCode(savedOrder.orderNumber);
      printData += ESC + 'a' + '\x01'; // Center alignment
      printData += ESC + '!' + '\x38'; // Triple height and double width
      printData += ESC + 'E' + '\x01'; // Bold on
      printData += 'SCAN ME' + LF;
      printData += ESC + 'E' + '\x00'; // Bold off
      printData += ESC + '!' + '\x00'; // Normal size
    }
    
    printData += LF + LF;
    
    // Cut paper
    printData += GS + 'V' + '\x42' + '\x00';
    
    return printData;
  };

  const handleThermalPrint = async (includeLogo: boolean = false, includeQR: boolean = true) => {
    try {
      // Check if Web Bluetooth is supported
      if (!navigator.bluetooth) {
        toast.error('Bluetooth is not supported on this device. Please use Chrome or Edge browser.');
        return;
      }

      toast.info('Searching for thermal printers...');

      // Request Bluetooth device with broader compatibility
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: [
          '000018f0-0000-1000-8000-00805f9b34fb', // Generic printer service
          '0000180f-0000-1000-8000-00805f9b34fb', // Battery service
          '49535343-fe7d-4ae5-8fa9-9fafd205e455', // Common thermal printer service
        ]
      });

      toast.info(`Connecting to ${device.name || 'thermal printer'}...`);

      // Connect to GATT server
      const server = await device.gatt?.connect();
      if (!server) {
        throw new Error('Failed to connect to printer');
      }

      // Try to find a working service and characteristic
      let characteristic = null;
      const services = await server.getPrimaryServices();
      
      for (const service of services) {
        try {
          const characteristics = await service.getCharacteristics();
          for (const char of characteristics) {
            if (char.properties.write || char.properties.writeWithoutResponse) {
              characteristic = char;
              break;
            }
          }
          if (characteristic) break;
        } catch (e) {
          continue;
        }
      }

      if (!characteristic) {
        throw new Error('No writable characteristic found on printer');
      }

      toast.info('Generating receipt data...');

      // Generate simpler thermal print data (without complex logo processing)
      const printData = await generateSimpleThermalData(includeQR);
      const encoder = new TextEncoder();
      const data = encoder.encode(printData);

      toast.info('Sending data to printer...');

      // Send data to printer in smaller chunks
      const chunkSize = 20;
      for (let i = 0; i < data.length; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize);
        try {
          if (characteristic.properties.writeWithoutResponse) {
            await characteristic.writeValueWithoutResponse(chunk);
          } else {
            await characteristic.writeValue(chunk);
          }
          // Small delay between chunks
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch (writeError) {
          console.warn('Write error, continuing...', writeError);
        }
      }

      // Disconnect
      setTimeout(() => {
        server.disconnect();
      }, 1000);
      
      toast.success('Receipt sent to thermal printer successfully!');

    } catch (error) {
      console.error('Thermal print error:', error);
      if (error instanceof Error) {
        if (error.message.includes('User cancelled') || error.message.includes('cancelled')) {
          toast.info('Bluetooth connection cancelled by user');
        } else if (error.message.includes('not found')) {
          toast.error('No compatible thermal printer found. Make sure your printer is on and in pairing mode.');
        } else {
          toast.error(`Thermal print failed: ${error.message}`);
        }
      } else {
        toast.error('Failed to connect to thermal printer. Please check if the printer is on and nearby.');
      }
    }
  };

  // Simplified thermal print data generation
  const generateSimpleThermalData = async (includeQR: boolean = false) => {
    const total = getTotalPrice();
    const currentDate = new Date().toLocaleString();
    
    // ESC/POS commands for thermal printer
    const ESC = '\x1B';
    const GS = '\x1D';
    const LF = '\x0A';
    
    let printData = '';
    
    // Initialize printer
    printData += ESC + '@'; // Initialize
    printData += ESC + 'a' + '\x01'; // Center alignment
    
    // Simple header (no complex logo processing)
    printData += ESC + '!' + '\x08'; // Normal height, double width
    printData += 'Delicious Food' + LF;
    printData += ESC + '!' + '\x38'; // Triple height, double width
    printData += ESC + 'E' + '\x01'; // Bold on
    printData += 'ROUND THE CLOCK' + LF;
    printData += ESC + 'E' + '\x00'; // Bold off
    printData += ESC + '!' + '\x00'; // Normal size
    printData += 'Tel: 7576004477' + LF;
    printData += LF;
    
    // Separator line
    printData += '--------------------------------' + LF;
    
    // Date and customer info
    printData += ESC + 'a' + '\x00'; // Left alignment
    printData += `Order No : ${savedOrder ? savedOrder.orderNumber : 'N/A'}` + LF;
    printData += `Date: ${currentDate}` + LF;
    printData += `Customer: ${customerName}` + LF;
    printData += `Phone: ${customerPhone}` + LF;
    printData += '--------------------------------' + LF;
    
    // Items
    state.items.forEach(item => {
      const itemPrice = parseFloat(item.price.replace(/[^\d.]/g, ''));
      const itemTotal = (itemPrice * item.quantity).toFixed(2);
      
      printData += item.name + LF;
      printData += `${item.quantity} x Rs.${itemPrice.toFixed(2)}`;
      printData += ' '.repeat(Math.max(1, 32 - (`${item.quantity} x Rs.${itemPrice.toFixed(2)}` + `Rs.${itemTotal}`).length));
      printData += `Rs.${itemTotal}` + LF;
    });
    
    printData += '--------------------------------' + LF;
    
    // Total
    printData += ESC + 'a' + '\x01'; // Center alignment
    printData += ESC + '!' + '\x18'; // Double height and width
    printData += `TOTAL: Rs.${total.toFixed(2)}` + LF;
    printData += ESC + '!' + '\x00'; // Normal size
    printData += LF;
    
    // Footer
    printData += ESC + 'a' + '\x01'; // Center alignment
    printData += ESC + '!' + '\x18'; // Double height and width
    printData += ESC + 'E' + '\x01'; // Bold on
    printData += 'We\'d love to hear from you!' + LF;
    printData += ESC + 'E' + '\x00'; // Bold off
    printData += ESC + '!' + '\x00'; // Normal size
    printData += LF;
    
    // Add QR code (if supported by printer)
    if (includeQR && savedOrder) {
      printData += generateQRCode(savedOrder.orderNumber);
      printData += ESC + 'a' + '\x01'; // Center alignment
      printData += ESC + '!' + '\x38'; // Triple height and double width
      printData += ESC + 'E' + '\x01'; // Bold on
      printData += 'SCAN ME' + LF;
      printData += ESC + 'E' + '\x00'; // Bold off
      printData += ESC + '!' + '\x00'; // Normal size
    }
    
    printData += LF + LF + LF;
    
    // Cut paper
    printData += GS + 'V' + '\x42' + '\x00';
    
    return printData;
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
            * { 
              box-sizing: border-box; 
              margin: 0;
              padding: 0;
            }
            html, body { 
              width: 100%;
              height: auto;
              font-family: monospace;
              font-size: 12px;
              line-height: 1.4;
            }
            body { 
              padding: 10px;
              background: white;
            }
            @media print {
              html, body { 
                width: 58mm;
                margin: 0;
                padding: 2mm;
                font-size: 9px;
                overflow: visible !important;
                height: auto !important;
              }
              @page { 
                size: 58mm auto;
                margin: 1mm;
                overflow: visible;
              }
              * {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
                print-color-adjust: exact !important;
                overflow: visible !important;
                page-break-inside: avoid;
              }
              div {
                margin-left: 0 !important;
                padding-left: 0 !important;
                overflow: visible !important;
              }
              img {
                max-width: 40mm !important;
                height: auto !important;
                page-break-inside: avoid;
              }
            }
            @media screen {
              body {
                max-width: 58mm;
                margin: 10px auto;
                border: 1px solid #ccc;
                background: white;
                padding: 10px;
              }
            }
            img {
              max-width: 100% !important;
              height: auto !important;
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

  const handleOrderComplete = () => {
    // Clear everything and close cart
    clearCart();
    setCustomerName('');
    setCustomerPhone('');
    setShowReceipt(false);
    setSavedOrder(null);
    closeCart();
    toast.success('Order completed successfully!');
    // Scroll to home section (same behavior as navbar Home link)
    const homeSection = document.querySelector('#home');
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback: scroll to top if #home section doesn't exist
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNewOrder = () => {
    // Clear everything and close cart
    clearCart();
    setCustomerName('');
    setCustomerPhone('');
    setShowReceipt(false);
    setSavedOrder(null);
    closeCart();
    toast.success('Ready for new order!');
  };

  const handleFeedbackComplete = () => {
    setShowFeedbackForm(false);
    clearCart();
    setCustomerName('');
    setCustomerPhone('');
    setShowReceipt(false);
    setSavedOrder(null);
    closeCart();
    toast.success('Thank you for your feedback!');
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
              <div className="space-y-2">
                <Button onClick={() => handleThermalPrint(true, true)} className="w-full" variant="outline">
                  <Bluetooth className="h-4 w-4 mr-2" />
                  Print to Thermal Printer
                </Button>
              </div>
            </div>

            <Button onClick={handleOrderComplete} className="w-full">
              Order Complete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
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
      
      {/* Feedback Form */}
      {showFeedbackForm && savedOrder && (
        <FeedbackForm
          isOpen={showFeedbackForm}
          onClose={handleFeedbackComplete}
          orderData={{
            orderId: savedOrder.id,
            orderNumber: savedOrder.orderNumber,
            customerName: savedOrder.customerInfo.name,
            customerPhone: savedOrder.customerInfo.phone
          }}
        />
      )}
    </>
  );
};

export default CartModal;
