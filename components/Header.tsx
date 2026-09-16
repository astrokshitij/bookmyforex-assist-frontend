'use client'

import React from 'react'
import { ShieldCheck, RefreshCw, BookOpen, Database } from 'lucide-react'

interface HeaderProps {
  backendUrl: string
  totalChunks: number
  onReindex: () => void
  onToggleDocs: () => void
  isReindexing: boolean
}

export const Header: React.FC<HeaderProps> = ({
  backendUrl,
  totalChunks,
  onReindex,
  onToggleDocs,
  isReindexing,
}) => {
  return (
    <header className="bg-[#0b1f3d] text-white px-4 md:px-8 py-3.5 flex items-center justify-between border-b border-slate-700/60 shadow-md sticky top-0 z-30">
      {/* Brand logo & title */}
      <div className="flex items-center gap-3">
        <div className="bg-white/10 p-2 rounded-lg border border-white/15 text-2xl flex items-center justify-center">
          💱
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold tracking-tight text-white">BookMyForex Assist</h1>
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              V2 AI GROUNDED
            </span>
          </div>
          <p className="text-xs text-blue-200/80 font-medium">
            Internal Support & Compliance Intelligence Hub
          </p>
        </div>
      </div>

      {/* Action controls & Live Backend Status */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 bg-slate-800/80 border border-slate-700/80 text-xs font-medium px-3 py-1.5 rounded-full text-slate-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          <span>Render API Connected</span>
        </div>

        <button
          onClick={onReindex}
          disabled={isReindexing}
          className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition disabled:opacity-50"
          title="Re-index workspace markdown documents"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isReindexing ? 'animate-spin' : ''}`} />
          <span className="hidden md:inline">{isReindexing ? 'Indexing...' : 'Refresh Vector DB'}</span>
        </button>

        <button
          onClick={onToggleDocs}
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition shadow-sm"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Policy Docs ({totalChunks})</span>
        </button>
      </div>
    </header>
  )
}
