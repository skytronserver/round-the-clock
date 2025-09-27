import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Feedback {
  id: string;
  orderId: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  rating: number; // 1-5 stars
  foodQuality: number; // 1-5 stars
  serviceQuality: number; // 1-5 stars
  deliveryTime: number; // 1-5 stars
  comments: string;
  date: Date;
  wouldRecommend: boolean;
}

interface FeedbackContextType {
  feedbacks: Feedback[];
  saveFeedback: (feedback: Omit<Feedback, 'id' | 'date'>) => Feedback;
  getFeedbacks: () => Feedback[];
  getFeedbacksByDateRange: (startDate: Date, endDate: Date) => Feedback[];
  getFeedbacksByRating: (minRating: number) => Feedback[];
  getAverageRating: () => number;
  getAverageRatings: () => {
    overall: number;
    foodQuality: number;
    serviceQuality: number;
    deliveryTime: number;
  };
  getFeedbackStats: () => {
    totalFeedbacks: number;
    averageRating: number;
    recommendationRate: number;
    ratingDistribution: { [key: number]: number };
  };
  exportFeedbacksToCSV: (feedbacks: Feedback[]) => void;
  clearAllFeedbacks: () => void;
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export const FeedbackProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  // Load feedbacks from localStorage on component mount
  useEffect(() => {
    const savedFeedbacks = localStorage.getItem('restaurant_feedbacks');
    if (savedFeedbacks) {
      try {
        const parsedFeedbacks = JSON.parse(savedFeedbacks).map((feedback: any) => ({
          ...feedback,
          date: new Date(feedback.date)
        }));
        setFeedbacks(parsedFeedbacks);
      } catch (error) {
        console.error('Error loading feedbacks from localStorage:', error);
      }
    }
  }, []);

  // Save feedbacks to localStorage whenever feedbacks change
  useEffect(() => {
    localStorage.setItem('restaurant_feedbacks', JSON.stringify(feedbacks));
  }, [feedbacks]);

  const saveFeedback = (feedbackData: Omit<Feedback, 'id' | 'date'>): Feedback => {
    const newFeedback: Feedback = {
      ...feedbackData,
      id: Date.now().toString(),
      date: new Date()
    };

    setFeedbacks(prevFeedbacks => [newFeedback, ...prevFeedbacks]);
    return newFeedback;
  };

  const getFeedbacks = (): Feedback[] => {
    return feedbacks.sort((a, b) => b.date.getTime() - a.date.getTime());
  };

  const getFeedbacksByDateRange = (startDate: Date, endDate: Date): Feedback[] => {
    return feedbacks.filter(feedback => {
      const feedbackDate = new Date(feedback.date);
      return feedbackDate >= startDate && feedbackDate <= endDate;
    }).sort((a, b) => b.date.getTime() - a.date.getTime());
  };

  const getFeedbacksByRating = (minRating: number): Feedback[] => {
    return feedbacks.filter(feedback => feedback.rating >= minRating)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  };

  const getAverageRating = (): number => {
    if (feedbacks.length === 0) return 0;
    const sum = feedbacks.reduce((total, feedback) => total + feedback.rating, 0);
    return sum / feedbacks.length;
  };

  const getAverageRatings = () => {
    if (feedbacks.length === 0) {
      return { overall: 0, foodQuality: 0, serviceQuality: 0, deliveryTime: 0 };
    }

    const totals = feedbacks.reduce(
      (acc, feedback) => ({
        overall: acc.overall + feedback.rating,
        foodQuality: acc.foodQuality + feedback.foodQuality,
        serviceQuality: acc.serviceQuality + feedback.serviceQuality,
        deliveryTime: acc.deliveryTime + feedback.deliveryTime
      }),
      { overall: 0, foodQuality: 0, serviceQuality: 0, deliveryTime: 0 }
    );

    return {
      overall: totals.overall / feedbacks.length,
      foodQuality: totals.foodQuality / feedbacks.length,
      serviceQuality: totals.serviceQuality / feedbacks.length,
      deliveryTime: totals.deliveryTime / feedbacks.length
    };
  };

  const getFeedbackStats = () => {
    const totalFeedbacks = feedbacks.length;
    const averageRating = getAverageRating();
    const recommendationRate = totalFeedbacks > 0 
      ? (feedbacks.filter(f => f.wouldRecommend).length / totalFeedbacks) * 100 
      : 0;

    const ratingDistribution: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    feedbacks.forEach(feedback => {
      ratingDistribution[feedback.rating] = (ratingDistribution[feedback.rating] || 0) + 1;
    });

    return {
      totalFeedbacks,
      averageRating,
      recommendationRate,
      ratingDistribution
    };
  };

  const exportFeedbacksToCSV = (feedbacksToExport: Feedback[]): void => {
    const headers = [
      'Date',
      'Order Number',
      'Customer Name',
      'Customer Phone',
      'Overall Rating',
      'Food Quality',
      'Service Quality',
      'Delivery Time',
      'Would Recommend',
      'Comments'
    ];

    const csvContent = [
      headers.join(','),
      ...feedbacksToExport.map(feedback => [
        feedback.date.toLocaleString(),
        feedback.orderNumber,
        `"${feedback.customerName}"`,
        feedback.customerPhone,
        feedback.rating,
        feedback.foodQuality,
        feedback.serviceQuality,
        feedback.deliveryTime,
        feedback.wouldRecommend ? 'Yes' : 'No',
        `"${feedback.comments.replace(/"/g, '""')}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `feedbacks_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearAllFeedbacks = (): void => {
    setFeedbacks([]);
    localStorage.removeItem('restaurant_feedbacks');
  };

  const value: FeedbackContextType = {
    feedbacks,
    saveFeedback,
    getFeedbacks,
    getFeedbacksByDateRange,
    getFeedbacksByRating,
    getAverageRating,
    getAverageRatings,
    getFeedbackStats,
    exportFeedbacksToCSV,
    clearAllFeedbacks
  };

  return (
    <FeedbackContext.Provider value={value}>
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (context === undefined) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
};
