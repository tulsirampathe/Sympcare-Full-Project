/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaTimes, FaMicrophone, FaImage } from "react-icons/fa";
import Lottie from "lottie-react";
import chatAnimation from "../assets/chatbot.json";
import { io } from "socket.io-client";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const ChatWithDoctor = ({ appointment, isOpen: propIsOpen, setChatOpen }) => {
  const { backendUrl, userData } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(propIsOpen || false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);
  const socketRef = useRef();
  const recognitionRef = useRef(null);

  // ✅ Initialize Socket
  useEffect(() => {
    socketRef.current = io(backendUrl, { transports: ["websocket"] });
    return () => socketRef.current.disconnect();
  }, [backendUrl]);

  // ✅ Join Room + Listeners
  useEffect(() => {
    if (!appointment?._id || !userData?._id) return;

    socketRef.current.emit("join_room", appointment._id);
    fetchChatHistory();

    socketRef.current.on("receive_message", (newMsg) => {
      if (newMsg.appointmentId === appointment._id) {
        setMessages((prev) => [...prev, newMsg]);
      }
    });

    return () => socketRef.current.off("receive_message");
  }, [appointment?._id, userData?._id]);

  // ✅ Fetch Chat History
  const fetchChatHistory = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/chat/${appointment._id}`);
      if (res.data.success) setMessages(res.data.messages);
    } catch (err) {
      console.error("Error fetching chat:", err);
    }
  };

  // ✅ Send Message
  const sendMessage = async () => {
    if (isSending || (!input.trim() && !selectedFile)) return;

    setIsSending(true);
    let messageData = {
      appointmentId: appointment._id,
      senderId: userData._id,
      receiverId:
        userData._id === appointment.userId
          ? appointment.docId
          : appointment.userId,
      message: input,
    };

    try {
      // ✅ File Upload
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        const uploadRes = await axios.post(
          `${backendUrl}/api/chat/upload`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        messageData.attachmentUrl = uploadRes.data.fileUrl;
        setSelectedFile(null);
      }

      socketRef.current.emit("send_message", messageData);
      setInput("");
    } catch (err) {
      console.error("Message send failed:", err);
    } finally {
      setIsSending(false);
    }
  };

  // ✅ Voice Input (Speech to Text)
  const handleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice input not supported in this browser");
      return;
    }

    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => prev + " " + transcript);
    };

    recognition.onerror = (err) => {
      console.error("Speech error:", err);
      setIsRecording(false);
    };

    recognition.onend = () => setIsRecording(false);

    recognition.start();
    recognitionRef.current = recognition;
    setIsRecording(true);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const closeChat = () => {
    setIsOpen(false);
    setChatOpen(false);
  };

  if (!userData) return null;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={closeChat}
        />
      )}

      <div className="fixed inset-0 flex justify-center items-center z-[9999]">
        {isOpen ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="w-full max-w-lg h-[75vh] bg-white shadow-2xl rounded-2xl flex flex-col border border-gray-200"
          >
            {/* Header */}
            <div className="bg-primary p-4 flex justify-between items-center rounded-t-2xl">
              <h3 className="text-white text-lg font-bold">
                Chat with{" "}
                {userData._id === appointment.userId ? "Doctor" : "Patient"}
              </h3>
              <button onClick={closeChat} className="text-white text-xl">
                <FaTimes />
              </button>
            </div>

            {/* Messages */}
            <div className="p-4 flex-1 overflow-y-auto flex flex-col space-y-3 bg-gray-50">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  className={`max-w-xs p-3 rounded-lg shadow-md whitespace-pre-wrap ${
                    msg.senderId === userData._id
                      ? "bg-blue-500 text-white self-end"
                      : "bg-primary text-white self-start"
                  }`}
                >
                  {msg.attachmentUrl && (
                    <>
                      {msg.attachmentUrl.match(/\.(jpeg|jpg|png|gif)$/) ? (
                        <img
                          src={msg.attachmentUrl}
                          alt="shared file"
                          className="w-48 h-auto rounded-md mb-2"
                        />
                      ) : (
                        <a
                          href={msg.attachmentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline text-sm"
                        >
                          📄 View File
                        </a>
                      )}
                    </>
                  )}
                  {msg.message && <p>{msg.message}</p>}
                  <span className="text-xs opacity-70 block text-right mt-1">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </motion.div>
              ))}

              {/* ✅ Loader animation while sending */}
              {isSending && (
                <div className="flex justify-center items-center mt-2">
                  <div className="w-6 h-6 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* File Preview */}
            {selectedFile && (
              <div className="p-3 bg-gray-100 border-t flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {selectedFile.type.startsWith("image/") && (
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Preview"
                      className="w-16 h-16 object-cover rounded-md border"
                    />
                  )}
                  <span className="text-gray-700 text-sm truncate max-w-[150px]">
                    {selectedFile.name}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="text-red-500 hover:text-red-700"
                  disabled={isSending}
                >
                  <FaTimes />
                </button>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t bg-white flex items-center space-x-2">
              {/* File Upload */}
              <label
                className={`cursor-pointer ${
                  isSending ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <FaImage className="text-gray-600 text-xl" />
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  className="hidden"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  disabled={isSending}
                />
              </label>

              {/* Voice Input */}
              <button
                onClick={handleVoiceInput}
                disabled={isSending}
                className={`text-xl ${
                  isRecording ? "text-red-500" : "text-gray-600"
                } ${isSending ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <FaMicrophone />
              </button>

              {/* Message Input */}
              <textarea
                rows="1"
                className="flex-1 p-2 border rounded-lg outline-none resize-none overflow-auto max-h-32 disabled:opacity-60"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isSending}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />

              {/* Send Button */}
              <button
                onClick={sendMessage}
                className={`bg-primary text-white px-4 py-2 rounded-lg flex items-center justify-center ${
                  isSending ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSending}
              >
                {isSending ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <FaPaperPlane />
                )}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            onClick={() => setIsOpen(true)}
            whileTap={{ scale: 0.9 }}
            className="text-white hover:scale-110 transform transition flex items-center"
          >
            <div className="w-28 h-28">
              <Lottie animationData={chatAnimation} loop={true} />
            </div>
          </motion.button>
        )}
      </div>
    </>
  );
};

export default ChatWithDoctor;
