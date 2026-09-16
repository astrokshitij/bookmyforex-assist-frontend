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
    <div className="mt-4 border border-slate-200 bg-slate-50/80 rounded-lg overflow-hidden transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-100/80 transition select-none"
      >
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span>Official Policy Guidelines Consulted ({citations.length} sections)</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </button>

      {isOpen && (
        <div className="p-3 border-t border-slate-200 flex flex-col gap-2.5 bg-white">
          {citations.map((c, idx) => (
            <div
              key={idx}
              className="p-3 rounded-md border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition text-xs"
            >
              <div className="flex items-center gap-1.5 font-semibold text-[#0b1f3d] mb-1">
                <FileText className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>
                  {c.document_title || c.source_file} &rsaquo; {c.section_title}
                </span>
              </div>
              <div className="text-slate-600 text-[11.5px] leading-relaxed whitespace-pre-line bg-white p-2 rounded border border-slate-100 font-sans">
                {c.snippet}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
