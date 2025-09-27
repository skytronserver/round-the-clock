import React, { useState } from 'react';
import { useFeedback } from '@/contexts/FeedbackContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Star, Heart, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

interface FeedbackFormProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: {
    orderId: string;
    orderNumber: string;
    customerName: string;
    customerPhone: string;
  };
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ isOpen, onClose, orderData }) => {
  const { saveFeedback } = useFeedback();
  
  const [rating, setRating] = useState(0);
  const [foodQuality, setFoodQuality] = useState(0);
  const [serviceQuality, setServiceQuality] = useState(0);
  const [deliveryTime, setDeliveryTime] = useState(0);
  const [comments, setComments] = useState('');
  const [wouldRecommend, setWouldRecommend] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const StarRating = ({ 
    value, 
    onChange, 
    label 
  }: { 
    value: number; 
    onChange: (rating: number) => void; 
    label: string;
  }) => {
    return (
      <div className="space-y-2">
        <Label className="text-sm font-medium">{label}</Label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => onChange(star)}
              className="p-1 hover:scale-110 transition-transform"
            >
              <Star
                className={`h-6 w-6 ${
                  star <= value
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300 hover:text-yellow-400'
                }`}
              />
            </button>
          ))}
          <span className="ml-2 text-sm text-gray-600">
            {value > 0 ? `${value}/5` : 'Not rated'}
          </span>
        </div>
      </div>
    );
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error('Please provide an overall rating');
      return;
    }

    if (foodQuality === 0 || serviceQuality === 0 || deliveryTime === 0) {
      toast.error('Please rate all aspects of your experience');
      return;
    }

    setIsSubmitting(true);

    try {
      const feedback = saveFeedback({
        orderId: orderData.orderId,
        orderNumber: orderData.orderNumber,
        customerName: orderData.customerName,
        customerPhone: orderData.customerPhone,
        rating,
        foodQuality,
        serviceQuality,
        deliveryTime,
        comments: comments.trim(),
        wouldRecommend
      });

      toast.success('Thank you for your feedback! Your review has been saved.');
      
      // Reset form
      setRating(0);
      setFoodQuality(0);
      setServiceQuality(0);
      setDeliveryTime(0);
      setComments('');
      setWouldRecommend(false);
      
      onClose();
    } catch (error) {
      toast.error('Failed to save feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    onClose();
    toast.info('Feedback skipped. You can always provide feedback later!');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            How was your experience?
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Info */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm font-medium">Order #{orderData.orderNumber}</p>
            <p className="text-sm text-gray-600">{orderData.customerName}</p>
          </div>

          {/* Overall Rating */}
          <StarRating
            value={rating}
            onChange={setRating}
            label="Overall Experience"
          />

          <Separator />

          {/* Detailed Ratings */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm">Rate specific aspects:</h3>
            
            <StarRating
              value={foodQuality}
              onChange={setFoodQuality}
              label="Food Quality"
            />

            <StarRating
              value={serviceQuality}
              onChange={setServiceQuality}
              label="Service Quality"
            />

            <StarRating
              value={deliveryTime}
              onChange={setDeliveryTime}
              label="Delivery/Preparation Time"
            />
          </div>

          <Separator />

          {/* Recommendation */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Would you recommend us?</Label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setWouldRecommend(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                  wouldRecommend
                    ? 'bg-green-100 border-green-300 text-green-700'
                    : 'border-gray-300 hover:border-green-300'
                }`}
              >
                <Heart className={`h-4 w-4 ${wouldRecommend ? 'fill-current' : ''}`} />
                Yes
              </button>
              <button
                type="button"
                onClick={() => setWouldRecommend(false)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
                  !wouldRecommend && rating > 0
                    ? 'bg-gray-100 border-gray-400 text-gray-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                No
              </button>
            </div>
          </div>

          {/* Comments */}
          <div className="space-y-2">
            <Label htmlFor="comments" className="text-sm font-medium">
              Additional Comments (Optional)
            </Label>
            <Textarea
              id="comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Tell us more about your experience..."
              rows={3}
              maxLength={500}
            />
            <p className="text-xs text-gray-500">{comments.length}/500 characters</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={handleSkip}
              className="flex-1"
              disabled={isSubmitting}
            >
              Skip
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1"
              disabled={isSubmitting || rating === 0}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackForm;
