import React from "react";
import { motion } from "framer-motion";
import DefaultLayout from '../components/DefaultLayout/DefaultLayout'
import { FaGlobe, FaCheckCircle, FaHeadset } from "react-icons/fa";


const About = () => {
  return (
    <DefaultLayout>
      {/* Hero Section */}
      <div className="relative h-[350px] flex items-center justify-center">
      
        <div className="relative text-center text-white px-6">
          <h1 className="text-4xl font-bold">Your Trusted Partner for Global Opportunities</h1>
          <p className="text-lg mt-3 max-w-3xl mx-auto">
            We provide expert visa consultancy services to help you study, work, and settle abroad effortlessly. Let us guide you towards a successful future.
          </p>
        </div>
      </div>

      {/* Company Overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-800">Who We Are</h2>
            <p className="text-gray-600 mt-4 leading-relaxed text-lg">
              We are a leading visa consultancy, helping individuals and families achieve their dreams of studying, working, and settling abroad. Our dedicated experts provide a smooth and hassle-free application process for various visa categories.
            </p>
            <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition transform hover:scale-105">
              Learn More
            </button>
          </motion.div>
          
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-10 mt-12">
            {[
              {
                title: "Expert Guidance",
                description: "Years of experience in visa processing to ensure success.",
                icon: <FaGlobe className="text-blue-600 text-5xl mx-auto mb-4" />,
              },
              {
                title: "High Success Rate",
                description: "Thousands of clients successfully secured visas with us.",
                icon: <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />,
              },
              {
                title: "24/7 Support",
                description: "Round-the-clock assistance for all visa-related queries.",
                icon: <FaHeadset className="text-red-500 text-5xl mx-auto mb-4" />,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-gray-100 p-8 rounded-lg shadow-md text-center hover:shadow-xl transition transform hover:scale-105"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {item.icon}
                <h3 className="text-2xl font-semibold text-gray-700">{item.title}</h3>
                <p className="text-gray-600 mt-2">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-10 mt-12">
            {[
              {
                name: "John Doe",
                role: "Founder & Visa Consultant",
                image: "https://i.pravatar.cc/200?img=12", // High-quality avatar
              },
              {
                name: "Jane Smith",
                role: "Immigration Expert",
                image: "https://i.pravatar.cc/200?img=47",
              },
              {
                name: "Michael Lee",
                role: "Senior Consultant",
                image: "https://i.pravatar.cc/200?img=33",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="mx-auto rounded-full w-40 h-40 object-cover border-4 border-white shadow-md"
                />
                <h3 className="text-2xl font-semibold text-gray-700 mt-4">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default About;
