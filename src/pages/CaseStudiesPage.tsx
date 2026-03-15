import { TrendingUp, Droplets, DollarSign, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function CaseStudiesPage() {
  const caseStudies = [
    {
      id: 1,
      title: 'Green Valley Farms - 65% Water Reduction',
      location: 'California, USA',
      farmType: 'Vineyard - 150 Acres',
      challenge: 'Traditional irrigation system was wasting water and leading to inconsistent grape quality across different zones.',
      solution: 'Implemented our WiFi Pro Controllers with soil moisture sensors and weather integration across 24 irrigation zones.',
      beforeImage: 'https://images.unsplash.com/photo-1660444770624-7c11f739735d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGFncmljdWx0dXJlJTIwZmllbGR8ZW58MXx8fHwxNzYyMjc5ODI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      afterImage: 'https://images.unsplash.com/photo-1685475188388-2a266e6bd5c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGZhcm1pbmclMjBpcnJpZ2F0aW9ufGVufDF8fHx8MTc2MjI3OTgyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      results: [
        { metric: 'Water Savings', value: '65%', icon: Droplets },
        { metric: 'Yield Increase', value: '28%', icon: TrendingUp },
        { metric: 'Cost Reduction', value: '$45,000/year', icon: DollarSign },
      ],
      testimonial: {
        quote: 'AgroSmart has transformed our operation. We\'re using significantly less water while producing better quality grapes. The ROI was achieved in just 18 months.',
        author: 'Robert Martinez',
        position: 'Owner, Green Valley Farms',
      },
    },
    {
      id: 2,
      title: 'Sunshine Orchards - Precision Fertigation Success',
      location: 'Florida, USA',
      farmType: 'Citrus Grove - 300 Acres',
      challenge: 'Inconsistent fruit quality and high fertilizer costs due to manual fertigation management.',
      solution: 'Deployed NutriFlow Pro Fertigation System with automated pH/EC control and recipe management across multiple zones.',
      beforeImage: 'https://images.unsplash.com/photo-1592079927431-3f8ced0dacc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGFncmljdWx0dXJlfGVufDF8fHx8MTc2MjI1MzQ4NHww&ixlib=rb-4.1.0&q=80&w=1080',
      afterImage: 'https://images.unsplash.com/photo-1575704497240-17622d90265f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmYXJtJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjIyNzk4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      results: [
        { metric: 'Fertilizer Savings', value: '40%', icon: DollarSign },
        { metric: 'Fruit Quality', value: '+35%', icon: TrendingUp },
        { metric: 'Labor Reduction', value: '50 hrs/week', icon: CheckCircle },
      ],
      testimonial: {
        quote: 'The precision fertigation system has revolutionized our nutrient management. We\'re seeing better fruit quality and significant cost savings.',
        author: 'Linda Thompson',
        position: 'Farm Manager, Sunshine Orchards',
      },
    },
    {
      id: 3,
      title: 'Desert Bloom Farms - Solar-Powered Off-Grid Solution',
      location: 'Arizona, USA',
      farmType: 'Vegetable Farm - 80 Acres',
      challenge: 'Remote location with unreliable power and expensive water access limited farming potential.',
      solution: 'Installed SolarFlow Irrigation Kit with LoRa long-range controllers for complete off-grid irrigation management.',
      beforeImage: 'https://images.unsplash.com/photo-1645414183689-08fcdd60a947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGlycmlnYXRpb24lMjBzeXN0ZW18ZW58MXx8fHwxNzYyMjc5ODI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      afterImage: 'https://images.unsplash.com/photo-1660444770624-7c11f739735d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGFncmljdWx0dXJlJTIwZmllbGR8ZW58MXx8fHwxNzYyMjc5ODI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      results: [
        { metric: 'Energy Cost', value: '$0/month', icon: DollarSign },
        { metric: 'Water Efficiency', value: '70%', icon: Droplets },
        { metric: 'Crop Yield', value: '+45%', icon: TrendingUp },
      ],
      testimonial: {
        quote: 'Going off-grid with AgroSmart\'s solar solution was the best decision we made. Zero energy costs and complete control over our irrigation.',
        author: 'James Wilson',
        position: 'Owner, Desert Bloom Farms',
      },
    },
    {
      id: 4,
      title: 'Heritage Dairy Farm - Large-Scale Pasture Management',
      location: 'Texas, USA',
      farmType: 'Dairy Farm - 500 Acres',
      challenge: 'Managing irrigation for extensive pastures was labor-intensive and inefficient.',
      solution: 'Implemented AgroMaster Pro 24-Zone Controllers with IoT integration and mobile app control for remote management.',
      beforeImage: 'https://images.unsplash.com/photo-1592079927431-3f8ced0dacc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGFncmljdWx0dXJlfGVufDF8fHx8MTc2MjI1MzQ4NHww&ixlib=rb-4.1.0&q=80&w=1080',
      afterImage: 'https://images.unsplash.com/photo-1685475188388-2a266e6bd5c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGZhcm1pbmclMjBpcnJpZ2F0aW9ufGVufDF8fHx8MTc2MjI3OTgyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      results: [
        { metric: 'Labor Savings', value: '120 hrs/month', icon: CheckCircle },
        { metric: 'Pasture Quality', value: '+40%', icon: TrendingUp },
        { metric: 'Water Savings', value: '55%', icon: Droplets },
      ],
      testimonial: {
        quote: 'The ability to manage our entire irrigation system from my phone has been a game-changer. Better pasture quality with less work.',
        author: 'Patricia Adams',
        position: 'Operations Manager, Heritage Dairy',
      },
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="mb-4 text-white">Success Stories</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Real results from farms that have transformed their operations with our smart irrigation solutions
          </p>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {caseStudies.map((study, index) => (
              <div
                key={study.id}
                className={`bg-white rounded-xl shadow-sm overflow-hidden ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Header */}
                <div className="p-8 border-b border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h2 className="mb-2 text-gray-900">{study.title}</h2>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span>📍 {study.location}</span>
                        <span>🌾 {study.farmType}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Challenge & Solution */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="mb-3 text-gray-900">The Challenge</h3>
                        <p className="text-gray-600">{study.challenge}</p>
                      </div>
                      
                      <div>
                        <h3 className="mb-3 text-gray-900">Our Solution</h3>
                        <p className="text-gray-600">{study.solution}</p>
                      </div>
                    </div>

                    {/* Before/After Images */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-600 mb-2">Before</div>
                        <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                          <ImageWithFallback
                            src={study.beforeImage}
                            alt="Before implementation"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-2">After</div>
                        <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                          <ImageWithFallback
                            src={study.afterImage}
                            alt="After implementation"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="mb-8">
                    <h3 className="mb-4 text-gray-900">Results</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {study.results.map((result) => {
                        const Icon = result.icon;
                        return (
                          <div
                            key={result.metric}
                            className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg"
                          >
                            <Icon className="w-8 h-8 text-green-600 mb-3" />
                            <div className="text-gray-900 mb-1">{result.value}</div>
                            <div className="text-sm text-gray-600">{result.metric}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Testimonial */}
                  <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-green-600">
                    <p className="text-gray-700 mb-4 italic">"{study.testimonial.quote}"</p>
                    <div>
                      <div className="text-gray-900">{study.testimonial.author}</div>
                      <div className="text-sm text-gray-600">{study.testimonial.position}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-4 text-white">Ready to Write Your Success Story?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied farmers who have transformed their operations with our smart irrigation solutions
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg transition-colors"
          >
            Get Started Today
          </a>
        </div>
      </section>
    </div>
  );
}
