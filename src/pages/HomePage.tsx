import { Link } from 'react-router-dom';
import { ArrowRight, Droplets, Target, Zap, Leaf, TrendingUp, Shield } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1685475188388-2a266e6bd5c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGZhcm1pbmclMjBpcnJpZ2F0aW9ufGVufDF8fHx8MTc2MjI3OTgyN3ww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Smart irrigation in action"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-blue-900/60" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="mb-6 text-white">Smart Farming. Smarter Water.</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Transform your agricultural operations with cutting-edge irrigation and fertigation automation systems. 
            Save water, increase yields, and maximize efficiency.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg transition-colors"
          >
            Explore Smart Irrigation Solutions
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* 3 Highlights */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Droplets className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="mb-2 text-gray-900">Water Saving</h3>
              <p className="text-gray-600">
                Reduce water consumption by up to 60% with intelligent scheduling and real-time monitoring
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="mb-2 text-gray-900">Precision Farming</h3>
              <p className="text-gray-600">
                Deliver the right amount of water and nutrients exactly where and when needed
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="mb-2 text-gray-900">Easy Automation</h3>
              <p className="text-gray-600">
                Control your entire irrigation system from your smartphone with intuitive mobile apps
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6 text-gray-900">Revolutionizing Agriculture Through Technology</h2>
              <p className="text-gray-600 mb-6">
                AgroSmart Solutions is a leading provider of smart irrigation and fertigation automation systems. 
                We combine cutting-edge IoT technology with agricultural expertise to help farmers optimize water usage, 
                improve crop yields, and reduce operational costs.
              </p>
              <p className="text-gray-600 mb-6">
                Our mission is to make precision agriculture accessible to farms of all sizes, from small family operations 
                to large commercial estates. With our wireless controllers, mobile apps, and intelligent automation systems, 
                you can manage your irrigation from anywhere in the world.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700"
              >
                Learn More About Us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1575704497240-17622d90265f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmYXJtJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjIyNzk4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Modern farm technology"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-gray-900">Why Choose AgroSmart Solutions?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive irrigation solutions backed by years of expertise and innovative technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <Leaf className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="mb-2 text-gray-900">Sustainable Solutions</h3>
              <p className="text-gray-600">
                Eco-friendly systems that conserve water and reduce environmental impact while improving farm productivity
              </p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-lg">
              <TrendingUp className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="mb-2 text-gray-900">Proven ROI</h3>
              <p className="text-gray-600">
                Our clients see significant returns on investment through water savings, increased yields, and reduced labor costs
              </p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-lg">
              <Shield className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="mb-2 text-gray-900">Reliable Support</h3>
              <p className="text-gray-600">
                24/7 technical support and maintenance services to keep your irrigation systems running smoothly
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-gray-900">Featured Solutions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our range of smart irrigation and fertigation products designed for modern agriculture
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Wireless Controllers', link: '/products?category=wireless' },
              { name: 'Wired Systems', link: '/products?category=wired' },
              { name: 'Fertigation', link: '/products?category=fertigation' },
              { name: 'IoT Solutions', link: '/products?category=iot' },
            ].map((product) => (
              <Link
                key={product.name}
                to={product.link}
                className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 group"
              >
                <h3 className="text-gray-900 group-hover:text-green-600 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 text-green-600 mt-2 group-hover:gap-3 transition-all">
                  View Products
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-4 text-white">Ready to Transform Your Farm?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get in touch with our experts to discuss your irrigation needs and receive a customized solution
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg transition-colors"
            >
              Get a Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
