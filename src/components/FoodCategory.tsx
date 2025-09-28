
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import FoodCard from './FoodCard';
import { IceCream } from 'lucide-react';

// Sample menu data
const menuCategories = [
  { id: 'Rolls', name: 'Rolls' },
  { id: 'Chowin', name: 'Chowmin' },
  { id: 'Momo', name: 'Momo' },
  { id: 'IceCream', name: 'IceCream' },
  { id: 'Drinks', name: 'Drinks' },
];

const menuItems = {
  Rolls: [
    { id: 1, name: 'Chicken Roll', description: 'Crispy Wrap, Tender Chicken Magic', price: '₹120', image: '/Items/Chicken Roll.jpg' },
    { id: 2, name: 'Special Chicken Roll', description: 'Double Loaded! Egg + Chicken Indulgence', price: '₹155', image: '/Items/ChickenEggRoll.jpg' },
    { id: 3, name: 'Egg Roll', description: 'Scrambled eggs, sausage, cheese and salsa wrapped in a tortilla', price: '₹90', image: '/Items/Egg roll.jpg' },
  ],
  Chowin : [
    { id: 5, name: 'Chicken Chow', description: 'Street-Style Sizzle with Tender Chicken', price: '₹140', image: '/Items/Chicken Chow.jpg' },
    { id: 6, name: 'Egg Chow', description: 'Egg-Citing Taste, Every Bite!', price: '₹130', image: '/Items/Egg Chow.jpg' },
    { id: 7, name: 'Veg Chow', description: 'Wok-Tossed Goodness, Garden Fresh', price: '₹120', image: '/Items/Veg Chow.jpg' },
  ],
  Momo : [
    { id: 9, name: 'Steamed Chicken Momo(6pcs)', description: 'Hot & Juicy Chicken Delight', price: '₹80', image:'/Items/Veg_momo.webp'},
    { id: 10, name: 'Steamed Pork Momo(6pcs)', description: 'Smoky & Succulent Himalayan Bites', price: '₹80', image:  '/Items/Nepalese-Momo.webp'},
  ],

IceCream: [
  { id: 13, name: 'Chocolate Almond Magnum', description: 'Premium chocolate-coated ice cream with roasted almonds', price: '₹90', image: '/IceCream/1.png' },
  { id: 14, name: 'Chocolate Truffle', description: 'Rich truffle-flavored ice cream with a gooey chocolate center', price: '₹80', image: '/IceCream/2.png' },
  { id: 15, name: 'Chocolate Brownie', description: 'Fudgy brownie chunks with chocolate ice cream and syrup', price: '₹80', image: '/IceCream/3.png' },
  { id: 16, name: 'Magnum Classic Chocolate', description: 'Creamy vanilla ice cream coated with classic Belgian chocolate', price: '₹70', image: '/IceCream/4.png' },
  { id: 17, name: 'Magnum Cone', description: 'Crispy cone filled with chocolate-dipped creamy vanilla ice cream', price: '₹100', image: '/IceCream/5.jpg' },
  { id: 18, name: 'Magnum Mini', description: 'Miniature version of Magnum ice cream, perfect for small bites', price: '₹50', image: '/IceCream/6.jpg' },
  { id: 19, name: 'Pistachio Magnum', description: 'Velvety pistachio ice cream wrapped in smooth chocolate', price: '₹90', image: '/IceCream/7.jpg' },
  { id: 20, name: 'Cornetto Double Chocolate', description: 'Double-layered chocolate ice cream in a crunchy cone', price: '₹40', image: '/IceCream/8.jpg' },
  { id: 21, name: 'Cornetto Choco Vanilla', description: 'Perfect blend of chocolate and vanilla swirls in a cone', price: '₹30', image: '/IceCream/9.jpg' },
  { id: 22, name: 'Cornetto Butter Scotch', description: 'Butterscotch flavored ice cream with crunchy praline', price: '₹45', image: '/IceCream/10.jpg' },
  { id: 23, name: 'Cornetto Oreo', description: 'Vanilla ice cream with Oreo chunks in a cone', price: '₹70', image: '/IceCream/11.jpg' },
  { id: 24, name: 'Cornetto Strawberry Vanilla', description: 'Refreshing strawberry and vanilla combo in a cone', price: '₹40', image: '/IceCream/12.jpg' },
  { id: 25, name: 'Aamras Ice Cream', description: 'Traditional Indian mango pulp ice cream with creamy texture', price: '₹40', image: '/IceCream/13.jpg' },
  { id: 26, name: 'Feast Chuski - Orange Mahabar', description: 'Tangy orange flavored frozen stick for a refreshing bite', price: '₹10', image: '/IceCream/14.jpg' },
  { id: 27, name: 'Feast Chuski - Aam Panna', description: 'Sour-sweet green mango flavored frozen delight', price: '₹10', image: '/IceCream/14.jpg' },
  { id: 28, name: 'Feast Chuski - Masala Cola', description: 'Classic cola chuski infused with Indian masala twist', price: '₹10', image: '/IceCream/14.jpg' },
  { id: 29, name: 'Kulfeez - Dry Rabri Kulfi', description: 'Traditional kulfi enriched with dry fruits and rabri', price: '₹35', image: '/IceCream/15.jpg' },
  { id: 30, name: 'Kulfeez - Rajwadi', description: 'Royal kulfi with saffron, pista, and cardamom flavor', price: '₹10', image: '/IceCream/15.jpg' },
  { id: 31, name: 'Kulfeez - Shahi Kulfi', description: 'Shahi-style kulfi with creamy texture and nuts', price: '₹20', image: '/IceCream/15.jpg' },
  { id: 32, name: 'Mini Chocobar', description: 'Mini chocolate coated ice cream bar', price: '₹10', image: '/IceCream/16.jpg' },
  { id: 33, name: 'Chocobar', description: 'Classic creamy vanilla ice cream bar dipped in chocolate', price: '₹20', image: '/IceCream/16.jpg' },
  { id: 34, name: 'Cadbury Crackle', description: 'Chocolate ice cream bar with crispy crackle bits', price: '₹70', image: '/IceCream/17.jpg' },
  { id: 35, name: 'Black Forest', description: 'Chocolate and cherry ice cream inspired by Black Forest cake', price: '₹50', image: '/IceCream/18.jpg' },
  { id: 36, name: 'Chocolate', description: 'Classic rich chocolate ice cream scoop', price: '₹40', image: '/IceCream/26.jpg' },
  { id: 37, name: 'Twisters - Mango Strawberry', description: 'Swirled mango and strawberry flavored ice cream stick', price: '₹20', image: '/IceCream/19.jpg' },
  { id: 38, name: 'Twisters - Pineapple Strawberry', description: 'Refreshing pineapple and strawberry ice cream stick', price: '₹20', image: '/IceCream/19.jpg' },
  { id: 39, name: 'American Nuts', description: 'Nutty ice cream with almonds, cashews, and pista', price: '₹40', image: '/IceCream/20.jpg' },
  { id: 40, name: 'Trixy', description: 'Fun mix of fruity ice cream layers with a chocolate core', price: '₹70', image: '/IceCream/25.jpg' },
  { id: 41, name: 'Strawberry Sundae', description: 'Creamy strawberry sundae topped with syrup and sprinkles', price: '₹40', image: '/IceCream/21.jpg' },
  { id: 42, name: 'Choco-Tastic Sundae', description: 'Decadent sundae with chocolate ice cream and toppings', price: '₹40', image: '/IceCream/21.jpg' },
  { id: 43, name: 'Classix - Vanilla', description: 'Classic vanilla flavored ice cream scoop', price: '₹20', image: '/IceCream/22.jpg' },
  { id: 45, name: 'Choco Vanilla Sandwich', description: 'Ice cream sandwich with chocolate and vanilla layers', price: '₹35', image: '/IceCream/23.jpg' },
  { id: 46, name: 'Cassata', description: 'Classic Indian layered ice cream with tutti frutti and nuts', price: '₹70', image: '/IceCream/24.jpg' },

  { id: 47, name: 'Double Chocolate Chocochip', description: 'Rich double chocolate ice cream packed with crunchy chocochips', price: '₹50', image: '/IceCream/28.jpg' },
  { id: 48, name: 'Dry Fruit Delight', description: 'Creamy ice cream loaded with cashews, almonds, pistachios, and raisins', price: '₹50', image: '/IceCream/28.jpg' },
  { id: 49, name: 'Choco Brownie Fudge', description: 'Decadent chocolate ice cream blended with chewy brownie chunks and fudge', price: '₹50', image: '/IceCream/28.jpg' },
  { id: 50, name: 'Desi Kulfi', description: 'Traditional Indian kulfi with a creamy texture and authentic flavors', price: '₹60', image: '/IceCream/29.jpg' },
  { id: 51, name: 'Oreo and Cream Frozen Dessert Tub', description: 'Creamy frozen dessert swirled with crunchy Oreo cookie pieces', price: '₹60', image: '/IceCream/30.jpg' },
  { id: 52, name: 'Choco Brownie', description: 'Classic chocolate ice cream mixed with soft brownie bites', price: '₹60', image: '/IceCream/31.jpg' },

],

  Drinks : [
    { id: 47, name: 'Tea 200ml', description: 'Soothing. Strong. Simply Assam. (or "Chai with a Punch!', price: '₹40', image: '/Items/tea.jpg' },
    { id: 48, name: 'Coffee 200ml', description: 'Fresh Brew. Real Buzz.', price: '₹60', image: '/Items/coffee.jpg' },
    { id: 49, name: 'Water Bottle 500 ml', description: 'Fresh & Pure Hydration', price: '₹10', image: '/IceCream/27.jpg' },
    { id: 50, name: 'Water Bottle 1000 ml', description: 'Fresh & Pure Hydration - Large Size', price: '₹20', image: '/IceCream/27.jpg' },
  ],
};

const FoodCategory = () => {
  const [activeTab, setActiveTab] = useState('Rolls');
  return (
    <section id="menu" className="relative bg-[url(/lovable-uploads/lol2.png)] bg-contain overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-white/30"></div>
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
            From rolls to momos and everything in between, our menu offers a wide variety of options to satisfy your cravings any time of day.
          </p>
        </div>

        <Tabs defaultValue="Rolls" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="flex overflow-x-auto justify-start sm:justify-center gap-2 sm:gap-3 md:gap-4 mb-8 md:mb-12 lg:mb-16 max-w-full sm:max-w-4xl mx-auto p-2 sm:p-4 scrollbar-hide">
            {menuCategories.map(category => (
              <TabsTrigger 
                key={category.id}
                value={category.id}
                className={`rounded-full px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 font-medium text-xs sm:text-sm md:text-base transition-all duration-300 whitespace-nowrap
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
