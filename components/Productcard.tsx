"use client"

import type { Product } from "@/types/Product"
import { useCart } from "@/contexts/CartContext"

// Card de produto exibe: imagem, nome, preco, preco a vista, parcelas e botao comprar
export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()

  // Calcula o preco com desconto a vista
  const discountPercent = product.discountPercent ?? 0
  const discountedPrice = product.price * (1 - discountPercent / 100)

  return (
    <div className="relative shadow-xl rounded-xl bg-card overflow-hidden flex flex-col">
      {/* Area da imagem do produto com fundo neutro */}
      <div className="relative w-full bg-card flex items-center justify-center p-4">
        <img 
            src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={200}
          height={200}
          className="object-contain max-h-40" />
      </div>

      {/* Conteudo textual do card */}
      <div className="flex flex-col flex-1 p-3 gap-1">
        {/* Nome do produto em ate 2 linhas */}
        <h3 className="text-sm font-semibold text-black leading-tight line-clamp-2">
          {product.name}
        </h3>

        {/* Preco principal em destaque */}
        <p className="text-orange-500 font-bold text-2xl">
          R$ {product.price.toFixed(2).replace(".", ",")}
        </p>

        {/* Preco a vista com desconto */}
        {discountPercent > 0 && (
          <p className="text-xl font- text-green-950 text-center">
            R$ {discountedPrice.toFixed(2).replace(".", ",")} a vista com
            desconto
          </p>
        )}

        {/* Texto de parcelamento */}
        <p className="text-xs text-black font-bold text-center">
          ou {product.installmentText} com juros
        </p>

        {/* Botao de compra que adiciona ao carrinho */}
        <button
          onClick={() => addToCart(product)}
          className="mt-3 w-full bg-green-500 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm"
        >
          Comprar Agora!
        </button>
      </div>
    </div>
  )
}