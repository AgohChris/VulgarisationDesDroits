import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, X, Bot } from "lucide-react";
import axios from "axios";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Bonjour, Je suis miss Ella, Comment puis-je vous aider aujourd'hui ?", sender: "bot" }
  ]); 
  const [inputValue, setInputValue] = useState("");
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);

  const toggleChatbot = () => setIsOpen(!isOpen);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setIsUserScrolling(scrollTop + clientHeight < scrollHeight - 10);
  };

  const scrollToBottom = () => {
    if (!isUserScrolling) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    const newMessage = { id: messages.length + 1, text: inputValue, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue("");

    try {
      // Appeler l'API backend pour obtenir une réponse
      const response = await axios.post("@https://vulgarisationdesdroits-b02f.onrender.com/api/chatbot/", {
        message: inputValue,
        session_id: sessionId, // Inclure l'ID de session
      });

      // Mettre à jour l'ID de session si nécessaire
      if (!sessionId) {
        setSessionId(response.data.session_id);
      }

      const botResponse = {
        id: messages.length + 2,
        text: response.data.response || "Désolé, je n'ai pas pu générer de réponse.",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      console.error("Erreur lors de l'appel à l'API :", error);
      const errorMessage = {
        id: messages.length + 2,
        text: "Désolé, une erreur est survenue. Veuillez réessayer plus tard.",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
      >

      <Button
            onClick={toggleChatbot}
            size="lg"
            className="rounded-full shadow-lg bg-gradient-to-r from-ivory-orange to-ivory-green text-white hover:from-orange-500 hover:to-green-500"
            aria-label={isOpen ? "Fermer le chatbot" : "Ouvrir le chatbot"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-lg shadow-xl z-50 border border-gray-200 flex flex-col overflow-hidden"
            style={{ maxHeight: "70vh" }}
          >
      <header className="bg-gradient-to-r from-ivory-orange to-ivory-green text-white p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Bot className="h-6 w-6 mr-2" />
            <h3 className="font-semibold text-lg">Miss Ella</h3>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleChatbot} className="text-white hover:bg-white/20">
            <X className="h-5 w-5" />
          </Button>
      </header>
                  <ScrollArea
              className="flex-grow p-4"
              onScroll={handleScroll}
              style={{ maxHeight: "calc(70vh - 100px)", overflowY: "auto" }}
            >
              <div className="space-y-4">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[75%] p-3 rounded-lg ${
                        msg.sender === "user"
                          ? "bg-ivory-orange text-white rounded-br-none"
                          : "bg-ivory-green text-white rounded-bl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

       <footer className="p-4 border-t border-gray-200 bg-gray-50">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <Input
            type="text"
            placeholder="Posez votre question..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-grow search-input"
            aria-label="Message pour le chatbot"
          />
           <Button
              type="submit"
              size="icon"
              className="bg-ivory-orange hover:bg-ivory-green text-white rounded-r-md"
              aria-label="Envoyer le message"
            >
              <Send className="h-5 w-5" />
            </Button>
        </form>
      </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
