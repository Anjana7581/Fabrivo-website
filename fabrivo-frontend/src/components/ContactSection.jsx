import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const zoomIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
};

const Contact = () => {
  const form = useRef(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    if (!form.current) return;

    const formData = new FormData(form.current);
    const emailData = {
      from_name: formData.get("user_name"),
      to_name: "Visa Consultancy",
      user_email: formData.get("user_email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    emailjs
      .send(
        "service_bzftee8",
        "template_7acbnxg",
        emailData,
        "7ywSpDH-sfQE0lOFl"
      )
      .then(
        () => {
          setSuccessMessage("Message sent successfully!");
          setErrorMessage("");
          form.current.reset();
          setTimeout(() => setSuccessMessage(""), 5000);
        },
        (error) => {
          setErrorMessage("There was an issue sending your message. Please try again.");
          setSuccessMessage("");
          console.error("Error:", error.text);
        }
      );
  };

  return (
    <motion.section
      className="py-20 bg-gray-50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div variants={fadeInUp}>
          <h2 className="text-4xl font-bold text-gray-900">Contact Us</h2>
          <p className="text-gray-700 mt-4 leading-relaxed">
            Feel free to reach out to us via phone, email, or visit our office for any inquiries.
          </p>
          <div className="mt-6 space-y-6">
            {[ 
              { title: "📍 Office Address", text: "123 Visa Street, New York, USA" },
              { title: "📞 Phone", text: "+1 234 567 890" },
              { title: "📧 Email", text: "support@fabrivo.com" },
            ].map((item, index) => (
              <div key={index} className="border p-5 rounded-lg shadow-sm bg-white hover:shadow-md transition">
                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                <p className="text-gray-700">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 text-center">Send a Message</h2>
          
          {successMessage && (
            <div className="mt-4 mb-6 p-3 text-center rounded-md bg-green-100 text-green-700">
              {successMessage}
            </div>
          )}
          
          {errorMessage && (
            <div className="mt-4 mb-6 p-3 text-center rounded-md bg-red-100 text-red-700">
              {errorMessage}
            </div>
          )}
          
          <form ref={form} onSubmit={sendEmail} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="user_name" placeholder="Full Name" className="p-3 rounded-lg w-full border border-gray-300 focus:ring-2 focus:ring-blue-500" required />
              <input type="email" name="user_email" placeholder="Email" className="p-3 rounded-lg w-full border border-gray-300 focus:ring-2 focus:ring-blue-500" required />
            </div>
            <input type="text" name="subject" placeholder="Subject" className="p-3 rounded-lg w-full border border-gray-300 focus:ring-2 focus:ring-blue-500" required />
            <textarea name="message" placeholder="Your Message" className="p-3 rounded-lg w-full border border-gray-300 h-32 focus:ring-2 focus:ring-blue-500" required></textarea>
            
            <motion.button type="submit" className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300" variants={zoomIn}>
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;
