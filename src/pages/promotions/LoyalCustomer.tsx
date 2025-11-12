import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, Plus, Edit, Trash2, Play, Pause, Star, Gift, Crown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface LoyaltyTier {
  id: string;
  tierName: string;
  minSpend: number;
  minVisits: number;
  pointsMultiplier: number;
  benefits: string[];
  discountPercentage: number;
  status: 'active' | 'inactive';
}

interface LoyaltyReward {
  id: string;
  rewardName: string;
  pointsRequired: number;
  rewardType: 'discount' | 'freeItem' | 'cashback' | 'upgrade';
  rewardValue: string;
  applicableItems: string[];
  maxRedemptions: number;
  totalRedeemed: number;
  status: 'active' | 'inactive';
  validFrom: string;
  validUntil: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  currentTier: string;
  totalSpend: number;
  totalVisits: number;
  currentPoints: number;
  lifetimePoints: number;
  joinDate: string;
  lastVisit: string;
}

const LoyalCustomer = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateTierForm, setShowCreateTierForm] = useState(false);
  const [showCreateRewardForm, setShowCreateRewardForm] = useState(false);

  // Loyalty Tiers
  const [loyaltyTiers, setLoyaltyTiers] = useState<LoyaltyTier[]>([
    {
      id: '1',
      tierName: 'Bronze',
      minSpend: 0,
      minVisits: 0,
      pointsMultiplier: 1,
      benefits: ['1 point per ₹10 spent', 'Birthday discount'],
      discountPercentage: 5,
      status: 'active'
    },
    {
      id: '2',
      tierName: 'Silver',
      minSpend: 5000,
      minVisits: 10,
      pointsMultiplier: 1.5,
      benefits: ['1.5 points per ₹10 spent', 'Priority seating', 'Free dessert on birthday'],
      discountPercentage: 10,
      status: 'active'
    },
    {
      id: '3',
      tierName: 'Gold',
      minSpend: 15000,
      minVisits: 25,
      pointsMultiplier: 2,
      benefits: ['2 points per ₹10 spent', 'Free appetizer monthly', 'Exclusive menu access'],
      discountPercentage: 15,
      status: 'active'
    },
    {
      id: '4',
      tierName: 'Platinum',
      minSpend: 30000,
      minVisits: 50,
      pointsMultiplier: 3,
      benefits: ['3 points per ₹10 spent', 'Personal chef consultation', 'VIP events access'],
      discountPercentage: 20,
      status: 'active'
    }
  ]);

  // Loyalty Rewards
  const [loyaltyRewards, setLoyaltyRewards] = useState<LoyaltyReward[]>([
    {
      id: '1',
      rewardName: 'Free Appetizer',
      pointsRequired: 500,
      rewardType: 'freeItem',
      rewardValue: 'Any appetizer up to ₹200',
      applicableItems: ['Appetizers'],
      maxRedemptions: 100,
      totalRedeemed: 23,
      status: 'active',
      validFrom: '2024-11-01',
      validUntil: '2024-12-31'
    },
    {
      id: '2',
      rewardName: '10% Off Next Order',
      pointsRequired: 300,
      rewardType: 'discount',
      rewardValue: '10% discount',
      applicableItems: ['All Items'],
      maxRedemptions: 200,
      totalRedeemed: 67,
      status: 'active',
      validFrom: '2024-11-01',
      validUntil: '2024-12-31'
    },
    {
      id: '3',
      rewardName: 'Free Main Course',
      pointsRequired: 1000,
      rewardType: 'freeItem',
      rewardValue: 'Any main course up to ₹400',
      applicableItems: ['Main Course'],
      maxRedemptions: 50,
      totalRedeemed: 12,
      status: 'active',
      validFrom: '2024-11-01',
      validUntil: '2024-12-31'
    }
  ]);

  // Sample Customers
  const [customers] = useState<Customer[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+91 9876543210',
      currentTier: 'Gold',
      totalSpend: 18500,
      totalVisits: 28,
      currentPoints: 850,
      lifetimePoints: 2340,
      joinDate: '2024-01-15',
      lastVisit: '2024-11-05'
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      phone: '+91 9876543211',
      currentTier: 'Silver',
      totalSpend: 7200,
      totalVisits: 15,
      currentPoints: 420,
      lifetimePoints: 1080,
      joinDate: '2024-03-20',
      lastVisit: '2024-11-07'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+91 9876543212',
      currentTier: 'Platinum',
      totalSpend: 45000,
      totalVisits: 65,
      currentPoints: 1250,
      lifetimePoints: 6750,
      joinDate: '2023-08-10',
      lastVisit: '2024-11-06'
    }
  ]);

  const getTierBadge = (tierName: string) => {
    const colors = {
      Bronze: 'bg-amber-100 text-amber-800',
      Silver: 'bg-gray-100 text-gray-800',
      Gold: 'bg-yellow-100 text-yellow-800',
      Platinum: 'bg-purple-100 text-purple-800'
    };
    const icons = {
      Bronze: <Star className="w-3 h-3" />,
      Silver: <Star className="w-3 h-3" />,
      Gold: <Crown className="w-3 h-3" />,
      Platinum: <Crown className="w-3 h-3" />
    };
    return (
      <Badge className={`${colors[tierName as keyof typeof colors]} flex items-center gap-1`}>
        {icons[tierName as keyof typeof icons]}
        {tierName}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' ? 
      <Badge className="bg-green-500">Active</Badge> : 
      <Badge className="bg-gray-500">Inactive</Badge>;
  };

  const getRewardTypeBadge = (type: string) => {
    const colors = {
      discount: 'bg-blue-100 text-blue-800',
      freeItem: 'bg-green-100 text-green-800',
      cashback: 'bg-purple-100 text-purple-800',
      upgrade: 'bg-orange-100 text-orange-800'
    };
    return (
      <Badge className={colors[type as keyof typeof colors]}>
        {type === 'freeItem' ? 'Free Item' : type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="mb-8">
          <Link to="/mis/promotion" className="inline-flex items-center text-pink-600 hover:text-pink-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Promotions
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-pink-100 p-3 rounded-lg">
                <Heart className="w-8 h-8 text-pink-600" />
              </div>
              <div>
                <CardTitle className="text-3xl">Loyal Customer Program</CardTitle>
                <CardDescription>Manage loyalty rewards and customer tiers</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="tiers">Loyalty Tiers</TabsTrigger>
                <TabsTrigger value="rewards">Rewards</TabsTrigger>
                <TabsTrigger value="customers">Customers</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Total Customers</p>
                          <p className="text-3xl font-bold text-gray-800">{customers.length}</p>
                        </div>
                        <Heart className="w-12 h-12 text-pink-500" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Active Tiers</p>
                          <p className="text-3xl font-bold text-gray-800">{loyaltyTiers.filter(t => t.status === 'active').length}</p>
                        </div>
                        <Crown className="w-12 h-12 text-yellow-500" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Active Rewards</p>
                          <p className="text-3xl font-bold text-gray-800">{loyaltyRewards.filter(r => r.status === 'active').length}</p>
                        </div>
                        <Gift className="w-12 h-12 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Total Redemptions</p>
                          <p className="text-3xl font-bold text-gray-800">{loyaltyRewards.reduce((sum, r) => sum + r.totalRedeemed, 0)}</p>
                        </div>
                        <Star className="w-12 h-12 text-purple-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Tier Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {loyaltyTiers.map(tier => {
                          const customerCount = customers.filter(c => c.currentTier === tier.tierName).length;
                          const percentage = customers.length > 0 ? (customerCount / customers.length) * 100 : 0;
                          return (
                            <div key={tier.id} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {getTierBadge(tier.tierName)}
                                <span className="text-sm">{customerCount} customers</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-pink-500 rounded-full"
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                                <span className="text-sm text-gray-600">{percentage.toFixed(0)}%</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Top Rewards</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {loyaltyRewards
                          .sort((a, b) => b.totalRedeemed - a.totalRedeemed)
                          .slice(0, 5)
                          .map(reward => (
                            <div key={reward.id} className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">{reward.rewardName}</div>
                                <div className="text-sm text-gray-600">{reward.pointsRequired} points</div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-pink-600">{reward.totalRedeemed}</div>
                                <div className="text-sm text-gray-600">redeemed</div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Loyalty Tiers Tab */}
              <TabsContent value="tiers" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Loyalty Tiers</h3>
                  <Button onClick={() => setShowCreateTierForm(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Tier
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {loyaltyTiers.map(tier => (
                    <Card key={tier.id} className="border-l-4 border-l-pink-500">
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-2">
                            {getTierBadge(tier.tierName)}
                            {getStatusBadge(tier.status)}
                          </div>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-3 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Min Spend:</span>
                            <div>₹{tier.minSpend.toLocaleString()}</div>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Min Visits:</span>
                            <div>{tier.minVisits}</div>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Points Multiplier:</span>
                            <div>{tier.pointsMultiplier}x</div>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Discount:</span>
                            <div>{tier.discountPercentage}%</div>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Benefits:</span>
                            <ul className="mt-1 space-y-1">
                              {tier.benefits.map((benefit, index) => (
                                <li key={index} className="text-xs text-gray-600">• {benefit}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Rewards Tab */}
              <TabsContent value="rewards" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Loyalty Rewards</h3>
                  <Button onClick={() => setShowCreateRewardForm(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Reward
                  </Button>
                </div>

                <div className="space-y-4">
                  {loyaltyRewards.map(reward => (
                    <Card key={reward.id} className="border-l-4 border-l-green-500">
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-lg font-semibold">{reward.rewardName}</h4>
                            <p className="text-gray-600">{reward.rewardValue}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(reward.status)}
                            {getRewardTypeBadge(reward.rewardType)}
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Points Required:</span>
                            <div className="text-lg font-bold text-green-600">{reward.pointsRequired}</div>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Redeemed:</span>
                            <div>{reward.totalRedeemed} / {reward.maxRedemptions}</div>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Valid From:</span>
                            <div>{reward.validFrom}</div>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Valid Until:</span>
                            <div>{reward.validUntil}</div>
                          </div>
                        </div>

                        <div className="mt-4">
                          <span className="font-medium text-gray-700">Applicable Items: </span>
                          {reward.applicableItems.map(item => (
                            <Badge key={item} variant="outline" className="mr-1">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Customers Tab */}
              <TabsContent value="customers" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Loyalty Customers</h3>
                  <div className="flex gap-2">
                    <Input placeholder="Search customers..." className="w-64" />
                    <Button variant="outline">Export</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {customers.map(customer => (
                    <Card key={customer.id}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-lg font-semibold">{customer.name}</h4>
                            <p className="text-gray-600">{customer.email} • {customer.phone}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getTierBadge(customer.currentTier)}
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Total Spend:</span>
                            <div className="text-lg font-bold text-pink-600">₹{customer.totalSpend.toLocaleString()}</div>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Total Visits:</span>
                            <div className="text-lg font-bold">{customer.totalVisits}</div>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Current Points:</span>
                            <div className="text-lg font-bold text-green-600">{customer.currentPoints}</div>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Lifetime Points:</span>
                            <div>{customer.lifetimePoints}</div>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Member Since:</span>
                            <div>{customer.joinDate}</div>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Last Visit:</span>
                            <div>{customer.lastVisit}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoyalCustomer;
