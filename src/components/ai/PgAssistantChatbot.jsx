import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Bot, Send, X, Sparkles, MapPin, Star, ArrowRight, User } from 'lucide-react'
import { useAiStore } from '../../store/useAiStore'
import { useDiscoveryStore } from '../../store/useDiscoveryStore'
import { EXPANDED_PGS } from '../../data/mockDiscoveryData'

const promptChips = [
  'Best PG near Hitech City under ₹8000?',
  'Which PG has the best WiFi?',
  'Good PGs for female students near Ameerpet?',
  'Show PGs with food included & AC',
]

export default function PgAssistantChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [inputQuery, setInputQuery] = useState('')
  const { chatMessages, sendChatMessage } = useAiStore()
  const { setSelectedPGForModal } = useDiscoveryStore()
  const chatEndRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [chatMessages, isOpen])

  const handleSend = (queryText) => {
    const text = queryText || inputQuery
    if (!text.trim()) return

    sendChatMessage(text.trim())
    setInputQuery('')
  }

  const handleOpenPgModal = (pgId) => {
    const pg = EXPANDED_PGS.find((p) => p.id === pgId) || EXPANDED_PGS[0]
    setSelectedPGForModal(pg)
    setIsOpen(false)
  }

  return (
    <>
      {/* Floating Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 hover:scale-105 text-white shadow-2xl shadow-blue-500/50 flex items-center gap-2 border border-white/20 transition-all font-sans"
        title="Open PGTrust AI Assistant"
      >
        <Bot className="w-6 h-6 animate-pulse" />
        <span className="text-xs font-extrabold hidden sm:inline">Ask AI Assistant</span>
      </button>

      {/* Chatbot Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden font-sans flex flex-col h-[520px]"
          >
            {/* Top Header */}
            <div className="p-4 bg-gradient-to-r from-blue-900 to-purple-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                  <Bot className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white flex items-center gap-1.5">
                    PGTrust Conversational AI
                  </h4>
                  <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Online • 100% Verified Answers
                  </span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1.5 text-slate-400 hover:text-white rounded-xl bg-slate-800">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/60">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none shadow-md shadow-blue-600/30'
                        : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-bl-none shadow-md'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Interactive PG Card Trigger if AI suggested PG */}
                  {msg.sender === 'ai' && msg.recommendedPgId && (
                    <button
                      onClick={() => handleOpenPgModal(msg.recommendedPgId)}
                      className="mt-2 p-2.5 bg-slate-900 hover:bg-slate-800 border border-blue-500/30 rounded-xl text-xs text-blue-400 font-semibold flex items-center gap-2 transition-all"
                    >
                      <MapPin className="w-3.5 h-3.5 text-blue-400" />
                      <span>View Suggested Stanza Living Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                  <span className="text-[9px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Prompt Chips */}
            <div className="p-2 bg-slate-900 border-t border-slate-800 flex gap-1.5 overflow-x-auto scrollbar-none">
              {promptChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(chip)}
                  className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[10px] font-semibold text-slate-300 whitespace-nowrap transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="p-3 bg-slate-900 border-t border-slate-800 flex gap-2"
            >
              <input
                type="text"
                placeholder="Ask AI anything about Hyderabad PGs..."
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-600/30 shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
