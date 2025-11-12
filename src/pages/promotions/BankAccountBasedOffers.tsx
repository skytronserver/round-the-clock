import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Banknote, Plus, Edit, Trash2, Play, Pause } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface BankOffer {
  id: string;
  offerName: string;
  bankName: string;
  cardTypes: string[];
  discountType: 'percentage' | 'fixed' | 'cashback';
  discountValue: number;
  maxDiscount: number;
  minOrderValue: number;
  outlets: string[];
  customerType: 'all' | 'new' | 'existing' | 'premium';
  maxUsagePerCustomer: number;
  totalUsageLimit: number;
  status: 'active' | 'inactive' | 'scheduled';
  totalUsed: number;
  description: string;
  validFrom: string;
  validUntil: string;
  termsConditions: string;
}

const BankAccountBasedOffers = () => {
  const { toast } = useToast();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingOffer, setEditingOffer] = useState<BankOffer | null>(null);

  const [formData, setFormData] = useState({
    offerName: '',
    bankName: '',
    cardTypes: [] as string[],
    discountType: 'percentage' as 'percentage' | 'fixed' | 'cashback',
    discountValue: '',
    maxDiscount: '',
    minOrderValue: '',
    outlets: [] as string[],
    customerType: 'all' as 'all' | 'new' | 'existing' | 'premium',
    maxUsagePerCustomer: '',
    totalUsageLimit: '',
    description: '',
    validFrom: '',
    validUntil: '',
    termsConditions: ''
  });

  const [bankOffers, setBankOffers] = useState<BankOffer[]>([
    {
      id: '1',
      offerName: 'HDFC Bank Weekend Special',
      bankName: 'HDFC Bank',
      cardTypes: ['Credit Card', 'Debit Card'],
      discountType: 'percentage',
      discountValue: 15,
      maxDiscount: 200,
      minOrderValue: 500,
      outlets: ['All Outlets'],
      customerType: 'all',
      maxUsagePerCustomer: 2,
      totalUsageLimit: 1000,
      status: 'active',
      totalUsed: 156,
      description: '15% off on weekends with HDFC cards',
      validFrom: '2024-11-01',
      validUntil: '2024-12-31',
      termsConditions: 'Valid only on weekends. Maximum 2 transactions per customer.'
    },
    {
      id: '2',
      offerName: 'SBI Cashback Offer',
      bankName: 'State Bank of India',
      cardTypes: ['Credit Card'],
      discountType: 'cashback',
      discountValue: 10,
      maxDiscount: 150,
      minOrderValue: 300,
      outlets: ['Main Branch', 'Mall Branch'],
      customerType: 'premium',
      maxUsagePerCustomer: 5,
      totalUsageLimit: 500,
      status: 'active',
      totalUsed: 89,
      description: '10% cashback for SBI premium cardholders',
      validFrom: '2024-11-01',
      validUntil: '2024-11-30',
      termsConditions: 'Valid for premium customers only. Cashback credited within 7 days.'
    }
  ]);

  const banks = [
    'HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra Bank',
    'Punjab National Bank', 'Bank of Baroda', 'Canara Bank', 'Union Bank', 'IDFC First Bank'
  ];
  
  const cardTypes = ['Credit Card', 'Debit Card', 'Prepaid Card'];
  const outlets = ['All Outlets', 'Main Branch', 'Mall Branch', 'Airport Branch', 'Downtown Branch'];
  const customerTypes = [
    { value: 'all', label: 'All Customers' },
    { value: 'new', label: 'New Customers' },
    { value: 'existing', label: 'Existing Customers' },
    { value: 'premium', label: 'Premium Customers' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    
    const newOffer: BankOffer = {
      id: editingOffer ? editingOffer.id : Date.now().toString(),
      offerName: formData.offerName,
      bankName: formData.bankName,
      cardTypes: formData.cardTypes,
      discountType: formData.discountType,
      discountValue: parseFloat(formData.discountValue) || 0,
      maxDiscount: parseFloat(formData.maxDiscount) || 0,
      minOrderValue: parseFloat(formData.minOrderValue) || 0,
      outlets: formData.outlets,
      customerType: formData.customerType,
      maxUsagePerCustomer: parseInt(formData.maxUsagePerCustomer) || 0,
      totalUsageLimit: parseInt(formData.totalUsageLimit) || 0,
      status: 'scheduled',
      totalUsed: editingOffer ? editingOffer.totalUsed : 0,
      description: formData.description,
      validFrom: formData.validFrom,
      validUntil: formData.validUntil,
      termsConditions: formData.termsConditions
    };

    if (editingOffer) {
      setBankOffers(prev => prev.map(offer => offer.id === editingOffer.id ? newOffer : offer));
      toast({
        title: "Offer Updated",
        description: "Bank offer has been updated successfully.",
      });
    } else {
      setBankOffers(prev => [...prev, newOffer]);
      toast({
        title: "Offer Created",
        description: "New bank offer has been created successfully.",
      });
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      offerName: '',
      bankName: '',
      cardTypes: [],
      discountType: 'percentage',
      discountValue: '',
      maxDiscount: '',
      minOrderValue: '',
      outlets: [],
      customerType: 'all',
      maxUsagePerCustomer: '',
      totalUsageLimit: '',
      description: '',
      validFrom: '',
      validUntil: '',
      termsConditions: ''
    });
    setShowCreateForm(false);
    setEditingOffer(null);
  };

  const handleEdit = (offer: BankOffer) => {
    setEditingOffer(offer);
    setFormData({
      offerName: offer.offerName,
      bankName: offer.bankName,
      cardTypes: offer.cardTypes,
      discountType: offer.discountType,
      discountValue: offer.discountValue.toString(),
      maxDiscount: offer.maxDiscount.toString(),
      minOrderValue: offer.minOrderValue.toString(),
      outlets: offer.outlets,
      customerType: offer.customerType,
      maxUsagePerCustomer: offer.maxUsagePerCustomer.toString(),
      totalUsageLimit: offer.totalUsageLimit.toString(),
      description: offer.description,
      validFrom: offer.validFrom,
      validUntil: offer.validUntil,
      termsConditions: offer.termsConditions
    });
    setShowCreateForm(true);
  };

  const handleDelete = (id: string) => {
    setBankOffers(prev => prev.filter(offer => offer.id !== id));
    toast({
      title: "Offer Deleted",
      description: "Bank offer has been deleted successfully.",
      variant: "destructive"
    });
  };

  const toggleStatus = (id: string) => {
    setBankOffers(prev => prev.map(offer => 
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

  const getDiscountDisplay = (offer: BankOffer) => {
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

  const getBankBadge = (bankName: string) => {
    const colors: { [key: string]: string } = {
      'HDFC Bank': 'bg-red-100 text-red-800',
      'ICICI Bank': 'bg-orange-100 text-orange-800',
      'State Bank of India': 'bg-blue-100 text-blue-800',
      'Axis Bank': 'bg-purple-100 text-purple-800',
      'Kotak Mahindra Bank': 'bg-green-100 text-green-800'
    };
    return (
      <Badge className={colors[bankName] || 'bg-gray-100 text-gray-800'}>
        {bankName}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="mb-8">
          <Link to="/mis/promotion" className="inline-flex items-center text-teal-600 hover:text-teal-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Promotions
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-teal-100 p-3 rounded-lg">
                  <Banknote className="w-8 h-8 text-teal-600" />
                </div>
                <div>
                  <CardTitle className="text-3xl">Bank-account-based Offers</CardTitle>
                  <CardDescription>Create and manage bank-specific promotions</CardDescription>
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
                    {editingOffer ? 'Edit Bank Offer' : 'Create Bank Offer'}
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
                          placeholder="e.g., HDFC Bank Weekend Special"
                        />
                      </div>
                      <div>
                        <Label htmlFor="bankName">Bank Name *</Label>
                        <Select
                          value={formData.bankName}
                          onValueChange={(value) => handleSelectChange('bankName', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select bank" />
                          </SelectTrigger>
                          <SelectContent>
                            {banks.map(bank => (
                              <SelectItem key={bank} value={bank}>
                                {bank}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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

                    {/* Card Types Selection */}
                    <div>
                      <Label>Card Types *</Label>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {cardTypes.map(type => (
                          <label key={type} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.cardTypes.includes(type)}
                              onChange={() => handleMultiSelectChange('cardTypes', type)}
                              className="rounded"
                            />
                            <span className="text-sm">{type}</span>
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

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Describe the bank offer..."
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="termsConditions">Terms & Conditions</Label>
                      <Textarea
                        id="termsConditions"
                        name="termsConditions"
                        value={formData.termsConditions}
                        onChange={handleInputChange}
                        placeholder="Enter terms and conditions..."
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
              {bankOffers.map((offer) => (
                <Card key={offer.id} className="border-l-4 border-l-teal-500">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{offer.offerName}</h3>
                        <p className="text-gray-600 mt-1">{offer.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(offer.status)}
                        {getBankBadge(offer.bankName)}
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
                        <div className="text-lg font-bold text-teal-600">{getDiscountDisplay(offer)}</div>
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
                        <span className="font-medium text-gray-700">Card Types: </span>
                        {offer.cardTypes.map(type => (
                          <Badge key={type} variant="outline" className="mr-1">
                            {type}
                          </Badge>
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
                      {offer.termsConditions && (
                        <div>
                          <span className="font-medium text-gray-700">Terms: </span>
                          <div className="text-sm bg-gray-50 p-2 rounded mt-1">
                            {offer.termsConditions}
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

export default BankAccountBasedOffers;
