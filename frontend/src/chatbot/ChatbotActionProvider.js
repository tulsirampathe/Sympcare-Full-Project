import { createChatBotMessage } from "react-chatbot-kit";

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  recommendHelp(condition) {
    let message = "";
    if (condition === "Anxiety") {
      message =
        "It sounds like you might be experiencing anxiety. Try relaxation techniques like deep breathing or meditation. If symptoms persist, seeking professional help is recommended.";
    } else if (condition === "Depression") {
      message =
        "You mentioned feeling depressed. Remember, you're not alone. Talking to someone you trust or a professional can help.";
    }

    const chatbotMessage = this.createChatBotMessage(message);
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, chatbotMessage],
    }));
  }

  defaultResponse() {
    const chatbotMessage = this.createChatBotMessage(
      "I'm here to listen. Can you describe what you're feeling in more detail?"
    );
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, chatbotMessage],
    }));
  }
}

export default ActionProvider;
