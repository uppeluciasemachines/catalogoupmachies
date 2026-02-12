"use client"

import { X, Plus, Minus, Trash2 } from "lucide-react"
import { useCart } from "@/contexts/CartContext"

// Painel lateral do carrinho no estilo da referencia
// Exibe lista de itens com imagem, controle de quantidade, total e botao de enviar pelo WhatsApp
export function Cart() {
  const { items, isOpen, toggleCart, updateQuantity, removeFromCart, clearCart } =
    useCart()

  // Calcula o valor total do carrinho
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  // Monta a mensagem de pedido e abre o WhatsApp com o texto
  function handleSendWhatsApp() {
    const message = items
      .map(
        (item) =>
          `${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2).replace(".", ",")}`
      )
      .join("\n")

    const fullMessage = `Olá! Gostaria de fazer o pedido:\n\n${message}\n\n*Total: R$ ${total.toFixed(2).replace(".", ",")}*`

    // Substitua pelo numero do WhatsApp da loja
    const phone = "558694083920"
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(fullMessage)}`
    window.open(url, "_blank")
  }

  // Nao renderiza nada se o carrinho estiver fechado
  if (!isOpen) return null

  return (
    <>
      {/* Overlay escuro que fecha o carrinho ao clicar */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={toggleCart}
        aria-hidden="true"
      />

      {/* Painel lateral direito do carrinho */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-background z-50 shadow-xl flex flex-col">
        {/* Cabecalho do carrinho com titulo e botao fechar */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-bold text-black">Seu Carrinho</h2>
          <button
            onClick={toggleCart}
            className="text-red-600 transition-colors"
            aria-label="Fechar carrinho"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lista de itens do carrinho com scroll */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <p className="text-black text-center mt-10">
              Seu carrinho esta vazio.
            </p>
          ) : (
            <div className="fkex flex-col gap-4 shadow">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  {/* Imagem do produto no carrinho */}
                  <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-muted">
                   <img 
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="object-contain w-full h-full" />
                  </div>

                  {/* Detalhes: nome, preco, controles de quantidade e remover */}
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-black leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-orange-500 font-bold text-sm mt-0.5">
                      R${" "}
                      {(item.price * item.quantity)
                        .toFixed(2)
                        .replace(".", ",")}
                    </p>

                    {/* Controles de quantidade: botoes - e + com display da quantidade */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-7 h-7 flex items-center justify-center rounded border border-border text-red-600 hover:bg-muted transition-colors"
                        aria-label="Diminuir quantidade"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-sm font-medium text-black w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-7 h-7 flex items-center justify-center rounded border border-border text-green-600 hover:bg-muted transition-colors"
                        aria-label="Aumentar quantidade"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>

                      {/* Botao de remover item do carrinho */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto text-destructive hover:text-destructive/80 transition-colors"
                        aria-label="Remover item"
                      >
                        <Trash2 className="w-5 h-5 text-red-800" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Rodape do carrinho com total, botao WhatsApp e limpar */}
        {items.length > 0 && (
          <div className="border-t border-border p-4 flex flex-col gap-3">
            {/* Linha do total */}
            <div className="flex items-center justify-between">
              <span className="text-black font-bold">Total:</span>
              <span className="text-orange-500 font-bold text-xl">
                R$ {total.toFixed(2).replace(".", ",")}
              </span>
            </div>

            {/* Botao para enviar pedido pelo WhatsApp */}
            <button
              onClick={handleSendWhatsApp}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Enviar Pedido para o WhatsApp
            </button>

            {/* Botao para limpar todos os itens do carrinho */}
            <button
              onClick={clearCart}
              className="text-lm text-black font-bold  transition-colors"
            >
              Limpar carrinho
            </button>
          </div>
        )}
      </div>
    </>
  )
}