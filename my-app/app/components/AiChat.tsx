'use client'

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';
// import userLogo from '../public/vercel.svg'; // Update with the correct path
// import geminiLogo from '../public/next.svg'; // Update with the correct path

const AiChat = () => {
  const [message, setMessage] = useState('');
  const [responses, setResponses] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;

    setResponses((prev) => [...prev, `You: ${message}`]);
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {  
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      const result = await response.json();
      setResponses((prev) => [...prev, `Gemini: ${result.answer}`]);
    } catch (error) {
      if (error instanceof Error) {
        setResponses((prev) => [...prev, `Error: ${error.message}`]);
      } else {
        setResponses((prev) => [...prev, 'An unknown error occurred']);
      }
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [responses]);

  return (
    <div className="max-w-4xl mx-auto bg-gray-50 shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="max-h-[600px] overflow-y-scroll p-4 border-b border-gray-300">
        {responses.map((response, index) => (
          <div 
            key={index} 
            className={`flex items-start mb-4 ${response.startsWith('You:') ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`flex items-center ${response.startsWith('You:') ? 'flex-row-reverse' : 'flex-row'} max-w-xs bg-blue-100 rounded-lg p-3`}
              style={{
                borderRadius: '15px',
                backgroundColor: response.startsWith('You:') ? '#DCF8C6' : '#E5E5EA',
              }}
            >
              {response.startsWith('You:') ? (
                <>
                  <div className="mr-2">
                  {/* <UserButton /> */}
                  </div>
                  <div>{response}</div>
                </>
              ) : (
                <>
                  <div className="mr-2">
                    {/* <Image src='/next.svg' alt="Gemini Logo" width={32} height={32} /> */}
                  </div>
                  <div>{response}</div>
                </>
              )}  
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex p-4 border-t border-gray-300 bg-white">
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="Type your message..."
          className="flex-1 p-3 border border-gray-300 rounded-md mr-2"
        />
        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50">
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default AiChat;
