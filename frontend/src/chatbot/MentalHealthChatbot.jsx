import React from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import { motion } from "framer-motion";
import ChatbotConfig from "./ChatbotConfig";
import MessageParser from "./ChatbotMessageParser";
import ActionProvider from "./ChatbotActionProvider";

const MentalHealthChatbot = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-5 right-5 shadow-lg"
    >
      <Chatbot
        config={ChatbotConfig}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </motion.div>
  );
};

export default MentalHealthChatbot;
