import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import CheckoutModal from './CheckoutModal'

export default function CartDrawer() {
  const { items, total, drawerOpen, setDrawerOpen, dispatch } = useCart()
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  const fmt = (n) =>
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(n)

  return (
    <>
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-40 bg-brand-900/30 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.aside
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm
                         bg-brand-bg flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-brand-100">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h2 className="font-serif text-brand-800 font-semibold text-xl">Tu Carrito</h2>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="text-brand-400 hover:text-brand-700 transition-colors p-1 rounded-full hover:bg-brand-100 focus:outline-none"
                  aria-label="Cerrar carrito"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                <AnimatePresence initial={false}>
                  {items.length === 0 ? (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center h-64 text-center"
                    >
                      <div className="text-5xl mb-4">🌸</div>
                      <p className="font-serif text-brand-600 text-lg font-medium">
                        Tu carrito está vacío
                      </p>
                      <p className="font-sans text-brand-400 text-sm mt-1">
                        Agrega algún arreglo del catálogo.
                      </p>
                      <button
                        onClick={() => setDrawerOpen(false)}
                        className="mt-5 btn-outline text-sm"
                      >
                        Ver Catálogo
                      </button>
                    </motion.div>
                  ) : (
                    items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 24, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                        className="flex gap-4 bg-white rounded-xl p-3 shadow-card"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-serif text-brand-800 font-semibold text-sm leading-snug truncate">
                            {item.name}
                          </p>
                          <p className="font-sans text-brand-600 text-sm mt-0.5">
                            {fmt(item.price)}
                          </p>

                          {/* Qty controls */}
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => dispatch({ type: 'DECREMENT', id: item.id })}
                              className="w-6 h-6 rounded-full border border-brand-200 flex items-center justify-center
                                         text-brand-600 hover:bg-brand-100 transition-colors text-sm leading-none"
                              aria-label="Disminuir cantidad"
                            >
                              −
                            </button>
                            <span className="font-sans text-brand-700 font-medium text-sm w-5 text-center">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => dispatch({ type: 'INCREMENT', id: item.id })}
                              className="w-6 h-6 rounded-full border border-brand-200 flex items-center justify-center
                                         text-brand-600 hover:bg-brand-100 transition-colors text-sm leading-none"
                              aria-label="Aumentar cantidad"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-col items-end justify-between flex-shrink-0">
                          <button
                            onClick={() => dispatch({ type: 'REMOVE', id: item.id })}
                            className="text-brand-300 hover:text-red-400 transition-colors p-0.5"
                            aria-label={`Eliminar ${item.name}`}
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                          <p className="font-sans text-brand-700 font-semibold text-sm">
                            {fmt(item.price * item.qty)}
                          </p>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="px-6 py-5 border-t border-brand-100 space-y-4">
                  {/* Subtotal */}
                  <div className="flex justify-between items-center">
                    <span className="font-sans text-brand-500 text-sm">Subtotal</span>
                    <span className="font-serif text-brand-800 font-semibold text-lg">{fmt(total)}</span>
                  </div>
                  <p className="font-sans text-brand-400 text-xs -mt-2">
                    Envío calculado al momento de pagar.
                  </p>

                  <button
                    onClick={() => { setDrawerOpen(false); setCheckoutOpen(true) }}
                    className="btn-primary w-full justify-center text-base py-3.5"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Pagar ahora
                  </button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        total={total}
      />
    </>
  )
}
