import { useState } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

const initialMessages = [
  {
    id: 1,
    role: 'assistant',
    content: "Hi! I'm RaiseRealm's AI Assistant. I'm here to help you with any questions about our crowdfunding platform. How can I assist you today?"
  }
];

const suggestedQuestions = [
  "How does milestone-based funding work?",
  "How can I start a project?",
  "What fees does RaiseRealm charge?",
  "How do I back a project?"
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      role: 'user',
      content: inputValue
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        role: 'assistant',
        content: getAIResponse(inputValue)
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const getAIResponse = (question) => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('milestone') || lowerQuestion.includes('funding')) {
      return "Milestone-based funding is our unique approach! Instead of receiving all funds at once, creators receive funding in stages as they complete predetermined milestones. This ensures accountability and builds trust with backers. Each milestone has clear deliverables and success criteria.";
    }
    
    if (lowerQuestion.includes('start') || lowerQuestion.includes('create') || lowerQuestion.includes('project')) {
      return "To start a project, click 'Start Your Project' on our homepage. You'll need to create a detailed proposal including your project goals, timeline, milestones, and funding requirements. Our team reviews each submission to ensure quality and feasibility.";
    }
    
    if (lowerQuestion.includes('fee') || lowerQuestion.includes('charge') || lowerQuestion.includes('cost')) {
      return "RaiseRealm charges a transparent 5% platform fee on successfully funded projects. There are no upfront costs for creators. For backers, there are no fees - you only pay the amount you pledge.";
    }
    
    if (lowerQuestion.includes('back') || lowerQuestion.includes('support') || lowerQuestion.includes('pledge')) {
      return "To back a project, browse our Projects page and find one that inspires you. Click 'Support This Project' and choose your pledge amount. You'll receive regular milestone updates and your pledge is only collected when the project reaches its goal.";
    }
    
    if (lowerQuestion.includes('hello') || lowerQuestion.includes('hi') || lowerQuestion.includes('hey')) {
      return "Hello! I'm here to help you learn more about RaiseRealm and how our milestone-based crowdfunding platform works. What would you like to know?";
    }

    return "Thank you for your question! I'm here to help with any questions about RaiseRealm. You can also visit our 'How It Works' page for detailed information, or reach out to our support team for personalized assistance.";
  };

  const handleSuggestedQuestion = (question) => {
    setInputValue(question);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-50 animate-pulse"
        aria-label="Open AI Chat"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-slate-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">RaiseRealm AI</h3>
                <p className="text-white/80 text-xs">Online • Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-primary-500 text-white rounded-br-md'
                      : 'bg-white border border-slate-200 text-slate-700 rounded-bl-md'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.role === 'assistant' && (
                      <Bot className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0" />
                    )}
                    {message.role === 'user' && (
                      <User className="w-4 h-4 text-white mt-1 flex-shrink-0" />
                    )}
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-slate-500 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="text-xs px-3 py-1.5 bg-slate-100 hover:bg-primary-100 text-slate-600 hover:text-primary-600 rounded-full transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 bg-white border-t border-slate-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-slate-200 rounded-full focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 text-sm"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="w-10 h-10 bg-primary-500 hover:bg-primary-600 disabled:bg-slate-300 rounded-full flex items-center justify-center transition-colors"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
