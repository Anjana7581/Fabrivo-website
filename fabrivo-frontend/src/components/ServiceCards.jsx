import { motion } from "framer-motion";
import student1 from "../assets/student1.jpg";
import work from "../assets/work.jpg";
import couple from "../assets/couple.jpg";
import family from "../assets/family.jpg";

import inventor from "../assets/inventor.jpg";
import business from "../assets/business.jpg";

import { Link } from "react-router-dom";

const services = [
  { id: 1, title: "Study Visa", description: "A student visa is a type of nonimmigrant visa that allows the bearer to enroll at a postsecondary educational institution in the host country.", image: student1 },
  { id: 2, title: "Immigrant Visa", description: "Most of the countries grants an immigrant visa to foreign-born individuals who intend to make foreign country a permanent home.", image: work },
  { id: 3, title: "Tourist Visa", description: "We are leading tourist visa provider. it can have any purpose, ranging from acquiring medical treatment to business.", image: couple },
  { id: 4, title: "Business Visa", description: "A visitor visa can have any purpose, ranging from acquiring medical treatment to business or even leisure", image: business},
  { id: 5, title: "Investor Visa", description: "An entrepreneur visa is a gateway for investors to take their spread business their scope across another country.", image: inventor},
  { id: 6, title: "Dependent Visa", description: "Dependent visas are granted for a dependant family member of a qualifying migrant like husband or wife.", image: family },


];

const Cards = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Title Animation when in View */}
        <motion.h2
          className="text-3xl font-bold text-center text-gray-800 mb-10"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          What We Do
        </motion.h2>

        {/* Cards Grid */}
        <motion.div
          className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.3 },
            },
          }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-sm mx-auto"
              variants={{
                hidden: { opacity: 0, x: -50 }, // Motion from Left
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 1, ease: "easeOut", delay: index * 0.2 }} // Cascading delay
              whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
            >
              <img src={service.image} alt={service.title} className="w-full h-40 object-cover" />
                  <Link to={`/service/${service.id}`} className="block">
              
              <div className="p-5 text-center">
                <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
                <p className="text-gray-600 mt-2">{service.description}</p>
              </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Cards;
