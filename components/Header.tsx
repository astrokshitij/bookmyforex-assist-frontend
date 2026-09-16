'use client'

import React from 'react'
import { PanelLeftOpen, ShieldCheck } from 'lucide-react'

interface HeaderProps {
  sidebarOpen: boolean
  onToggleSidebar: () => void
}

export const Header: React.FC<HeaderProps> = ({
  sidebarOpen,
  onToggleSidebar,
}) => {
  return (
    <header className="relative z-10 flex items-center gap-3 border-b border-white/[0.06] bg-[#0a1930]/90 backdrop-blur-md px-4 py-3.5 sm:px-6 shrink-0">
      {/* Sidebar toggle button when closed */}
      {!sidebarOpen && (
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Open sidebar"
          className="flex size-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
        >
          <PanelLeftOpen className="w-4 h-4 text-[#FE8405]" />
        </button>
      )}

      {/* BookMyForex Logo */}
      <div className="flex items-center rounded-lg bg-white px-2.5 py-1.5 shadow-sm ring-1 ring-black/5">
        <img
          src="/bookmyforex-logo.jpg"
          alt="BookMyForex by MakeMyTrip"
          className="h-7 w-auto sm:h-8"
        />
      </div>

      {/* Centered title */}
      <h1 className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 text-base font-semibold tracking-tight text-white sm:block">
        BookMyForex Assist
      </h1>

      {/* Right status badge */}
      <p className="ml-auto flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-slate-300">
        <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px] shadow-emerald-400/60" />
        Online · Policy-backed answers
      </p>
    </header>
  )
}
