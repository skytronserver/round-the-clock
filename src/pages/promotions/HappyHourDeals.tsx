import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Plus, Edit, Trash2, Eye, Play, Pause } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface HappyHourDeal {
  id: string;
  dealName: string;
  discountType: 'percentage' | 'fixed' | 'bogo';
  discountValue: number;
  startTime: string;
  endTime: string;
  daysOfWeek: string[];
  applicableItems: string[];
  outlets: string[];
  minOrderValue: number;
  maxDiscount: number;
  status: 'active' | 'inactive' | 'scheduled';
  totalUsed: number;
  description: string;
  validFrom: string;
  validUntil: string;
}

const HappyHourDeals = () => {
  const { toast } = useToast();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingDeal, setEditingDeal] = useState<HappyHourDeal | null>(null);

  const [formData, setFormData] = useState({
    dealName: '',
    discountType: 'percentage' as const,
    discountValue: '',
    startTime: '',
    endTime: '',
    daysOfWeek: [] as string[],
    applicableItems: [] as string[],
    outlets: [] as string[],
    minOrderValue: '',
    maxDiscount: '',
    description: '',
    validFrom: '',
    validUntil: ''
  });

  // Sample data
  const [happyHourDeals, setHappyHourDeals] = useState<HappyHourDeal[]>([
    {
      id: '1',
      dealName: 'Evening Happy Hour',
      discountType: 'percentage',
      discountValue: 20,
      startTime: '17:00',
      endTime: '19:00',
      daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      applicableItems: ['Beverages', 'Appetizers'],
      outlets: ['Main Branch', 'Mall Branch'],
      minOrderValue: 300,
      maxDiscount: 150,
      status: 'active',
      totalUsed: 234,
      description: '20% off on beverages and appetizers during evening hours',
      validFrom: '2024-11-01',
      validUntil: '2024-12-31'
    },
    {
      id: '2',
      dealName: 'Lunch Special',
      discountType: 'fixed',
      discountValue: 50,
      startTime: '12:00',
      endTime: '14:30',
      daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      applicableItems: ['Main Course', 'Combo Meals'],
      outlets: ['All Outlets'],
      minOrderValue: 200,
      maxDiscount: 50,
      status: 'active',
      totalUsed: 156,
      description: 'Flat ₹50 off on lunch combos',
      validFrom: '2024-11-01',
      validUntil: '2024-11-30'
    },
    {
      id: '3',
      dealName: 'Weekend Brunch',
      discountType: 'bogo',
      discountValue: 0,
      startTime: '10:00',
      endTime: '12:00',
      daysOfWeek: ['Saturday', 'Sunday'],
      applicableItems: ['Breakfast', 'Brunch Items'],
      outlets: ['Downtown Branch'],
      minOrderValue: 0,
      maxDiscount: 0,
      status: 'scheduled',
      totalUsed: 0,
      description: 'Buy one get one free on weekend brunch items',
      validFrom: '2024-11-15',
      validUntil: '2024-12-15'
    }
  ]);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const itemCategories = ['Beverages', 'Appetizers', 'Main Course', 'Desserts', 'Combo Meals', 'Breakfast', 'Brunch Items'];
  const outlets = ['All Outlets', 'Main Branch', 'Mall Branch', 'Airport Branch', 'Downtown Branch'];

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
    
    const newDeal: HappyHourDeal = {
      id: editingDeal ? editingDeal.id : Date.now().toString(),
      dealName: formData.dealName,
      discountType: formData.discountType,
      discountValue: parseFloat(formData.discountValue) || 0,
      startTime: formData.startTime,
      endTime: formData.endTime,
      daysOfWeek: formData.daysOfWeek,
      applicableItems: formData.applicableItems,
      outlets: formData.outlets,
      minOrderValue: parseFloat(formData.minOrderValue) || 0,
      maxDiscount: parseFloat(formData.maxDiscount) || 0,
      status: 'scheduled',
      totalUsed: editingDeal ? editingDeal.totalUsed : 0,
      description: formData.description,
      validFrom: formData.validFrom,
      validUntil: formData.validUntil
    };

    if (editingDeal) {
      setHappyHourDeals(prev => prev.map(deal => deal.id === editingDeal.id ? newDeal : deal));
      toast({
        title: "Deal Updated",
        description: "Happy hour deal has been updated successfully.",
      });
    } else {
      setHappyHourDeals(prev => [...prev, newDeal]);
      toast({
        title: "Deal Created",
        description: "New happy hour deal has been created successfully.",
      });
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      dealName: '',
      discountType: 'percentage',
      discountValue: '',
      startTime: '',
      endTime: '',
      daysOfWeek: [],
      applicableItems: [],
      outlets: [],
      minOrderValue: '',
      maxDiscount: '',
      description: '',
      validFrom: '',
      validUntil: ''
    });
    setShowCreateForm(false);
    setEditingDeal(null);
  };

  const handleEdit = (deal: HappyHourDeal) => {
    setEditingDeal(deal);
    setFormData({
      dealName: deal.dealName,
      discountType: deal.discountType,
      discountValue: deal.discountValue.toString(),
      startTime: deal.startTime,
      endTime: deal.endTime,
      daysOfWeek: deal.daysOfWeek,
      applicableItems: deal.applicableItems,
      outlets: deal.outlets,
      minOrderValue: deal.minOrderValue.toString(),
      maxDiscount: deal.maxDiscount.toString(),
      description: deal.description,
      validFrom: deal.validFrom,
      validUntil: deal.validUntil
    });
    setShowCreateForm(true);
  };

  const handleDelete = (id: string) => {
    setHappyHourDeals(prev => prev.filter(deal => deal.id !== id));
    toast({
      title: "Deal Deleted",
      description: "Happy hour deal has been deleted successfully.",
      variant: "destructive"
    });
  };

  const toggleStatus = (id: string) => {
    setHappyHourDeals(prev => prev.map(deal => 
      deal.id === id 
        ? { ...deal, status: deal.status === 'active' ? 'inactive' : 'active' as const }
        : deal
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

  const getDiscountDisplay = (deal: HappyHourDeal) => {
    switch (deal.discountType) {
      case 'percentage':
        return `${deal.discountValue}%`;
      case 'fixed':
        return `₹${deal.discountValue}`;
      case 'bogo':
        return 'BOGO';
      default:
        return 'N/A';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="mb-8">
          <Link to="/mis/promotion" className="inline-flex items-center text-yellow-600 hover:text-yellow-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Promotions
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <Clock className="w-8 h-8 text-yellow-600" />
                </div>
                <div>
                  <CardTitle className="text-3xl">Happy Hour Deals</CardTitle>
                  <CardDescription>Create and manage time-based special offers</CardDescription>
                </div>
              </div>
              <Button onClick={() => setShowCreateForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create New Deal
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Create/Edit Form Modal */}
            {showCreateForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    {editingDeal ? 'Edit Happy Hour Deal' : 'Create Happy Hour Deal'}
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="dealName">Deal Name *</Label>
                        <Input
                          id="dealName"
                          name="dealName"
                          value={formData.dealName}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g., Evening Happy Hour"
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
                        <Label htmlFor="startTime">Start Time *</Label>
                        <Input
                          id="startTime"
                          name="startTime"
                          type="time"
                          value={formData.startTime}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="endTime">End Time *</Label>
                        <Input
                          id="endTime"
                          name="endTime"
                          type="time"
                          value={formData.endTime}
                          onChange={handleInputChange}
                          required
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
                    </div>

                    {/* Days of Week Selection */}
                    <div>
                      <Label>Days of Week *</Label>
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

                    {/* Outlets */}
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
                        placeholder="Describe the happy hour deal..."
                        rows={3}
                      />
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                      <Button type="button" variant="outline" onClick={resetForm}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingDeal ? 'Update Deal' : 'Create Deal'}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Deals List */}
            <div className="space-y-4">
              {happyHourDeals.map((deal) => (
                <Card key={deal.id} className="border-l-4 border-l-yellow-500">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{deal.dealName}</h3>
                        <p className="text-gray-600 mt-1">{deal.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(deal.status)}
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toggleStatus(deal.id)}
                          >
                            {deal.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleEdit(deal)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDelete(deal.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Discount:</span>
                        <div className="text-lg font-bold text-yellow-600">{getDiscountDisplay(deal)}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Time:</span>
                        <div>{deal.startTime} - {deal.endTime}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Usage:</span>
                        <div>{deal.totalUsed} times</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Valid Until:</span>
                        <div>{deal.validUntil}</div>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div>
                        <span className="font-medium text-gray-700">Days: </span>
                        {deal.daysOfWeek.map(day => (
                          <Badge key={day} variant="outline" className="mr-1">
                            {day.slice(0, 3)}
                          </Badge>
                        ))}
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Items: </span>
                        {deal.applicableItems.map(item => (
                          <Badge key={item} variant="outline" className="mr-1">
                            {item}
                          </Badge>
                        ))}
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Outlets: </span>
                        {deal.outlets.map(outlet => (
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

export default HappyHourDeals;
