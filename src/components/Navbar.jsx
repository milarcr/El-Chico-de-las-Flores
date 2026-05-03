import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useCart } from '../context/CartContext'

const WA_HREF = 'https://wa.me/526566568977'

function WhatsAppIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

const CartIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
)

const NAV_LINKS = [
  { label: 'Catálogo',       href: '#catalogo' },
  { label: 'Sobre Nosotros', href: '#sobre-nosotros' },
]

const barBase = 'block w-5 h-[1.5px] bg-brand-700 origin-center'

export default function Navbar({ onLogoClick }) {
  const { count, setDrawerOpen } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  /* Navbar transparente en el tope, sólida al hacer scroll */
  const navBg     = useTransform(scrollY, [0, 60], ['rgba(250,248,245,0)', 'rgba(250,248,245,0.97)'])
  const navShadow = useTransform(scrollY, [0, 60], ['none', '0 2px 20px rgba(91,108,176,0.10)'])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      {/* ── Navbar principal — top-0 (sin announcement bar) ── */}
      <motion.header
        style={{ backgroundColor: navBg, boxShadow: navShadow }}
        className="fixed top-0 inset-x-0 z-40 h-14 md:h-16 backdrop-blur-sm
                   flex items-center justify-between px-5 md:px-10
                   border-b border-brand-100/50"
      >
        {/* Logo + nombre */}
        <button
          onClick={() => { onLogoClick(); closeMenu() }}
          className="flex items-center gap-2.5 group focus:outline-none"
          aria-label="Ir al inicio"
        >
          <img
            src="/images/logo.jpg"
            alt="El Chico de las Flores"
            className="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-300"
          />
          <span className="font-serif text-brand-700 font-semibold text-sm hidden lg:block">
            El Chico de las Flores
          </span>
        </button>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-0.5" aria-label="Navegación principal">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="font-sans text-brand-600 text-sm font-medium px-4 py-2 rounded-full
                         hover:bg-brand-50 hover:text-brand-800 transition-all duration-200
                         focus:outline-none focus:ring-2 focus:ring-brand-400"
            >
              {label}
            </a>
          ))}
          <a
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 flex items-center gap-1.5 font-sans text-brand-600 text-sm font-medium
                       px-4 py-2 rounded-full border border-brand-300
                       hover:bg-brand-50 hover:border-brand-500 hover:text-brand-800
                       transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-400"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 text-brand-500" />
            Contáctanos
          </a>
        </nav>

        {/* Right: Carrito + Hamburguesa */}
        <div className="flex items-center gap-2.5">
          {/* Carrito */}
          <motion.button
            onClick={() => setDrawerOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex items-center gap-1.5 font-sans text-brand-600 font-medium text-sm
                       bg-white border border-brand-200 px-3.5 py-2 rounded-full shadow-card
                       hover:border-brand-400 hover:shadow-card-hover transition-all duration-300
                       focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-1"
            aria-label={`Ver carrito, ${count} producto${count !== 1 ? 's' : ''}`}
          >
            <CartIcon />
            <span className="hidden sm:inline text-xs">Carrito</span>
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                  className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] rounded-full
                             bg-brand-500 text-white text-[9px] font-bold leading-none
                             flex items-center justify-center px-1"
                >
                  {count > 9 ? '9+' : count}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Hamburguesa — solo mobile */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="md:hidden flex flex-col items-center justify-center gap-[5px]
                       w-9 h-9 rounded-full hover:bg-brand-50 transition-colors
                       focus:outline-none focus:ring-2 focus:ring-brand-400"
          >
            <motion.span
              className={barBase}
              animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22 }}
            />
            <motion.span
              className={barBase}
              animate={menuOpen ? { opacity: 0, scaleX: 0.4 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.18 }}
            />
            <motion.span
              className={barBase}
              animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22 }}
            />
          </button>
        </div>
      </motion.header>

      {/* ── Mobile dropdown — top = h-14 (56px) ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Tap-outside overlay */}
            <motion.div
              key="menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={closeMenu}
              className="fixed inset-0 top-14 z-20 md:hidden"
            />

            <motion.nav
              key="mobile-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              aria-label="Menú móvil"
              className="fixed top-14 inset-x-0 z-30 md:hidden
                         bg-[rgba(250,248,245,0.98)] backdrop-blur-lg
                         border-b border-brand-100 shadow-xl"
            >
              <div className="flex flex-col px-5 py-2">
                {NAV_LINKS.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    onClick={closeMenu}
                    className="font-sans text-brand-700 text-base font-medium
                               py-4 border-b border-brand-50 last:border-0
                               hover:text-brand-500 transition-colors flex items-center gap-2"
                  >
                    <span className="text-brand-300 text-xs">→</span>
                    {label}
                  </a>
                ))}
                <a
                  href={WA_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="flex items-center gap-2.5 font-sans text-brand-600 text-base font-medium
                             py-4 hover:text-brand-800 transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4 text-brand-500" />
                  Contáctanos por WhatsApp
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
