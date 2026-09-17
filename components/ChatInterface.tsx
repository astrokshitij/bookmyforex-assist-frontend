'use client'

import React, { useState, useRef, useEffect } from 'react'
import {
  Sparkles,
  Paperclip,
  ArrowUp,
  CreditCard,
  TrendingUp,
  Landmark,
  ShieldCheck,
  AlertTriangle,
  Loader2,
  Filter,
} from 'lucide-react'
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
  externalQuery?: string
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  backendUrl,
  externalQuery,
}) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputQuery, setInputQuery] = useState('')
  const [documentTypeFilter, setDocumentTypeFilter] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages, isLoading])

  useEffect(() => {
    if (externalQuery) {
      handleSubmit(externalQuery)
    }
  }, [externalQuery])

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
        content:
          data.answer ||
          'I cannot find this information in the official BookMyForex guidelines. Please check with the compliance desk.',
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
          content:
            'I cannot find this information in the official BookMyForex guidelines. Please check with the compliance desk.',
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
    <div className="relative z-0 flex min-w-0 flex-1 flex-col h-full overflow-hidden">
      {/* Scrollable Chat Area */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
          {/* Welcome Hero when no messages */}
          {messages.length === 0 ? (
            <div className="flex animate-msg-in flex-col items-center pt-10 text-center sm:pt-16">
              <span className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1E4D8C]/40 to-[#1B3A6B]/40 text-[#FE8405] ring-1 ring-inset ring-[#1E4D8C]/40 shadow-lg shadow-[#1E4D8C]/20">
                <Sparkles className="size-7" />
              </span>
              <h2 className="text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                BookMyForex Assist
              </h2>
              <p className="mt-3 max-w-md text-pretty text-sm leading-relaxed text-slate-400">
                Internal Support Portal. Strictly grounded in company guidelines. Ask your query below.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-6 py-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-[90%] ${
                    msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`size-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs shadow-md ${
                      msg.role === 'user'
                        ? 'bg-[#FE8405] text-white'
                        : 'bg-[#1E4D8C] text-blue-200 border border-blue-400/30'
                    }`}
                  >
                    {msg.role === 'user' ? '👤' : '🤖'}
                  </div>

                  {/* Message Bubble Container */}
                  <div className="flex flex-col gap-1 w-full min-w-0">
                    <span
                      className={`text-[11px] font-medium text-slate-500 ${
                        msg.role === 'user' ? 'text-right' : 'text-left'
                      }`}
                    >
                      {msg.role === 'user' ? 'Support Agent' : 'BookMyForex Assist'}
                    </span>

                    <div
                      className={`p-4 rounded-2xl text-sm leading-relaxed shadow-lg border ${
                        msg.role === 'user'
                          ? 'bg-[#12294d] text-slate-100 border-[#1E4D8C]/60 rounded-tr-none'
                          : 'bg-[#0b1e3d]/90 text-slate-200 border-white/[0.08] rounded-tl-none'
                      }`}
                    >
                      {/* Assistant Status Badge */}
                      {msg.role === 'assistant' && (
                        <div className="mb-2.5">
                          {msg.fallbackTriggered ? (
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                              <AlertTriangle className="size-3 text-amber-400" />
                              Compliance Escalation Required
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                              <ShieldCheck className="size-3 text-emerald-400" />
                              Verified Policy Grounding
                            </span>
                          )}
                        </div>
                      )}

                      {/* Content */}
                      {msg.role === 'user' ? (
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      ) : (
                        <div
                          className="prose-assistant"
                          dangerouslySetInnerHTML={renderMarkdown(msg.content)}
                        />
                      )}

                      {/* Official Policy Citations Drawer */}
                      {msg.role === 'assistant' &&
                        msg.citations &&
                        msg.citations.length > 0 && (
                          <CitationDrawer citations={msg.citations} />
                        )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex gap-3 max-w-[80%] mr-auto items-center">
                  <div className="size-8 rounded-full bg-[#1E4D8C] text-blue-200 flex items-center justify-center font-bold text-xs">
                    🤖
                  </div>
                  <div className="bg-[#0b1e3d]/90 border border-white/[0.08] p-3.5 rounded-2xl rounded-tl-none shadow-lg flex items-center gap-2.5 text-xs text-slate-300 font-medium">
                    <Loader2 className="size-4 animate-spin text-[#FE8405]" />
                    <span>Verifying guidelines against live vector database...</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Floating Bottom Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
        className="px-4 pb-4 pt-2 sm:px-6 sm:pb-6 shrink-0"
      >
        <div className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border border-neutral-700 bg-black/60 p-2 shadow-xl shadow-black/40 backdrop-blur-md transition-colors focus-within:border-[#FE8405]/50">
          <button
            type="button"
            aria-label="Filter scope"
            onClick={() => {
              const types = ['', 'campaign_offers_tcs', 'operational_sop', 'product_guide', 'company_overview']
              const currentIndex = types.indexOf(documentTypeFilter)
              const nextIndex = (currentIndex + 1) % types.length
              setDocumentTypeFilter(types[nextIndex])
            }}
            title={`Current scope: ${documentTypeFilter || 'All Docs'}`}
            className={`flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
              documentTypeFilter
                ? 'text-[#FE8405] bg-[#FE8405]/10 border border-[#FE8405]/30'
                : 'text-neutral-400 hover:bg-white/5 hover:text-neutral-200'
            }`}
          >
            <Filter className="size-5" />
          </button>

          <textarea
            rows={1}
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSubmit()
              }
            }}
            placeholder="Ask about orders, cards, KYC, rates, refunds…"
            aria-label="Message BookMyForex Assist"
            className="max-h-40 flex-1 resize-none self-center bg-transparent px-1 py-2 text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={isLoading || !inputQuery.trim()}
            aria-label="Send message"
            className={`flex size-10 shrink-0 items-center justify-center rounded-full transition-all duration-200 active:scale-95 disabled:cursor-not-allowed ${
              inputQuery.trim() && !isLoading
                ? 'bg-[#FE8405] text-white shadow-lg shadow-[#FE8405]/30'
                : 'bg-neutral-700 text-neutral-400'
            }`}
          >
            <ArrowUp className="size-5" />
          </button>
        </div>

        {/* Quick Action Pill Buttons */}
        <div className="mx-auto mt-3 flex max-w-3xl flex-wrap items-center justify-center gap-2">
          {[
            {
              icon: CreditCard,
              label: 'Card Reloads',
              query: 'What is the procedure and delivery timeline for a Forex Card reload?',
            },
            {
              icon: TrendingUp,
              label: 'Big Forex Sale',
              query: 'What is the cashback slab and promo code for Big Forex Sale?',
            },
            {
              icon: Landmark,
              label: 'ATM SOPs',
              query: 'A customer card got stuck in a foreign ATM. What is the emergency SOP?',
            },
            {
              icon: ShieldCheck,
              label: 'KYC Guidelines',
              query: 'What KYC documents are mandatory for foreign currency purchase under LRS?',
            },
          ].map((pill, idx) => {
            const IconComponent = pill.icon
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSubmit(pill.query)}
                disabled={isLoading}
                className="group flex items-center gap-2 rounded-full border border-[#1E4D8C]/50 bg-[#12294d]/50 px-3.5 py-2 text-xs font-medium text-slate-300 backdrop-blur-md transition-all duration-200 hover:border-[#FE8405]/50 hover:bg-[#FE8405]/[0.1] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span className="text-[#FE8405] transition-transform duration-200 group-hover:scale-110">
                  <IconComponent className="size-4" />
                </span>
                {pill.label}
              </button>
            )
          })}
        </div>

        <p className="mx-auto mt-3 max-w-3xl px-1 text-center text-[11px] text-slate-500">
          BookMyForex Support AI provides guidance based on official policy. Verify critical details before acting.
        </p>
      </form>
    </div>
  )
}
