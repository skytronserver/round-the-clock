import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Package, AlertTriangle, TrendingUp, Search, Download } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface InventoryItem {
  id: string;
  itemName: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  lastUpdated: string;
  status: 'good' | 'low' | 'critical';
  location: string;
}

const ReadyMadeInventory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Mock ready-made items inventory data - purchased and stocked items
  const [inventoryItems] = useState<InventoryItem[]>([
    // Beverages (purchased from suppliers)
    { id: '1', itemName: 'Coca-Cola', category: 'beverages', currentStock: 240, minStock: 200, maxStock: 500, unit: 'bottles', lastUpdated: '2024-11-06', status: 'good', location: 'Centralized Facility' },
    { id: '2', itemName: 'Pepsi', category: 'beverages', currentStock: 180, minStock: 200, maxStock: 500, unit: 'bottles', lastUpdated: '2024-11-06', status: 'low', location: 'Centralized Facility' },
    { id: '3', itemName: 'Sprite', category: 'beverages', currentStock: 220, minStock: 150, maxStock: 400, unit: 'bottles', lastUpdated: '2024-11-06', status: 'good', location: 'Centralized Facility' },
    { id: '4', itemName: 'Mineral Water', category: 'beverages', currentStock: 400, minStock: 300, maxStock: 800, unit: 'bottles', lastUpdated: '2024-11-06', status: 'good', location: 'Centralized Facility' },
    { id: '5', itemName: 'Packaged Orange Juice', category: 'beverages', currentStock: 80, minStock: 100, maxStock: 300, unit: 'bottles', lastUpdated: '2024-11-06', status: 'low', location: 'Cold Storage' },
    
    // Packaged Snacks (purchased from suppliers)
    { id: '6', itemName: 'Potato Chips', category: 'snacks', currentStock: 150, minStock: 100, maxStock: 300, unit: 'packs', lastUpdated: '2024-11-06', status: 'good', location: 'Dry Storage' },
    { id: '7', itemName: 'Cookies', category: 'snacks', currentStock: 80, minStock: 50, maxStock: 200, unit: 'packs', lastUpdated: '2024-11-06', status: 'good', location: 'Dry Storage' },
    { id: '8', itemName: 'Chocolate Bars', category: 'snacks', currentStock: 45, minStock: 50, maxStock: 150, unit: 'pcs', lastUpdated: '2024-11-06', status: 'low', location: 'Dry Storage' },
    
    // Packaged Condiments (purchased from suppliers)
    { id: '9', itemName: 'Ketchup Sachets', category: 'condiments', currentStock: 200, minStock: 150, maxStock: 400, unit: 'sachets', lastUpdated: '2024-11-06', status: 'good', location: 'Dry Storage' },
    { id: '10', itemName: 'Mayonnaise Sachets', category: 'condiments', currentStock: 120, minStock: 100, maxStock: 300, unit: 'sachets', lastUpdated: '2024-11-06', status: 'good', location: 'Dry Storage' },
    
    // Frozen Items (purchased from suppliers)
    { id: '11', itemName: 'Frozen French Fries', category: 'frozen', currentStock: 25, minStock: 20, maxStock: 60, unit: 'kg', lastUpdated: '2024-11-06', status: 'good', location: 'Freezer' },
    { id: '12', itemName: 'Ice Cream Cups', category: 'frozen', currentStock: 40, minStock: 30, maxStock: 80, unit: 'cups', lastUpdated: '2024-11-06', status: 'good', location: 'Freezer' },
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

  const getStockPercentage = (current: number, min: number, max: number) => {
    return ((current - min) / (max - min)) * 100;
  };

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.itemName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const criticalItems = inventoryItems.filter(item => item.status === 'critical');
  const lowStockItems = inventoryItems.filter(item => item.status === 'low');
  const totalValue = inventoryItems.reduce((sum, item) => sum + item.currentStock, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="mb-8">
          <Link to="/mis/inventory/company" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Company Inventory
          </Link>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Ready-Made Items Inventory</h1>
              <p className="text-gray-600">Purchased and stocked items (beverages, packaged goods)</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Link to="/mis/check">
                <Button variant="outline" size="sm">Check</Button>
              </Link>
              <Link to="/mis/dispatch">
                <Button variant="outline" size="sm">Dispatch</Button>
              </Link>
              <Link to="/mis/wastage">
                <Button variant="outline" size="sm">Wastage</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Items</p>
                  <p className="text-3xl font-bold text-gray-800">{inventoryItems.length}</p>
                </div>
                <Package className="w-12 h-12 text-indigo-500" />
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
            <CardTitle>Ready-Made Items Stock Levels</CardTitle>
            <CardDescription>View and monitor ready-made items inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                <TabsList>
                  <TabsTrigger value="all">All Items</TabsTrigger>
                  <TabsTrigger value="critical">Critical</TabsTrigger>
                  <TabsTrigger value="low">Low Stock</TabsTrigger>
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
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="beverages">Beverages</SelectItem>
                      <SelectItem value="snacks">Snacks</SelectItem>
                      <SelectItem value="condiments">Condiments</SelectItem>
                      <SelectItem value="frozen">Frozen Items</SelectItem>
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
                        <TableHead>Category</TableHead>
                        <TableHead>Location</TableHead>
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
                          <TableCell className="capitalize">{item.category.replace('-', ' ')}</TableCell>
                          <TableCell>{item.location}</TableCell>
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

              <TabsContent value="critical" className="space-y-4">
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Location</TableHead>
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
                          <TableCell className="capitalize">{item.category.replace('-', ' ')}</TableCell>
                          <TableCell>{item.location}</TableCell>
                          <TableCell className="font-semibold text-red-600">{item.currentStock}</TableCell>
                          <TableCell>{item.minStock}</TableCell>
                          <TableCell>{item.unit}</TableCell>
                          <TableCell>{getStatusBadge(item.status)}</TableCell>
                        </TableRow>
                      ))}
                      {criticalItems.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                            No critical items found
                          </TableCell>
                        </TableRow>
                      )}
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
                        <TableHead>Location</TableHead>
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
                          <TableCell className="capitalize">{item.category.replace('-', ' ')}</TableCell>
                          <TableCell>{item.location}</TableCell>
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

export default ReadyMadeInventory;
