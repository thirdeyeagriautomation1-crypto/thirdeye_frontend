import { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';

export function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqCategories = [
    {
      category: 'General Questions',
      questions: [
        {
          question: 'What is smart irrigation and how does it work?',
          answer: 'Smart irrigation uses automated controllers, sensors, and weather data to optimize water delivery to crops. The system monitors soil moisture, weather conditions, and plant needs to deliver the right amount of water at the right time, reducing waste and improving crop health.',
        },
        {
          question: 'How much can I save with a smart irrigation system?',
          answer: 'Most customers see water savings of 30-70%, with an average of 50-60%. Additionally, you can expect reduced labor costs, lower energy bills, and improved crop yields. The typical ROI period is 12-24 months depending on farm size and water costs.',
        },
        {
          question: 'What size farms do you work with?',
          answer: 'We serve farms of all sizes, from small residential gardens to large commercial operations of 1000+ acres. Our solutions are scalable and can be customized to meet your specific needs.',
        },
      ],
    },
    {
      category: 'Installation & Setup',
      questions: [
        {
          question: 'How long does installation take?',
          answer: 'Installation time varies based on farm size and system complexity. A typical residential system (8-12 zones) takes 1-2 days, while larger commercial installations may take 1-2 weeks. We provide a detailed timeline during the consultation phase.',
        },
        {
          question: 'Do I need to replace my existing irrigation infrastructure?',
          answer: 'In most cases, no. Our smart controllers and automation systems are designed to work with existing valves, pipes, and sprinklers. We retrofit your current setup with intelligent controls, sensors, and wireless connectivity.',
        },
        {
          question: 'Can I install the system myself?',
          answer: 'While our residential Bluetooth and WiFi controllers are designed for DIY installation, we recommend professional installation for larger systems to ensure optimal performance and warranty coverage. We offer installation services and can recommend certified installers in your area.',
        },
      ],
    },
    {
      category: 'Technology & Features',
      questions: [
        {
          question: 'What is the difference between wired and wireless controllers?',
          answer: 'Wired controllers connect directly to your valves via cables and are typically more reliable for permanent installations. Wireless controllers use WiFi, LoRa, or other protocols for remote communication, making them ideal for large or remote areas. Both can be controlled via mobile apps.',
        },
        {
          question: 'Do I need internet connectivity for the system to work?',
          answer: 'It depends on the system. Basic wired controllers work without internet. WiFi controllers need internet for remote access and weather data. LoRa systems can operate independently with a local gateway. Solar systems with battery backup can run completely off-grid.',
        },
        {
          question: 'How does weather integration work?',
          answer: 'Our systems connect to local weather stations or online weather services to receive real-time data on temperature, rainfall, humidity, and wind. This information is used to automatically adjust irrigation schedules, skip watering after rain, and optimize water usage based on evapotranspiration rates.',
        },
        {
          question: 'What is fertigation and do I need it?',
          answer: 'Fertigation is the process of delivering fertilizers through your irrigation system. It ensures precise nutrient delivery directly to plant roots, reduces fertilizer waste, and improves crop quality. It\'s particularly beneficial for high-value crops, greenhouses, and intensive farming operations.',
        },
      ],
    },
    {
      category: 'Maintenance & Support',
      questions: [
        {
          question: 'What kind of maintenance is required?',
          answer: 'Smart irrigation systems require minimal maintenance. We recommend quarterly sensor calibration checks, annual valve inspections, and battery replacements for wireless devices (typically every 2-3 years). Our systems include self-diagnostics that alert you to any issues.',
        },
        {
          question: 'Do you offer technical support?',
          answer: 'Yes, we provide 24/7 technical support via phone, email, and WhatsApp. Support is included free for the first year, with affordable maintenance plans available thereafter. We also offer on-site service for major issues.',
        },
        {
          question: 'What is the warranty coverage?',
          answer: 'All our controllers come with a 3-year manufacturer warranty. Sensors and valves have a 2-year warranty. Solar panels are warrantied for 25 years. Extended warranty options are available for purchase.',
        },
      ],
    },
    {
      category: 'Costs & ROI',
      questions: [
        {
          question: 'How much does a smart irrigation system cost?',
          answer: 'Costs vary based on farm size, number of zones, and features selected. A basic residential system starts at $1,500-$3,000. Commercial systems range from $5,000 to $50,000+. We offer free consultations and customized quotes based on your specific needs.',
        },
        {
          question: 'Are there any ongoing subscription fees?',
          answer: 'Our mobile app and basic cloud features are free. Premium features like advanced analytics, unlimited historical data, and priority support are available through optional monthly subscriptions ($9.99-$49.99/month). Local control always works without subscription.',
        },
        {
          question: 'What financing options are available?',
          answer: 'We offer flexible financing plans with 0% APR for 12 months, and low-rate options for up to 60 months. We also help customers apply for agricultural grants and rebates, which can cover 20-50% of system costs in many regions.',
        },
      ],
    },
  ];

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFAQs = faqCategories.map(cat => ({
    ...cat,
    questions: cat.questions.filter(q =>
      searchQuery === '' ||
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(cat => cat.questions.length > 0);

  let questionIndex = 0;

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="mb-4 text-white">Frequently Asked Questions</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Find answers to common questions about our smart irrigation and fertigation systems
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No questions found matching your search.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {filteredFAQs.map((category) => (
              <div key={category.category}>
                <h2 className="mb-6 text-gray-900">{category.category}</h2>
                <div className="space-y-4">
                  {category.questions.map((faq) => {
                    const currentIndex = questionIndex++;
                    const isOpen = openIndex === currentIndex;
                    
                    return (
                      <div
                        key={currentIndex}
                        className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() => toggleQuestion(currentIndex)}
                          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-gray-900 pr-4">{faq.question}</span>
                          <ChevronDown
                            className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                              isOpen ? 'transform rotate-180' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                            <p className="text-gray-600">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Still Have Questions */}
        <div className="mt-16 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 text-center">
          <h2 className="mb-4 text-gray-900">Still Have Questions?</h2>
          <p className="text-gray-600 mb-6">
            Our team of irrigation experts is here to help. Contact us for personalized assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              Contact Support
            </a>
            <a
              href="tel:+1234567890"
              className="inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg transition-colors"
            >
              Call Us: +1 (234) 567-890
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
