import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Plus, Edit, Trash2, Eye, Play, Pause } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface OutletDiscount {
  id: string;
  discountName: string;
  discountType: 'percentage' | 'fixed' | 'bogo';
  discountValue: number;
  outlets: string[];
  applicableItems: string[];
  customerType: 'all' | 'new' | 'existing' | 'vip';
  minOrderValue: number;
  maxDiscount: number;
  maxUsagePerCustomer: number;
  totalUsageLimit: number;
  status: 'active' | 'inactive' | 'scheduled';
  totalUsed: number;
  description: string;
  validFrom: string;
  validUntil: string;
  locationSpecificRules: {
    outlet: string;
    customDiscount?: number;
    customMinOrder?: number;
    customMaxDiscount?: number;
  }[];
}

const OutletBasedDiscounts = () => {
  const { toast } = useToast();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState<OutletDiscount | null>(null);

  const [formData, setFormData] = useState({
    discountName: '',
    discountType: 'percentage' as 'percentage' | 'fixed' | 'bogo',
    discountValue: '',
    outlets: [] as string[],
    applicableItems: [] as string[],
    customerType: 'all' as 'all' | 'new' | 'existing' | 'vip',
    minOrderValue: '',
    maxDiscount: '',
    maxUsagePerCustomer: '',
    totalUsageLimit: '',
    description: '',
    validFrom: '',
    validUntil: '',
    locationSpecificRules: [] as any[]
  });

  // Sample data
  const [outletDiscounts, setOutletDiscounts] = useState<OutletDiscount[]>([
    {
      id: '1',
      discountName: 'Mall Branch Grand Opening',
      discountType: 'percentage',
      discountValue: 30,
      outlets: ['Mall Branch'],
      applicableItems: ['All Items'],
      customerType: 'all',
      minOrderValue: 500,
      maxDiscount: 300,
      maxUsagePerCustomer: 1,
      totalUsageLimit: 1000,
      status: 'active',
      totalUsed: 234,
      description: '30% off for mall branch grand opening celebration',
      validFrom: '2024-11-01',
      validUntil: '2024-11-30',
      locationSpecificRules: []
    },
    {
      id: '2',
      discountName: 'Airport Express Discount',
      discountType: 'fixed',
      discountValue: 100,
      outlets: ['Airport Branch'],
      applicableItems: ['Quick Bites', 'Beverages'],
      customerType: 'all',
      minOrderValue: 300,
      maxDiscount: 100,
      maxUsagePerCustomer: 3,
      totalUsageLimit: 500,
      status: 'active',
      totalUsed: 89,
      description: 'Flat ₹100 off for airport travelers',
      validFrom: '2024-11-01',
      validUntil: '2024-12-31',
      locationSpecificRules: []
    },
    {
      id: '3',
      discountName: 'Downtown Lunch Special',
      discountType: 'percentage',
      discountValue: 25,
      outlets: ['Downtown Branch'],
      applicableItems: ['Main Course', 'Combo Meals'],
      customerType: 'existing',
      minOrderValue: 400,
      maxDiscount: 200,
      maxUsagePerCustomer: 5,
      totalUsageLimit: 2000,
      status: 'active',
      totalUsed: 156,
      description: '25% off for existing customers at downtown location',
      validFrom: '2024-11-01',
      validUntil: '2024-12-15',
      locationSpecificRules: []
    },
    {
      id: '4',
      discountName: 'Multi-Outlet VIP Discount',
      discountType: 'percentage',
      discountValue: 20,
      outlets: ['Main Branch', 'Mall Branch', 'Downtown Branch'],
      applicableItems: ['All Items'],
      customerType: 'vip',
      minOrderValue: 1000,
      maxDiscount: 500,
      maxUsagePerCustomer: 10,
      totalUsageLimit: 0,
      status: 'active',
      totalUsed: 45,
      description: 'VIP customer discount across multiple outlets',
      validFrom: '2024-11-01',
      validUntil: '2024-12-31',
      locationSpecificRules: [
        { outlet: 'Main Branch', customDiscount: 25, customMinOrder: 800 },
        { outlet: 'Mall Branch', customDiscount: 20, customMinOrder: 1000 },
        { outlet: 'Downtown Branch', customDiscount: 22, customMinOrder: 900 }
      ]
    }
  ]);

  const outlets = ['Main Branch', 'Mall Branch', 'Airport Branch', 'Downtown Branch'];
  const itemCategories = ['All Items', 'Beverages', 'Appetizers', 'Main Course', 'Desserts', 'Combo Meals', 'Quick Bites'];
  const customerTypes = [
    { value: 'all', label: 'All Customers' },
    { value: 'new', label: 'New Customers' },
    { value: 'existing', label: 'Existing Customers' },
    { value: 'vip', label: 'VIP Customers' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMultiSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: prev[name as keyof typeof prev].includes(value)
        ? (prev[name as keyof typeof prev] as string[]).filter(item => item !== value)
        : [...(prev[name as keyof typeof prev] as string[]), value]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newDiscount: OutletDiscount = {
      id: editingDiscount ? editingDiscount.id : Date.now().toString(),
      discountName: formData.discountName,
      discountType: formData.discountType,
      discountValue: parseFloat(formData.discountValue) || 0,
      outlets: formData.outlets,
      applicableItems: formData.applicableItems,
      customerType: formData.customerType,
      minOrderValue: parseFloat(formData.minOrderValue) || 0,
      maxDiscount: parseFloat(formData.maxDiscount) || 0,
      maxUsagePerCustomer: parseInt(formData.maxUsagePerCustomer) || 0,
      totalUsageLimit: parseInt(formData.totalUsageLimit) || 0,
      status: 'scheduled',
      totalUsed: editingDiscount ? editingDiscount.totalUsed : 0,
      description: formData.description,
      validFrom: formData.validFrom,
      validUntil: formData.validUntil,
      locationSpecificRules: formData.locationSpecificRules
    };

    if (editingDiscount) {
      setOutletDiscounts(prev => prev.map(discount => discount.id === editingDiscount.id ? newDiscount : discount));
      toast({
        title: "Discount Updated",
        description: "Outlet-based discount has been updated successfully.",
      });
    } else {
      setOutletDiscounts(prev => [...prev, newDiscount]);
      toast({
        title: "Discount Created",
        description: "New outlet-based discount has been created successfully.",
      });
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      discountName: '',
      discountType: 'percentage',
      discountValue: '',
      outlets: [],
      applicableItems: [],
      customerType: 'all',
      minOrderValue: '',
      maxDiscount: '',
      maxUsagePerCustomer: '',
      totalUsageLimit: '',
      description: '',
      validFrom: '',
      validUntil: '',
      locationSpecificRules: []
    });
    setShowCreateForm(false);
    setEditingDiscount(null);
  };

  const handleEdit = (discount: OutletDiscount) => {
    setEditingDiscount(discount);
    setFormData({
      discountName: discount.discountName,
      discountType: discount.discountType,
      discountValue: discount.discountValue.toString(),
      outlets: discount.outlets,
      applicableItems: discount.applicableItems,
      customerType: discount.customerType,
      minOrderValue: discount.minOrderValue.toString(),
      maxDiscount: discount.maxDiscount.toString(),
      maxUsagePerCustomer: discount.maxUsagePerCustomer.toString(),
      totalUsageLimit: discount.totalUsageLimit.toString(),
      description: discount.description,
      validFrom: discount.validFrom,
      validUntil: discount.validUntil,
      locationSpecificRules: discount.locationSpecificRules
    });
    setShowCreateForm(true);
  };

  const handleDelete = (id: string) => {
    setOutletDiscounts(prev => prev.filter(discount => discount.id !== id));
    toast({
      title: "Discount Deleted",
      description: "Outlet-based discount has been deleted successfully.",
      variant: "destructive"
    });
  };

  const toggleStatus = (id: string) => {
    setOutletDiscounts(prev => prev.map(discount => 
      discount.id === id 
        ? { ...discount, status: discount.status === 'active' ? 'inactive' : 'active' as const }
        : discount
    ));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-500">Inactive</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-500">Scheduled</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getDiscountDisplay = (discount: OutletDiscount) => {
    switch (discount.discountType) {
      case 'percentage':
        return `${discount.discountValue}%`;
      case 'fixed':
        return `₹${discount.discountValue}`;
      case 'bogo':
        return 'BOGO';
      default:
        return 'N/A';
    }
  };

  const getCustomerTypeBadge = (type: string) => {
    const colors = {
      all: 'bg-blue-100 text-blue-800',
      new: 'bg-green-100 text-green-800',
      existing: 'bg-yellow-100 text-yellow-800',
      vip: 'bg-purple-100 text-purple-800'
    };
    const labels = {
      all: 'All Customers',
      new: 'New Customers',
      existing: 'Existing Customers',
      vip: 'VIP Customers'
    };
    return (
      <Badge className={colors[type as keyof typeof colors]}>
        {labels[type as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="mb-8">
          <Link to="/mis/promotion" className="inline-flex items-center text-green-600 hover:text-green-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Promotions
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-3 rounded-lg">
                  <MapPin className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-3xl">Outlet-based Discounts</CardTitle>
                  <CardDescription>Create and manage location-specific offers</CardDescription>
                </div>
              </div>
              <Button onClick={() => setShowCreateForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create New Discount
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Create/Edit Form Modal */}
            {showCreateForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    {editingDiscount ? 'Edit Outlet Discount' : 'Create Outlet Discount'}
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="discountName">Discount Name *</Label>
                        <Input
                          id="discountName"
                          name="discountName"
                          value={formData.discountName}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g., Mall Branch Grand Opening"
                        />
                      </div>
                      <div>
                        <Label htmlFor="discountType">Discount Type *</Label>
                        <Select
                          value={formData.discountType}
                          onValueChange={(value) => handleSelectChange('discountType', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="percentage">Percentage</SelectItem>
                            <SelectItem value="fixed">Fixed Amount</SelectItem>
                            <SelectItem value="bogo">Buy One Get One</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {formData.discountType !== 'bogo' && (
                        <div>
                          <Label htmlFor="discountValue">
                            Discount Value * {formData.discountType === 'percentage' ? '(%)' : '(₹)'}
                          </Label>
                          <Input
                            id="discountValue"
                            name="discountValue"
                            type="number"
                            value={formData.discountValue}
                            onChange={handleInputChange}
                            required
                            min="0"
                            step={formData.discountType === 'percentage' ? '1' : '0.01'}
                          />
                        </div>
                      )}
                      <div>
                        <Label htmlFor="customerType">Customer Type *</Label>
                        <Select
                          value={formData.customerType}
                          onValueChange={(value) => handleSelectChange('customerType', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {customerTypes.map(type => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="validFrom">Valid From *</Label>
                        <Input
                          id="validFrom"
                          name="validFrom"
                          type="date"
                          value={formData.validFrom}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="validUntil">Valid Until *</Label>
                        <Input
                          id="validUntil"
                          name="validUntil"
                          type="date"
                          value={formData.validUntil}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="minOrderValue">Minimum Order Value (₹)</Label>
                        <Input
                          id="minOrderValue"
                          name="minOrderValue"
                          type="number"
                          value={formData.minOrderValue}
                          onChange={handleInputChange}
                          min="0"
                          step="0.01"
                        />
                      </div>
                      {formData.discountType !== 'bogo' && (
                        <div>
                          <Label htmlFor="maxDiscount">Maximum Discount (₹)</Label>
                          <Input
                            id="maxDiscount"
                            name="maxDiscount"
                            type="number"
                            value={formData.maxDiscount}
                            onChange={handleInputChange}
                            min="0"
                            step="0.01"
                          />
                        </div>
                      )}
                      <div>
                        <Label htmlFor="maxUsagePerCustomer">Max Usage Per Customer</Label>
                        <Input
                          id="maxUsagePerCustomer"
                          name="maxUsagePerCustomer"
                          type="number"
                          value={formData.maxUsagePerCustomer}
                          onChange={handleInputChange}
                          min="0"
                          placeholder="0 = unlimited"
                        />
                      </div>
                      <div>
                        <Label htmlFor="totalUsageLimit">Total Usage Limit</Label>
                        <Input
                          id="totalUsageLimit"
                          name="totalUsageLimit"
                          type="number"
                          value={formData.totalUsageLimit}
                          onChange={handleInputChange}
                          min="0"
                          placeholder="0 = unlimited"
                        />
                      </div>
                    </div>

                    {/* Outlets Selection */}
                    <div>
                      <Label>Applicable Outlets *</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                        {outlets.map(outlet => (
                          <label key={outlet} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.outlets.includes(outlet)}
                              onChange={() => handleMultiSelectChange('outlets', outlet)}
                              className="rounded"
                            />
                            <span className="text-sm">{outlet}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Applicable Items */}
                    <div>
                      <Label>Applicable Items *</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                        {itemCategories.map(category => (
                          <label key={category} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.applicableItems.includes(category)}
                              onChange={() => handleMultiSelectChange('applicableItems', category)}
                              className="rounded"
                            />
                            <span className="text-sm">{category}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Describe the outlet-specific discount..."
                        rows={3}
                      />
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                      <Button type="button" variant="outline" onClick={resetForm}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingDiscount ? 'Update Discount' : 'Create Discount'}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Discounts List */}
            <div className="space-y-4">
              {outletDiscounts.map((discount) => (
                <Card key={discount.id} className="border-l-4 border-l-green-500">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{discount.discountName}</h3>
                        <p className="text-gray-600 mt-1">{discount.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(discount.status)}
                        {getCustomerTypeBadge(discount.customerType)}
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toggleStatus(discount.id)}
                          >
                            {discount.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleEdit(discount)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDelete(discount.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                      <div>
                        <span className="font-medium text-gray-700">Discount:</span>
                        <div className="text-lg font-bold text-green-600">{getDiscountDisplay(discount)}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Min Order:</span>
                        <div>₹{discount.minOrderValue}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Usage:</span>
                        <div>{discount.totalUsed} / {discount.totalUsageLimit || '∞'}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Valid Until:</span>
                        <div>{discount.validUntil}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <span className="font-medium text-gray-700">Outlets: </span>
                        {discount.outlets.map(outlet => (
                          <Badge key={outlet} variant="outline" className="mr-1">
                            {outlet}
                          </Badge>
                        ))}
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Items: </span>
                        {discount.applicableItems.map(item => (
                          <Badge key={item} variant="outline" className="mr-1">
                            {item}
                          </Badge>
                        ))}
                      </div>
                      {discount.locationSpecificRules.length > 0 && (
                        <div>
                          <span className="font-medium text-gray-700">Location Rules: </span>
                          <div className="mt-1 space-y-1">
                            {discount.locationSpecificRules.map((rule, index) => (
                              <div key={index} className="text-sm bg-gray-50 p-2 rounded">
                                <strong>{rule.outlet}:</strong> 
                                {rule.customDiscount && ` ${rule.customDiscount}% off`}
                                {rule.customMinOrder && ` (Min: ₹${rule.customMinOrder})`}
                                {rule.customMaxDiscount && ` (Max: ₹${rule.customMaxDiscount})`}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OutletBasedDiscounts;
