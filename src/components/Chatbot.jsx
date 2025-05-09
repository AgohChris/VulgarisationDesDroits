import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, X, Bot } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Bonjour ! Comment puis-je vous aider aujourd'hui ?", sender: "bot" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isUserScrolling, setIsUserScrolling] = useState(false);
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

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const newMessage = { id: messages.length + 1, text: inputValue, sender: "user" };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputValue("");

    setTimeout(() => {
      const botResponse = { id: messages.length + 2, text: getBotResponse(inputValue), sender: "bot" };
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 1000);
  };

  const getBotResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    if (lowerInput.includes("droit du travail")) {
      return "Le droit du travail concerne les relations entre employeurs et employés. Avez-vous une question spécifique sur un contrat, un licenciement, ou des congés ?";
    } else if (lowerInput.includes("logement") || lowerInput.includes("bail")) {
      return "Pour les questions de logement, je peux vous aider avec des informations sur les baux, les droits des locataires ou des propriétaires. Quelle est votre situation ?";
    } else if (lowerInput.includes("famille")) {
      return "Le droit de la famille couvre des sujets comme le mariage, le divorce, la garde d'enfants. Pouvez-vous préciser votre question ?";
    } else if (lowerInput.includes("merci")) {
      return "De rien ! N'hésitez pas si vous avez d'autres questions.";
    } else {
      return "Je suis encore en apprentissage. Pourriez-vous reformuler votre question ou consulter nos sections Glossaire ou Thématiques pour plus d'informations ?";
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
          className="rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
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
            <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Bot className="h-6 w-6 mr-2" />
                <h3 className="font-semibold text-lg">Assistant JuriAccès</h3>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleChatbot} className="text-white hover:bg-white/20">
                <X className="h-5 w-5" />
              </Button>
            </header>
            <ScrollArea
              className="flex-grow p-4"
              onScroll={handleScroll}
              style={{ maxHeight: "calc(70vh - 100px)", overflowY: "auto" }}>
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
                          ? "bg-blue-500 text-white rounded-br-none"
                          : "bg-gray-200 text-gray-800 rounded-bl-none"
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
                <Button type="submit" size="icon" className="bg-blue-600 hover:bg-blue-700 text-white" aria-label="Envoyer le message">
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
 