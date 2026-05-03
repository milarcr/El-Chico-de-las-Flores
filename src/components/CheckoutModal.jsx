import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useCart } from '../context/CartContext'

const STEPS = ['form', 'processing', 'success']

function CardIcon() {
  return (
    <svg className="w-5 h-5 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  )
}

export default function CheckoutModal({ open, onClose, total }) {
  const { dispatch } = useCart()
  const [step, setStep] = useState('form')
  const [form, setForm] = useState({ name: '', email: '', card: '', expiry: '', cvc: '' })
  const [errors, setErrors] = useState({})

  const fmt = (n) =>
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(n)

  const fmtCard = (v) =>
    v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()

  const fmtExpiry = (v) => {
    const d = v.replace(/\D/g, '').slice(0, 4)
    return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim())            e.name   = 'Nombre requerido'
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email inválido'
    if (form.card.replace(/\s/g, '').length < 16) e.card = 'Número inválido'
    if (form.expiry.length < 5)       e.expiry = 'Fecha inválida'
    if (form.cvc.length < 3)          e.cvc    = 'CVC inválido'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setStep('processing')
    setTimeout(() => {
      setStep('success')
      dispatch({ type: 'CLEAR' })
    }, 2200)
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => { setStep('form'); setForm({ name: '', email: '', card: '', expiry: '', cvc: '' }); setErrors({}) }, 400)
  }

  const input = (id, label, placeholder, value, onChange, error, extra = {}) => (
    <div>
      <label htmlFor={id} className="block font-sans text-brand-600 text-xs font-medium mb-1 tracking-wide">
        {label}
      </label>
      <input
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full font-sans text-brand-800 text-sm bg-white border rounded-xl px-4 py-3
                    placeholder:text-brand-300 outline-none transition-all duration-200
                    focus:ring-2 focus:ring-brand-400 focus:border-brand-400
                    ${error ? 'border-red-300 bg-red-50' : 'border-brand-200 hover:border-brand-300'}`}
        {...extra}
      />
      {error && <p className="font-sans text-red-400 text-xs mt-1">{error}</p>}
    </div>
  )

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="modal-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={step !== 'processing' ? handleClose : undefined}
            className="fixed inset-0 z-50 bg-brand-900/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            aria-modal="true"
          >
            <div className="bg-brand-bg w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
              {/* Modal header */}
              <div className="px-6 pt-6 pb-4 border-b border-brand-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src="/images/logo.jpg" alt="" className="w-7 h-7 object-contain" />
                  <span className="font-serif text-brand-700 font-semibold">Pago seguro</span>
                </div>
                {step !== 'processing' && (
                  <button
                    onClick={handleClose}
                    className="text-brand-300 hover:text-brand-600 transition-colors p-1"
                    aria-label="Cerrar"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Step: Form */}
              {step === 'form' && (
                <form onSubmit={handleSubmit} noValidate className="px-6 py-5 space-y-4">
                  {/* Total summary */}
                  <div className="flex items-center justify-between bg-brand-50 rounded-xl px-4 py-3">
                    <span className="font-sans text-brand-500 text-sm">Total a pagar</span>
                    <span className="font-serif text-brand-700 text-xl font-semibold">{fmt(total)}</span>
                  </div>

                  {input('name', 'Nombre completo', 'María García', form.name,
                    e => setForm(f => ({ ...f, name: e.target.value })), errors.name)}

                  {input('email', 'Correo electrónico', 'maria@ejemplo.com', form.email,
                    e => setForm(f => ({ ...f, email: e.target.value })), errors.email,
                    { type: 'email', inputMode: 'email' })}

                  {/* Card number */}
                  <div>
                    <label htmlFor="card" className="block font-sans text-brand-600 text-xs font-medium mb-1 tracking-wide">
                      Número de tarjeta
                    </label>
                    <div className="relative">
                      <input
                        id="card"
                        placeholder="1234 5678 9012 3456"
                        value={form.card}
                        onChange={e => setForm(f => ({ ...f, card: fmtCard(e.target.value) }))}
                        inputMode="numeric"
                        className={`w-full font-sans text-brand-800 text-sm bg-white border rounded-xl px-4 py-3 pr-10
                                    placeholder:text-brand-300 outline-none transition-all duration-200
                                    focus:ring-2 focus:ring-brand-400 focus:border-brand-400
                                    ${errors.card ? 'border-red-300 bg-red-50' : 'border-brand-200 hover:border-brand-300'}`}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2"><CardIcon /></span>
                    </div>
                    {errors.card && <p className="font-sans text-red-400 text-xs mt-1">{errors.card}</p>}
                  </div>

                  {/* Expiry + CVC */}
                  <div className="grid grid-cols-2 gap-3">
                    {input('expiry', 'Vencimiento', 'MM/AA', form.expiry,
                      e => setForm(f => ({ ...f, expiry: fmtExpiry(e.target.value) })), errors.expiry,
                      { inputMode: 'numeric', maxLength: 5 })}
                    {input('cvc', 'CVC', '123', form.cvc,
                      e => setForm(f => ({ ...f, cvc: e.target.value.replace(/\D/g, '').slice(0, 4) })), errors.cvc,
                      { inputMode: 'numeric' })}
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-primary w-full justify-center py-4 text-base mt-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Confirmar pago
                  </motion.button>

                  <p className="font-sans text-brand-300 text-[11px] text-center">
                    🔒 Pago simulado — no se realizará ningún cargo real.
                  </p>
                </form>
              )}

              {/* Step: Processing */}
              {step === 'processing' && (
                <div className="px-6 py-14 flex flex-col items-center gap-5">
                  <div className="relative w-16 h-16">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      className="w-16 h-16 rounded-full border-4 border-brand-100 border-t-brand-500"
                    />
                  </div>
                  <div className="text-center">
                    <p className="font-serif text-brand-700 text-lg font-semibold">Procesando pago…</p>
                    <p className="font-sans text-brand-400 text-sm mt-1">Por favor espera un momento.</p>
                  </div>
                </div>
              )}

              {/* Step: Success */}
              {step === 'success' && (
                <div className="px-6 py-12 flex flex-col items-center gap-5 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 16, delay: 0.1 }}
                    className="w-20 h-20 rounded-full bg-brand-100 flex items-center justify-center"
                  >
                    <motion.svg
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.35 }}
                      className="w-10 h-10 text-brand-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <motion.path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </motion.svg>
                  </motion.div>

                  <div>
                    <h3 className="font-serif text-brand-800 text-2xl font-semibold">¡Pedido confirmado!</h3>
                    <p className="font-sans text-brand-500 text-sm mt-2 max-w-xs">
                      Gracias por tu compra. Pronto nos pondremos en contacto contigo para coordinar la entrega de tus flores. 🌸
                    </p>
                  </div>

                  <motion.button
                    onClick={handleClose}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-primary px-8 py-3 mt-2"
                  >
                    Volver al catálogo
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
