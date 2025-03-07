import React, { useState } from "react";
import { BsRobot, BsSend } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! May I know your name?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    name: "",
    phoneNumber: "",
    service: "",
  });

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    let newMessages = [...messages, { text: input, sender: "user" }];
    
    if (step === 1) {
      // Step 1: Get the user's name
      setUserData({ ...userData, name: input });
      newMessages.push({ text: "Thanks! Can I have your phone number?", sender: "bot" });
      setStep(2);
    } else if (step === 2) {
      // Step 2: Get the user's phone number
      setUserData({ ...userData, phoneNumber: input });
      newMessages.push({ text: "Which service are you interested in?", sender: "bot" });
      newMessages.push(
        { text: " Visa Consultancy", sender: "bot", clickable: true },
        { text: " IELTS Exam Preparation", sender: "bot", clickable: true },
        { text: " Other (please specify)", sender: "bot", clickable: true }
      );
      setStep(3);
    } else if (step === 3) {
      // Step 3: Get the service they want
      setUserData({ ...userData, service: input });
      newMessages.push({ text: "Thank you! Our team will connect with you soon. ✅", sender: "bot" });

      // Send Email using EmailJS only once
      const emailParams = {
        from_name: userData.name, // User's name
        to_name: "Admin",
        user_email: "anjana7581@gmail.com", // Your email
        message: `New Inquiry:\n\nName: ${userData.name}\nPhone: ${userData.phoneNumber}\nService: ${input}`,
      };

      try {
        await emailjs.send(
          "service_bzftee8",
          "template_j83msqn",
          emailParams,
          "7ywSpDH-sfQE0lOFl"
        );

        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (error) {
        console.error("Error sending email:", error);
        setSuccessMessage("Failed to send message. Please try again ❌");
      }

      // Reset after sending email
      setStep(1); // Reset conversation
      setUserData({ name: "", phoneNumber: "", service: "" });
    }

    setMessages(newMessages);
    setInput("");
  };

  const handleServiceSelection = (service) => {
    setInput(service);
  };

  return (
    <div className="fixed bottom-5 right-5 md:bottom-10 md:right-8 flex flex-col items-end z-50">
      <button
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
        onClick={toggleChatbot}
      >
        {isOpen ? <IoClose size={24} /> : <BsRobot size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-72 sm:w-80 md:w-96 bg-white shadow-lg rounded-lg border border-gray-300 mt-3"
          >
            <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
              <span className="font-semibold">Chatbot</span>
            </div>

            {successMessage && (
              <div className="bg-green-500 text-white text-sm p-2 text-center">
                {successMessage}
              </div>
            )}

            <div className="h-60 sm:h-64 p-3 overflow-y-auto flex flex-col space-y-2">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 max-w-xs sm:max-w-sm rounded-lg text-sm ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white self-end"
                      : "bg-gray-300 text-gray-800 self-start"
                  }`}
                  onClick={msg.clickable ? () => handleServiceSelection(msg.text) : undefined}
                  style={msg.clickable ? { cursor: "pointer", backgroundColor: "#e0f7fa" } : {}}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="p-3 border-t flex flex-col">
              <div className="flex">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 border p-2 rounded-l-lg focus:outline-none text-sm"
                  placeholder="Type your message..."
                />
                <button
                  onClick={handleSend}
                  className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700"
                >
                  <BsSend />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
