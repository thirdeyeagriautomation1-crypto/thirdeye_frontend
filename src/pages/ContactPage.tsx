import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function ContactPage() {
  const location = useLocation();
  const productName = location.state?.product || '';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    farmSize: '',
    product: productName,
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send data to a backend
    console.log('Form submitted:', formData);
    
    toast.success('Thank you for your inquiry! We will contact you within 24 hours.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      farmSize: '',
      product: '',
      message: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/1234567890?text=Hello, I would like to inquire about your irrigation systems', '_blank');
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="mb-4 text-white">Get in Touch</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Have questions? Our team of irrigation experts is here to help you find the perfect solution for your farm
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h2 className="mb-6 text-gray-900">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-1">Head Office</h3>
                  <p className="text-gray-600 text-sm">
                    123 Agriculture Boulevard<br />
                    Tech Park, Innovation City<br />
                    12345, USA
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-1">Phone</h3>
                  <p className="text-gray-600 text-sm">
                    <a href="tel:+1234567890" className="hover:text-green-600">
                      +1 (234) 567-890
                    </a>
                  </p>
                  <p className="text-gray-500 text-xs mt-1">Mon-Fri: 8am-6pm</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600 text-sm">
                    <a href="mailto:info@agrosmart.com" className="hover:text-green-600">
                      info@agrosmart.com
                    </a>
                  </p>
                  <p className="text-gray-600 text-sm">
                    <a href="mailto:support@agrosmart.com" className="hover:text-green-600">
                      support@agrosmart.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-1">WhatsApp</h3>
                  <button
                    onClick={handleWhatsApp}
                    className="text-sm text-green-600 hover:text-green-700"
                  >
                    Chat with us on WhatsApp
                  </button>
                </div>
              </div>
            </div>

            {/* Branch Locations */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-gray-900 mb-4">Branch Locations</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>📍 California Regional Office</li>
                <li>📍 Texas Service Center</li>
                <li>📍 Florida Distribution Hub</li>
                <li>📍 Arizona Technical Center</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <h2 className="mb-6 text-gray-900">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="+1 (234) 567-890"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm text-gray-700 mb-2">
                      Farm/Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Green Valley Farms"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="farmSize" className="block text-sm text-gray-700 mb-2">
                      Farm Size (Acres)
                    </label>
                    <select
                      id="farmSize"
                      name="farmSize"
                      value={formData.farmSize}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select farm size</option>
                      <option value="0-10">Less than 10 acres</option>
                      <option value="10-50">10-50 acres</option>
                      <option value="50-100">50-100 acres</option>
                      <option value="100-500">100-500 acres</option>
                      <option value="500+">500+ acres</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="product" className="block text-sm text-gray-700 mb-2">
                      Product of Interest
                    </label>
                    <select
                      id="product"
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select a product</option>
                      <option value="wireless">Wireless Irrigation Automation</option>
                      <option value="wired">Wired Irrigation Controllers</option>
                      <option value="fertigation">Fertigation Systems</option>
                      <option value="iot">Mobile App & IoT Integration</option>
                      <option value="solar">Solar-Powered Systems</option>
                      <option value="custom">Custom Solution</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    placeholder="Tell us about your irrigation needs, challenges, or questions..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg transition-colors"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <h2 className="mb-6 text-gray-900 text-center">Visit Our Head Office</h2>
          <div className="bg-gray-200 rounded-lg overflow-hidden h-[400px] flex items-center justify-center">
            <div className="text-center text-gray-600">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>123 Agriculture Boulevard, Tech Park</p>
              <p className="text-sm mt-2">
                <a
                  href="https://maps.google.com/?q=123+Agriculture+Boulevard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700"
                >
                  Open in Google Maps
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
