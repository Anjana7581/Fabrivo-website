import React, { useState } from "react";
import { BsRobot, BsSend } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Welcome to our store! How can I assist you today?", sender: "bot" },
    { text: "1️⃣ Browse Products", sender: "bot", clickable: true },
    { text: "2️⃣ Track Order", sender: "bot", clickable: true },
    { text: "3️⃣ Customer Support", sender: "bot", clickable: true },
  ]);
  const [input, setInput] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    let newMessages = [...messages, { text: input, sender: "user" }];

    if (input.includes("Browse Products")) {
      newMessages.push(
        { text: "Here are our categories:", sender: "bot" },
        { text: "👗 Clothing", sender: "bot", clickable: true },
        { text: "👠 Footwear", sender: "bot", clickable: true },
        { text: "👜 Accessories", sender: "bot", clickable: true }
      );
    } else if (input.includes("Track Order")) {
      newMessages.push({ text: "Please provide your Order ID:", sender: "bot" });
    } else if (input.includes("Customer Support")) {
      newMessages.push({ text: "Please describe your issue, and our team will assist you shortly.", sender: "bot" });
    } else if (input.length > 5) {
      sendEmail(input);
      newMessages.push({ text: "Thank you! Our team will contact you soon. ✅", sender: "bot" });
    }

    setMessages(newMessages);
    setInput("");
  };

  const sendEmail = async (message) => {
    const emailParams = {
      from_name: "Customer",
      to_name: "Admin",
      user_email: "support@ecommerce.com",
      message,
    };

    try {
      await emailjs.send("service_xyz", "template_abc", emailParams, "YOUR_EMAILJS_KEY");
      setSuccessMessage("Message sent successfully! ✅");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error sending email:", error);
      setSuccessMessage("Failed to send message. ❌");
    }
  };

  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-end z-50">
      <button className="bg-blue-600 text-white p-4 rounded-full" onClick={toggleChatbot}>
        {isOpen ? <IoClose size={24} /> : <BsRobot size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="w-80 bg-white shadow-lg rounded-lg border mt-3"
          >
            <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between">
              <span>Chatbot</span>
            </div>

            {successMessage && <div className="bg-green-500 text-white p-2 text-center">{successMessage}</div>}

            <div className="h-60 p-3 overflow-y-auto flex flex-col space-y-2">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg text-sm ${msg.sender === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-300 text-gray-800 self-start"}`}
                  onClick={msg.clickable ? () => setInput(msg.text) : undefined}
                  style={msg.clickable ? { cursor: "pointer", backgroundColor: "#e0f7fa" } : {}}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="p-3 border-t flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 border p-2 rounded-l-lg text-sm"
                placeholder="Type here..."
              />
              <button onClick={handleSend} className="bg-blue-600 text-white px-4 rounded-r-lg">
                <BsSend />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
