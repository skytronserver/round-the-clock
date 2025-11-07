import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Truck, Save, Plus, Trash2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface DispatchItem {
  id: string;
  itemName: string;
  quantity: string;
  unit: string;
  availableStock: number;
}

// Available items from company inventory (Item Mix + Ready-Made Items)
const availableItemMix = [
  { name: 'Pizza Sauce', unit: 'l', available: 150, type: 'Item Mix' },
  { name: 'Biryani Mix', unit: 'kg', available: 200, type: 'Item Mix' },
  { name: 'Curry Base', unit: 'kg', available: 80, type: 'Item Mix' },
  { name: 'Tandoori Masala', unit: 'kg', available: 150, type: 'Item Mix' },
  { name: 'Naan Dough', unit: 'kg', available: 120, type: 'Item Mix' },
  { name: 'Pizza Base', unit: 'pcs', available: 90, type: 'Item Mix' },
  { name: 'Marinated Chicken', unit: 'kg', available: 50, type: 'Item Mix' },
  { name: 'Gravy Base', unit: 'l', available: 180, type: 'Item Mix' },
];

const availableReadyMadeItems = [
  { name: 'Coca-Cola', unit: 'bottles', available: 240, type: 'Ready-Made' },
  { name: 'Pepsi', unit: 'bottles', available: 180, type: 'Ready-Made' },
  { name: 'Sprite', unit: 'bottles', available: 220, type: 'Ready-Made' },
  { name: 'Fanta', unit: 'bottles', available: 160, type: 'Ready-Made' },
  { name: 'Packaged Orange Juice', unit: 'bottles', available: 80, type: 'Ready-Made' },
  { name: 'Packaged Apple Juice', unit: 'bottles', available: 90, type: 'Ready-Made' },
  { name: 'Mineral Water', unit: 'bottles', available: 400, type: 'Ready-Made' },
  { name: 'Iced Tea', unit: 'bottles', available: 120, type: 'Ready-Made' },
];

const availableCompleteItems = [
  { name: 'Margherita Pizza', unit: 'pcs', available: 50, type: 'Complete Item' },
  { name: 'Pepperoni Pizza', unit: 'pcs', available: 45, type: 'Complete Item' },
  { name: 'Chicken Biryani', unit: 'pcs', available: 80, type: 'Complete Item' },
  { name: 'Mutton Biryani', unit: 'pcs', available: 40, type: 'Complete Item' },
  { name: 'Butter Chicken', unit: 'pcs', available: 60, type: 'Complete Item' },
  { name: 'Paneer Tikka Masala', unit: 'pcs', available: 55, type: 'Complete Item' },
  { name: 'Tandoori Chicken', unit: 'pcs', available: 35, type: 'Complete Item' },
  { name: 'Naan Bread Pack', unit: 'packs', available: 100, type: 'Complete Item' },
];

const allAvailableItems = [...availableItemMix, ...availableCompleteItems, ...availableReadyMadeItems];

const Dispatch = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    dispatchDate: new Date().toISOString().split('T')[0],
    dispatchTime: '',
    fromLocation: '',
    toLocation: '',
    vehicleNumber: '',
    driverName: '',
    driverPhone: '',
    remarks: '',
  });

  const [items, setItems] = useState<DispatchItem[]>([
    { id: '1', itemName: '', quantity: '', unit: '', availableStock: 0 },
  ]);

  const handleAddItem = () => {
    const newItem: DispatchItem = {
      id: Date.now().toString(),
      itemName: '',
      quantity: '',
      unit: '',
      availableStock: 0,
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleItemChange = (id: string, field: keyof DispatchItem, value: string) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // Update available stock and unit when item is selected
        if (field === 'itemName') {
          const selectedItem = allAvailableItems.find(i => i.name === value);
          if (selectedItem) {
            updatedItem.availableStock = selectedItem.available;
            updatedItem.unit = selectedItem.unit;
          }
        }
        
        return updatedItem;
      }
      return item;
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trackingNumber = '#DISP' + Date.now().toString().slice(-6);
    
    toast({
      title: "Dispatch Completed",
      description: `Items dispatched to ${formData.toLocation}. Tracking: ${trackingNumber}`,
    });

    // Reset form
    setFormData({
      dispatchDate: new Date().toISOString().split('T')[0],
      dispatchTime: '',
      fromLocation: '',
      toLocation: '',
      vehicleNumber: '',
      driverName: '',
      driverPhone: '',
      remarks: '',
    });
    setItems([{ id: '1', itemName: '', quantity: '', unit: '', availableStock: 0 }]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-cyan-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="mb-8">
          <Link to="/mis/inventory/company/ready-made" className="inline-flex items-center text-cyan-600 hover:text-cyan-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Ready-Made Inventory
          </Link>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-cyan-100 p-3 rounded-lg">
                  <Truck className="w-8 h-8 text-cyan-600" />
                </div>
                <div>
                  <CardTitle className="text-3xl">Dispatch Items to Outlets</CardTitle>
                  <CardDescription>Send item mixes, complete items, and ready-made items to outlets</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Dispatch Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="dispatchDate">Dispatch Date *</Label>
                    <Input
                      id="dispatchDate"
                      name="dispatchDate"
                      type="date"
                      value={formData.dispatchDate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="dispatchTime">Dispatch Time *</Label>
                    <Input
                      id="dispatchTime"
                      name="dispatchTime"
                      type="time"
                      value={formData.dispatchTime}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Location Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fromLocation">From Location *</Label>
                    <Select
                      value={formData.fromLocation}
                      onValueChange={(value) => setFormData({ ...formData, fromLocation: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="centralized">Centralized Facility</SelectItem>
                        <SelectItem value="cold-storage">Cold Storage</SelectItem>
                        <SelectItem value="warehouse">Central Warehouse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="toLocation">To Location *</Label>
                    <Select
                      value={formData.toLocation}
                      onValueChange={(value) => setFormData({ ...formData, toLocation: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select destination" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main">Main Branch</SelectItem>
                        <SelectItem value="downtown">Downtown Branch</SelectItem>
                        <SelectItem value="airport">Airport Branch</SelectItem>
                        <SelectItem value="mall">Mall Branch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Vehicle and Driver Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="vehicleNumber">Vehicle Number *</Label>
                    <Input
                      id="vehicleNumber"
                      name="vehicleNumber"
                      value={formData.vehicleNumber}
                      onChange={handleChange}
                      required
                      placeholder="e.g., MH-01-AB-1234"
                    />
                  </div>

                  <div>
                    <Label htmlFor="driverName">Driver Name *</Label>
                    <Input
                      id="driverName"
                      name="driverName"
                      value={formData.driverName}
                      onChange={handleChange}
                      required
                      placeholder="Enter driver name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="driverPhone">Driver Phone *</Label>
                    <Input
                      id="driverPhone"
                      name="driverPhone"
                      value={formData.driverPhone}
                      onChange={handleChange}
                      required
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                {/* Items to Dispatch */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-lg font-semibold">Items to Dispatch</Label>
                    <Button type="button" onClick={handleAddItem} variant="outline" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Item
                    </Button>
                  </div>

                  {items.map((item) => (
                    <Card key={item.id} className="bg-gray-50">
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                          <div className="md:col-span-2">
                            <Label htmlFor={`itemName-${item.id}`}>Item Name *</Label>
                            <Select
                              value={item.itemName}
                              onValueChange={(value) => handleItemChange(item.id, 'itemName', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select item" />
                              </SelectTrigger>
                              <SelectContent>
                                {allAvailableItems.map((item) => (
                                  <SelectItem key={item.name} value={item.name}>
                                    [{item.type}] {item.name} (Available: {item.available} {item.unit})
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
                              step="1"
                              value={item.quantity}
                              onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
                              required
                              max={item.availableStock}
                              placeholder="Qty"
                            />
                          </div>

                          <div>
                            <Label>Unit</Label>
                            <Input
                              value={item.unit}
                              disabled
                              className="bg-gray-100"
                              placeholder="-"
                            />
                          </div>

                          <div className="flex items-end">
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
                        {item.availableStock > 0 && (
                          <p className="text-sm text-gray-600 mt-2">
                            Available stock: {item.availableStock} {item.unit}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Summary Card */}
                <Card className="bg-cyan-50 border-cyan-200">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Total Items</p>
                        <p className="text-2xl font-bold text-cyan-600">{items.length}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Weight</p>
                        <p className="text-2xl font-bold text-cyan-600">
                          {items.reduce((sum, item) => sum + parseFloat(item.quantity), 0)} kg
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Remarks */}
                <div>
                  <Label htmlFor="remarks">Dispatch Remarks</Label>
                  <Textarea
                    id="remarks"
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                    placeholder="Enter any special instructions or remarks"
                    rows={3}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Complete Dispatch
                  </Button>
                  <Link to="/mis/inventory">
                    <Button type="button" variant="outline">
                      Back to Inventory
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

export default Dispatch;
