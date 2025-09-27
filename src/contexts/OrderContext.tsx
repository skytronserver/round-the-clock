import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, CustomerInfo } from './CartContext';

export interface Order {
  id: string;
  orderNumber: string;
  customerInfo: CustomerInfo;
  items: CartItem[];
  total: number;
  date: Date;
  status: 'pending' | 'completed' | 'cancelled';
}

interface OrderContextType {
  orders: Order[];
  saveOrder: (customerInfo: CustomerInfo, items: CartItem[], total: number) => Order;
  getOrders: () => Order[];
  getOrdersByDateRange: (startDate: Date, endDate: Date) => Order[];
  getOrdersByCustomer: (customerName: string) => Order[];
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  deleteOrder: (orderId: string) => void;
  getTotalSales: (startDate?: Date, endDate?: Date) => number;
  getTopItems: (limit?: number) => { item: string; quantity: number; revenue: number }[];
  generateDailyReport: (date: Date) => {
    date: Date;
    totalOrders: number;
    totalRevenue: number;
    orders: Order[];
    topItems: { item: string; quantity: number; revenue: number }[];
  };
  exportOrdersToCSV: (orders: Order[]) => void;
  clearAllOrders: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  // Load orders from localStorage on component mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('restaurant_orders');
    if (savedOrders) {
      try {
        const parsedOrders = JSON.parse(savedOrders).map((order: any) => ({
          ...order,
          date: new Date(order.date)
        }));
        setOrders(parsedOrders);
      } catch (error) {
        console.error('Error loading orders from localStorage:', error);
      }
    }
  }, []);

  // Save orders to localStorage whenever orders change
  useEffect(() => {
    localStorage.setItem('restaurant_orders', JSON.stringify(orders));
  }, [orders]);

  const generateOrderNumber = (): string => {
    // Get the highest existing order number and increment by 1
    // This ensures uniqueness even if orders are deleted
    const existingNumbers = orders.map(order => parseInt(order.orderNumber)).filter(num => !isNaN(num));
    const maxNumber = existingNumbers.length > 0 ? Math.max(...existingNumbers) : 0;
    const nextOrderNumber = maxNumber + 1;
    return nextOrderNumber.toString();
  };

  const saveOrder = (customerInfo: CustomerInfo, items: CartItem[], total: number): Order => {
    const newOrder: Order = {
      id: Date.now().toString(),
      orderNumber: generateOrderNumber(),
      customerInfo,
      items: [...items],
      total,
      date: new Date(),
      status: 'pending'
    };

    setOrders(prevOrders => [newOrder, ...prevOrders]);
    return newOrder;
  };

  const getOrders = (): Order[] => {
    return orders.sort((a, b) => b.date.getTime() - a.date.getTime());
  };

  const getOrdersByDateRange = (startDate: Date, endDate: Date): Order[] => {
    return orders.filter(order => {
      const orderDate = new Date(order.date);
      return orderDate >= startDate && orderDate <= endDate;
    }).sort((a, b) => b.date.getTime() - a.date.getTime());
  };

  const getOrdersByCustomer = (customerName: string): Order[] => {
    return orders.filter(order => 
      order.customerInfo.name.toLowerCase().includes(customerName.toLowerCase())
    ).sort((a, b) => b.date.getTime() - a.date.getTime());
  };

  const updateOrderStatus = (orderId: string, status: Order['status']): void => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const deleteOrder = (orderId: string): void => {
    setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
  };

  const getTotalSales = (startDate?: Date, endDate?: Date): number => {
    let filteredOrders = orders.filter(order => order.status === 'completed');
    
    if (startDate && endDate) {
      filteredOrders = filteredOrders.filter(order => {
        const orderDate = new Date(order.date);
        return orderDate >= startDate && orderDate <= endDate;
      });
    }

    return filteredOrders.reduce((total, order) => total + order.total, 0);
  };

  const getTopItems = (limit: number = 10): { item: string; quantity: number; revenue: number }[] => {
    const itemStats: { [key: string]: { quantity: number; revenue: number } } = {};

    orders.filter(order => order.status === 'completed').forEach(order => {
      order.items.forEach(item => {
        const itemPrice = parseFloat(item.price.replace(/[^\d.]/g, ''));
        const itemRevenue = itemPrice * item.quantity;

        if (itemStats[item.name]) {
          itemStats[item.name].quantity += item.quantity;
          itemStats[item.name].revenue += itemRevenue;
        } else {
          itemStats[item.name] = {
            quantity: item.quantity,
            revenue: itemRevenue
          };
        }
      });
    });

    return Object.entries(itemStats)
      .map(([item, stats]) => ({ item, ...stats }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, limit);
  };

  const generateDailyReport = (date: Date) => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const dayOrders = getOrdersByDateRange(startOfDay, endOfDay);
    const completedOrders = dayOrders.filter(order => order.status === 'completed');
    
    return {
      date,
      totalOrders: dayOrders.length,
      totalRevenue: completedOrders.reduce((total, order) => total + order.total, 0),
      orders: dayOrders,
      topItems: getTopItems(5)
    };
  };

  const exportOrdersToCSV = (ordersToExport: Order[]): void => {
    const headers = [
      'Order Number',
      'Date',
      'Customer Name',
      'Customer Phone',
      'Items',
      'Total Amount',
      'Status'
    ];

    const csvContent = [
      headers.join(','),
      ...ordersToExport.map(order => [
        order.orderNumber,
        order.date.toLocaleString(),
        `"${order.customerInfo.name}"`,
        order.customerInfo.phone,
        `"${order.items.map(item => `${item.name} (${item.quantity}x)`).join('; ')}"`,
        order.total.toFixed(2),
        order.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `orders_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearAllOrders = (): void => {
    setOrders([]);
    localStorage.removeItem('restaurant_orders');
  };

  const value: OrderContextType = {
    orders,
    saveOrder,
    getOrders,
    getOrdersByDateRange,
    getOrdersByCustomer,
    updateOrderStatus,
    deleteOrder,
    getTotalSales,
    getTopItems,
    generateDailyReport,
    exportOrdersToCSV,
    clearAllOrders
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
