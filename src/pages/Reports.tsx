import React, { useState, useEffect } from 'react';
import { useOrders } from '@/contexts/OrderContext';
import { useFeedback } from '@/contexts/FeedbackContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  Star,
  MessageSquare,
  ThumbsUp,
  BarChart3,
  ArrowLeft,
  Trash2,
  AlertTriangle,
  LogOut
} from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const Reports = () => {
  const { 
    orders, 
    getOrdersByDateRange, 
    getOrdersByCustomer, 
    updateOrderStatus,
    deleteOrder,
    getTotalSales,
    getTopItems,
    generateDailyReport,
    exportOrdersToCSV,
    clearAllOrders 
  } = useOrders();

  const {
    feedbacks,
    getFeedbacksByDateRange,
    getAverageRatings,
    getFeedbackStats,
    exportFeedbacksToCSV
  } = useFeedback();

  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'pending' | 'completed' | 'cancelled'>('all');
  const [customerFeedbacks, setCustomerFeedbacks] = useState<any[]>([]);

  // Load customer feedbacks from localStorage
  useEffect(() => {
    const loadCustomerFeedbacks = () => {
      try {
        const savedFeedbacks = localStorage.getItem('customerFeedbacks');
        if (savedFeedbacks) {
          const parsedFeedbacks = JSON.parse(savedFeedbacks);
          setCustomerFeedbacks(parsedFeedbacks);
        }
      } catch (error) {
        console.error('Error loading customer feedbacks:', error);
      }
    };

    loadCustomerFeedbacks();
    
    // Set up interval to refresh data every 5 seconds
    const interval = setInterval(loadCustomerFeedbacks, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const getFilteredOrders = () => {
    let filteredOrders = orders;

    if (searchTerm) {
      filteredOrders = getOrdersByCustomer(searchTerm);
    }

    if (startDate && endDate) {
      filteredOrders = getOrdersByDateRange(new Date(startDate), new Date(endDate));
    }

    if (selectedStatus !== 'all') {
      filteredOrders = filteredOrders.filter(order => order.status === selectedStatus);
    }

    return filteredOrders;
  };

  const getFilteredFeedbacks = () => {
    let filteredFeedbacks = feedbacks;

    if (startDate && endDate) {
      filteredFeedbacks = getFeedbacksByDateRange(new Date(startDate), new Date(endDate));
    }

    return filteredFeedbacks;
  };

  const getFilteredCustomerFeedbacks = () => {
    let filtered = customerFeedbacks;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      filtered = customerFeedbacks.filter(feedback => {
        const feedbackDate = new Date(feedback.timestamp);
        return feedbackDate >= start && feedbackDate <= end;
      });
    }

    return filtered;
  };

  const getCustomerFeedbackStats = () => {
    const filtered = getFilteredCustomerFeedbacks();
    
    if (filtered.length === 0) {
      return {
        totalFeedbacks: 0,
        averageRating: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      };
    }

    const totalRating = filtered.reduce((sum, feedback) => sum + feedback.rating, 0);
    const averageRating = totalRating / filtered.length;
    
    const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    filtered.forEach(feedback => {
      ratingDistribution[feedback.rating as keyof typeof ratingDistribution]++;
    });

    return {
      totalFeedbacks: filtered.length,
      averageRating,
      ratingDistribution
    };
  };

  const exportCustomerFeedbacksToCSV = () => {
    const filtered = getFilteredCustomerFeedbacks();
    
    if (filtered.length === 0) {
      toast.error('No feedback data to export');
      return;
    }

    const headers = ['Customer Name', 'Email', 'Phone', 'Rating', 'Feedback', 'Date'];
    const csvContent = [
      headers.join(','),
      ...filtered.map(feedback => [
        `"${feedback.customerName}"`,
        feedback.email || '',
        feedback.phone || '',
        feedback.rating,
        `"${feedback.feedback.replace(/"/g, '""')}"`,
        new Date(feedback.timestamp).toLocaleString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `customer_feedback_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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

  const handleExportFeedbacks = () => {
    const filteredFeedbacks = getFilteredFeedbacks();
    exportFeedbacksToCSV(filteredFeedbacks);
    toast.success('Feedbacks exported successfully!');
  };

  const handleDeleteOrder = (orderId: string, orderNumber: string) => {
    if (window.confirm(`Are you sure you want to delete Order No : ${orderNumber}? This action cannot be undone.`)) {
      deleteOrder(orderId);
      toast.success(`Order No : ${orderNumber} deleted successfully!`);
    }
  };

  const handleClearAllOrders = () => {
    if (window.confirm('Are you sure you want to delete ALL orders? This action cannot be undone and will clear all order history.')) {
      clearAllOrders();
      toast.success('All orders cleared successfully!');
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout from the admin panel?')) {
      sessionStorage.removeItem('rtc_admin_auth');
      window.location.reload();
    }
  };

  const generateTodayReport = () => {
    const today = new Date();
    const report = generateDailyReport(today);
    const feedbackStats = getFeedbackStats();
    const averageRatings = getAverageRatings();
    
    const reportContent = `
      DAILY REPORT - ${today.toDateString()}
      
      === SALES SUMMARY ===
      Total Orders: ${report.totalOrders}
      Total Revenue: Rs.${report.totalRevenue.toFixed(2)}
      
      === TOP ITEMS ===
      ${report.topItems.map(item => 
        `${item.item}: ${item.quantity} sold (Rs.${item.revenue.toFixed(2)})`
      ).join('\n')}
      
      === CUSTOMER FEEDBACK ===
      Total Feedbacks: ${feedbackStats.totalFeedbacks}
      Average Rating: ${averageRatings.overall.toFixed(1)}/5.0
      Food Quality: ${averageRatings.foodQuality.toFixed(1)}/5.0
      Service Quality: ${averageRatings.serviceQuality.toFixed(1)}/5.0
      Delivery Time: ${averageRatings.deliveryTime.toFixed(1)}/5.0
      Recommendation Rate: ${feedbackStats.recommendationRate.toFixed(1)}%
      
      === ORDERS ===
      ${report.orders.map(order => 
        `Order No : ${order.orderNumber} - ${order.customerInfo.name} - Rs.${order.total.toFixed(2)} - ${order.status}`
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
  const filteredFeedbacks = getFilteredFeedbacks();
  const filteredCustomerFeedbacks = getFilteredCustomerFeedbacks();
  const feedbackStats = getFeedbackStats();
  const averageRatings = getAverageRatings();
  const customerFeedbackStats = getCustomerFeedbackStats();

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          {/* Mobile Header */}
          <div className="flex flex-col space-y-4 md:hidden">
            <div className="flex items-center justify-between">
              <Link to="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  <span className="hidden xs:inline">Back to Home</span>
                  <span className="xs:hidden">Back</span>
                </Button>
              </Link>
              <div className="flex gap-2">
                <Button onClick={generateTodayReport} size="sm" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <span className="hidden xs:inline">Generate Report</span>
                  <span className="xs:hidden">Report</span>
                </Button>
                <Button onClick={handleLogout} variant="outline" size="sm" className="flex items-center gap-2 text-red-600 hover:text-red-700">
                  <LogOut className="h-4 w-4" />
                  <span className="hidden xs:inline">Logout</span>
                </Button>
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
              <p className="text-sm text-gray-600 mt-1">Business insights and data</p>
            </div>
          </div>

          {/* Desktop/Tablet Header */}
          <div className="hidden md:flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Reports & Analytics</h1>
                <p className="text-sm lg:text-base text-gray-600">Comprehensive business insights and data</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={generateTodayReport} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span className="hidden lg:inline">Generate Daily Report</span>
                <span className="lg:hidden">Generate Report</span>
              </Button>
              <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2 text-red-600 hover:text-red-700">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Essential Business Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{orders.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {orders.filter(o => o.status === 'completed').length} completed
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Rs.{totalSales.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">
                    Avg: Rs.{orders.length > 0 ? (totalSales / orders.length).toFixed(2) : '0.00'} per order
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Customer Feedback</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold flex items-center gap-2">
                    {customerFeedbackStats.totalFeedbacks > 0 ? (
                      <>
                        {customerFeedbackStats.averageRating.toFixed(1)}/5
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      </>
                    ) : (
                      <span className="text-gray-400">No ratings yet</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {customerFeedbackStats.totalFeedbacks} feedback{customerFeedbackStats.totalFeedbacks !== 1 ? 's' : ''}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Top Selling Items - Most Important for Business */}
            <Card>
              <CardHeader>
                <CardTitle>Top Selling Items</CardTitle>
                <CardDescription>Your most popular menu items driving revenue</CardDescription>
              </CardHeader>
              <CardContent>
                {topItems.length > 0 ? (
                  <div className="space-y-3">
                    {topItems.map((item, index) => (
                      <div key={item.item} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-lg text-rtc-red">#{index + 1}</span>
                          <span className="font-medium">{item.item}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">{item.quantity} sold</div>
                          <div className="text-sm text-muted-foreground">Rs.{item.revenue.toFixed(2)} revenue</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No orders yet. Start taking orders to see top items!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

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
              <div className="flex gap-2">
                <Button onClick={handleExportOrders} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
                {orders.length > 0 && (
                  <Button onClick={handleClearAllOrders} variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All Orders
                  </Button>
                )}
              </div>
            </div>

            {/* Orders List */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredOrders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">Order No : {order.orderNumber}</h4>
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
                        <div className="flex gap-1 flex-wrap">
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
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteOrder(order.id, order.orderNumber)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Customer Feedback</h2>
                <p className="text-sm text-muted-foreground">
                  Showing {filteredCustomerFeedbacks.length} feedback entries from QR code submissions
                </p>
              </div>
              <Button onClick={exportCustomerFeedbacksToCSV} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Customer Feedback CSV
              </Button>
            </div>

            {/* Customer Feedback Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Total Feedbacks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{customerFeedbackStats.totalFeedbacks}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Average Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold flex items-center gap-2">
                    {customerFeedbackStats.averageRating.toFixed(1)}/5
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= customerFeedbackStats.averageRating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Rating Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {Object.entries(customerFeedbackStats.ratingDistribution)
                      .reverse()
                      .map(([rating, count]) => (
                        <div key={rating} className="flex items-center gap-2 text-xs">
                          <span className="w-4">{rating}★</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-1">
                            <div
                              className="bg-yellow-400 h-1 rounded-full"
                              style={{
                                width: `${customerFeedbackStats.totalFeedbacks > 0 
                                  ? (count / customerFeedbackStats.totalFeedbacks) * 100 
                                  : 0}%`
                              }}
                            />
                          </div>
                          <span className="w-6 text-right">{count}</span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Customer Feedback List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredCustomerFeedbacks.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Customer Feedback Yet</h3>
                    <p className="text-gray-600">
                      Customer feedback from QR code scans will appear here. Share the QR codes on receipts to collect feedback!
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredCustomerFeedbacks.map((feedback) => (
                  <Card key={feedback.id}>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{feedback.customerName}</h4>
                              <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-4 w-4 ${
                                      star <= feedback.rating
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                                <span className="text-sm font-medium ml-1">
                                  {feedback.rating}/5
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {feedback.email} • {feedback.phone}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(feedback.timestamp).toLocaleString()}
                            </p>
                          </div>
                          <Badge className="bg-blue-100 text-blue-800">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Customer Feedback
                          </Badge>
                        </div>

                        {feedback.feedback && (
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm italic">"{feedback.feedback}"</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
};

export default Reports;
