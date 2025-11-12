import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Package, Plus, Edit, Trash2, Play, Pause } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface ItemOffer {
  id: string;
  offerName: string;
  offerType: 'discount' | 'bogo' | 'combo' | 'bundle';
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  targetItems: string[];
  comboItems?: string[];
  minQuantity: number;
  maxQuantity: number;
  outlets: string[];
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
}

const ItemBasedOffers = () => {
  const { toast } = useToast();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingOffer, setEditingOffer] = useState<ItemOffer | null>(null);

  const [formData, setFormData] = useState({
    offerName: '',
    offerType: 'discount' as 'discount' | 'bogo' | 'combo' | 'bundle',
    discountType: 'percentage' as 'percentage' | 'fixed',
    discountValue: '',
    targetItems: [] as string[],
    comboItems: [] as string[],
    minQuantity: '',
    maxQuantity: '',
    outlets: [] as string[],
    customerType: 'all' as 'all' | 'new' | 'existing' | 'vip',
    minOrderValue: '',
    maxDiscount: '',
    maxUsagePerCustomer: '',
    totalUsageLimit: '',
    description: '',
    validFrom: '',
    validUntil: ''
  });

  // Sample data
  const [itemOffers, setItemOffers] = useState<ItemOffer[]>([
    {
      id: '1',
      offerName: 'Pizza Combo Deal',
      offerType: 'combo',
      discountType: 'percentage',
      discountValue: 25,
      targetItems: ['Margherita Pizza', 'Pepperoni Pizza'],
      comboItems: ['Coca-Cola', 'Garlic Bread'],
      minQuantity: 1,
      maxQuantity: 2,
      outlets: ['All Outlets'],
      customerType: 'all',
      minOrderValue: 0,
      maxDiscount: 200,
      maxUsagePerCustomer: 3,
      totalUsageLimit: 500,
      status: 'active',
      totalUsed: 89,
      description: '25% off when you buy pizza with drink and garlic bread',
      validFrom: '2024-11-01',
      validUntil: '2024-12-31'
    },
    {
      id: '2',
      offerName: 'Biryani BOGO',
      offerType: 'bogo',
      discountType: 'percentage',
      discountValue: 0,
      targetItems: ['Chicken Biryani', 'Mutton Biryani'],
      minQuantity: 2,
      maxQuantity: 4,
      outlets: ['Main Branch', 'Downtown Branch'],
      customerType: 'all',
      minOrderValue: 400,
      maxDiscount: 0,
      maxUsagePerCustomer: 1,
      totalUsageLimit: 200,
      status: 'active',
      totalUsed: 45,
      description: 'Buy one biryani, get one free',
      validFrom: '2024-11-01',
      validUntil: '2024-11-30'
    }
  ]);

  const menuItems = [
    'Margherita Pizza', 'Pepperoni Pizza', 'Chicken Biryani', 'Mutton Biryani',
    'Butter Chicken', 'Paneer Tikka', 'Coca-Cola', 'Pepsi', 'Garlic Bread',
    'French Fries', 'Chicken Wings', 'Veg Burger', 'Chicken Burger'
  ];
  
  const outlets = ['All Outlets', 'Main Branch', 'Mall Branch', 'Airport Branch', 'Downtown Branch'];
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
    
    const newOffer: ItemOffer = {
      id: editingOffer ? editingOffer.id : Date.now().toString(),
      offerName: formData.offerName,
      offerType: formData.offerType,
      discountType: formData.discountType,
      discountValue: parseFloat(formData.discountValue) || 0,
      targetItems: formData.targetItems,
      comboItems: formData.comboItems,
      minQuantity: parseInt(formData.minQuantity) || 1,
      maxQuantity: parseInt(formData.maxQuantity) || 10,
      outlets: formData.outlets,
      customerType: formData.customerType,
      minOrderValue: parseFloat(formData.minOrderValue) || 0,
      maxDiscount: parseFloat(formData.maxDiscount) || 0,
      maxUsagePerCustomer: parseInt(formData.maxUsagePerCustomer) || 0,
      totalUsageLimit: parseInt(formData.totalUsageLimit) || 0,
      status: 'scheduled',
      totalUsed: editingOffer ? editingOffer.totalUsed : 0,
      description: formData.description,
      validFrom: formData.validFrom,
      validUntil: formData.validUntil
    };

    if (editingOffer) {
      setItemOffers(prev => prev.map(offer => offer.id === editingOffer.id ? newOffer : offer));
      toast({
        title: "Offer Updated",
        description: "Item-based offer has been updated successfully.",
      });
    } else {
      setItemOffers(prev => [...prev, newOffer]);
      toast({
        title: "Offer Created",
        description: "New item-based offer has been created successfully.",
      });
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      offerName: '',
      offerType: 'discount',
      discountType: 'percentage',
      discountValue: '',
      targetItems: [],
      comboItems: [],
      minQuantity: '',
      maxQuantity: '',
      outlets: [],
      customerType: 'all',
      minOrderValue: '',
      maxDiscount: '',
      maxUsagePerCustomer: '',
      totalUsageLimit: '',
      description: '',
      validFrom: '',
      validUntil: ''
    });
    setShowCreateForm(false);
    setEditingOffer(null);
  };

  const handleEdit = (offer: ItemOffer) => {
    setEditingOffer(offer);
    setFormData({
      offerName: offer.offerName,
      offerType: offer.offerType,
      discountType: offer.discountType,
      discountValue: offer.discountValue.toString(),
      targetItems: offer.targetItems,
      comboItems: offer.comboItems || [],
      minQuantity: offer.minQuantity.toString(),
      maxQuantity: offer.maxQuantity.toString(),
      outlets: offer.outlets,
      customerType: offer.customerType,
      minOrderValue: offer.minOrderValue.toString(),
      maxDiscount: offer.maxDiscount.toString(),
      maxUsagePerCustomer: offer.maxUsagePerCustomer.toString(),
      totalUsageLimit: offer.totalUsageLimit.toString(),
      description: offer.description,
      validFrom: offer.validFrom,
      validUntil: offer.validUntil
    });
    setShowCreateForm(true);
  };

  const handleDelete = (id: string) => {
    setItemOffers(prev => prev.filter(offer => offer.id !== id));
    toast({
      title: "Offer Deleted",
      description: "Item-based offer has been deleted successfully.",
      variant: "destructive"
    });
  };

  const toggleStatus = (id: string) => {
    setItemOffers(prev => prev.map(offer => 
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

  const getOfferTypeBadge = (type: string) => {
    const colors = {
      discount: 'bg-blue-100 text-blue-800',
      bogo: 'bg-green-100 text-green-800',
      combo: 'bg-purple-100 text-purple-800',
      bundle: 'bg-orange-100 text-orange-800'
    };
    return (
      <Badge className={colors[type as keyof typeof colors]}>
        {type.toUpperCase()}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="mb-8">
          <Link to="/mis/promotion" className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Promotions
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Package className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-3xl">Item-based Offers</CardTitle>
                  <CardDescription>Create and manage product-specific promotions</CardDescription>
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
                    {editingOffer ? 'Edit Item Offer' : 'Create Item Offer'}
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
                          placeholder="e.g., Pizza Combo Deal"
                        />
                      </div>
                      <div>
                        <Label htmlFor="offerType">Offer Type *</Label>
                        <Select
                          value={formData.offerType}
                          onValueChange={(value) => handleSelectChange('offerType', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="discount">Item Discount</SelectItem>
                            <SelectItem value="bogo">Buy One Get One</SelectItem>
                            <SelectItem value="combo">Combo Deal</SelectItem>
                            <SelectItem value="bundle">Bundle Offer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {formData.offerType !== 'bogo' && (
                        <>
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
                              </SelectContent>
                            </Select>
                          </div>
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
                        </>
                      )}
                      <div>
                        <Label htmlFor="minQuantity">Minimum Quantity</Label>
                        <Input
                          id="minQuantity"
                          name="minQuantity"
                          type="number"
                          value={formData.minQuantity}
                          onChange={handleInputChange}
                          min="1"
                          placeholder="1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="maxQuantity">Maximum Quantity</Label>
                        <Input
                          id="maxQuantity"
                          name="maxQuantity"
                          type="number"
                          value={formData.maxQuantity}
                          onChange={handleInputChange}
                          min="1"
                          placeholder="10"
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

                    {/* Target Items Selection */}
                    <div>
                      <Label>Target Items *</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2 max-h-40 overflow-y-auto border rounded p-2">
                        {menuItems.map(item => (
                          <label key={item} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.targetItems.includes(item)}
                              onChange={() => handleMultiSelectChange('targetItems', item)}
                              className="rounded"
                            />
                            <span className="text-sm">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Combo Items (for combo deals) */}
                    {formData.offerType === 'combo' && (
                      <div>
                        <Label>Combo Items (Optional)</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2 max-h-40 overflow-y-auto border rounded p-2">
                          {menuItems.map(item => (
                            <label key={item} className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={formData.comboItems.includes(item)}
                                onChange={() => handleMultiSelectChange('comboItems', item)}
                                className="rounded"
                              />
                              <span className="text-sm">{item}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

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
                        placeholder="Describe the item-based offer..."
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
              {itemOffers.map((offer) => (
                <Card key={offer.id} className="border-l-4 border-l-purple-500">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{offer.offerName}</h3>
                        <p className="text-gray-600 mt-1">{offer.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(offer.status)}
                        {getOfferTypeBadge(offer.offerType)}
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
                        <div className="text-lg font-bold text-purple-600">
                          {offer.offerType === 'bogo' ? 'BOGO' : 
                           offer.discountType === 'percentage' ? `${offer.discountValue}%` : `₹${offer.discountValue}`}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Quantity:</span>
                        <div>{offer.minQuantity} - {offer.maxQuantity}</div>
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
                        <span className="font-medium text-gray-700">Target Items: </span>
                        {offer.targetItems.map(item => (
                          <Badge key={item} variant="outline" className="mr-1">
                            {item}
                          </Badge>
                        ))}
                      </div>
                      {offer.comboItems && offer.comboItems.length > 0 && (
                        <div>
                          <span className="font-medium text-gray-700">Combo Items: </span>
                          {offer.comboItems.map(item => (
                            <Badge key={item} variant="outline" className="mr-1 bg-green-50">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <div>
                        <span className="font-medium text-gray-700">Outlets: </span>
                        {offer.outlets.map(outlet => (
                          <Badge key={outlet} variant="outline" className="mr-1">
                            {outlet}
                          </Badge>
                        ))}
                      </div>
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

export default ItemBasedOffers;
