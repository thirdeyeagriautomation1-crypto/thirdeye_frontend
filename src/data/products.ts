export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  detailedDescription?: string;
  features: string[];
  image: string;
  additionalMedia?: Array<{
    type: 'image' | 'video';
    url: string;
    isUrl?: boolean;
  }>;
  technicalSpecs?: {
    [key: string]: string;
  };
}

export const productCategories = [
  {
    id: 'wireless',
    name: 'Wireless Irrigation Automation',
    description: 'Advanced wireless controllers with IoT integration for remote irrigation management',
  },
  {
    id: 'wired',
    name: 'Wired Irrigation Controllers',
    description: 'Reliable wired irrigation control systems for precision water management',
  },
  {
    id: 'fertigation',
    name: 'Fertigation Automation Systems',
    description: 'Intelligent fertigation solutions for optimal nutrient delivery',
  },
  {
    id: 'iot',
    name: 'Mobile App & IoT Integration',
    description: 'Control your irrigation systems from anywhere with our mobile apps',
  },
  {
    id: 'solar',
    name: 'Solar-Powered Systems',
    description: 'Sustainable, off-grid irrigation solutions powered by solar energy',
  },
];

export const products: Product[] = [
  // Wireless Irrigation Automation
  {
    id: 'w1',
    name: 'AgroSmart WiFi Pro Controller',
    category: 'wireless',
    subcategory: 'WiFi Controllers',
    description: 'Professional-grade WiFi-enabled irrigation controller with weather integration and smart scheduling.',
    features: ['12-Zone Control', 'Weather API Integration', 'Mobile App Control', 'Cloud Backup'],
    image: 'https://images.unsplash.com/photo-1685475188388-2a266e6bd5c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGZhcm1pbmclMjBpcnJpZ2F0aW9ufGVufDF8fHx8MTc2MjI3OTgyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    technicalSpecs: {
      'Zones': '12',
      'Power': '24VAC',
      'Connectivity': 'WiFi 2.4GHz',
      'Range': 'Unlimited (WiFi)',
    },
  },
  {
    id: 'w2',
    name: 'LoRa Long-Range Controller',
    category: 'wireless',
    subcategory: 'LoRa Controllers',
    description: 'Ultra-long-range LoRa-based controller perfect for large farms and remote installations.',
    features: ['Up to 10km Range', '8-Zone Control', 'Low Power Consumption', 'Mesh Network Support'],
    image: 'https://images.unsplash.com/photo-1575704497240-17622d90265f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmYXJtJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjIyNzk4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    technicalSpecs: {
      'Zones': '8',
      'Range': 'Up to 10km',
      'Power': '12VDC',
      'Frequency': '868/915MHz LoRa',
    },
  },
  {
    id: 'w3',
    name: 'Bluetooth Smart Valve',
    category: 'wireless',
    subcategory: 'Bluetooth Controllers',
    description: 'Compact Bluetooth-enabled valve controller ideal for residential and small farm applications.',
    features: ['Single Zone', 'Battery Powered', 'Smartphone Control', 'Timer Programming'],
    image: 'https://images.unsplash.com/photo-1755719523098-227f4c486eb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpb3QlMjBzZW5zb3JzJTIwZmFybWluZ3xlbnwxfHx8fDE3NjIyNzk4Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    technicalSpecs: {
      'Zones': '1',
      'Power': 'Battery (AA x4)',
      'Connectivity': 'Bluetooth 5.0',
      'Range': '30m',
    },
  },
  {
    id: 'w4',
    name: 'Zigbee Multi-Zone Hub',
    category: 'wireless',
    subcategory: 'Zigbee Controllers',
    description: 'Scalable Zigbee mesh network controller for complex irrigation setups.',
    features: ['16-Zone Expandable', 'Mesh Networking', 'Sensor Integration', 'Energy Efficient'],
    image: 'https://images.unsplash.com/photo-1645414183689-08fcdd60a947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGlycmlnYXRpb24lMjBzeXN0ZW18ZW58MXx8fHwxNzYyMjc5ODI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    technicalSpecs: {
      'Zones': '16 (Expandable)',
      'Power': '24VAC',
      'Connectivity': 'Zigbee 3.0',
      'Range': '100m (mesh)',
    },
  },

  // Wired Irrigation Controllers
  {
    id: 'wd1',
    name: 'AgroMaster Pro 24-Zone',
    category: 'wired',
    subcategory: 'Professional Controllers',
    description: 'Heavy-duty 24-zone controller designed for commercial farms and large estates.',
    features: ['24 Independent Zones', 'Rain Sensor Compatible', 'Manual Override', 'Surge Protection'],
    image: 'https://images.unsplash.com/photo-1660444770624-7c11f739735d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGFncmljdWx0dXJlJTIwZmllbGR8ZW58MXx8fHwxNzYyMjc5ODI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    technicalSpecs: {
      'Zones': '24',
      'Power': '120/240VAC',
      'Output': '24VAC',
      'Protection': 'Surge & Lightning',
    },
  },
  {
    id: 'wd2',
    name: 'GreenFlow 8-Zone Indoor',
    category: 'wired',
    subcategory: 'Residential Controllers',
    description: 'Compact 8-zone controller perfect for residential gardens and small commercial properties.',
    features: ['8 Zones', 'LCD Display', 'Easy Programming', 'Water Budget Feature'],
    image: 'https://images.unsplash.com/photo-1592079927431-3f8ced0dacc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGFncmljdWx0dXJlfGVufDF8fHx8MTc2MjI1MzQ4NHww&ixlib=rb-4.1.0&q=80&w=1080',
    technicalSpecs: {
      'Zones': '8',
      'Power': '120VAC',
      'Display': 'LCD',
      'Mounting': 'Indoor',
    },
  },
  {
    id: 'wd3',
    name: 'WeatherSync 12-Zone',
    category: 'wired',
    subcategory: 'Weather-Based Controllers',
    description: 'Intelligent controller with local weather station integration for precision irrigation.',
    features: ['12 Zones', 'Weather Station Input', 'ET Calculation', 'Water Savings Mode'],
    image: 'https://images.unsplash.com/photo-1685475188388-2a266e6bd5c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGZhcm1pbmclMjBpcnJpZ2F0aW9ufGVufDF8fHx8MTc2MjI3OTgyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    technicalSpecs: {
      'Zones': '12',
      'Power': '24VAC',
      'Sensors': 'Weather Station Compatible',
      'Algorithm': 'ET-Based',
    },
  },

  // Fertigation Automation
  {
    id: 'f1',
    name: 'NutriFlow Pro Fertigation System',
    category: 'fertigation',
    subcategory: 'Complete Systems',
    description: 'Complete fertigation system with automated nutrient mixing and pH/EC control.',
    features: ['Auto pH/EC Control', '4-Channel Dosing', 'Recipe Management', 'Data Logging'],
    image: 'https://images.unsplash.com/photo-1575704497240-17622d90265f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmYXJtJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjIyNzk4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    technicalSpecs: {
      'Channels': '4',
      'pH Range': '4.0-9.0',
      'EC Range': '0-5 mS/cm',
      'Control': 'PID',
    },
  },
  {
    id: 'f2',
    name: 'AgroMix Dosing Controller',
    category: 'fertigation',
    subcategory: 'Dosing Controllers',
    description: 'Precise dosing controller for custom fertilizer injection schedules.',
    features: ['6 Fertilizer Channels', 'Flow-Based Dosing', 'Multi-Recipe Storage', 'Mobile Monitoring'],
    image: 'https://images.unsplash.com/photo-1755719523098-227f4c486eb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpb3QlMjBzZW5zb3JzJTIwZmFybWluZ3xlbnwxfHx8fDE3NjIyNzk4Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    technicalSpecs: {
      'Channels': '6',
      'Accuracy': '±2%',
      'Flow Rate': '0.1-100 L/h',
      'Power': '230VAC',
    },
  },
  {
    id: 'f3',
    name: 'pH & EC Monitor Station',
    category: 'fertigation',
    subcategory: 'Monitoring Equipment',
    description: 'Real-time monitoring station for pH, EC, and temperature with automatic calibration.',
    features: ['Continuous Monitoring', 'Auto Calibration', 'Alarm System', 'Cloud Data Sync'],
    image: 'https://images.unsplash.com/photo-1645414183689-08fcdd60a947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGlycmlnYXRpb24lMjBzeXN0ZW18ZW58MXx8fHwxNzYyMjc5ODI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    technicalSpecs: {
      'Parameters': 'pH, EC, Temperature',
      'Accuracy': '±0.1 pH, ±2% EC',
      'Display': 'Touchscreen',
      'Calibration': 'Automatic',
    },
  },

  // IoT Integration
  {
    id: 'i1',
    name: 'AgroSmart Mobile App',
    category: 'iot',
    subcategory: 'Mobile Applications',
    description: 'Comprehensive mobile app for iOS and Android with full system control and monitoring.',
    features: ['Real-Time Monitoring', 'Remote Control', 'Notifications', 'Weather Integration'],
    image: 'https://images.unsplash.com/photo-1575704497240-17622d90265f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmYXJtJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjIyNzk4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    technicalSpecs: {
      'Platforms': 'iOS, Android',
      'Features': 'Full Control',
      'Updates': 'Real-time',
      'Cost': 'Free with Hardware',
    },
  },
  {
    id: 'i2',
    name: 'IoT Gateway Hub',
    category: 'iot',
    subcategory: 'Gateway Devices',
    description: 'Central IoT hub connecting all your irrigation devices to the cloud.',
    features: ['Multi-Protocol Support', '4G/LTE Connectivity', 'Local Data Storage', 'Edge Computing'],
    image: 'https://images.unsplash.com/photo-1755719523098-227f4c486eb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpb3QlMjBzZW5zb3JzJTIwZmFybWluZ3xlbnwxfHx8fDE3NjIyNzk4Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    technicalSpecs: {
      'Protocols': 'WiFi, LoRa, Zigbee, BLE',
      'Connectivity': '4G/LTE, Ethernet',
      'Storage': '32GB',
      'Power': '12VDC',
    },
  },
  {
    id: 'i3',
    name: 'Sensor Integration Kit',
    category: 'iot',
    subcategory: 'Sensor Packages',
    description: 'Complete sensor package including soil moisture, temperature, and humidity sensors.',
    features: ['5 Soil Sensors', 'Weather Station', 'Wireless Communication', 'Battery Powered'],
    image: 'https://images.unsplash.com/photo-1660444770624-7c11f739735d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGFncmljdWx0dXJlJTIwZmllbGR8ZW58MXx8fHwxNzYyMjc5ODI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    technicalSpecs: {
      'Sensors': 'Moisture, Temp, Humidity',
      'Range': 'Up to 500m',
      'Battery Life': '2+ years',
      'Protocol': 'LoRa',
    },
  },

  // Solar-Powered Systems
  {
    id: 's1',
    name: 'SolarFlow Irrigation Kit',
    category: 'solar',
    subcategory: 'Complete Solar Kits',
    description: 'Complete off-grid solar irrigation solution with pump, controller, and battery backup.',
    features: ['100W Solar Panel', 'DC Pump Included', 'Battery Backup', 'MPPT Controller'],
    image: 'https://images.unsplash.com/photo-1592079927431-3f8ced0dacc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGFncmljdWx0dXJlfGVufDF8fHx8MTc2MjI1MzQ4NHww&ixlib=rb-4.1.0&q=80&w=1080',
    technicalSpecs: {
      'Solar Panel': '100W Monocrystalline',
      'Battery': '12V 100Ah',
      'Pump': 'DC Submersible',
      'Flow Rate': '2000 L/hour',
    },
  },
  {
    id: 's2',
    name: 'Battery Backup System',
    category: 'solar',
    subcategory: 'Battery Systems',
    description: 'Reliable battery backup system ensuring continuous operation during power outages.',
    features: ['24V Deep Cycle', 'Auto Switching', 'Smart Charging', 'Status Monitoring'],
    image: 'https://images.unsplash.com/photo-1685475188388-2a266e6bd5c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGZhcm1pbmclMjBpcnJpZ2F0aW9ufGVufDF8fHx8MTc2MjI3OTgyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    technicalSpecs: {
      'Voltage': '24VDC',
      'Capacity': '200Ah',
      'Type': 'AGM Deep Cycle',
      'Runtime': 'Up to 48 hours',
    },
  },
  {
    id: 's3',
    name: 'Solar Controller Pro',
    category: 'solar',
    subcategory: 'Solar Controllers',
    description: 'Advanced MPPT solar charge controller with irrigation system integration.',
    features: ['MPPT Technology', 'LCD Display', 'Programmable Timer', 'USB Charging'],
    image: 'https://images.unsplash.com/photo-1575704497240-17622d90265f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmYXJtJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjIyNzk4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    technicalSpecs: {
      'Type': 'MPPT',
      'Max Input': '150V 30A',
      'Efficiency': '>98%',
      'Display': 'LCD',
    },
  },
];