'use client'

import React, { useState } from 'react'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { ChatInterface } from '@/components/ChatInterface'

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://bookmyforex-rag.onrender.com'

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedPrompt, setSelectedPrompt] = useState('')

  const handleSelectPrompt = (query: string) => {
    setSelectedPrompt(query)
  }

  return (
    <div className="relative flex h-dvh overflow-hidden bg-[#0a1930] text-slate-100">
      {/* Background ambient lighting glows */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-[#FE8405]/10 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-[#1E4D8C]/25 blur-[120px]"
        aria-hidden="true"
      />

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(false)}
        onSelectPrompt={handleSelectPrompt}
      />

      {/* Main Content Layout */}
      <div className="relative z-0 flex min-w-0 flex-1 flex-col h-full overflow-hidden">
        <Header
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(true)}
        />

        <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <ChatInterface
            backendUrl={BACKEND_URL}
            externalQuery={selectedPrompt}
          />
        </main>
      </div>
    </div>
  )
}
