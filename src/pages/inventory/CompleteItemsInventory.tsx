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

const CompleteItemsInventory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Complete items created by company - ready to sell/dispatch
  const [inventoryItems] = useState<InventoryItem[]>([
    { id: '1', itemName: 'Margherita Pizza', category: 'pizza', currentStock: 50, minStock: 30, maxStock: 100, unit: 'pcs', lastUpdated: '2024-11-06', status: 'good', location: 'Centralized Facility' },
    { id: '2', itemName: 'Pepperoni Pizza', category: 'pizza', currentStock: 45, minStock: 30, maxStock: 100, unit: 'pcs', lastUpdated: '2024-11-06', status: 'good', location: 'Centralized Facility' },
    { id: '3', itemName: 'Chicken Biryani', category: 'biryani', currentStock: 80, minStock: 50, maxStock: 150, unit: 'pcs', lastUpdated: '2024-11-06', status: 'good', location: 'Centralized Facility' },
    { id: '4', itemName: 'Mutton Biryani', category: 'biryani', currentStock: 40, minStock: 50, maxStock: 120, unit: 'pcs', lastUpdated: '2024-11-06', status: 'low', location: 'Centralized Facility' },
    { id: '5', itemName: 'Butter Chicken', category: 'curry', currentStock: 60, minStock: 40, maxStock: 100, unit: 'pcs', lastUpdated: '2024-11-06', status: 'good', location: 'Centralized Facility' },
    { id: '6', itemName: 'Paneer Tikka Masala', category: 'curry', currentStock: 55, minStock: 40, maxStock: 100, unit: 'pcs', lastUpdated: '2024-11-06', status: 'good', location: 'Centralized Facility' },
    { id: '7', itemName: 'Tandoori Chicken', category: 'tandoori', currentStock: 35, minStock: 30, maxStock: 80, unit: 'pcs', lastUpdated: '2024-11-06', status: 'good', location: 'Cold Storage' },
    { id: '8', itemName: 'Naan Bread Pack', category: 'bread', currentStock: 100, minStock: 60, maxStock: 200, unit: 'packs', lastUpdated: '2024-11-06', status: 'good', location: 'Centralized Facility' },
    { id: '9', itemName: 'Gulab Jamun Pack', category: 'dessert', currentStock: 70, minStock: 40, maxStock: 150, unit: 'packs', lastUpdated: '2024-11-06', status: 'good', location: 'Centralized Facility' },
    { id: '10', itemName: 'Rasgulla Pack', category: 'dessert', currentStock: 25, minStock: 30, maxStock: 100, unit: 'packs', lastUpdated: '2024-11-06', status: 'low', location: 'Centralized Facility' },
    { id: '11', itemName: 'Veg Fried Rice', category: 'rice', currentStock: 45, minStock: 40, maxStock: 120, unit: 'pcs', lastUpdated: '2024-11-06', status: 'good', location: 'Centralized Facility' },
    { id: '12', itemName: 'Chicken Fried Rice', category: 'rice', currentStock: 50, minStock: 40, maxStock: 120, unit: 'pcs', lastUpdated: '2024-11-06', status: 'good', location: 'Centralized Facility' },
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-12">
        <div className="mb-8">
          <Link to="/mis/inventory/company" className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Company Inventory
          </Link>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Complete Items Inventory</h1>
              <p className="text-gray-600">Final products ready to sell and dispatch</p>
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
                <Package className="w-12 h-12 text-purple-500" />
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
            <CardTitle>Complete Items Stock Levels</CardTitle>
            <CardDescription>View and monitor final products ready for dispatch</CardDescription>
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
                      <SelectItem value="pizza">Pizza</SelectItem>
                      <SelectItem value="biryani">Biryani</SelectItem>
                      <SelectItem value="curry">Curry</SelectItem>
                      <SelectItem value="tandoori">Tandoori</SelectItem>
                      <SelectItem value="bread">Bread</SelectItem>
                      <SelectItem value="dessert">Dessert</SelectItem>
                      <SelectItem value="rice">Rice</SelectItem>
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
                          <TableCell className="capitalize">{item.category}</TableCell>
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
                          <TableCell className="capitalize">{item.category}</TableCell>
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
                          <TableCell className="capitalize">{item.category}</TableCell>
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

export default CompleteItemsInventory;
