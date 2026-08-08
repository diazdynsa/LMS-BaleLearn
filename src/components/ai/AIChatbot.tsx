'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { responsAI, PesanChat } from '@/data/mockData';

/** Komponen Floating AI Chatbot */
export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<PesanChat[]>([
    {
      id: 'm1',
      pengirim: 'ai',
      konten: 'Halo! Saya asisten AI BaleLearn. Ada yang bisa saya bantu?',
      waktu: new Date().toISOString()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMsg: PesanChat = {
      id: `u${Date.now()}`,
      pengirim: 'user',
      konten: inputText,
      waktu: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse = responsAI.default;
      const lowerInput = userMsg.konten.toLowerCase();
      
      for (const [key, value] of Object.entries(responsAI)) {
        if (key !== 'default' && lowerInput.includes(key)) {
          aiResponse = value;
          break;
        }
      }

      const aiMsg: PesanChat = {
        id: `a${Date.now()}`,
        pengirim: 'ai',
        konten: aiResponse,
        waktu: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-accent-500 hover:bg-accent-600 text-white rounded-md w-12 h-12 flex items-center justify-center shadow-lg transition-transform hover:scale-105 z-50"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-20 right-6 w-[380px] h-[500px] bg-white dark:bg-slate-800 rounded-md shadow-xl border border-slate-200 dark:border-slate-700 z-50 flex flex-col overflow-hidden">
          <div className="bg-primary-500 text-white p-3 flex justify-between items-center rounded-t-md">
            <div className="flex items-center gap-2">
              <MessageCircle size={18} />
              <span className="font-semibold">Asisten AI BaleLearn</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-primary-600 p-1 rounded-md transition-colors">
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.pengirim === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-md max-w-[80%] text-sm ${
                  msg.pengirim === 'user' 
                    ? 'bg-primary-500 text-white ml-auto' 
                    : 'bg-slate-100 dark:bg-slate-700 dark:text-white mr-auto'
                }`}>
                  {msg.konten}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-md mr-auto max-w-[80%]">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-slate-200 dark:border-slate-700 p-3 bg-white dark:bg-slate-800 flex gap-2">
            <input 
              type="text" 
              className="input-field flex-1"
              placeholder="Tanya sesuatu..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="btn-primary p-2 flex-shrink-0 flex items-center justify-center" onClick={handleSend}>
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
