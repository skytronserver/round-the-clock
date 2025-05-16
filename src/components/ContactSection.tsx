
import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactSection = () => {
  const contactInfo = [
    { icon: <MapPin className="text-rtc-red mt-1 flex-shrink-0" size={20} />, title: "Location", content: "123 Main Street, Anytown, CA 12345" },
    { icon: <Phone className="text-rtc-red mt-1 flex-shrink-0" size={20} />, title: "Phone", content: "(555) 123-4567" },
    { icon: <Mail className="text-rtc-red mt-1 flex-shrink-0" size={20} />, title: "Email", content: "hello@roundtheclock.shop" },
    { icon: <Clock className="text-rtc-red mt-1 flex-shrink-0" size={20} />, title: "Hours", content: "Open 24 hours, 7 days a week" },
  ];

  return (
    <section id="contact" className="section-container bg-rtc-cream/30">
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
          Find Us
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          We're always here to serve you. Visit us or get in touch to place an order.
        </motion.p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <motion.div 
          className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h3 
            className="text-xl font-bold mb-6 text-rtc-dark"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Contact Information
          </motion.h3>
          
          <div className="space-y-4">
            {contactInfo.map((item, index) => (
              <motion.div 
                key={index}
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
                whileHover={{ x: 5 }}
              >
                {item.icon}
                <div>
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-gray-600">{item.content}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.form 
            className="mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <motion.input
                  whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(234, 56, 76, 0.3)" }}
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-rtc-red focus:border-rtc-red"
                  placeholder="Your name"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <motion.input
                  whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(234, 56, 76, 0.3)" }}
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-rtc-red focus:border-rtc-red"
                  placeholder="Your email"
                />
              </motion.div>
            </div>
            <motion.div 
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <motion.textarea
                whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(234, 56, 76, 0.3)" }}
                id="message"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-rtc-red focus:border-rtc-red"
                placeholder="How can we help you?"
              ></motion.textarea>
            </motion.div>
            <motion.button
              type="submit"
              className="w-full bg-rtc-red text-white py-2 px-4 rounded-md hover:bg-rtc-red/90 transition-colors duration-300 font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              Send Message
            </motion.button>
          </motion.form>
        </motion.div>
        
        <motion.div 
          className="lg:col-span-3 h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-md"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          whileHover={{ scale: 1.01 }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.305935303!2d-74.25986548248684!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sca!4v1652813309720!5m2!1sen!2sca"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
