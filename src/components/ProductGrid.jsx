import { motion } from 'framer-motion'
import { products } from '../data/products'
import ProductCard from './ProductCard'

const gridContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

export default function ProductGrid({ sectionRef }) {
  return (
    <section
      ref={sectionRef}
      id="catalogo"
      className="bg-brand-bg py-14 md:py-20 px-6 md:px-12 lg:px-20 scroll-mt-14 md:scroll-mt-16"
    >
      {/* Section header */}
      <div className="text-center mb-14">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-sans text-brand-400 tracking-[0.2em] text-xs uppercase mb-3"
        >
          ✦ Nuestros Arreglos ✦
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="font-serif text-brand-800 text-4xl md:text-5xl font-semibold"
        >
          Catálogo
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 mx-auto h-px w-24 bg-brand-200 origin-center"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 font-sans text-brand-500 text-base max-w-md mx-auto"
        >
          Cada ramo es una obra única, elaborada a mano con las flores más frescas de temporada.
        </motion.p>
      </div>

      {/* Grid */}
      <motion.div
        variants={gridContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 max-w-6xl mx-auto"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </motion.div>
    </section>
  )
}
