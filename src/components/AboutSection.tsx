import { Clock, Users, Award, MapPin } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="relative bg-[url(/lovable-uploads/back3.png)] bg-cover bg-center overflow-hidden">
      {/* Background overlay to reduce opacity */}
      <div className="absolute inset-0 bg-white/60"></div>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-24 left-12 w-48 h-48 border border-rtc-red rounded-full animate-ping-slow"></div>
        <div className="absolute bottom-32 right-16 w-40 h-40 border border-rtc-red rounded-full animate-ping-slow" style={{animationDelay: '1.8s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 border border-rtc-red rounded-full animate-ping-slow" style={{animationDelay: '0.7s'}}></div>
      </div>
      
      <div className="container mx-auto py-20 px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-rtc-red/10 backdrop-blur-sm border border-rtc-red/20 rounded-full px-6 py-2 mb-6">
              <span className="text-rtc-red text-sm font-medium">Our Story</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-rtc-dark leading-tight">
              About <span className="text-rtc-red">Round</span> The Clock
            </h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
               Round The Clock was born from a simple idea: good food should be available whenever you want it. We believe that delicious meals shouldn't be restricted by traditional opening hours.
            </p>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Our commitment to quality ingredients, expert preparation, and friendly service has made us a favorite destination for food lovers at any hour of the day or night.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-rtc-red/10">
                <Clock className="text-rtc-red" size={24} />
                <span className="font-semibold text-rtc-dark">24/7 Service</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-rtc-red/10">
                <Users className="text-rtc-red" size={24} />
                <span className="font-semibold text-rtc-dark">Friendly Staff</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-rtc-red/10">
                <Award className="text-rtc-red" size={24} />
                <span className="font-semibold text-rtc-dark">Quality Ingredients</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-rtc-red/10">
                <MapPin className="text-rtc-red" size={24} />
                <span className="font-semibold text-rtc-dark">Multiple Locations</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="h-80 md:h-96 lg:h-[500px] bg-rtc-red/10 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/lovable-uploads/hero-1.jpg"
                alt="Restaurant Interior"
                className="w-full h-full object-cover rounded-2xl scale-100"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-br from-rtc-red to-red-700 p-6 rounded-2xl shadow-2xl hidden md:flex flex-col items-center justify-center text-white">
              <span className="text-4xl font-black">24/7</span>
              <span className="font-bold text-sm tracking-wide">ALWAYS OPEN</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
