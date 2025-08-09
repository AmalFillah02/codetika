// src/components/Chatbox.tsx

"use client";

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { Send, MessageSquare, User, X } from 'lucide-react';

type Message = {
  id: string;
  created_at: string;
  content: string;
  sender_name: string;
};

// Tambahkan 'defaultUser' sebagai prop opsional
export function Chatbox({ defaultUser }: { defaultUser?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [isNameSet, setIsNameSet] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Cek nama default atau nama dari localStorage
  useEffect(() => {
    // Prioritaskan nama default jika ada (untuk admin)
    if (defaultUser) {
      setUserName(defaultUser);
      setIsNameSet(true);
    } else {
      // Jika tidak, gunakan nama dari localStorage (untuk pengunjung biasa)
      const savedName = localStorage.getItem('chat_username');
      if (savedName) {
        setUserName(savedName);
        setIsNameSet(true);
      }
    }
  }, [defaultUser]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!isNameSet || !isOpen) return;

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
      } else {
        setMessages(data || []);
      }
    };

    fetchMessages();

    const channel = supabase
      .channel('public:messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          if (payload.new.sender_name !== userName) {
            setMessages((prevMessages) => [...prevMessages, payload.new as Message]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isNameSet, isOpen, userName]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !userName) return;

    const tempMessage: Message = {
      id: `temp-${Date.now()}`,
      created_at: new Date().toISOString(),
      content: newMessage,
      sender_name: userName,
    };
    setMessages(prev => [...prev, tempMessage]);
    setNewMessage('');

    const { error } = await supabase
      .from('messages')
      .insert([{ content: tempMessage.content, sender_name: tempMessage.sender_name }]);

    if (error) {
      console.error('Error sending message:', error);
      setMessages(prev => prev.filter(msg => msg.id !== tempMessage.id));
      alert("Gagal mengirim pesan.");
    }
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim() !== '') {
      localStorage.setItem('chat_username', userName.trim());
      setIsNameSet(true);
    }
  };
  
  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 bg-pink-500 text-white p-4 rounded-full shadow-lg hover:bg-pink-600 transition transform hover:scale-110 z-50"
        aria-label="Buka Chat"
      >
        <MessageSquare size={28} />
      </button>
    );
  }

  return (
    // --- PERBAIKAN DI SINI: Mengurangi nilai ketinggian ---
    <div className="fixed bottom-5 right-5 w-[calc(100%-40px)] sm:w-96 h-[45vh] sm:h-[450px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 animate-fade-in-up">
      <div className="bg-gradient-to-l from-gray-900 via-indigo-900 to-[#1a1a2e] shadow-md text-white p-4 rounded-t-2xl flex justify-between items-center">
        <h3 className="font-bold text-lg">Public Live Chat</h3>
        <button onClick={() => setIsOpen(false)} aria-label="Tutup Chat">
          <X size={24} />
        </button>
      </div>

      {/* Jika nama belum diatur DAN tidak ada nama default, tampilkan form nama */}
      {!isNameSet && !defaultUser ? (
        <div className="p-6 flex flex-col justify-center items-center h-full">
            <User size={48} className="text-gray-300 mb-4" />
            <h4 className="font-semibold text-gray-700 mb-2">Masukkan Nama Anda</h4>
            <p className="text-sm text-gray-500 mb-4 text-center">Untuk memulai obrolan, silakan isi nama Anda.</p>
            <form onSubmit={handleNameSubmit} className="w-full flex gap-2">
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Nama Anda..."
                    className="flex-grow p-2 border rounded-lg focus:ring-2 focus:ring-sky-500 text-black"
                    required
                />
                <button type="submit" className="bg-sky-500 font-bold px-4 py-2 rounded-lg hover:bg-sky-600 text-white">
                    Mulai
                </button>
            </form>
        </div>
      ) : (
        <>
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`mb-3 flex ${msg.sender_name === userName ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-2xl max-w-[80%] ${
                    msg.sender_name === userName 
                    ? 'bg-sky-500 text-white rounded-br-none' 
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                }`}>
                  {msg.sender_name !== userName && <p className="text-xs font-bold mb-1 text-sky-700">{msg.sender_name}</p>}
                  <p className="break-words">{msg.content}</p>
                  <p className="text-xs mt-1 opacity-70 text-right">{new Date(msg.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t flex items-center gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Ketik pesan..."
              className="flex-grow p-3 border rounded-lg focus:ring-2 focus:ring-sky-500 text-black"
            />
            <button type="submit" className="bg-sky-500 text-white p-3 rounded-lg hover:bg-sky-600" aria-label="Kirim Pesan">
              <Send size={24} />
            </button>
          </form>
        </>
      )}
    </div>
  );
}
