'use client'

import React, { useState, useRef } from 'react';

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
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="max-h-[400px] overflow-y-scroll p-4 border-t border-gray-200">
        {responses.map((response, index) => (
          <div key={index} className="mb-2">
            <div className="p-2 bg-gray-100 rounded-md">{response}</div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex p-4 border-t border-gray-200 bg-gray-50">
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="Type your message..."
          className="flex-1 p-2 border border-gray-300 rounded-md mr-2"
        />
        <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50">
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default AiChat;
