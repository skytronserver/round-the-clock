import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PurchaseItem {
  id: string;
  itemName: string;
  quantity: string;
  unit: string;
  pricePerUnit: string;
  totalPrice: string;
}

// Available Raw Ingredients (configured in Settings)
const availableRawIngredients = [
  { name: 'Tomatoes', unit: 'kg', category: 'vegetables' },
  { name: 'Onions', unit: 'kg', category: 'vegetables' },
  { name: 'Potatoes', unit: 'kg', category: 'vegetables' },
  { name: 'Rice', unit: 'kg', category: 'grains' },
  { name: 'Chicken', unit: 'kg', category: 'meat' },
  { name: 'Milk', unit: 'l', category: 'dairy' },
  { name: 'Paneer', unit: 'kg', category: 'dairy' },
  { name: 'Ginger', unit: 'kg', category: 'spices' },
  { name: 'Garlic', unit: 'kg', category: 'spices' },
  { name: 'Cooking Oil', unit: 'l', category: 'oils' },
  { name: 'Salt', unit: 'kg', category: 'spices' },
  { name: 'Sugar', unit: 'kg', category: 'others' },
  { name: 'Flour', unit: 'kg', category: 'grains' },
  { name: 'Spices Mix', unit: 'kg', category: 'spices' },
  { name: 'Bell Peppers', unit: 'kg', category: 'vegetables' },
  { name: 'Mushrooms', unit: 'kg', category: 'vegetables' },
  { name: 'Cheese', unit: 'kg', category: 'dairy' },
  { name: 'Yogurt', unit: 'kg', category: 'dairy' },
  { name: 'Lemon', unit: 'kg', category: 'fruits' },
  { name: 'Coriander', unit: 'kg', category: 'vegetables' },
];

// Available Ready-to-Sale Items (configured in Settings)
const availableReadyToSaleItems = [
  { name: 'Coca-Cola', unit: 'pcs', category: 'beverages' },
  { name: 'Pepsi', unit: 'pcs', category: 'beverages' },
  { name: 'Sprite', unit: 'pcs', category: 'beverages' },
  { name: 'Mineral Water', unit: 'pcs', category: 'beverages' },
  { name: 'Packaged Juices', unit: 'pcs', category: 'beverages' },
  { name: 'Potato Chips', unit: 'pack', category: 'snacks' },
  { name: 'Cookies', unit: 'pack', category: 'snacks' },
  { name: 'Chocolate Bars', unit: 'pcs', category: 'snacks' },
  { name: 'Ketchup Sachets', unit: 'pack', category: 'condiments' },
  { name: 'Mayonnaise Sachets', unit: 'pack', category: 'condiments' },
  { name: 'Frozen French Fries', unit: 'kg', category: 'frozen' },
  { name: 'Ice Cream Cups', unit: 'pcs', category: 'frozen' },
];

const CompanyPurchase = () => {
  const { toast } = useToast();
  const [purchaseType, setPurchaseType] = useState<'ready-to-sale' | 'raw-ingredients' | ''>('');
  const [formData, setFormData] = useState({
    purchaseDate: new Date().toISOString().split('T')[0],
    vendorName: '',
    invoiceNumber: '',
    paymentMethod: '',
  });
  const [items, setItems] = useState<PurchaseItem[]>([
    { id: '1', itemName: '', quantity: '', unit: '', pricePerUnit: '', totalPrice: '0' }
  ]);

  const getAvailableItems = () => {
    return purchaseType === 'raw-ingredients' ? availableRawIngredients : availableReadyToSaleItems;
  };

  const handleAddItem = () => {
    const newItem: PurchaseItem = {
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

  const handleItemChange = (id: string, field: keyof PurchaseItem, value: string) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // Auto-populate unit when item is selected
        if (field === 'itemName') {
          const selectedItem = getAvailableItems().find(availableItem => availableItem.name === value);
          if (selectedItem) {
            updatedItem.unit = selectedItem.unit;
          }
        }
        
        // Calculate total price
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

  const calculateGrandTotal = () => {
    return items.reduce((sum, item) => sum + parseFloat(item.totalPrice || '0'), 0).toFixed(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!purchaseType) {
      toast({
        title: "Error",
        description: "Please select a purchase type",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Purchase Created",
      description: `Company purchase for ${purchaseType === 'ready-to-sale' ? 'Ready to Sale' : 'Raw Ingredients'} has been successfully created.`,
    });

    // Reset form
    setPurchaseType('');
    setFormData({
      purchaseDate: new Date().toISOString().split('T')[0],
      vendorName: '',
      invoiceNumber: '',
      paymentMethod: '',
    });
    setItems([{ id: '1', itemName: '', quantity: '', unit: '', pricePerUnit: '', totalPrice: '0' }]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

        <div className="max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Company Purchase</CardTitle>
              <CardDescription>Create centralized company-level purchases</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Purchase Type Selection */}
                <div>
                  <Label htmlFor="purchaseType">Purchase Type *</Label>
                  <Select
                    value={purchaseType}
                    onValueChange={(value: 'ready-to-sale' | 'raw-ingredients') => setPurchaseType(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select purchase type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ready-to-sale">Ready to Sale</SelectItem>
                      <SelectItem value="raw-ingredients">Raw Ingredients</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="purchaseDate">Purchase Date *</Label>
                    <Input
                      id="purchaseDate"
                      name="purchaseDate"
                      type="date"
                      value={formData.purchaseDate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="vendorName">Vendor Name *</Label>
                    <Input
                      id="vendorName"
                      name="vendorName"
                      value={formData.vendorName}
                      onChange={handleChange}
                      required
                      placeholder="Enter vendor name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                  <div>
                    <Label htmlFor="paymentMethod">Payment Method *</Label>
                    <Select
                      value={formData.paymentMethod}
                      onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="card">Card</SelectItem>
                        <SelectItem value="upi">UPI</SelectItem>
                        <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                        <SelectItem value="credit">Credit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Items Section */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-lg font-semibold">Purchase Items</Label>
                    <Button type="button" onClick={handleAddItem} variant="outline" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Item
                    </Button>
                  </div>

                  {items.map((item, index) => (
                    <Card key={item.id} className="bg-gray-50">
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                          <div className="md:col-span-2">
                            <Label htmlFor={`itemName-${item.id}`}>
                              {purchaseType === 'raw-ingredients' ? 'Raw Ingredient' : 'Ready-to-Sale Item'} *
                            </Label>
                            <Select
                              value={item.itemName}
                              onValueChange={(value) => handleItemChange(item.id, 'itemName', value)}
                              disabled={!purchaseType}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder={
                                  !purchaseType 
                                    ? "Select purchase type first" 
                                    : `Select ${purchaseType === 'raw-ingredients' ? 'ingredient' : 'item'}`
                                } />
                              </SelectTrigger>
                              <SelectContent>
                                {getAvailableItems().map((availableItem) => (
                                  <SelectItem key={availableItem.name} value={availableItem.name}>
                                    {availableItem.name} ({availableItem.unit}) - {availableItem.category}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor={`quantity-${item.id}`}>Quantity *</Label>
                            <Input
                              id={`quantity-${item.id}`}
                              type="number"
                              step="0.01"
                              value={item.quantity}
                              onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
                              required
                              placeholder="Qty"
                            />
                          </div>

                          <div>
                            <Label htmlFor={`unit-${item.id}`}>Unit</Label>
                            <Input
                              id={`unit-${item.id}`}
                              value={item.unit}
                              disabled
                              className="bg-gray-100"
                              placeholder="Auto-filled"
                            />
                          </div>

                          <div>
                            <Label htmlFor={`pricePerUnit-${item.id}`}>Price/Unit *</Label>
                            <Input
                              id={`pricePerUnit-${item.id}`}
                              type="number"
                              step="0.01"
                              value={item.pricePerUnit}
                              onChange={(e) => handleItemChange(item.id, 'pricePerUnit', e.target.value)}
                              required
                              placeholder="Price"
                            />
                          </div>

                          <div className="flex items-end gap-2">
                            <div className="flex-1">
                              <Label>Total</Label>
                              <Input
                                value={`₹${item.totalPrice}`}
                                disabled
                                className="bg-gray-100"
                              />
                            </div>
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
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Grand Total */}
                <div className="flex justify-end">
                  <Card className="w-64 bg-blue-50">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Grand Total:</span>
                        <span className="text-2xl font-bold text-blue-600">₹{calculateGrandTotal()}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Create Purchase
                  </Button>
                  <Link to="/mis/purchase">
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

export default CompanyPurchase;
