'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Trash2, Bot, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'bot', text: 'Halo! Saya SPENDASI AI Assistant. Ada yang bisa saya bantu mengenai SMP Negeri 2 Sidoarjo?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.text }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: 'bot', text: data.reply || 'Gangguan koneksi.' }]);
    } catch {
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'bot', text: 'Gagal terhubung ke AI.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} className="bg-blue-900 text-amber-400 p-4 rounded-full shadow-xl flex items-center gap-2 border-2 border-amber-400/40">
          <Sparkles className="w-6 h-6 animate-pulse" />
          <span className="font-semibold text-white text-sm">Tanya SPENDASI AI</span>
        </button>
      ) : (
        <div className="bg-white w-[90vw] sm:w-[380px] h-[520px] rounded-2xl shadow-2xl flex flex-col border">
          <div className="bg-blue-950 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6 text-amber-400" />
              <h3 className="font-bold text-sm">SPENDASI AI ASSISTANT</h3>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setMessages([])} className="text-blue-200"><Trash2 className="w-4 h-4" /></button>
              <button onClick={() => setIsOpen(false)} className="text-blue-200"><X className="w-5 h-5" /></button>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-sm">
            {messages.map(m => (
              <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-xl max-w-[85%] whitespace-pre-line ${m.sender === 'user' ? 'bg-blue-900 text-white' : 'bg-white border text-slate-800'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && <p className="text-xs text-slate-400 italic">AI sedang mengetik...</p>}
            <div ref={endRef} />
          </div>
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-3 bg-white border-t flex gap-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Tanyakan sesuatu..." className="flex-1 border text-sm rounded-lg px-3 py-2" />
            <button type="submit" className="bg-blue-900 text-white px-3 py-2 rounded-lg">Kirim</button>
          </form>
        </div>
      )}
    </div>
  );
}

