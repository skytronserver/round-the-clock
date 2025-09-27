import { useState } from 'react';
import { Star, Send, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useSearchParams } from 'react-router-dom';

const Feedback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get('order') || 'N/A';
  
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Save feedback to localStorage (in real app, send to backend)
    const feedbackData = {
      rating,
      customerName,
      email,
      phone,
      feedback,
      timestamp: new Date().toISOString(),
      id: Date.now().toString()
    };

    const existingFeedbacks = JSON.parse(localStorage.getItem('customerFeedbacks') || '[]');
    existingFeedbacks.push(feedbackData);
    localStorage.setItem('customerFeedbacks', JSON.stringify(existingFeedbacks));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1: return 'Poor';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Very Good';
      case 5: return 'Excellent';
      default: return 'Rate your experience';
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rtc-red via-rtc-red to-red-700 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-rtc-dark mb-2">Thank You!</h1>
          <p className="text-gray-600 mb-6">
            Your feedback has been submitted successfully. We appreciate your time and will use your input to improve our service.
          </p>
          <Button 
            onClick={() => navigate('/')} 
            className="w-full bg-rtc-red hover:bg-red-700"
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rtc-red via-rtc-red to-red-700">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          {/* Mobile Header */}
          <div className="flex flex-col space-y-3 md:hidden">
            <div className="flex items-center justify-center">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="text-white hover:bg-white/20 absolute left-3 sm:left-4"
                size="sm"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                <span className="hidden xs:inline">Back</span>
              </Button>
              <div className="text-center">
                <h1 className="text-xl sm:text-2xl font-bold text-white">Customer Feedback</h1>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-rtc-cream">Share your experience with us</p>
            </div>
          </div>

          {/* Desktop/Tablet Header */}
          <div className="hidden md:flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
            <div className="flex-1 text-center">
              <h1 className="text-xl lg:text-2xl font-bold text-white">Customer Feedback</h1>
              <p className="text-sm lg:text-base text-rtc-cream">Share your experience with us</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-rtc-dark mb-2">How was your experience?</h2>
              <p className="text-sm sm:text-base text-gray-600">
                We'd love to hear about your experience with Round The Clock. Your feedback helps us serve you better!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Rating Section */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-rtc-dark mb-4">Rate your overall experience</h3>
                <div className="flex justify-center gap-2 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-all duration-200 hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= (hoverRating || rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-600">{getRatingText(hoverRating || rating)}</p>
              </div>

              {/* Customer Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-rtc-dark mb-2">
                    Name *
                  </label>
                  <Input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Your full name"
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-rtc-dark mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-rtc-dark mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full"
                />
              </div>

              {/* Feedback Text */}
              <div>
                <label className="block text-sm font-medium text-rtc-dark mb-2">
                  Tell us about your experience *
                </label>
                <Textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="What did you like? What could we improve? Any specific compliments for our staff?"
                  rows={4}
                  required
                  className="w-full resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={!rating || !customerName || !feedback || isSubmitting}
                className="w-full bg-rtc-red hover:bg-red-700 text-white py-3 text-lg font-semibold disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Submit Feedback
                  </div>
                )}
              </Button>
            </form>

            {/* Footer Note */}
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>Your feedback is valuable to us and helps improve our service quality.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
