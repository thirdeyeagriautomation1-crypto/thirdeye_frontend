import { Calendar, User, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: '5 Ways Smart Irrigation Saves Water and Money',
      excerpt: 'Discover how modern irrigation technology can reduce your water consumption by up to 60% while improving crop yields and cutting operational costs.',
      author: 'Dr. Sarah Johnson',
      date: 'October 28, 2024',
      category: 'Water Conservation',
      image: 'https://images.unsplash.com/photo-1685475188388-2a266e6bd5c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGZhcm1pbmclMjBpcnJpZ2F0aW9ufGVufDF8fHx8MTc2MjI3OTgyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      readTime: '5 min read',
    },
    {
      id: 2,
      title: 'Understanding Fertigation: A Complete Guide',
      excerpt: 'Learn everything you need to know about fertigation systems, from basic principles to advanced automation techniques for optimal nutrient delivery.',
      author: 'Michael Chen',
      date: 'October 21, 2024',
      category: 'Fertigation',
      image: 'https://images.unsplash.com/photo-1575704497240-17622d90265f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmYXJtJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjIyNzk4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      readTime: '8 min read',
    },
    {
      id: 3,
      title: 'IoT in Agriculture: The Future is Here',
      excerpt: 'Explore how Internet of Things technology is revolutionizing farm management, enabling real-time monitoring and control from anywhere in the world.',
      author: 'Emily Rodriguez',
      date: 'October 14, 2024',
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1755719523098-227f4c486eb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpb3QlMjBzZW5zb3JzJTIwZmFybWluZ3xlbnwxfHx8fDE3NjIyNzk4Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      readTime: '6 min read',
    },
    {
      id: 4,
      title: 'Solar-Powered Irrigation: Going Off-Grid',
      excerpt: 'Discover the benefits of solar-powered irrigation systems and how they can provide reliable, cost-effective water management in remote locations.',
      author: 'David Kumar',
      date: 'October 7, 2024',
      category: 'Sustainable Farming',
      image: 'https://images.unsplash.com/photo-1592079927431-3f8ced0dacc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGFncmljdWx0dXJlfGVufDF8fHx8MTc2MjI1MzQ4NHww&ixlib=rb-4.1.0&q=80&w=1080',
      readTime: '7 min read',
    },
    {
      id: 5,
      title: 'Soil Moisture Sensors: Precision Irrigation',
      excerpt: 'Learn how soil moisture sensors work and why they\'re essential for optimizing water usage and maintaining healthy crops in any climate.',
      author: 'Dr. Sarah Johnson',
      date: 'September 30, 2024',
      category: 'Precision Agriculture',
      image: 'https://images.unsplash.com/photo-1660444770624-7c11f739735d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGFncmljdWx0dXJlJTIwZmllbGR8ZW58MXx8fHwxNzYyMjc5ODI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      readTime: '5 min read',
    },
    {
      id: 6,
      title: 'Calculating ROI on Irrigation Automation',
      excerpt: 'A practical guide to understanding the return on investment for smart irrigation systems, including real-world examples and calculations.',
      author: 'Michael Chen',
      date: 'September 23, 2024',
      category: 'Business',
      image: 'https://images.unsplash.com/photo-1645414183689-08fcdd60a947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGlycmlnYXRpb24lMjBzeXN0ZW18ZW58MXx8fHwxNzYyMjc5ODI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      readTime: '10 min read',
    },
  ];

  const categories = ['All', 'Water Conservation', 'Fertigation', 'Technology', 'Sustainable Farming', 'Precision Agriculture', 'Business'];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="mb-4 text-white">Irrigation Insights & Updates</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Expert advice, success stories, and the latest trends in smart irrigation and precision agriculture
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 bg-white border border-gray-300 rounded-full hover:border-green-600 hover:text-green-600 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-[16/10] lg:aspect-auto">
                <ImageWithFallback
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full mb-4 self-start">
                  Featured
                </div>
                <h2 className="mb-4 text-gray-900">{blogPosts[0].title}</h2>
                <p className="text-gray-600 mb-6">{blogPosts[0].excerpt}</p>
                <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {blogPosts[0].author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {blogPosts[0].date}
                  </div>
                  <div>{blogPosts[0].readTime}</div>
                </div>
                <button className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 group">
                  Read Full Article
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
              <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full mb-3">
                  {post.category}
                </div>
                <h3 className="mb-3 text-gray-900 group-hover:text-green-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </div>
                </div>
                <button className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 text-sm group">
                  Read More
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
            Load More Articles
          </button>
        </div>
      </div>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-4 text-white">Stay Updated</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest irrigation tips, product updates, and exclusive offers
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-6 py-3 bg-white text-green-600 hover:bg-gray-100 rounded-lg transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
