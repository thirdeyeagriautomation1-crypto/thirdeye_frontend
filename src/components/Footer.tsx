import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Droplet } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-green-500 to-blue-600 p-2 rounded-lg">
                <Droplet className="w-5 h-5 text-white" />
              </div>
              <span className="text-white">AgroSmart Solutions</span>
            </div>
            <p className="text-sm mb-4">
              Leading the future of sustainable agriculture with smart irrigation and fertigation automation systems.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-green-500 transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-green-500 transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-green-500 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-green-500 transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-green-500 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-green-500 transition-colors">About Us</Link></li>
              <li><Link to="/products" className="hover:text-green-500 transition-colors">Products</Link></li>
              <li><Link to="/case-studies" className="hover:text-green-500 transition-colors">Case Studies</Link></li>
              <li><Link to="/blog" className="hover:text-green-500 transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white mb-4">Our Solutions</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products?category=wireless" className="hover:text-green-500 transition-colors">Wireless Irrigation</Link></li>
              <li><Link to="/products?category=wired" className="hover:text-green-500 transition-colors">Wired Controllers</Link></li>
              <li><Link to="/products?category=fertigation" className="hover:text-green-500 transition-colors">Fertigation Systems</Link></li>
              <li><Link to="/products?category=iot" className="hover:text-green-500 transition-colors">IoT Solutions</Link></li>
              <li><Link to="/products?category=solar" className="hover:text-green-500 transition-colors">Solar Systems</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>123 Agriculture Boulevard, Tech Park, Innovation City, 12345</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+1234567890" className="hover:text-green-500 transition-colors">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:info@agrosmart.com" className="hover:text-green-500 transition-colors">info@agrosmart.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} AgroSmart Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
