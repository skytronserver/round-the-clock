import React, { useState } from 'react';
import { useOrders } from '@/contexts/OrderContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Download, 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp,
  Search,
  Filter
} from 'lucide-react';
import { toast } from 'sonner';

const OrdersManagement = () => {
  const { 
    orders, 
    getOrdersByDateRange, 
    getOrdersByCustomer, 
    updateOrderStatus,
    getTotalSales,
    getTopItems,
    generateDailyReport,
    exportOrdersToCSV 
  } = useOrders();

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'pending' | 'completed' | 'cancelled'>('all');

  const getFilteredOrders = () => {
    let filteredOrders = orders;

    // Filter by search term (customer name)
    if (searchTerm) {
      filteredOrders = getOrdersByCustomer(searchTerm);
    }

    // Filter by date range
    if (startDate && endDate) {
      filteredOrders = getOrdersByDateRange(new Date(startDate), new Date(endDate));
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filteredOrders = filteredOrders.filter(order => order.status === selectedStatus);
    }

    return filteredOrders;
  };

  const handleStatusUpdate = (orderId: string, newStatus: 'pending' | 'completed' | 'cancelled') => {
    updateOrderStatus(orderId, newStatus);
    toast.success('Order status updated successfully!');
  };

  const handleExportOrders = () => {
    const filteredOrders = getFilteredOrders();
    exportOrdersToCSV(filteredOrders);
    toast.success('Orders exported successfully!');
  };

  const generateTodayReport = () => {
    const today = new Date();
    const report = generateDailyReport(today);
    
    const reportContent = `
      DAILY REPORT - ${today.toDateString()}
      
      Total Orders: ${report.totalOrders}
      Total Revenue: Rs.${report.totalRevenue.toFixed(2)}
      
      TOP ITEMS:
      ${report.topItems.map(item => 
        `${item.item}: ${item.quantity} sold (Rs.${item.revenue.toFixed(2)})`
      ).join('\n')}
      
      ORDERS:
      ${report.orders.map(order => 
        `#${order.orderNumber} - ${order.customerInfo.name} - Rs.${order.total.toFixed(2)} - ${order.status}`
      ).join('\n')}
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `daily_report_${today.toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Daily report generated successfully!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalSales = getTotalSales();
  const topItems = getTopItems(5);
  const filteredOrders = getFilteredOrders();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Orders & Reports
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Orders Management & Reports
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-4">
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="search">Search Customer</Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Customer name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as any)}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Showing {filteredOrders.length} orders
              </p>
              <Button onClick={handleExportOrders} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>

            {/* Orders List */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredOrders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">#{order.orderNumber}</h4>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {order.customerInfo.name} • {order.customerInfo.phone}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {order.date.toLocaleString()}
                        </p>
                        <p className="text-sm">
                          Items: {order.items.map(item => `${item.name} (${item.quantity})`).join(', ')}
                        </p>
                      </div>
                      <div className="text-right space-y-2">
                        <p className="font-bold">Rs.{order.total.toFixed(2)}</p>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusUpdate(order.id, 'completed')}
                            disabled={order.status === 'completed'}
                          >
                            Complete
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                            disabled={order.status === 'cancelled'}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Daily Report
                  </CardTitle>
                  <CardDescription>
                    Generate today's sales report
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={generateTodayReport} className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Generate Today's Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Export Orders
                  </CardTitle>
                  <CardDescription>
                    Export filtered orders to CSV
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={handleExportOrders} className="w-full" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Filtered Orders
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{orders.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Rs.{totalSales.toFixed(2)}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    Rs.{orders.length > 0 ? (totalSales / orders.length).toFixed(2) : '0.00'}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Top Selling Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {topItems.map((item, index) => (
                    <div key={item.item} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">#{index + 1}</span>
                        <span>{item.item}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{item.quantity} sold</div>
                        <div className="text-xs text-muted-foreground">Rs.{item.revenue.toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default OrdersManagement;
