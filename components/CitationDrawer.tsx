'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronUp, BookOpen, FileText } from 'lucide-react'

export interface Citation {
  source_file: string
  document_title: string
  document_type: string
  section_title: string
  last_updated?: string
  snippet: string
}

interface CitationDrawerProps {
  citations: Citation[]
}

export const CitationDrawer: React.FC<CitationDrawerProps> = ({ citations }) => {
  const [isOpen, setIsOpen] = useState(false)

  if (!citations || citations.length === 0) return null

  return (
    <div className="mt-3 border border-white/[0.08] bg-white/[0.02] rounded-xl overflow-hidden transition-all">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/[0.04] transition select-none"
      >
        <div className="flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5 text-[#FE8405]" />
          <span>Official Policy Guidelines Consulted ({citations.length} sections)</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </button>

      {isOpen && (
        <div className="p-3 border-t border-white/[0.06] flex flex-col gap-2.5 bg-black/30">
          {citations.map((c, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg border border-white/[0.06] bg-[#0b1e3d]/60 text-xs"
            >
              <div className="flex items-center gap-1.5 font-semibold text-slate-200 mb-1.5">
                <FileText className="w-3.5 h-3.5 text-[#FE8405] shrink-0" />
                <span>
                  {c.document_title || c.source_file} &rsaquo; {c.section_title}
                </span>
              </div>
              <div className="text-slate-400 text-[11.5px] leading-relaxed whitespace-pre-line bg-black/40 p-2.5 rounded-md border border-white/[0.04]">
                {c.snippet}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
