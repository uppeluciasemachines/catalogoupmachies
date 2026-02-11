"use client"

import { ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/CartContext"

// Botao do carrinho exibido no Header
// Mostra um badge com a quantidade total de itens no carrinho
export function CartButton() {
  const { items, toggleCart } = useCart()

  // Soma todas as quantidades dos itens no carrinho
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <button
      onClick={toggleCart}
      className="relative p-2 text-orange-500 "
      aria-label="Abrir carrinho"
    >
      <ShoppingCart className="w-6 h-6" />

      {/* Badge com contagem de itens, aparece somente quando ha itens */}
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </button>
  )
}