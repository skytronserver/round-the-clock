
import { Clock, Users, Award, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutSection = () => {
  const features = [
    { icon: <Clock className="text-rtc-red" size={20} />, text: "24/7 Service" },
    { icon: <Users className="text-rtc-red" size={20} />, text: "Friendly Staff" },
    { icon: <Award className="text-rtc-red" size={20} />, text: "Quality Ingredients" },
    { icon: <MapPin className="text-rtc-red" size={20} />, text: "Multiple Locations" },
  ];

  return (
    <section id="about" className="section-container bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6 text-rtc-dark"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            About Round The Clock
          </motion.h2>
          <motion.p 
            className="text-gray-600 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Founded in 2010, Round The Clock was born from a simple idea: good food should be available whenever you want it. We believe that delicious meals shouldn't be restricted by traditional opening hours.
          </motion.p>
          <motion.p 
            className="text-gray-600 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Our commitment to quality ingredients, expert preparation, and friendly service has made us a favorite destination for food lovers at any hour of the day or night.
          </motion.p>
          <motion.div 
            className="grid grid-cols-2 gap-4 mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="flex items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + (index * 0.1), duration: 0.5 }}
                whileHover={{ scale: 1.05, x: 5 }}
              >
                {feature.icon}
                <span className="font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="relative"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <motion.div 
            className="h-80 md:h-96 lg:h-[500px] bg-rtc-red/10 rounded-lg overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              initial={{ scale: 1.2 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop"
              alt="Restaurant Interior"
              className="w-full h-full object-cover rounded-lg"
            />
          </motion.div>
          <motion.div 
            className="absolute -bottom-8 -left-8 w-40 h-40 bg-rtc-red p-6 rounded-lg shadow-lg hidden md:flex flex-col items-center justify-center text-white"
            initial={{ opacity: 0, scale: 0, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.5, type: "spring" }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.2), 0 8px 10px -6px rgb(0 0 0 / 0.2)"
            }}
          >
            <span className="text-4xl font-bold">24/7</span>
            <span className="font-medium text-sm">ALWAYS OPEN</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
