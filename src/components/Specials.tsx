
import { Clock, Coffee, Utensils } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

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
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-4 text-rtc-dark"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Special Offers
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Take advantage of our special deals and promotions throughout the day
        </motion.p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {specialOffers.map((offer, index) => (
          <motion.div
            key={offer.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
          >
            <motion.div
              whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Card className="border-none shadow-lg">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <motion.div 
                    className="mb-4 bg-rtc-cream p-4 rounded-full"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.2, duration: 0.5, type: "spring" }}
                  >
                    {offer.icon}
                  </motion.div>
                  <motion.h3 
                    className="font-bold text-xl mb-2 text-rtc-dark"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.2, duration: 0.5 }}
                  >
                    {offer.title}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-600 mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
                  >
                    {offer.description}
                  </motion.p>
                  <motion.span 
                    className="inline-block bg-rtc-red text-white px-4 py-1 rounded-full text-sm font-medium"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + index * 0.2, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {offer.timeframe}
                  </motion.span>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Specials;
