import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BookMyForex Assist | Internal Support AI',
  description: 'Grounded internal support AI assistant for BookMyForex customer support, operations, and compliance teams.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full overflow-hidden">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-[#0a1930] text-slate-100 fixed inset-0 h-full w-full overflow-hidden m-0 p-0">
        {children}
      </body>
    </html>
  )
}
