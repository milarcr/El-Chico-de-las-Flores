import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.14 } },
}

export default function AboutSection() {
  return (
    <section
      id="sobre-nosotros"
      className="bg-white scroll-mt-14 md:scroll-mt-16
                 py-16 md:py-20 px-6"
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        className="max-w-xl mx-auto text-center"
      >
        {/* Eyebrow */}
        <motion.p
          variants={fadeUp}
          className="font-sans text-brand-400 tracking-[0.2em] text-[10px] uppercase mb-4"
        >
          ✦ Nuestra Historia ✦
        </motion.p>

        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          className="font-serif text-brand-800 text-3xl md:text-4xl font-semibold mb-5"
        >
          Sobre Nosotros
        </motion.h2>

        {/* Divider */}
        <motion.div
          variants={fadeUp}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <span className="h-px w-10 bg-brand-200" />
          <span className="text-brand-300 text-sm">✦</span>
          <span className="h-px w-10 bg-brand-200" />
        </motion.div>

        {/* Body */}
        <motion.p
          variants={fadeUp}
          className="font-sans text-brand-500 text-base md:text-lg leading-relaxed mb-4"
        >
          Nacimos de la convicción de que las flores tienen el poder de transformar cualquier momento —
          una bienvenida, una disculpa, o simplemente un <em className="font-medium text-brand-600 not-italic">"te quiero"</em>.
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="font-sans text-brand-400 text-sm md:text-base leading-relaxed"
        >
          Cada arreglo es elaborado a mano, seleccionando las flores más frescas para que
          lleguen perfectas a quien las recibe. Del jardín a tus manos, con amor.
        </motion.p>

        {/* Three minimal pillars */}
        <motion.div
          variants={fadeUp}
          className="mt-10 grid grid-cols-3 gap-4 max-w-sm mx-auto"
        >
          {[
            { icon: '✿', label: 'Hecho a mano' },
            { icon: '❋', label: 'Flores frescas' },
            { icon: '⟡', label: 'Envío a domicilio' },
          ].map(({ icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <span className="text-brand-300 text-xl">{icon}</span>
              <span className="font-sans text-brand-500 text-[11px] md:text-xs leading-snug text-center">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
