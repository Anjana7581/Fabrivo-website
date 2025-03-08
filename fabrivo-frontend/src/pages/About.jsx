import React from "react";
import { motion } from "framer-motion";
import DefaultLayout from '../components/DefaultLayout/DefaultLayout';
import { FaTruck, FaTag, FaHeadset } from "react-icons/fa";

const About = () => {
  return (
    <DefaultLayout>
      {/* Hero Section */}
      <div className="relative h-[350px] flex items-center justify-center bg-[url('/path-to-fashion-banner.jpg')] bg-cover bg-center mt-20">
        <div className="relative text-center text-white px-6 bg-blue-900 bg-opacity-80 py-10 rounded-lg">
          <h1 className="text-4xl font-bold">Elevate Your Style with Exclusive Fashion</h1>
          <p className="text-lg mt-3 max-w-3xl mx-auto">
            Discover trendy and elegant women's clothing that blends fashion with comfort. Shop the latest collections and redefine your wardrobe.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-blue-900">Our Story</h2>
            <p className="text-gray-900 mt-4 leading-relaxed text-lg">
              Born out of a passion for fashion, we bring you a curated collection of stylish and high-quality women's wear. Our goal is to empower women with confidence and elegance through our unique designs.
            </p>
            <button className="mt-6 bg-blue-900 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-800 transition transform hover:scale-105">
              Learn More
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img
              src="https://via.placeholder.com/900x400"
              alt="Our Story"
              className="rounded-lg shadow-md"
            />
          </motion.div>
        </div>
      </section>

      {/* Why Shop With Us */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-blue-900">Why Shop With Us?</h2>
          <div className="grid md:grid-cols-3 gap-10 mt-12">
            {[{
              title: "Fast & Free Shipping",
              description: "Get your favorite outfits delivered swiftly with free shipping on all orders.",
              icon: <FaTruck className="text-blue-900 text-5xl mx-auto mb-4" />,
            },
            {
              title: "Affordable Prices",
              description: "Shop the latest trends at unbeatable prices without compromising on quality.",
              icon: <FaTag className="text-blue-900 text-5xl mx-auto mb-4" />,
            },
            {
              title: "24/7 Customer Support",
              description: "Our team is here to assist you anytime for a seamless shopping experience.",
              icon: <FaHeadset className="text-blue-900 text-5xl mx-auto mb-4" />,
            }].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition transform hover:scale-105"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {item.icon}
                <h3 className="text-2xl font-semibold text-blue-900">{item.title}</h3>
                <p className="text-gray-900 mt-2">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Designers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-blue-900">Meet Our Designers</h2>
          <div className="grid md:grid-cols-3 gap-10 mt-12">
            {[{
              name: "Sophia Carter",
              role: "Head Fashion Designer",
              image: "https://i.pravatar.cc/200?img=30",
            },
            {
              name: "Emma Brown",
              role: "Creative Stylist",
              image: "https://i.pravatar.cc/200?img=48",
            },
            {
              name: "Olivia Martinez",
              role: "Textile Specialist",
              image: "https://i.pravatar.cc/200?img=23",
            }].map((member, index) => (
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
                <h3 className="text-2xl font-semibold text-blue-900 mt-4">{member.name}</h3>
                <p className="text-gray-900">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default About;