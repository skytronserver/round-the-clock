
import { motion } from 'framer-motion';

interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

interface FoodCardProps {
  item: FoodItem;
  index?: number;
}

const FoodCard = ({ item, index = 0 }: FoodCardProps) => {
  return (
    <motion.div 
      className="food-card group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ 
        y: -10, 
        boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" 
      }}
    >
      <div className="relative h-48 overflow-hidden">
        <motion.img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div 
          className="absolute top-2 right-2 bg-rtc-red text-white px-3 py-1 rounded-full font-bold text-sm"
          initial={{ x: 50 }}
          animate={{ x: 0 }}
          transition={{ delay: (index * 0.1) + 0.2, duration: 0.4, type: "spring" }}
        >
          {item.price}
        </motion.div>
      </div>
      <div className="p-4">
        <motion.h3 
          className="font-bold text-lg mb-2 text-rtc-dark"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: (index * 0.1) + 0.3, duration: 0.4 }}
        >
          {item.name}
        </motion.h3>
        <motion.p 
          className="text-gray-600 text-sm mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: (index * 0.1) + 0.4, duration: 0.4 }}
        >
          {item.description}
        </motion.p>
        <motion.button 
          className="w-full bg-rtc-cream text-rtc-dark py-2 rounded-full font-medium hover:bg-rtc-red hover:text-white transition-colors duration-300"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Add to Order
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FoodCard;
