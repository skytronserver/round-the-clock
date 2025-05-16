
import { Clock, Coffee, Utensils } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Specials = () => {
  const specialOffers = [
    {
      id: 1,
      title: "Early Bird Special",
      description: "30% off on all breakfast items from 6AM to 8AM daily",
      icon: <Coffee className="h-8 w-8 text-rtc-red" />,
      timeframe: "6AM - 8AM Daily"
    },
    {
      id: 2,
      title: "Lunch Combo",
      description: "Any sandwich or burger + fries + drink for just $12.99",
      icon: <Utensils className="h-8 w-8 text-rtc-red" />,
      timeframe: "11AM - 2PM Weekdays"
    },
    {
      id: 3,
      title: "Late Night Menu",
      description: "Special late night menu with 20% off after midnight",
      icon: <Clock className="h-8 w-8 text-rtc-red" />,
      timeframe: "12AM - 4AM Daily"
    }
  ];

  return (
    <section id="specials" className="section-container bg-rtc-cream/30">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-rtc-dark">Special Offers</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Take advantage of our special deals and promotions throughout the day
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {specialOffers.map((offer) => (
          <Card key={offer.id} className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="flex flex-col items-center text-center p-6">
              <div className="mb-4 bg-rtc-cream p-4 rounded-full">
                {offer.icon}
              </div>
              <h3 className="font-bold text-xl mb-2 text-rtc-dark">{offer.title}</h3>
              <p className="text-gray-600 mb-4">{offer.description}</p>
              <span className="inline-block bg-rtc-red text-white px-4 py-1 rounded-full text-sm font-medium">
                {offer.timeframe}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Specials;
