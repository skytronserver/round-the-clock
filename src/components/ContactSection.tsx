
import { MapPin, Phone, Clock, Mail } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="section-container bg-rtc-cream/30">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-rtc-dark">Find Us</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We're always here to serve you. Visit us or get in touch to place an order.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-6 text-rtc-dark">Contact Information</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <MapPin className="text-rtc-red mt-1 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-medium">Location</h4>
                <p className="text-gray-600">123 Main Street, Anytown, CA 12345</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Phone className="text-rtc-red mt-1 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-medium">Phone</h4>
                <p className="text-gray-600">(555) 123-4567</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Mail className="text-rtc-red mt-1 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-medium">Email</h4>
                <p className="text-gray-600">hello@roundtheclock.shop</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Clock className="text-rtc-red mt-1 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-medium">Hours</h4>
                <p className="text-gray-600">Open 24 hours, 7 days a week</p>
              </div>
            </div>
          </div>

          <form className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-rtc-red focus:border-rtc-red"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-rtc-red focus:border-rtc-red"
                  placeholder="Your email"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-rtc-red focus:border-rtc-red"
                placeholder="How can we help you?"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-rtc-red text-white py-2 px-4 rounded-md hover:bg-rtc-red/90 transition-colors duration-300 font-medium"
            >
              Send Message
            </button>
          </form>
        </div>
        
        <div className="lg:col-span-3 h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.305935303!2d-74.25986548248684!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sca!4v1652813309720!5m2!1sen!2sca"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
