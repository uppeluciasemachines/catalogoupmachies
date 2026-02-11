"use client"

import React from "react"
import { createContext, useContext, useState } from "react"
import type { Product } from "@/types/Product"

// Extende o Product com quantidade para uso dentro do carrinho
interface CartItem extends Product {
  quantity: number
}

// Define os metodos e dados disponiveis no contexto do carrinho
interface CartContextData {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  isOpen: boolean
  toggleCart: () => void
}

const CartContext = createContext({} as CartContextData)

// Provider que envolve a aplicacao e disponibiliza o estado do carrinho
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  // Adiciona um produto ao carrinho ou incrementa a quantidade se ja existir
  function addToCart(product: Product) {
    setItems((prev) => {
      const exists = prev.find((item) => item.id === product.id)
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  // Remove completamente um item do carrinho pelo ID
  function removeFromCart(productId: string) {
    setItems((prev) => prev.filter((item) => item.id !== productId))
  }

  // Atualiza a quantidade de um item; remove se quantidade for 0 ou menor
  function updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  // Limpa todos os itens do carrinho
  function clearCart() {
    setItems([])
  }

  // Abre ou fecha o painel do carrinho
  function toggleCart() {
    setIsOpen((prev) => !prev)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isOpen,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// Hook para consumir o contexto do carrinho em qualquer componente
export const useCart = () => useContext(CartContext)