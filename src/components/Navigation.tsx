import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Droplet, Settings } from 'lucide-react';
import { useState } from 'react';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/products', label: 'Products' },
    { path: '/case-studies', label: 'Case Studies' },
    { path: '/blog', label: 'Blog' },
    { path: '/faq', label: 'FAQ' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-green-500 to-blue-600 p-2 rounded-lg">
              <Droplet className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-gray-900">AgroSmart Solutions</div>
              <div className="text-xs text-gray-500">Smart Farming. Smarter Water.</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors ${
                  isActive(link.path)
                    ? 'text-green-600'
                    : 'text-gray-700 hover:text-green-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin"
              className={`flex items-center gap-1 transition-colors ${
                isActive('/admin')
                  ? 'text-green-600'
                  : 'text-gray-700 hover:text-green-600'
              }`}
              title="Admin Panel"
            >
              <Settings className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-2 px-4 transition-colors ${
                  isActive(link.path)
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2 py-2 px-4 transition-colors ${
                isActive('/admin')
                  ? 'text-green-600 bg-green-50'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Settings className="w-4 h-4" />
              Admin Panel
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}