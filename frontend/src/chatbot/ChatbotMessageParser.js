class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
      const lowerCaseMessage = message.toLowerCase();
  
      if (lowerCaseMessage.includes("anxiety") || lowerCaseMessage.includes("stress")) {
        this.actionProvider.recommendHelp("Anxiety");
      } else if (lowerCaseMessage.includes("depression") || lowerCaseMessage.includes("sad")) {
        this.actionProvider.recommendHelp("Depression");
      } else {
        this.actionProvider.defaultResponse();
      }
    }
  }
  
  export default MessageParser;
  