"use client"

import { CartButton } from "./CartButton"

// Cabecalho fixo no topo com logo UP e botao do carrinho
// Mantido no estilo original do projeto com fundo branco e borda inferior
export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-header shadow px-4 py-2">
      {/* Logo do projeto */}
      <div className="flex items-center gap-1">
        <div>
            <img src="/imagens/logo.png" alt="logo" className="h-10 w- auto" />
        </div>
      </div>

      {/* Botao que abre o carrinho */}
      <CartButton />
    </header>
  )
}