import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0 },
}

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
}

export default function Hero({ onCatalogClick }) {
  return (
    <section
      className="relative min-h-[80vh] md:min-h-[82vh] flex flex-col items-center justify-center
                 overflow-hidden bg-brand-bg
                 pt-14 md:pt-16 pb-8 md:pb-12"
    >
      {/* Decorative rings — más compactos para no robar espacio vertical */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[320px] h-[320px] md:w-[440px] md:h-[440px] rounded-full border border-brand-100 opacity-60" />
        <div className="absolute w-[460px] h-[460px] md:w-[620px] md:h-[620px] rounded-full border border-brand-50 opacity-35" />
      </div>

      {/* Soft radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(174,186,233,0.16) 0%, transparent 70%)',
        }}
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center text-center px-5"
      >
        {/* Logo mark — reducido para que el título protagonice */}
        <motion.div variants={fadeUp} transition={{ duration: 0.6, ease: 'easeOut' }}>
          <img
            src="/images/logo.jpg"
            alt="El Chico de las Flores — logo"
            className="w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-sm select-none"
            draggable={false}
          />
        </motion.div>

        {/* Tagline encima del título */}
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="mt-2 font-sans text-brand-400 tracking-[0.22em] text-[10px] md:text-xs uppercase"
        >
          — Donde el romance florece —
        </motion.p>

        {/* Título principal — mobile-first grande */}
        <motion.h1
          variants={fadeUp}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="mt-2 font-serif text-brand-800 leading-none"
        >
          {/* "El Chico" italic */}
          <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold italic">
            El Chico
          </span>

          {/* Conector "de las" */}
          <span className="block font-sans font-light tracking-[0.28em] text-brand-400
                           text-[10px] sm:text-xs md:text-sm uppercase my-0.5 md:my-1">
            de las
          </span>

          {/* "FLORES" — la palabra más grande y bold */}
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-widest uppercase text-brand-700">
            Flores
          </span>
        </motion.h1>

        {/* Divisor ornamental */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mt-4 md:mt-5 flex items-center gap-3"
        >
          <span className="block h-px w-12 md:w-16 bg-brand-200" />
          <span className="text-brand-300 text-base">✦</span>
          <span className="block h-px w-12 md:w-16 bg-brand-200" />
        </motion.div>

        {/* Subtítulo */}
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mt-3 md:mt-4 font-sans text-brand-500 text-sm md:text-base max-w-xs md:max-w-sm leading-relaxed"
        >
          Arreglos florales únicos, diseñados con alma para cada momento especial.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mt-6 md:mt-7 flex flex-col sm:flex-row items-center gap-3"
        >
          {/* CTA principal */}
          <motion.button
            onClick={onCatalogClick}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 380, damping: 20 }}
            className="btn-primary text-sm md:text-base px-8 md:px-10 py-3 md:py-3.5 shadow-card"
          >
            Ver Catálogo
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </motion.button>

          {/* CTA secundario WhatsApp */}
          <motion.a
            href="https://wa.me/526566568977"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 380, damping: 20 }}
            className="btn-outline text-sm md:text-base px-6 py-3 flex items-center gap-2"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Pedido personalizado
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll nudge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-5 md:bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="font-sans text-brand-300 text-[9px] tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-px h-6 bg-gradient-to-b from-brand-300 to-transparent"
        />
      </motion.div>
    </section>
  )
}
