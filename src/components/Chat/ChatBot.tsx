import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi there! I am the GlowNest AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      const apiMessages = [
        { role: 'system', content: 'You are a helpful and polite customer support assistant for GlowNest, a premium skincare and wellness brand. Keep your answers concise, professional, and friendly.' },
        ...messages.map(m => ({ role: m.role, content: m.content })),
        { role: 'user', content: userMessage }
      ];

      let response;
      if (apiKey) {
        // Direct API call for local development
        response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'llama-3.1-8b-instant',
            messages: apiMessages
          })
        });
      } else {
        // Fallback to Vercel serverless function
        response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ messages: apiMessages }),
        });
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch response: ${response.status}`);
      }

      const data = await response.json();
      // Handle both Groq direct response format and our Vercel API format if it ever changes
      const botMessage = data.choices?.[0]?.message?.content || 'Sorry, I am having trouble connecting right now.';
      
      setMessages(prev => [...prev, { role: 'assistant', content: botMessage }]);
    } catch (error) {
      console.error('Chat API Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Oops! Something went wrong while connecting to my brain. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-theme-primary to-theme-secondary text-theme-bg shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-theme-primary/30 transition-shadow"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
      >
        <MessageCircle size={28} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] flex flex-col bg-theme-bg/95 backdrop-blur-xl border border-theme-text/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-theme-primary/10 to-theme-secondary/10 border-b border-theme-text/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-theme-primary to-theme-secondary flex items-center justify-center text-theme-bg font-bold shadow-md">
                  GN
                </div>
                <div>
                  <h3 className="font-bold text-theme-text m-0">GlowNest AI</h3>
                  <p className="text-xs text-theme-text/60 m-0">Typically replies instantly</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-theme-text/60 hover:text-theme-text transition-colors p-2 rounded-full hover:bg-theme-text/5"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      msg.role === 'user' 
                        ? 'bg-gradient-to-r from-theme-primary to-theme-secondary text-theme-bg rounded-br-sm' 
                        : 'bg-theme-text/5 border border-theme-text/10 text-theme-text rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm m-0 whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-theme-text/5 border border-theme-text/10 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-2">
                    <Loader2 size={16} className="text-theme-primary animate-spin" />
                    <span className="text-xs text-theme-text/60">Typing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-theme-bg/50 border-t border-theme-text/10">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center gap-2 relative"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-theme-text/5 border border-theme-text/10 rounded-full px-4 py-3 text-sm text-theme-text placeholder-theme-text/40 focus:outline-none focus:ring-2 focus:ring-theme-primary/50 transition-all"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-1 w-10 h-10 rounded-full bg-gradient-to-r from-theme-primary to-theme-secondary text-theme-bg flex items-center justify-center shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-opacity hover:shadow-lg"
                >
                  <Send size={18} className="ml-1" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
