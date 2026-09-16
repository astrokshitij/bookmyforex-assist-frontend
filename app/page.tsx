'use client'

import React, { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { ChatInterface } from '@/components/ChatInterface'

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://bookmyforex-rag.onrender.com'

export default function Home() {
  const [totalChunks, setTotalChunks] = useState<number>(23)
  const [isReindexing, setIsReindexing] = useState<boolean>(false)
  const [showDocsModal, setShowDocsModal] = useState<boolean>(false)
  const [docsSummary, setDocsSummary] = useState<any[]>([])

  // Fetch documents summary on mount
  useEffect(() => {
    fetchDocs()
  }, [])

  const fetchDocs = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/documents`)
      if (res.ok) {
        const data = await res.json()
        setTotalChunks(data.total_chunks || 23)
        setDocsSummary(data.documents || [])
      }
    } catch {
      // Backend may be cold starting
    }
  }

  const handleReindex = async () => {
    setIsReindexing(true)
    try {
      const res = await fetch(`${BACKEND_URL}/api/ingest?reset=true`, {
        method: 'POST',
      })
      if (res.ok) {
        const data = await res.json()
        alert(data.message || 'Vector store re-indexed successfully!')
        fetchDocs()
      } else {
        alert('Re-indexing request failed.')
      }
    } catch (err: any) {
      alert(`Network error: ${err.message}`)
    } finally {
      setIsReindexing(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f6fa]">
      <Header
        backendUrl={BACKEND_URL}
        totalChunks={totalChunks}
        onReindex={handleReindex}
        onToggleDocs={() => setShowDocsModal(!showDocsModal)}
        isReindexing={isReindexing}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        <ChatInterface backendUrl={BACKEND_URL} />
      </main>

      {/* Document Explorer Modal */}
      {showDocsModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <h3 className="text-base font-bold text-[#0b1f3d] flex items-center gap-2">
                📚 Active Knowledge Base Guidelines
              </h3>
              <button
                onClick={() => setShowDocsModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 text-sm rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-3 max-h-96 overflow-y-auto pr-1">
              {docsSummary.length > 0 ? (
                docsSummary.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs flex flex-col gap-1"
                  >
                    <div className="font-bold text-[#0b1f3d]">{doc.document_title}</div>
                    <div className="font-mono text-blue-600 text-[11px]">📁 {doc.source_file}</div>
                    <div className="flex justify-between text-slate-500 pt-1 text-[11px] border-t border-slate-200/60 mt-1">
                      <span>Type: <strong>{doc.document_type}</strong></span>
                      <span>{doc.chunks_count} Indexed Clauses</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-500 text-center py-4">
                  Connecting to live backend to list indexed documents...
                </div>
              )}
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setShowDocsModal(false)}
                className="bg-[#0b1f3d] text-white text-xs font-semibold px-4 py-2 rounded-xl"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
