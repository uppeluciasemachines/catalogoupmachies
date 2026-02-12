import { products } from "@/data/products"
import { ProductCard } from "@/components/Productcard"
import { Cart } from "@/components/Cart"
import { Header } from "@/components/Header"
import { WhatsAppButton } from "@/components/WhatsAppButton"

// Pagina principal do catalogo
// Renderiza o header, grid de produtos, carrinho lateral e botao flutuante do WhatsApp
export default function Home() {
  return (
    <>
      {/* Cabecalho fixo com logo e botao do carrinho */}
      <Header />

      <main className="pt-20 px-3 pb-32 max-w-7xl mx-auto bg-body">
        {/* Titulo do catalogo */}
        <h1 className="text-xl font-bold text-black mb-6 text-balance">
          Catalogo de Peças UP Machines
        </h1>

        {/* Grid responsivo de cards: 2 colunas no mobile, 3 no tablet, 4 no desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
          {/* Botao flutuante do WhatsApp no canto inferior direito */}
        <WhatsAppButton />
      </main>

      {/* Painel lateral do carrinho (abre ao clicar no icone do carrinho) */}
      <Cart />
    </>
  )
}