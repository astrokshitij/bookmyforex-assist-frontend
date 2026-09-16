'use client'

import React, { useState } from 'react'
import {
  ShieldCheck,
  PanelLeftClose,
  Sparkles,
  ChevronDown,
  BookOpen,
} from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
  onSelectPrompt: (query: string) => void
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  onSelectPrompt,
}) => {
  const [openSection, setOpenSection] = useState<string>('compliance')

  const toggleAccordion = (id: string) => {
    setOpenSection(openSection === id ? '' : id)
  }

  if (!isOpen) return null

  return (
    <aside className="z-20 shrink-0 border-r border-white/[0.06] bg-[#0b1e3d]/85 backdrop-blur-xl transition-all duration-300 ease-out w-72 max-md:absolute max-md:inset-y-0 max-md:left-0 max-md:shadow-2xl h-full flex flex-col">
      <div className="flex items-center justify-between px-5 pb-4 pt-5 border-b border-white/[0.06]">
        <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
          <ShieldCheck className="w-4 h-4 text-[#FE8405]" />
          Resources
        </span>
        <button
          type="button"
          onClick={onToggle}
          aria-label="Collapse sidebar"
          className="flex size-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-200"
        >
          <PanelLeftClose className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
        {/* Quick Inquiries */}
        <section>
          <h2 className="mb-2.5 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-[#FE8405]" />
            Quick inquiries
          </h2>
          <div className="space-y-1.5">
            {[
              { label: 'Forex card reload', query: 'What is the procedure and delivery timeline for a Forex Card reload?' },
              { label: 'Order tracking', query: 'How can a customer track their foreign currency note order delivery status?' },
              { label: 'Cancellation & refund', query: 'What are the rules and timeline for order cancellation and refunds?' },
              { label: 'KYC documents', query: 'What KYC documents are mandatory for foreign currency purchase under LRS?' },
              { label: 'Rate lock', query: 'How does the BookMyForex guaranteed exchange rate lock work?' },
            ].map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectPrompt(item.query)}
                className="group w-full rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-left text-sm text-slate-300 transition-all duration-200 hover:border-[#FE8405]/40 hover:bg-[#FE8405]/[0.08] hover:text-white"
              >
                {item.label}
              </button>
            ))}
          </div>
        </section>

        {/* Official Policy Guidelines Accordion */}
        <section>
          <h2 className="mb-2.5 text-xs font-medium uppercase tracking-wider text-slate-400">
            Official policy guidelines
          </h2>
          <div className="space-y-1.5">
            {/* Accordion 1: Compliance & KYC */}
            <div className="overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.02]">
              <button
                type="button"
                onClick={() => toggleAccordion('compliance')}
                className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left transition-colors hover:bg-white/[0.03]"
              >
                <span className="text-sm font-medium text-slate-200">Compliance & KYC</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                    openSection === 'compliance' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openSection === 'compliance' && (
                <div className="px-3 pb-3 pt-0.5 border-t border-white/[0.04]">
                  <ul className="space-y-2 pt-2">
                    <li className="flex gap-2 text-xs leading-relaxed text-slate-400">
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-[#FE8405]" />
                      Valid photo ID and passport required for all forex purchases
                    </li>
                    <li className="flex gap-2 text-xs leading-relaxed text-slate-400">
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-[#FE8405]" />
                      PAN card mandatory for transactions above regulated threshold
                    </li>
                    <li className="flex gap-2 text-xs leading-relaxed text-slate-400">
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-[#FE8405]" />
                      Purpose of travel must be declared per LRS guidelines
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Accordion 2: Orders & Delivery */}
            <div className="overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.02]">
              <button
                type="button"
                onClick={() => toggleAccordion('orders')}
                className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left transition-colors hover:bg-white/[0.03]"
              >
                <span className="text-sm font-medium text-slate-200">Orders & Delivery</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                    openSection === 'orders' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openSection === 'orders' && (
                <div className="px-3 pb-3 pt-0.5 border-t border-white/[0.04]">
                  <ul className="space-y-2 pt-2">
                    <li className="flex gap-2 text-xs leading-relaxed text-slate-400">
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-[#FE8405]" />
                      Same-day doorstep delivery available in serviceable pin codes
                    </li>
                    <li className="flex gap-2 text-xs leading-relaxed text-slate-400">
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-[#FE8405]" />
                      Rate locked upon order payment confirmation
                    </li>
                    <li className="flex gap-2 text-xs leading-relaxed text-slate-400">
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-[#FE8405]" />
                      Verification mandatory upon order hand-over
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Accordion 3: Refunds & Cancellation */}
            <div className="overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.02]">
              <button
                type="button"
                onClick={() => toggleAccordion('refunds')}
                className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left transition-colors hover:bg-white/[0.03]"
              >
                <span className="text-sm font-medium text-slate-200">Refunds & Cancellation</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                    openSection === 'refunds' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openSection === 'refunds' && (
                <div className="px-3 pb-3 pt-0.5 border-t border-white/[0.04]">
                  <ul className="space-y-2 pt-2">
                    <li className="flex gap-2 text-xs leading-relaxed text-slate-400">
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-[#FE8405]" />
                      Cancellations permitted before order dispatch
                    </li>
                    <li className="flex gap-2 text-xs leading-relaxed text-slate-400">
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-[#FE8405]" />
                      Refunds credited within 3-5 business days to original source
                    </li>
                    <li className="flex gap-2 text-xs leading-relaxed text-slate-400">
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-[#FE8405]" />
                      Encashment governed by prevailing buy-back exchange rates
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </aside>
  )
}
