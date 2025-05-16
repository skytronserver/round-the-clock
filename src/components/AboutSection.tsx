
import { Clock, Users, Award, MapPin } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="section-container bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-rtc-dark">About Round The Clock</h2>
          <p className="text-gray-600 mb-6">
            Founded in 2010, Round The Clock was born from a simple idea: good food should be available whenever you want it. We believe that delicious meals shouldn't be restricted by traditional opening hours.
          </p>
          <p className="text-gray-600 mb-6">
            Our commitment to quality ingredients, expert preparation, and friendly service has made us a favorite destination for food lovers at any hour of the day or night.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="flex items-center gap-3">
              <Clock className="text-rtc-red" size={20} />
              <span className="font-medium">24/7 Service</span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="text-rtc-red" size={20} />
              <span className="font-medium">Friendly Staff</span>
            </div>
            <div className="flex items-center gap-3">
              <Award className="text-rtc-red" size={20} />
              <span className="font-medium">Quality Ingredients</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-rtc-red" size={20} />
              <span className="font-medium">Multiple Locations</span>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="h-80 md:h-96 lg:h-[500px] bg-rtc-red/10 rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop"
              alt="Restaurant Interior"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-rtc-red p-6 rounded-lg shadow-lg hidden md:flex flex-col items-center justify-center text-white">
            <span className="text-4xl font-bold">24/7</span>
            <span className="font-medium text-sm">ALWAYS OPEN</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
