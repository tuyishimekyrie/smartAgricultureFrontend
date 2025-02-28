import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LuMoveRight } from "react-icons/lu";
import { FaSeedling, FaLeaf, FaWater, FaSun } from "react-icons/fa";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const benefits = [
    {
      icon: <FaSeedling className="text-green-500" />,
      title: "Enhanced Crop Health",
      description: "Monitor vital parameters that affect plant growth and health"
    },
    {
      icon: <FaWater className="text-blue-500" />,
      title: "Water Conservation",
      description: "Optimize irrigation based on precise soil moisture data"
    },
    {
      icon: <FaLeaf className="text-green-600" />,
      title: "Sustainable Farming",
      description: "Reduce resource waste and environmental impact"
    },
    {
      icon: <FaSun className="text-yellow-500" />,
      title: "Increased Yields",
      description: "Maximize productivity with data-driven decisions"
    }
  ];

  return (
    <div className="min-h-screen w-full font-plus relative overflow-hidden">
      {/* Hero Section with Parallax Effect */}
      <div 
        className="h-screen relative bg-hero bg-cover bg-center"
        style={{
          backgroundPosition: `center ${scrollY * 0.5}px`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80">
          {/* Navigation Bar */}
          <header className="absolute top-0 w-full z-10 px-6 md:px-12 py-4">
            <div className="container mx-auto flex justify-between items-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img src={logo} alt="Logo" className="w-16 md:w-20" />
              </motion.div>
              
              <motion.nav
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="hidden md:flex items-center space-x-8"
              >
                <a href="#" className="text-white hover:text-green-400 transition-colors">About</a>
                <a href="#" className="text-white hover:text-green-400 transition-colors">Services</a>
                <a href="#" className="text-white hover:text-green-400 transition-colors">Products</a>
                <a href="#" className="text-white hover:text-green-400 transition-colors">Contact</a>
              </motion.nav>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="md:hidden"
              >
                <button className="text-white text-2xl">
                  ☰
                </button>
              </motion.div>
            </div>
          </header>

          {/* Hero Content */}
          <div className="container mx-auto h-full flex flex-col justify-center px-6 md:px-12 lg:px-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <span className="bg-green-600 text-white text-sm px-3 py-1 rounded-full">Smart Farming Technology</span>
              <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mt-4 leading-tight">
                Empowering Precision Farming with Smart Agriculture Sensors
              </h1>
              <p className="text-gray-200 text-lg mt-6">
                Harness the power of cutting-edge sensors to revolutionize your
                farming practices. Make data-driven decisions for sustainable,
                efficient farming.
              </p>
              
              <motion.div 
                className="mt-8 flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.button 
                  className="bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-full flex items-center gap-2 shadow-lg shadow-green-900/20 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/auth/login")}
                >
                  Login to Dashboard
                  <LuMoveRight className="ml-2" />
                </motion.button>
                
                <motion.button 
                  className="bg-white hover:bg-gray-100 text-green-700 px-8 py-3 rounded-full flex items-center gap-2 shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/auth/register")}
                >
                  Create Account
                  <LuMoveRight className="ml-2" />
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="block w-6 h-10 border-2 border-white rounded-full relative">
              <span className="block w-1 h-2 bg-white rounded-full absolute left-1/2 top-2 transform -translate-x-1/2"></span>
            </span>
            <span className="block text-white text-xs mt-2 text-center">Scroll Down</span>
          </motion.div>
        </div>
      </div>
      
      {/* Features Grid */}
      <section className="py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Why Choose Our Smart Agriculture Solutions?
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Our sensors deliver actionable insights that help you optimize every aspect of your farming operation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:border-green-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center text-2xl mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-green-700 py-16">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to transform your farming approach?</h2>
              <p className="text-green-100">Join thousands of farmers who have already embraced smart agriculture technology.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button 
                className="bg-white text-green-700 hover:bg-gray-100 px-8 py-3 rounded-full shadow-lg flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/auth/register")}
              >
                Get Started Today
                <LuMoveRight />
              </motion.button>
              <button className="text-white border border-white hover:bg-green-600 px-8 py-3 rounded-full flex items-center justify-center gap-2">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <img src={logo} alt="Logo" className="w-16 mb-4" />
              <p className="text-gray-400 mt-4">Empowering farmers with smart technology for sustainable agriculture.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Products</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Knowledge Base</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">FAQs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
              <p className="text-gray-400 mb-2">123 Farming Way, Agriville</p>
              <p className="text-gray-400 mb-2">info@smartagri.com</p>
              <p className="text-gray-400">+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} Smart Agriculture Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;