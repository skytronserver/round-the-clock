import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Plus, Edit, Trash2, Play, Pause } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface PaymentOffer {
  id: string;
  offerName: string;
  paymentMethods: string[];
  discountType: 'percentage' | 'fixed' | 'cashback';
  discountValue: number;
  maxCashback?: number;
  outlets: string[];
  customerType: 'all' | 'new' | 'existing' | 'vip';
  minOrderValue: number;
  maxDiscount: number;
  maxUsagePerCustomer: number;
  totalUsageLimit: number;
  timeRestrictions?: {
    startTime: string;
    endTime: string;
    daysOfWeek: string[];
  };
  status: 'active' | 'inactive' | 'scheduled';
  totalUsed: number;
  description: string;
  validFrom: string;
  validUntil: string;
}

const PaymentBasedOffers = () => {
  const { toast } = useToast();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingOffer, setEditingOffer] = useState<PaymentOffer | null>(null);

  const [formData, setFormData] = useState({
    offerName: '',
    paymentMethods: [] as string[],
    discountType: 'percentage' as 'percentage' | 'fixed' | 'cashback',
    discountValue: '',
    maxCashback: '',
    outlets: [] as string[],
    customerType: 'all' as 'all' | 'new' | 'existing' | 'vip',
    minOrderValue: '',
    maxDiscount: '',
    maxUsagePerCustomer: '',
    totalUsageLimit: '',
    hasTimeRestrictions: false,
    startTime: '',
    endTime: '',
    daysOfWeek: [] as string[],
    description: '',
    validFrom: '',
    validUntil: ''
  });

  // Sample data
  const [paymentOffers, setPaymentOffers] = useState<PaymentOffer[]>([
    {
      id: '1',
      offerName: 'UPI Instant Discount',
      paymentMethods: ['UPI', 'Google Pay', 'PhonePe', 'Paytm'],
      discountType: 'percentage',
      discountValue: 10,
      outlets: ['All Outlets'],
      customerType: 'all',
      minOrderValue: 200,
      maxDiscount: 100,
      maxUsagePerCustomer: 5,
      totalUsageLimit: 1000,
      status: 'active',
      totalUsed: 234,
      description: '10% instant discount on UPI payments',
      validFrom: '2024-11-01',
      validUntil: '2024-12-31'
    },
    {
      id: '2',
      offerName: 'Credit Card Cashback',
      paymentMethods: ['Credit Card', 'Debit Card'],
      discountType: 'cashback',
      discountValue: 5,
      maxCashback: 150,
      outlets: ['Main Branch', 'Mall Branch'],
      customerType: 'all',
      minOrderValue: 500,
      maxDiscount: 150,
      maxUsagePerCustomer: 3,
      totalUsageLimit: 500,
      timeRestrictions: {
        startTime: '18:00',
        endTime: '22:00',
        daysOfWeek: ['Friday', 'Saturday', 'Sunday']
      },
      status: 'active',
      totalUsed: 89,
      description: '5% cashback on card payments during weekend evenings',
      validFrom: '2024-11-01',
      validUntil: '2024-11-30'
    },
    {
      id: '3',
      offerName: 'Digital Wallet Bonus',
      paymentMethods: ['Paytm', 'Amazon Pay', 'Mobikwik'],
      discountType: 'fixed',
      discountValue: 50,
      outlets: ['Airport Branch'],
      customerType: 'new',
      minOrderValue: 300,
      maxDiscount: 50,
      maxUsagePerCustomer: 1,
      totalUsageLimit: 200,
      status: 'scheduled',
      totalUsed: 0,
      description: 'Flat ₹50 off for new customers using digital wallets',
      validFrom: '2024-11-15',
      validUntil: '2024-12-15'
    }
  ]);

  const paymentMethods = [
    'UPI', 'Google Pay', 'PhonePe', 'Paytm', 'Amazon Pay', 'Mobikwik',
    'Credit Card', 'Debit Card', 'Net Banking', 'Cash on Delivery'
  ];
  
  const outlets = ['All Outlets', 'Main Branch', 'Mall Branch', 'Airport Branch', 'Downtown Branch'];
  const customerTypes = [
    { value: 'all', label: 'All Customers' },
    { value: 'new', label: 'New Customers' },
    { value: 'existing', label: 'Existing Customers' },
    { value: 'vip', label: 'VIP Customers' }
  ];
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMultiSelectChange = (name: string, value: string) => {
    setFormData(prev => {
      const currentValue = prev[name as keyof typeof prev] as string[];
      return {
        ...prev,
        [name]: currentValue.includes(value)
          ? currentValue.filter(item => item !== value)
          : [...currentValue, value]
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newOffer: PaymentOffer = {
      id: editingOffer ? editingOffer.id : Date.now().toString(),
      offerName: formData.offerName,
      paymentMethods: formData.paymentMethods,
      discountType: formData.discountType,
      discountValue: parseFloat(formData.discountValue) || 0,
      maxCashback: formData.discountType === 'cashback' ? parseFloat(formData.maxCashback) || 0 : undefined,
      outlets: formData.outlets,
      customerType: formData.customerType,
      minOrderValue: parseFloat(formData.minOrderValue) || 0,
      maxDiscount: parseFloat(formData.maxDiscount) || 0,
      maxUsagePerCustomer: parseInt(formData.maxUsagePerCustomer) || 0,
      totalUsageLimit: parseInt(formData.totalUsageLimit) || 0,
      timeRestrictions: formData.hasTimeRestrictions ? {
        startTime: formData.startTime,
        endTime: formData.endTime,
        daysOfWeek: formData.daysOfWeek
      } : undefined,
      status: 'scheduled',
      totalUsed: editingOffer ? editingOffer.totalUsed : 0,
      description: formData.description,
      validFrom: formData.validFrom,
      validUntil: formData.validUntil
    };

    if (editingOffer) {
      setPaymentOffers(prev => prev.map(offer => offer.id === editingOffer.id ? newOffer : offer));
      toast({
        title: "Offer Updated",
        description: "Payment-based offer has been updated successfully.",
      });
    } else {
      setPaymentOffers(prev => [...prev, newOffer]);
      toast({
        title: "Offer Created",
        description: "New payment-based offer has been created successfully.",
      });
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      offerName: '',
      paymentMethods: [],
      discountType: 'percentage',
      discountValue: '',
      maxCashback: '',
      outlets: [],
      customerType: 'all',
      minOrderValue: '',
      maxDiscount: '',
      maxUsagePerCustomer: '',
      totalUsageLimit: '',
      hasTimeRestrictions: false,
      startTime: '',
      endTime: '',
      daysOfWeek: [],
      description: '',
      validFrom: '',
      validUntil: ''
    });
    setShowCreateForm(false);
    setEditingOffer(null);
  };

  const handleEdit = (offer: PaymentOffer) => {
    setEditingOffer(offer);
    setFormData({
      offerName: offer.offerName,
      paymentMethods: offer.paymentMethods,
      discountType: offer.discountType,
      discountValue: offer.discountValue.toString(),
      maxCashback: offer.maxCashback?.toString() || '',
      outlets: offer.outlets,
      customerType: offer.customerType,
      minOrderValue: offer.minOrderValue.toString(),
      maxDiscount: offer.maxDiscount.toString(),
      maxUsagePerCustomer: offer.maxUsagePerCustomer.toString(),
      totalUsageLimit: offer.totalUsageLimit.toString(),
      hasTimeRestrictions: !!offer.timeRestrictions,
      startTime: offer.timeRestrictions?.startTime || '',
      endTime: offer.timeRestrictions?.endTime || '',
      daysOfWeek: offer.timeRestrictions?.daysOfWeek || [],
      description: offer.description,
      validFrom: offer.validFrom,
      validUntil: offer.validUntil
    });
    setShowCreateForm(true);
  };

  const handleDelete = (id: string) => {
    setPaymentOffers(prev => prev.filter(offer => offer.id !== id));
    toast({
      title: "Offer Deleted",
      description: "Payment-based offer has been deleted successfully.",
      variant: "destructive"
    });
  };

  const toggleStatus = (id: string) => {
    setPaymentOffers(prev => prev.map(offer => 
      offer.id === id 
        ? { ...offer, status: offer.status === 'active' ? 'inactive' : 'active' as const }
        : offer
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

  const getDiscountDisplay = (offer: PaymentOffer) => {
    switch (offer.discountType) {
      case 'percentage':
        return `${offer.discountValue}%`;
      case 'fixed':
        return `₹${offer.discountValue}`;
      case 'cashback':
        return `${offer.discountValue}% Cashback`;
      default:
        return 'N/A';
    }
  };

  const getPaymentMethodBadge = (method: string) => {
    const colors: { [key: string]: string } = {
      'UPI': 'bg-green-100 text-green-800',
      'Google Pay': 'bg-blue-100 text-blue-800',
      'PhonePe': 'bg-purple-100 text-purple-800',
      'Paytm': 'bg-blue-100 text-blue-800',
      'Credit Card': 'bg-yellow-100 text-yellow-800',
      'Debit Card': 'bg-orange-100 text-orange-800'
    };
    return (
      <Badge className={colors[method] || 'bg-gray-100 text-gray-800'}>
        {method}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="mb-8">
          <Link to="/mis/promotion" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Promotions
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <CreditCard className="w-8 h-8 text-indigo-600" />
                </div>
                <div>
                  <CardTitle className="text-3xl">Payment-based Offers</CardTitle>
                  <CardDescription>Create and manage payment method incentives</CardDescription>
                </div>
              </div>
              <Button onClick={() => setShowCreateForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create New Offer
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Create/Edit Form Modal */}
            {showCreateForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    {editingOffer ? 'Edit Payment Offer' : 'Create Payment Offer'}
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="offerName">Offer Name *</Label>
                        <Input
                          id="offerName"
                          name="offerName"
                          value={formData.offerName}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g., UPI Instant Discount"
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
                            <SelectItem value="percentage">Percentage Discount</SelectItem>
                            <SelectItem value="fixed">Fixed Amount Discount</SelectItem>
                            <SelectItem value="cashback">Cashback</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="discountValue">
                          {formData.discountType === 'percentage' ? 'Discount Percentage (%)' :
                           formData.discountType === 'fixed' ? 'Discount Amount (₹)' :
                           'Cashback Percentage (%)'}
                        </Label>
                        <Input
                          id="discountValue"
                          name="discountValue"
                          type="number"
                          value={formData.discountValue}
                          onChange={handleInputChange}
                          required
                          min="0"
                          step={formData.discountType === 'fixed' ? '0.01' : '1'}
                        />
                      </div>
                      {formData.discountType === 'cashback' && (
                        <div>
                          <Label htmlFor="maxCashback">Maximum Cashback (₹)</Label>
                          <Input
                            id="maxCashback"
                            name="maxCashback"
                            type="number"
                            value={formData.maxCashback}
                            onChange={handleInputChange}
                            min="0"
                            step="0.01"
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
                    </div>

                    {/* Payment Methods Selection */}
                    <div>
                      <Label>Payment Methods *</Label>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-2">
                        {paymentMethods.map(method => (
                          <label key={method} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.paymentMethods.includes(method)}
                              onChange={() => handleMultiSelectChange('paymentMethods', method)}
                              className="rounded"
                            />
                            <span className="text-sm">{method}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Outlets Selection */}
                    <div>
                      <Label>Applicable Outlets *</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
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

                    {/* Time Restrictions */}
                    <div>
                      <label className="flex items-center space-x-2 cursor-pointer mb-4">
                        <input
                          type="checkbox"
                          name="hasTimeRestrictions"
                          checked={formData.hasTimeRestrictions}
                          onChange={handleInputChange}
                          className="rounded"
                        />
                        <span className="font-medium">Add Time Restrictions</span>
                      </label>
                      
                      {formData.hasTimeRestrictions && (
                        <div className="space-y-4 border rounded p-4 bg-gray-50">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="startTime">Start Time</Label>
                              <Input
                                id="startTime"
                                name="startTime"
                                type="time"
                                value={formData.startTime}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div>
                              <Label htmlFor="endTime">End Time</Label>
                              <Input
                                id="endTime"
                                name="endTime"
                                type="time"
                                value={formData.endTime}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div>
                            <Label>Days of Week</Label>
                            <div className="grid grid-cols-4 md:grid-cols-7 gap-2 mt-2">
                              {daysOfWeek.map(day => (
                                <label key={day} className="flex items-center space-x-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={formData.daysOfWeek.includes(day)}
                                    onChange={() => handleMultiSelectChange('daysOfWeek', day)}
                                    className="rounded"
                                  />
                                  <span className="text-sm">{day.slice(0, 3)}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Describe the payment-based offer..."
                        rows={3}
                      />
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                      <Button type="button" variant="outline" onClick={resetForm}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingOffer ? 'Update Offer' : 'Create Offer'}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Offers List */}
            <div className="space-y-4">
              {paymentOffers.map((offer) => (
                <Card key={offer.id} className="border-l-4 border-l-indigo-500">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{offer.offerName}</h3>
                        <p className="text-gray-600 mt-1">{offer.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(offer.status)}
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toggleStatus(offer.id)}
                          >
                            {offer.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleEdit(offer)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDelete(offer.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                      <div>
                        <span className="font-medium text-gray-700">Discount:</span>
                        <div className="text-lg font-bold text-indigo-600">{getDiscountDisplay(offer)}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Min Order:</span>
                        <div>₹{offer.minOrderValue}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Usage:</span>
                        <div>{offer.totalUsed} / {offer.totalUsageLimit || '∞'}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Valid Until:</span>
                        <div>{offer.validUntil}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <span className="font-medium text-gray-700">Payment Methods: </span>
                        {offer.paymentMethods.map(method => (
                          <span key={method} className="mr-1">
                            {getPaymentMethodBadge(method)}
                          </span>
                        ))}
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Outlets: </span>
                        {offer.outlets.map(outlet => (
                          <Badge key={outlet} variant="outline" className="mr-1">
                            {outlet}
                          </Badge>
                        ))}
                      </div>
                      {offer.timeRestrictions && (
                        <div>
                          <span className="font-medium text-gray-700">Time Restrictions: </span>
                          <div className="text-sm bg-gray-50 p-2 rounded mt-1">
                            <div>Time: {offer.timeRestrictions.startTime} - {offer.timeRestrictions.endTime}</div>
                            <div>Days: {offer.timeRestrictions.daysOfWeek.join(', ')}</div>
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

export default PaymentBasedOffers;
