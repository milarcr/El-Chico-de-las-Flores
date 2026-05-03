import { motion } from 'framer-motion'

const WA_HREF = 'https://wa.me/526566568977'

function WhatsAppIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-brand-bg border-t border-brand-100">

      {/* ── WhatsApp CTA strip ── */}
      <div className="py-14 md:py-16 px-6 flex flex-col items-center text-center">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="font-sans text-brand-400 tracking-[0.18em] text-[10px] uppercase mb-4"
        >
          ✦ Pedido especial ✦
        </motion.p>

        {/* Headline */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="font-serif text-brand-800 text-2xl md:text-3xl font-semibold mb-2 leading-snug"
        >
          ¿Quieres algo único?
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.16 }}
          className="font-sans text-brand-500 text-sm md:text-base max-w-xs leading-relaxed mb-8"
        >
          ¡Personaliza tu ramo! Cuéntanos la ocasión y lo creamos juntos.
        </motion.p>

        {/* WhatsApp button */}
        <motion.a
          href={WA_HREF}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.24 }}
          whileHover={{ scale: 1.04, y: -3 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-3
                     bg-brand-600 text-white font-sans font-semibold text-base md:text-lg
                     px-9 py-4 md:py-5 rounded-full
                     shadow-[0_4px_24px_rgba(91,108,176,0.28)]
                     hover:bg-brand-700 hover:shadow-[0_8px_32px_rgba(91,108,176,0.38)]
                     transition-colors duration-300
                     focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2"
          aria-label="Contáctanos por WhatsApp"
        >
          <WhatsAppIcon className="w-6 h-6 flex-shrink-0" />
          Escríbenos por WhatsApp
        </motion.a>
      </div>

      {/* ── Brand footer ── */}
      <div className="border-t border-brand-100 py-8 px-6 flex flex-col items-center gap-3">
        <img
          src="/images/logo.jpg"
          alt="El Chico de las Flores"
          className="w-9 h-9 object-contain opacity-60"
        />
        <p className="font-serif text-brand-500 italic text-sm">El Chico de las Flores</p>
        <p className="font-sans text-brand-300 text-xs">
          © {new Date().getFullYear()} · México · Hecho con 🌸
        </p>
        <p className="font-sans text-brand-200 text-[11px]">
          Diseñado por{' '}
          <a
            href="https://calleros.me"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-400 hover:text-brand-600 underline underline-offset-2 transition-colors duration-200"
          >
            calleros.me
          </a>
        </p>
      </div>
    </footer>
  )
}
