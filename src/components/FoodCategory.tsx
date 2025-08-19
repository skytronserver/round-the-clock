
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import FoodCard from './FoodCard';

// Sample menu data
const menuCategories = [
  { id: 'breakfast', name: 'Breakfast' },
  { id: 'lunch', name: 'Lunch' },
  { id: 'dinner', name: 'Dinner' },
  { id: 'desserts', name: 'Desserts' },
  { id: 'drinks', name: 'Drinks' },
];

const menuItems = {
  breakfast: [
    { id: 1, name: 'Classic Pancakes', description: 'Fluffy pancakes served with maple syrup and butter', price: '$8.99', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1980&auto=format&fit=crop' },
    { id: 2, name: 'Avocado Toast', description: 'Fresh avocado on sourdough with poached eggs', price: '$10.99', image: 'https://images.unsplash.com/photo-1603046891744-76e6481cf539?q=80&w=1974&auto=format&fit=crop' },
    { id: 3, name: 'Breakfast Burrito', description: 'Scrambled eggs, sausage, cheese and salsa wrapped in a tortilla', price: '$9.99', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=1964&auto=format&fit=crop' },
    { id: 4, name: 'French Toast', description: 'Thick slices of bread soaked in a mixture of eggs and milk, then fried', price: '$8.49', image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=1547&auto=format&fit=crop' },
  ],
  lunch: [
    { id: 5, name: 'Classic Burger', description: 'Beef patty with lettuce, tomato, and special sauce', price: '$12.99', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899&auto=format&fit=crop' },
    { id: 6, name: 'Caesar Salad', description: 'Romaine lettuce, croutons, parmesan cheese with Caesar dressing', price: '$9.99', image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=2070&auto=format&fit=crop' },
    { id: 7, name: 'Club Sandwich', description: 'Triple-decker sandwich with chicken, bacon, lettuce, and tomato', price: '$11.49', image: 'https://images.unsplash.com/photo-1567234669003-dce7a7a88821?q=80&w=1770&auto=format&fit=crop' },
    { id: 8, name: 'Chicken Wrap', description: 'Grilled chicken with fresh vegetables in a whole wheat wrap', price: '$10.99', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=1964&auto=format&fit=crop' },
  ],
  dinner: [
    { id: 9, name: 'Steak Frites', description: 'Grilled steak with crispy french fries', price: '$18.99', image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070&auto=format&fit=crop' },
    { id: 10, name: 'Pasta Carbonara', description: 'Spaghetti with creamy sauce, bacon and parmesan', price: '$14.99', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=1771&auto=format&fit=crop' },
    { id: 11, name: 'Grilled Salmon', description: 'Fresh salmon with seasonal vegetables', price: '$17.99', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit=crop' },
    { id: 12, name: 'Mushroom Risotto', description: 'Creamy Italian rice with assorted mushrooms and parmesan', price: '$15.99', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=1770&auto=format&fit=crop' },
  ],
  desserts: [
    { id: 13, name: 'Chocolate Cake', description: 'Rich chocolate cake with ganache', price: '$7.99', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1887&auto=format&fit=crop' },
    { id: 14, name: 'Cheesecake', description: 'Classic New York style cheesecake', price: '$6.99', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=2070&auto=format&fit=crop' },
    { id: 15, name: 'Apple Pie', description: 'Warm apple pie with vanilla ice cream', price: '$6.49', image: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?q=80&w=1936&auto=format&fit=crop' },
    { id: 16, name: 'Ice Cream Sundae', description: 'Three scoops with toppings of your choice', price: '$5.99', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1827&auto=format&fit=crop' },
  ],
  drinks: [
    { id: 17, name: 'Fresh Orange Juice', description: 'Freshly squeezed orange juice', price: '$4.99', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=1974&auto=format&fit=crop' },
    { id: 18, name: 'Cappuccino', description: 'Espresso with steamed milk and foam', price: '$3.99', image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=1887&auto=format&fit=crop' },
    { id: 19, name: 'Iced Tea', description: 'Homemade iced tea with optional lemon', price: '$3.49', image: 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?q=80&w=1964&auto=format&fit=crop' },
    { id: 20, name: 'Smoothie', description: 'Blend of seasonal fruits and yogurt', price: '$5.99', image: 'https://images.unsplash.com/photo-1502741224143-90386d7f8c82?q=80&w=2069&auto=format&fit=crop' },
  ],
};

const FoodCategory = () => {
  const [activeTab, setActiveTab] = useState('breakfast');

  return (
    <section id="menu" className="relative bg-[url(/lovable-uploads/back3.png)] bg-contain bg-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-white/60"></div>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-40 h-40 border border-rtc-red rounded-full animate-ping-slow"></div>
        <div className="absolute top-1/3 right-20 w-32 h-32 border border-rtc-red rounded-full animate-ping-slow" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-36 h-36 border border-rtc-red rounded-full animate-ping-slow" style={{animationDelay: '3s'}}></div>
      </div>
      
      <div className="container mx-auto py-20 px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-rtc-red/10 backdrop-blur-sm border border-rtc-red/20 rounded-full px-6 py-2 mb-6">
            <span className="text-rtc-red text-sm font-medium">Freshly Prepared Daily</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-rtc-dark leading-tight">
            Our <span className="text-rtc-red">Delicious</span> Menu
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            From breakfast to dinner and everything in between, our menu offers a wide variety of options to satisfy your cravings any time of day.
          </p>
        </div>

        <Tabs defaultValue="breakfast" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="flex flex-wrap justify-center gap-2 mb-8">
            {menuCategories.map(category => (
              <TabsTrigger 
                key={category.id}
                value={category.id}
                className={`rounded-full px-6 py-2 font-medium transition-all duration-300
                ${activeTab === category.id ? 'bg-rtc-red text-white shadow-md' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {menuCategories.map(category => (
            <TabsContent key={category.id} value={category.id} className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {menuItems[category.id as keyof typeof menuItems].map(item => (
                  <FoodCard key={item.id} item={item} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default FoodCategory;
