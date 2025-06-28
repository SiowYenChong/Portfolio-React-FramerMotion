import React, { useState, useEffect, useRef } from 'react';
import { IoMdClose, IoMdInformationCircle } from 'react-icons/io';
import { RiRobot3Fill } from 'react-icons/ri';
import { LuSendHorizonal, LuMessageCircle } from 'react-icons/lu';
import { motion, AnimatePresence } from 'framer-motion';
import { VscDebugBreakpointConditionalUnverified } from 'react-icons/vsc';
import TextWithLinks from '../subComponents/TextWithLinks'; // Adjust path if needed
import axios from 'axios';
import './ChatBot.css';

const ChatBot = () => {
  const [isOpening, setIsOpening] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hey 🤖, I'm Siow Yen's AI Assistant. How can I help you today?",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const chatContainerRef = useRef(null);
  const [showCapabilities, setShowCapabilities] = useState(false);

  const capabilities = [
    'Provide details about Siow Yen background and experience',
    'Share updates on Siow Yen projects and portfolio',
    'Access Siow Yen resume and achievements',
    'Provide contact info and social links',
    'Send emails with a subject, body, and email address',
  ];

  const reduceTextSize = () => {
    setIsOpening(false);
  };

  const chatRequest = async () => {
    if (!input.trim() || isSending) return;
    setInput('');
    setIsSending(true);
    setMessages(prev => [...prev, { text: input, isBot: false }]);

    try {
      const response = await axios.post('https://portfolio-react-framermotion.onrender.com/chat', { question: input }, { withCredentials: true });

      setMessages(prev => [
        ...prev,
        { text: response.data.response, isBot: true },
      ]);
    } catch (error) {
      console.error('Chat API error:', error);
      setMessages(prev => [
        ...prev,
        {
          text: 'Oops! Something went wrong. Please try again later.',
          isBot: true,
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  useEffect(() => {
    setTimeout(() => reduceTextSize(), 2000);
  }, []);

  const handleKeyPress = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      chatRequest();
    }
  };

  const dotVariants = {
    animate: custom => ({
      y: [5, 0, -6, 0, 5],
      transition: {
        duration: 1.4,
        repeat: Infinity,
        delay: custom * 0.4,
        ease: 'linear',
      },
    }),
  };

  return (
    <div className="chatbot-wrapper">
      {showCapabilities && isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="capabilities-panel"
        >
          <h3>My Capabilities:</h3>
          <ul>
            {capabilities.map((text, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <VscDebugBreakpointConditionalUnverified /> {text}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {!isOpen ? (
        <motion.button
          onClick={() => { setIsOpen(true); setShowCapabilities(false); }}
          className="chatbot-launcher"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <LuMessageCircle />
          <span>{isOpening ? 'Chat With Me' : ''}</span>
        </motion.button>
      ) : (
        <AnimatePresence>
          <motion.div
            className="chatbot-box"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <div className="chatbot-header">
              <RiRobot3Fill /> <span>大燕 Assistant</span>
              <div>
                <button onClick={() => setShowCapabilities(prev => !prev)}>
                  <IoMdInformationCircle />
                </button>
                <motion.button onClick={() => setIsOpen(false)} whileHover={{ rotate: 90 }}>
                  <IoMdClose />
                </motion.button>
              </div>
            </div>

            <div className="chatbot-messages" ref={chatContainerRef}>
              <AnimatePresence>
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    className={`message ${msg.isBot ? 'bot' : 'user'}`}
                    initial={{ opacity: 0, x: msg.isBot ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: msg.isBot ? -20 : 20 }}
                  >
                    <TextWithLinks text={msg.text} />
                  </motion.div>
                ))}
                {isSending && (
                  <motion.div className="message bot" key="typing">
                    <motion.span custom={0} variants={dotVariants} animate="animate" className="dot" />
                    <motion.span custom={1} variants={dotVariants} animate="animate" className="dot" />
                    <motion.span custom={2} variants={dotVariants} animate="animate" className="dot" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="chatbot-input">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
              />
              <button onClick={chatRequest} disabled={!input.trim() || isSending}>
                <LuSendHorizonal />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default ChatBot;