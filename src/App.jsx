import { useRef } from 'react'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import AboutSection from './components/AboutSection'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'

function AppContent() {
  const catalogRef = useRef(null)

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar onLogoClick={scrollToTop} />
      <main>
        <Hero onCatalogClick={scrollToCatalog} />
        <ProductGrid sectionRef={catalogRef} />
        <AboutSection />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  )
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  )
}
