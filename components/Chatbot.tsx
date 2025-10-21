
import React, { useState, useRef, useEffect } from 'react';
import { generateChatResponse } from '../services/geminiService';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: "Welcome to Artisana Maroc! 🇲🇦 How can I help you find the perfect handcrafted item today?" }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const newUserMessage: Message = { sender: 'user', text: userInput };
    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const botResponseText = await generateChatResponse(userInput);
      const newBotMessage: Message = { sender: 'bot', text: botResponseText };
      setMessages(prev => [...prev, newBotMessage]);
    } catch (error) {
      const errorMessage: Message = { sender: 'bot', text: "Sorry, I'm having trouble connecting. Please try again later." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-terracotta text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-opacity-90 transition-transform duration-300 hover:scale-110 z-50"
        aria-label="Toggle chatbot"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-[60vh] bg-white rounded-lg shadow-2xl flex flex-col z-50 transition-all duration-300">
          <header className="bg-deep-green text-white p-4 rounded-t-lg flex items-center">
            <h3 className="font-bold text-lg">Artisana Assistant</h3>
          </header>
          <div className="flex-1 p-4 overflow-y-auto bg-sand-beige/20">
            {messages.map((msg, index) => (
              <div key={index} className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-lg px-4 py-2 max-w-[80%] ${msg.sender === 'user' ? 'bg-terracotta text-white' : 'bg-white text-gray-800 shadow-sm'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                 <div className="rounded-lg px-4 py-2 bg-white text-gray-500 shadow-sm">
                    Thinking...
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className="p-4 border-t bg-white rounded-b-lg">
            <div className="flex items-center">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 border rounded-l-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-terracotta"
                disabled={isLoading}
              />
              <button type="submit" className="bg-deep-green text-white rounded-r-full px-4 py-2 hover:bg-opacity-90 disabled:bg-gray-400" disabled={isLoading}>
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
