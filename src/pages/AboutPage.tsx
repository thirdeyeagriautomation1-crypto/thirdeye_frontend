import { Target, Eye, Award, Users } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function AboutPage() {
  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1758518729685-f88df7890776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFtJTIwbWVldGluZ3xlbnwxfHx8fDE3NjIyNDUyODh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Michael Chen',
      role: 'Chief Technology Officer',
      image: 'https://images.unsplash.com/photo-1758518729685-f88df7890776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFtJTIwbWVldGluZ3xlbnwxfHx8fDE3NjIyNDUyODh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Agriculture Solutions',
      image: 'https://images.unsplash.com/photo-1758518729685-f88df7890776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFtJTIwbWVldGluZ3xlbnwxfHx8fDE3NjIyNDUyODh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'David Kumar',
      role: 'Director of Customer Success',
      image: 'https://images.unsplash.com/photo-1758518729685-f88df7890776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFtJTIwbWVldGluZ3xlbnwxfHx8fDE3NjIyNDUyODh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const values = [
    {
      icon: Target,
      title: 'Innovation',
      description: 'We continuously push the boundaries of agricultural technology to deliver cutting-edge solutions.',
    },
    {
      icon: Eye,
      title: 'Sustainability',
      description: 'Environmental responsibility is at the core of everything we do, from product design to implementation.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We are committed to delivering the highest quality products and services to our customers.',
    },
    {
      icon: Users,
      title: 'Partnership',
      description: 'We build lasting relationships with farmers, working together to achieve their agricultural goals.',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1660444770624-7c11f739735d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGFncmljdWx0dXJlJTIwZmllbGR8ZW58MXx8fHwxNzYyMjc5ODI5fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Agricultural field"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-blue-900/60" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="mb-4 text-white">About AgroSmart Solutions</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Leading the transformation of agriculture through innovative irrigation and automation technology
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6 text-gray-900">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2015, AgroSmart Solutions emerged from a simple observation: traditional irrigation methods 
                were wasting precious water resources while failing to meet the needs of modern agriculture. Our founders, 
                a team of agricultural engineers and technology experts, set out to revolutionize how farmers manage water and nutrients.
              </p>
              <p className="text-gray-600 mb-4">
                Today, we serve thousands of farms across the country, from small family operations to large commercial estates. 
                Our smart irrigation and fertigation systems have helped save millions of gallons of water while improving crop 
                yields and farm profitability.
              </p>
              <p className="text-gray-600">
                We continue to innovate, developing new technologies and solutions that empower farmers to work smarter, 
                conserve resources, and build more sustainable agricultural operations for future generations.
              </p>
            </div>
            
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1575704497240-17622d90265f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmYXJtJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjIyNzk4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Farm installation"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="mb-4 text-gray-900">Our Mission</h3>
              <p className="text-gray-600">
                To empower farmers worldwide with intelligent, accessible, and sustainable irrigation solutions that 
                optimize water usage, improve crop yields, and contribute to global food security while protecting our 
                planet's precious water resources.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="mb-4 text-gray-900">Our Vision</h3>
              <p className="text-gray-600">
                To become the global leader in smart agricultural technology, making precision irrigation and fertigation 
                accessible to farms of all sizes, and playing a pivotal role in creating a more sustainable and efficient 
                agricultural future for generations to come.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-gray-900">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide our work and relationships with customers, partners, and the environment
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="mb-2 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-gray-900">Meet Our Leadership Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experienced professionals dedicated to advancing agricultural technology and supporting our customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="mb-4 aspect-square rounded-lg overflow-hidden bg-gray-200">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-gray-900">{member.name}</h3>
                <p className="text-gray-600 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="mb-2">10,000+</div>
              <div className="text-sm opacity-90">Systems Installed</div>
            </div>
            <div>
              <div className="mb-2">5,000+</div>
              <div className="text-sm opacity-90">Happy Customers</div>
            </div>
            <div>
              <div className="mb-2">60%</div>
              <div className="text-sm opacity-90">Average Water Savings</div>
            </div>
            <div>
              <div className="mb-2">24/7</div>
              <div className="text-sm opacity-90">Customer Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
