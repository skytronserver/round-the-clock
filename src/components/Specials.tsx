
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
    <section id="specials" className="relative bg-[url(/lovable-uploads/back3.png)] bg-cover bg-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-white/60"></div>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-32 right-16 w-44 h-44 border border-rtc-red rounded-full animate-ping-slow"></div>
        <div className="absolute bottom-20 left-20 w-36 h-36 border border-rtc-red rounded-full animate-ping-slow" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-28 h-28 border border-rtc-red rounded-full animate-ping-slow" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="container mx-auto py-20 px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-rtc-red/10 backdrop-blur-sm border border-rtc-red/20 rounded-full px-6 py-2 mb-6">
            <span className="text-rtc-red text-sm font-medium">Limited Time Offers</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-rtc-dark leading-tight">
            Special <span className="text-rtc-red">Deals</span> & Offers
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
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
      </div>
    </section>
  );
};

export default Specials;
