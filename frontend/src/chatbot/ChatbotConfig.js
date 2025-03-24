import { createChatBotMessage } from "react-chatbot-kit";

const ChatbotConfig = {
  botName: "MindCare AI",
  initialMessages: [
    createChatBotMessage("Hello! How are you feeling today?"),
  ],
};

export default ChatbotConfig;
