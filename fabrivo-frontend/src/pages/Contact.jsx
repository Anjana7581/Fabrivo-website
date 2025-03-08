import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import DefaultLayout from '../components/DefaultLayout/DefaultLayout'
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
  const form = useRef();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);

    const emailData = {
      from_name: formData.get("user_name"),
      to_name: "Visa Consultancy", // Replace with the actual recipient name if needed
      user_email: formData.get("user_email"),
      message: formData.get("message"),
    };

    emailjs
      .send(
        "service_bzftee8", // Your service ID
        "template_j83msqn", // Your template ID
        emailData, // The data sent to the template
        "7ywSpDH-sfQE0lOFl" // Your public key
      )
      .then(
        (result) => {
          setSuccessMessage("Message sent successfully!");
          form.current.reset(); // Clear the form fields
          setTimeout(() => setSuccessMessage(""), 5000); // Hide message after 5 seconds
        },
        (error) => {
          setErrorMessage("There was an issue sending your message. Please try again.");
          console.log("Error sending email:", error.text);
        }
      );
  };

  return (
    <DefaultLayout>
      {/* Contact Information Section */}
      <motion.section
        className="py-25 bg-gray-100"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2 className="text-3xl font-bold text-gray-800" variants={fadeInUp}>
            Get in Touch
          </motion.h2>
          <motion.p className="text-gray-600 mt-4" variants={fadeInUp}>
            Have questions? Feel free to reach out to us via phone, email, or visit our office.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8 mt-10">
            {[ 
              { title: "📍 Our Office", text: "123 Visa Street, New York, USA" },
              { title: "📞 Call Us", text: "+1 234 567 890" },
              { title: "📧 Email Us", text: "support@visaconsultancy.com" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md"
                variants={zoomIn}
              >
                <h3 className="text-xl font-semibold text-gray-700">{item.title}</h3>
                <p className="text-gray-600 mt-2">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Form Section */}
      <motion.section
        className="py-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <motion.h2 className="text-3xl font-bold text-center text-gray-800" variants={fadeInUp}>
            Send Us a Message
          </motion.h2>

          {/* Success Message */}
          {successMessage && (
            <motion.div
              className="mt-4 mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {successMessage}
            </motion.div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <motion.div
              className="mt-4 mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {errorMessage}
            </motion.div>
          )}

          <motion.form
            ref={form}
            onSubmit={sendEmail}
            className="mt-8 bg-gray-100 p-8 rounded-lg shadow-md"
            variants={fadeInUp}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {["Full Name", "Email Address"].map((placeholder, index) => (
                <motion.input
                  key={index}
                  type={index === 1 ? "email" : "text"}
                  name={index === 1 ? "user_email" : "user_name"}
                  placeholder={placeholder}
                  className="p-3 rounded-lg w-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  variants={fadeInUp}
                />
              ))}
            </div>

            <motion.input
              type="text"
              name="subject"
              placeholder="Subject"
              className="p-3 mt-4 rounded-lg w-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              variants={fadeInUp}
            />
            <motion.textarea
              name="message"
              placeholder="Your Message"
              className="p-3 mt-4 rounded-lg w-full border border-gray-400 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              variants={fadeInUp}
            ></motion.textarea>

            <motion.button
              type="submit"
              className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
              variants={zoomIn}
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </motion.section>

      {/* Google Map Embed Section */}
      <motion.section
        className="py-16 bg-gray-100"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 className="text-3xl font-bold text-center text-gray-800" variants={fadeInUp}>
            Visit Our Office
          </motion.h2>
          <motion.div className="mt-8 rounded-lg overflow-hidden shadow-md" variants={fadeInUp}>
            <iframe
              className="w-full h-96"
              src="https://www.google.com/maps/embed?pb=...your-map-url..."
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </motion.div>
        </div>
      </motion.section>
    </DefaultLayout>
  );
};

export default Contact;
