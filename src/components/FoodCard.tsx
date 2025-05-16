
interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

interface FoodCardProps {
  item: FoodItem;
}

const FoodCard = ({ item }: FoodCardProps) => {
  return (
    <div className="food-card group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-rtc-red text-white px-3 py-1 rounded-full font-bold text-sm">
          {item.price}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-rtc-dark">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{item.description}</p>
        <button className="w-full bg-rtc-cream text-rtc-dark py-2 rounded-full font-medium hover:bg-rtc-red hover:text-white transition-colors duration-300">
          Add to Order
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
