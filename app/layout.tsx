import React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { CartProvider } from "@/contexts/CartContext"

import "./globals.css"

// Fonte principal do projeto
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Catalogo UP Machines",
  description: "Catalogo de pecas e produtos UP Machines",
}

// Layout raiz que envolve toda a aplicacao com o CartProvider
// O CartProvider permite que qualquer componente acesse o estado do carrinho
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans antialiased`}>
        {/* Provider do carrinho disponibiliza o contexto para toda a app */}
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}