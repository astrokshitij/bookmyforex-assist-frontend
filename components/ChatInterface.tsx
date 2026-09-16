'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Send, ShieldCheck, AlertTriangle, Sparkles, Filter, Loader2 } from 'lucide-react'
import { marked } from 'marked'
import { CitationDrawer, Citation } from './CitationDrawer'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  grounded?: boolean
  fallbackTriggered?: boolean
  citations?: Citation[]
}

interface ChatInterfaceProps {
  backendUrl: string
}

const QUICK_PROMPTS = [
  { label: '💳 BIGFXSALE Cashback Slabs', query: 'What is the cashback slab and promo code for Big Forex Sale?' },
  { label: '🚨 ATM Swallowed Card SOP', query: 'A customer card got stuck in a foreign ATM. What is the emergency SOP?' },
  { label: '🛡️ Insurance Claim FIR Rules', query: 'Can an online FIR be submitted for an unauthorized transaction insurance claim?' },
  { label: '✈️ YES Bank vs Instarem', query: 'What is the difference between YES Bank Multi-Currency and Instarem Global USD card eligibility?' },
  { label: '⚠️ 3 Wrong PIN Block', query: 'How long is a card blocked if a customer enters 3 incorrect PINs?' },
  { label: '🎓 Education Remittance Offer', query: 'What are the education remittance promo codes and minimum transfer amounts?' },
]

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ backendUrl }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        'Hello! I am **BookMyForex Assist**, your grounded internal support AI. You can ask me any question regarding BookMyForex campaigns, promo codes, cashback slabs, fee structures, partner value-added perks, or emergency SOPs.\n\nAll answers are strictly verified against official BookMyForex policy guidelines.',
      grounded: true,
      fallbackTriggered: false,
    },
  ])

  const [inputQuery, setInputQuery] = useState('')
  const [documentTypeFilter, setDocumentTypeFilter] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const handleSubmit = async (queryToSubmit?: string) => {
    const query = (queryToSubmit || inputQuery).trim()
    if (!query || isLoading) return

    const userMsgId = 'user-' + Date.now()
    const userMessage: Message = {
      id: userMsgId,
      role: 'user',
      content: query,
    }

    setMessages((prev) => [...prev, userMessage])
    if (!queryToSubmit) setInputQuery('')
    setIsLoading(true)

    try {
      const response = await fetch(`${backendUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          top_k: 5,
          document_type: documentTypeFilter || null,
        }),
      })

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`)
      }

      const data = await response.json()
      const assistantMessage: Message = {
        id: 'assistant-' + Date.now(),
        role: 'assistant',
        content: data.answer || 'I cannot find this information in the official BookMyForex guidelines. Please check with the compliance desk.',
        grounded: data.grounded ?? !data.fallback_triggered,
        fallbackTriggered: data.fallback_triggered ?? false,
        citations: data.citations || [],
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: 'error-' + Date.now(),
          role: 'assistant',
          content: 'I cannot find this information in the official BookMyForex guidelines. Please check with the compliance desk.',
          grounded: false,
          fallbackTriggered: true,
          citations: [],
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const renderMarkdown = (text: string) => {
    try {
      return { __html: marked.parse(text) }
    } catch {
      return { __html: text }
    }
  }

  return (
    <div className="flex-1 flex flex-col max-w-5xl w-full mx-auto p-3 md:p-6 overflow-hidden">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-[#0b1f3d] text-white rounded-xl p-3.5 md:p-4 mb-4 shadow-sm border border-blue-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500/20 text-emerald-300 p-2 rounded-lg border border-emerald-500/40 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold">Strict Compliance & Policy Grounding Active</h2>
            <p className="text-xs text-blue-200/90 font-sans">
              Queries are strictly grounded against BookMyForex knowledge base docs. Missing policy automatically triggers compliance escalation.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Inquiry Pills */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-semibold text-slate-500 whitespace-nowrap uppercase tracking-wider">
          Quick Inquiries:
        </span>
        {QUICK_PROMPTS.map((p, i) => (
          <button
            key={i}
            onClick={() => handleSubmit(p.query)}
            disabled={isLoading}
            className="text-xs font-medium bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-300 px-3 py-1.5 rounded-full transition shadow-xs whitespace-nowrap shrink-0 disabled:opacity-50"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-4 mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-[92%] ${
              msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs shadow-sm ${
                msg.role === 'user'
                  ? 'bg-[#0b1f3d] text-white'
                  : 'bg-blue-100 border border-blue-300 text-blue-800'
              }`}
            >
              {msg.role === 'user' ? '👤' : '🤖'}
            </div>

            {/* Bubble Container */}
            <div className="flex flex-col gap-1 w-full">
              <span className={`text-[11px] font-semibold text-slate-400 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                {msg.role === 'user' ? 'Support Agent' : 'BookMyForex Assist'}
              </span>

              <div
                className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm border ${
                  msg.role === 'user'
                    ? 'bg-[#0b1f3d] text-white border-[#0b1f3d] rounded-tr-none'
                    : 'bg-white text-slate-900 border-slate-200 rounded-tl-none'
                }`}
              >
                {/* Grounding Status Badge for Assistant */}
                {msg.role === 'assistant' && (
                  <div className="mb-2">
                    {msg.fallbackTriggered ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-full">
                        <AlertTriangle className="w-3 h-3 text-amber-600" />
                        Compliance Escalation Required
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        Verified Policy Grounding
                      </span>
                    )}
                  </div>
                )}

                {/* Response Text */}
                {msg.role === 'user' ? (
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                ) : (
                  <div
                    className="prose-assistant"
                    dangerouslySetInnerHTML={renderMarkdown(msg.content)}
                  />
                )}

                {/* Collapsible Source Citations */}
                {msg.role === 'assistant' && msg.citations && msg.citations.length > 0 && (
                  <CitationDrawer citations={msg.citations} />
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex gap-3 max-w-[80%] mr-auto items-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-300 text-blue-800 flex items-center justify-center font-bold text-xs">
              🤖
            </div>
            <div className="bg-white border border-slate-200 p-3.5 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2.5 text-xs text-slate-600 font-medium">
              <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
              <span>Verifying guidelines against live vector database...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Wrapper */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-md">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2 px-1">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Scope Filter:</span>
            <select
              value={documentTypeFilter}
              onChange={(e) => setDocumentTypeFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded px-2 py-1 outline-none focus:outline-none focus:border-blue-500"
            >
              <option value="">All Knowledge Documents</option>
              <option value="campaign_offers_tcs">Campaigns & Offers (Offers.md)</option>
              <option value="operational_sop">Operational SOPs & Disputes</option>
              <option value="product_guide">Product Guides (YES Bank / Instarem)</option>
              <option value="company_overview">Company Profile & History</option>
            </select>
          </div>
          <span className="hidden sm:inline text-[11px] text-slate-400">
            Press <strong>Enter</strong> to send, <strong>Shift+Enter</strong> for newline
          </span>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
          className="flex items-end gap-2"
        >
          <textarea
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSubmit()
              }
            }}
            placeholder="Type your policy or operational query (e.g., 'What is the required documentation for a 1.5L insurance claim?')..."
            rows={2}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 resize-none outline-none focus:outline-none focus:border-blue-600 focus:bg-white transition"
          />
          <button
            type="submit"
            disabled={isLoading || !inputQuery.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 h-11 rounded-xl transition flex items-center justify-center gap-1.5 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
          >
            <span>Send</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  )
}
