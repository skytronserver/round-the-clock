import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Package, AlertTriangle, TrendingUp, Search, Download, Store } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface InventoryItem {
  id: string;
  itemName: string;
  category: string;
  itemType: 'raw-ingredients' | 'ready-mixes' | 'ready-made-products' | 'final-items';
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  lastUpdated: string;
  status: 'good' | 'low' | 'critical';
  source: 'dispatch' | 'purchase' | 'local' | 'preparation';
  sourceRef?: string;
}

const OutletInventory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [itemTypeFilter, setItemTypeFilter] = useState('all');
  const [selectedOutlet, setSelectedOutlet] = useState('main');

  // Mock outlet-level inventory data with proper item type categorization
  const [inventoryItems] = useState<InventoryItem[]>([
    // Raw Ingredients (from purchase)
    { id: '1', itemName: 'Tomatoes', category: 'vegetables', itemType: 'raw-ingredients', currentStock: 45, minStock: 20, maxStock: 100, unit: 'kg', lastUpdated: '2024-11-06', status: 'good', source: 'purchase', sourceRef: 'PR-2024-003' },
    { id: '2', itemName: 'Onions', category: 'vegetables', itemType: 'raw-ingredients', currentStock: 15, minStock: 20, maxStock: 80, unit: 'kg', lastUpdated: '2024-11-06', status: 'low', source: 'purchase', sourceRef: 'PR-2024-003' },
    { id: '3', itemName: 'Potatoes', category: 'vegetables', itemType: 'raw-ingredients', currentStock: 35, minStock: 20, maxStock: 80, unit: 'kg', lastUpdated: '2024-11-06', status: 'good', source: 'purchase', sourceRef: 'PR-2024-003' },
    { id: '4', itemName: 'Rice', category: 'grains', itemType: 'raw-ingredients', currentStock: 150, minStock: 50, maxStock: 200, unit: 'kg', lastUpdated: '2024-11-05', status: 'good', source: 'local' },
    { id: '5', itemName: 'Chicken', category: 'meat', itemType: 'raw-ingredients', currentStock: 8, minStock: 15, maxStock: 50, unit: 'kg', lastUpdated: '2024-11-06', status: 'critical', source: 'local' },
    
    // Raw Ingredients (from company dispatch)
    { id: '6', itemName: 'Fresh Vegetables Mix', category: 'vegetables', itemType: 'raw-ingredients', currentStock: 25, minStock: 10, maxStock: 50, unit: 'kg', lastUpdated: '2024-11-06', status: 'good', source: 'dispatch', sourceRef: '#DISP003' },
    { id: '7', itemName: 'Premium Spices', category: 'spices', itemType: 'raw-ingredients', currentStock: 12, minStock: 5, maxStock: 20, unit: 'kg', lastUpdated: '2024-11-06', status: 'good', source: 'dispatch', sourceRef: '#DISP003' },
    
    // Ready Mixes (from company dispatch)
    { id: '8', itemName: 'Pizza Sauce', category: 'sauces', itemType: 'ready-mixes', currentStock: 12, minStock: 5, maxStock: 25, unit: 'l', lastUpdated: '2024-11-06', status: 'good', source: 'dispatch', sourceRef: '#DISP001' },
    { id: '9', itemName: 'Biryani Mix', category: 'spice-mix', itemType: 'ready-mixes', currentStock: 15, minStock: 8, maxStock: 30, unit: 'kg', lastUpdated: '2024-11-06', status: 'good', source: 'dispatch', sourceRef: '#DISP001' },
    { id: '10', itemName: 'Curry Base', category: 'sauces', itemType: 'ready-mixes', currentStock: 8, minStock: 10, maxStock: 25, unit: 'kg', lastUpdated: '2024-11-06', status: 'low', source: 'dispatch', sourceRef: '#DISP002' },
    { id: '11', itemName: 'Tandoori Masala', category: 'spice-mix', itemType: 'ready-mixes', currentStock: 10, minStock: 5, maxStock: 20, unit: 'kg', lastUpdated: '2024-11-05', status: 'good', source: 'dispatch', sourceRef: '#DISP002' },
    
    // Ready Made Products (from company dispatch)
    { id: '12', itemName: 'Coca-Cola', category: 'beverages', itemType: 'ready-made-products', currentStock: 120, minStock: 50, maxStock: 200, unit: 'bottles', lastUpdated: '2024-11-06', status: 'good', source: 'dispatch', sourceRef: '#DISP001' },
    { id: '13', itemName: 'Pepsi', category: 'beverages', itemType: 'ready-made-products', currentStock: 80, minStock: 50, maxStock: 200, unit: 'bottles', lastUpdated: '2024-11-06', status: 'good', source: 'dispatch', sourceRef: '#DISP001' },
    { id: '14', itemName: 'Mineral Water', category: 'beverages', itemType: 'ready-made-products', currentStock: 200, minStock: 100, maxStock: 400, unit: 'bottles', lastUpdated: '2024-11-06', status: 'good', source: 'dispatch', sourceRef: '#DISP002' },
    { id: '15', itemName: 'Packaged Snacks', category: 'snacks', itemType: 'ready-made-products', currentStock: 45, minStock: 20, maxStock: 80, unit: 'packs', lastUpdated: '2024-11-06', status: 'good', source: 'dispatch', sourceRef: '#DISP002' },
    
    // Final Items (freshly prepared at outlet)
    { id: '16', itemName: 'Margherita Pizza', category: 'pizza', itemType: 'final-items', currentStock: 8, minStock: 5, maxStock: 15, unit: 'pcs', lastUpdated: '2024-11-07', status: 'good', source: 'preparation', sourceRef: 'PREP-001' },
    { id: '17', itemName: 'Chicken Biryani', category: 'biryani', itemType: 'final-items', currentStock: 12, minStock: 8, maxStock: 20, unit: 'portions', lastUpdated: '2024-11-07', status: 'good', source: 'preparation', sourceRef: 'PREP-002' },
    { id: '18', itemName: 'Butter Chicken', category: 'curry', itemType: 'final-items', currentStock: 6, minStock: 5, maxStock: 15, unit: 'portions', lastUpdated: '2024-11-07', status: 'good', source: 'preparation', sourceRef: 'PREP-003' },
    { id: '19', itemName: 'Fresh Naan', category: 'bread', itemType: 'final-items', currentStock: 20, minStock: 15, maxStock: 40, unit: 'pcs', lastUpdated: '2024-11-07', status: 'good', source: 'preparation', sourceRef: 'PREP-004' },
    
    // Final Items (dispatched from company - pre-prepared)
    { id: '20', itemName: 'Premium Chicken Tikka', category: 'tandoori', itemType: 'final-items', currentStock: 15, minStock: 10, maxStock: 25, unit: 'portions', lastUpdated: '2024-11-06', status: 'good', source: 'dispatch', sourceRef: '#DISP004' },
    { id: '21', itemName: 'Gourmet Pasta', category: 'pasta', itemType: 'final-items', currentStock: 8, minStock: 5, maxStock: 20, unit: 'portions', lastUpdated: '2024-11-06', status: 'good', source: 'dispatch', sourceRef: '#DISP004' },
    { id: '22', itemName: 'Signature Dessert', category: 'dessert', itemType: 'final-items', currentStock: 12, minStock: 8, maxStock: 18, unit: 'portions', lastUpdated: '2024-11-06', status: 'good', source: 'dispatch', sourceRef: '#DISP005' },
    { id: '23', itemName: 'Chef Special Soup', category: 'soup', itemType: 'final-items', currentStock: 6, minStock: 5, maxStock: 15, unit: 'portions', lastUpdated: '2024-11-06', status: 'good', source: 'dispatch', sourceRef: '#DISP005' },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'good':
        return <Badge className="bg-green-500">Good Stock</Badge>;
      case 'low':
        return <Badge className="bg-yellow-500">Low Stock</Badge>;
      case 'critical':
        return <Badge className="bg-red-500">Critical</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getItemTypeBadge = (itemType: string) => {
    switch (itemType) {
      case 'raw-ingredients':
        return <Badge className="bg-blue-500">Raw Ingredients</Badge>;
      case 'ready-mixes':
        return <Badge className="bg-orange-500">Ready Mixes</Badge>;
      case 'ready-made-products':
        return <Badge className="bg-purple-500">Ready Made</Badge>;
      case 'final-items':
        return <Badge className="bg-green-600">Final Items</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getStockPercentage = (current: number, min: number, max: number) => {
    return ((current - min) / (max - min)) * 100;
  };

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.itemName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesItemType = itemTypeFilter === 'all' || item.itemType === itemTypeFilter;
    return matchesSearch && matchesCategory && matchesItemType;
  });

  const getItemsByType = (type: string) => {
    return inventoryItems.filter(item => item.itemType === type);
  };

  const criticalItems = inventoryItems.filter(item => item.status === 'critical');
  const lowStockItems = inventoryItems.filter(item => item.status === 'low');
  const totalValue = inventoryItems.reduce((sum, item) => sum + item.currentStock, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="mb-8">
          <Link to="/mis/inventory" className="inline-flex items-center text-green-600 hover:text-green-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Inventory
          </Link>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Store className="w-10 h-10 text-green-600" />
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Outlet Inventory</h1>
                <p className="text-gray-600">Individual outlet stock management</p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Link to="/mis/sale">
                <Button variant="outline" size="sm">Sale</Button>
              </Link>
              <Link to="/mis/return">
                <Button variant="outline" size="sm">Return</Button>
              </Link>
              <Link to="/mis/wastage">
                <Button variant="outline" size="sm">Wastage</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Outlet Selector */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Label htmlFor="outlet" className="font-semibold">Select Outlet:</Label>
              <Select value={selectedOutlet} onValueChange={setSelectedOutlet}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Select outlet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main">Main Branch</SelectItem>
                  <SelectItem value="downtown">Downtown Branch</SelectItem>
                  <SelectItem value="airport">Airport Branch</SelectItem>
                  <SelectItem value="mall">Mall Branch</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Items</p>
                  <p className="text-3xl font-bold text-gray-800">{inventoryItems.length}</p>
                </div>
                <Package className="w-12 h-12 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Critical Stock</p>
                  <p className="text-3xl font-bold text-red-600">{criticalItems.length}</p>
                </div>
                <AlertTriangle className="w-12 h-12 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Low Stock</p>
                  <p className="text-3xl font-bold text-yellow-600">{lowStockItems.length}</p>
                </div>
                <TrendingUp className="w-12 h-12 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Units</p>
                  <p className="text-3xl font-bold text-green-600">{totalValue.toFixed(0)}</p>
                </div>
                <Package className="w-12 h-12 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <CardTitle>Outlet Stock Levels</CardTitle>
            <CardDescription>View and monitor outlet-specific inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
                  <TabsTrigger value="all">All Items</TabsTrigger>
                  <TabsTrigger value="raw-ingredients">Raw Ingredients</TabsTrigger>
                  <TabsTrigger value="ready-mixes">Ready Mixes</TabsTrigger>
                  <TabsTrigger value="ready-made-products">Ready Made</TabsTrigger>
                  <TabsTrigger value="final-items">Final Items</TabsTrigger>
                  <TabsTrigger value="critical">Critical</TabsTrigger>
                </TabsList>

                <div className="flex gap-4 w-full md:w-auto">
                  <div className="relative flex-1 md:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search items..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={itemTypeFilter} onValueChange={setItemTypeFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Item Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="raw-ingredients">Raw Ingredients</SelectItem>
                      <SelectItem value="ready-mixes">Ready Mixes</SelectItem>
                      <SelectItem value="ready-made-products">Ready Made Products</SelectItem>
                      <SelectItem value="final-items">Final Items</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="beverages">Beverages</SelectItem>
                      <SelectItem value="vegetables">Vegetables</SelectItem>
                      <SelectItem value="grains">Grains</SelectItem>
                      <SelectItem value="meat">Meat</SelectItem>
                      <SelectItem value="spices">Spices</SelectItem>
                      <SelectItem value="sauces">Sauces</SelectItem>
                      <SelectItem value="pizza">Pizza</SelectItem>
                      <SelectItem value="biryani">Biryani</SelectItem>
                      <SelectItem value="curry">Curry</SelectItem>
                      <SelectItem value="bread">Bread</SelectItem>
                      <SelectItem value="snacks">Snacks</SelectItem>
                      <SelectItem value="tandoori">Tandoori</SelectItem>
                      <SelectItem value="pasta">Pasta</SelectItem>
                      <SelectItem value="dessert">Dessert</SelectItem>
                      <SelectItem value="soup">Soup</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <TabsContent value="all" className="space-y-4">
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item Name</TableHead>
                        <TableHead>Item Type</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Current Stock</TableHead>
                        <TableHead>Min Stock</TableHead>
                        <TableHead>Max Stock</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Updated</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.itemName}</TableCell>
                          <TableCell>{getItemTypeBadge(item.itemType)}</TableCell>
                          <TableCell className="capitalize">{item.category}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <Badge 
                                variant="outline" 
                                className={`w-fit ${
                                  item.source === 'dispatch' ? 'border-cyan-500 text-cyan-700' :
                                  item.source === 'purchase' ? 'border-green-500 text-green-700' :
                                  item.source === 'preparation' ? 'border-purple-500 text-purple-700' :
                                  'border-gray-500 text-gray-700'
                                }`}
                              >
                                {item.source === 'dispatch' ? 'From Company' :
                                 item.source === 'purchase' ? 'Purchase' :
                                 item.source === 'preparation' ? 'Prepared at Outlet' : 'Local'}
                              </Badge>
                              {item.sourceRef && (
                                <span className="text-xs text-gray-500 mt-1">{item.sourceRef}</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{item.currentStock}</span>
                              <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${
                                    item.status === 'good' ? 'bg-green-500' :
                                    item.status === 'low' ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${Math.min(100, getStockPercentage(item.currentStock, item.minStock, item.maxStock))}%` }}
                                />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{item.minStock}</TableCell>
                          <TableCell>{item.maxStock}</TableCell>
                          <TableCell>{item.unit}</TableCell>
                          <TableCell>{getStatusBadge(item.status)}</TableCell>
                          <TableCell>{item.lastUpdated}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              {/* Raw Ingredients Tab */}
              <TabsContent value="raw-ingredients" className="space-y-4">
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Current Stock</TableHead>
                        <TableHead>Min Stock</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getItemsByType('raw-ingredients').map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.itemName}</TableCell>
                          <TableCell className="capitalize">{item.category}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={`w-fit ${
                                item.source === 'dispatch' ? 'border-cyan-500 text-cyan-700' :
                                item.source === 'purchase' ? 'border-green-500 text-green-700' :
                                'border-gray-500 text-gray-700'
                              }`}
                            >
                              {item.source === 'dispatch' ? 'From Company' :
                               item.source === 'purchase' ? 'Purchase' : 'Local'}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-semibold">{item.currentStock}</TableCell>
                          <TableCell>{item.minStock}</TableCell>
                          <TableCell>{item.unit}</TableCell>
                          <TableCell>{getStatusBadge(item.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              {/* Ready Mixes Tab */}
              <TabsContent value="ready-mixes" className="space-y-4">
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Current Stock</TableHead>
                        <TableHead>Min Stock</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getItemsByType('ready-mixes').map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.itemName}</TableCell>
                          <TableCell className="capitalize">{item.category}</TableCell>
                          <TableCell>
                            <Badge className="bg-cyan-500">From Company</Badge>
                          </TableCell>
                          <TableCell className="font-semibold">{item.currentStock}</TableCell>
                          <TableCell>{item.minStock}</TableCell>
                          <TableCell>{item.unit}</TableCell>
                          <TableCell>{getStatusBadge(item.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              {/* Ready Made Products Tab */}
              <TabsContent value="ready-made-products" className="space-y-4">
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Current Stock</TableHead>
                        <TableHead>Min Stock</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getItemsByType('ready-made-products').map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.itemName}</TableCell>
                          <TableCell className="capitalize">{item.category}</TableCell>
                          <TableCell>
                            <Badge className="bg-cyan-500">From Company</Badge>
                          </TableCell>
                          <TableCell className="font-semibold">{item.currentStock}</TableCell>
                          <TableCell>{item.minStock}</TableCell>
                          <TableCell>{item.unit}</TableCell>
                          <TableCell>{getStatusBadge(item.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              {/* Final Items Tab */}
              <TabsContent value="final-items" className="space-y-4">
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Current Stock</TableHead>
                        <TableHead>Min Stock</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getItemsByType('final-items').map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.itemName}</TableCell>
                          <TableCell className="capitalize">{item.category}</TableCell>
                          <TableCell>
                            <Badge 
                              className={`${
                                item.source === 'dispatch' ? 'bg-cyan-500' : 'bg-purple-500'
                              }`}
                            >
                              {item.source === 'dispatch' ? 'From Company' : 'Prepared at Outlet'}
                            </Badge>
                            {item.sourceRef && (
                              <div className="text-xs text-gray-500 mt-1">{item.sourceRef}</div>
                            )}
                          </TableCell>
                          <TableCell className="font-semibold">{item.currentStock}</TableCell>
                          <TableCell>{item.minStock}</TableCell>
                          <TableCell>{item.unit}</TableCell>
                          <TableCell>{getStatusBadge(item.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="critical" className="space-y-4">
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Current Stock</TableHead>
                        <TableHead>Min Stock</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {criticalItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.itemName}</TableCell>
                          <TableCell className="capitalize">{item.category}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={`w-fit ${
                                item.source === 'dispatch' ? 'border-cyan-500 text-cyan-700' :
                                item.source === 'purchase' ? 'border-green-500 text-green-700' :
                                'border-gray-500 text-gray-700'
                              }`}
                            >
                              {item.source === 'dispatch' ? 'From Company' :
                               item.source === 'purchase' ? 'Purchase' : 'Local'}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-semibold text-red-600">{item.currentStock}</TableCell>
                          <TableCell>{item.minStock}</TableCell>
                          <TableCell>{item.unit}</TableCell>
                          <TableCell>{getStatusBadge(item.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="low" className="space-y-4">
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Current Stock</TableHead>
                        <TableHead>Min Stock</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lowStockItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.itemName}</TableCell>
                          <TableCell className="capitalize">{item.category}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={`w-fit ${
                                item.source === 'dispatch' ? 'border-cyan-500 text-cyan-700' :
                                item.source === 'purchase' ? 'border-green-500 text-green-700' :
                                'border-gray-500 text-gray-700'
                              }`}
                            >
                              {item.source === 'dispatch' ? 'From Company' :
                               item.source === 'purchase' ? 'Purchase' : 'Local'}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-semibold text-yellow-600">{item.currentStock}</TableCell>
                          <TableCell>{item.minStock}</TableCell>
                          <TableCell>{item.unit}</TableCell>
                          <TableCell>{getStatusBadge(item.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OutletInventory;
