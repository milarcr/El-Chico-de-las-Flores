import { motion } from 'framer-motion'
import { useState } from 'react'
import { useCart } from '../context/CartContext'

const BADGE_STYLES = {
  'Más vendido': 'bg-brand-500 text-white',
  'Nuevo':       'bg-brand-700 text-white',
  'Clásico':     'bg-brand-100 text-brand-700',
  'Favorito':    'bg-brand-200 text-brand-800',
}

export const cardVariant = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  const fmt = (n) =>
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(n)

  return (
    <motion.article
      variants={cardVariant}
      whileHover="hover"
      initial="rest"
      animate="rest"
      className="group relative bg-white rounded-2xl overflow-hidden shadow-card flex flex-col"
    >
      {/* Image container */}
      <div className="relative overflow-hidden aspect-[4/5]">
        <motion.img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover"
          variants={{
            rest:  { scale: 1 },
            hover: { scale: 1.06 },
          }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Overlay with quick-add */}
        <motion.div
          variants={{
            rest:  { opacity: 0 },
            hover: { opacity: 1 },
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-brand-900/30 backdrop-blur-[2px] flex items-center justify-center"
        >
          <motion.button
            onClick={handleAdd}
            variants={{
              rest:  { y: 12, opacity: 0 },
              hover: { y: 0,  opacity: 1 },
            }}
            transition={{ duration: 0.3, delay: 0.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-brand-700 font-sans font-semibold text-sm
                       px-6 py-2.5 rounded-full shadow-lg
                       hover:bg-brand-50 transition-colors"
          >
            Agregar al carrito
          </motion.button>
        </motion.div>

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 font-sans text-[10px] font-semibold
                        tracking-wider uppercase px-2.5 py-1 rounded-full
                        ${BADGE_STYLES[product.badge] ?? 'bg-brand-100 text-brand-700'}`}
          >
            {product.badge}
          </span>
        )}
      </div>

      {/* Card body */}
      <motion.div
        className="flex flex-col flex-1 p-5"
        variants={{
          rest:  { boxShadow: '0 2px 16px 0 rgba(91,108,176,0.08)' },
          hover: { boxShadow: '0 12px 40px 0 rgba(91,108,176,0.18)' },
        }}
        transition={{ duration: 0.35 }}
      >
        <h3 className="font-serif font-semibold text-brand-800 text-lg leading-snug">
          {product.name}
        </h3>
        <p className="font-sans text-brand-500 text-sm mt-1.5 leading-relaxed flex-1 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="font-serif text-brand-700 text-xl font-semibold">
            {fmt(product.price)}
          </span>

          <motion.button
            onClick={handleAdd}
            whileTap={{ scale: 0.93 }}
            animate={added ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.3 }}
            className={`btn-outline text-sm py-2 px-4 transition-all duration-300
                        ${added ? 'border-brand-500 bg-brand-50 text-brand-600' : ''}`}
          >
            {added ? (
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                ¡Listo!
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Agregar
              </span>
            )}
          </motion.button>
        </div>
      </motion.div>
    </motion.article>
  )
}
