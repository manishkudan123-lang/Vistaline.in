import { MessageCircle, Phone, MapPin, Clock, Sparkles, Check, ArrowRight } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { useMagnetic } from './useMagnetic';

export default function CTA() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const whatsappRef = useMagnetic<HTMLAnchorElement>(0.15);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setShakeKey(k => k + 1);
      return;
    }
    setSubmitted(true);
    const text = `*New Quote Request*\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Message:* ${formData.message || 'Not provided'}`;
    window.open(`https://wa.me/919100044126?text=${encodeURIComponent(text)}`, '_blank');
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', message: '' });
    }, 2000);
  };

  return (
    <section className="py-24 lg:py-32 bg-[#0A3D73] relative overflow-hidden grain-overlay">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A3D73] via-[#0A3D73] to-[#041c36]" />
      <motion.div
        className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#FF8800]/5 blur-[150px] scroll-orb"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-[#0088CC]/5 blur-[100px] scroll-orb"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex-1 text-left"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold tracking-wider mb-8 uppercase backdrop-blur-sm"
              whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,255,255,0.15)' }}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#00A2FF]" />
              Free Site Visit
            </motion.div>

            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-black tracking-[-0.03em] text-white mb-6 leading-[1.05]" style={{ textShadow: '0 2px 30px rgba(0,0,0,0.2)' }}>
              Ready to transform <br />your space?
            </h2>

            <p className="text-base md:text-lg text-slate-300/90 mb-10 max-w-lg leading-relaxed font-medium">
              Get a free consultation, on-site measurement and a detailed quote — directly from the owner. Most projects start within 48 hours of approval.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <a
                  ref={whatsappRef}
                  href="https://wa.me/919100044126?text=Hi,%20I%20want%20a%20free%20quote%20for%20my%20office%20partitions."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group btn-island px-7 py-4 rounded-full bg-[#00E676] text-[#0A3D73] font-bold hover:bg-[#00c853] transition-all duration-200 shadow-xl text-sm"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '200%' }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                  <MessageCircle className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">WhatsApp</span>
                  <span className="btn-trail relative z-10">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                  </span>
                </a>
              </motion.div>
              <motion.a
                href="tel:+919100044126"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-4 rounded-full bg-transparent border-2 border-white/20 text-white font-bold hover:bg-white/10 hover:border-white/30 transition-all duration-200 flex items-center gap-2 text-sm"
              >
                <Phone className="w-4 h-4" />
                +91 91000 44126
              </motion.a>
            </div>

            <div className="flex items-center gap-6 text-sm text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#00A2FF]" />
                Hyderabad HQ
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#00A2FF]" />
                Mon—Sat · 9 AM—6 PM
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 w-full lg:w-auto"
          >
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-premium-xl max-w-lg ml-auto border border-white/20"
            >
              <h3 className="text-2xl font-bold text-[#1C1B1B] mb-1">Request a free quote</h3>
              <p className="text-sm text-slate-700 mb-8 font-medium">We will get back to you within an hour.</p>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <motion.div
                  key={shakeKey}
                  animate={shakeKey ? { x: [0, -4, 4, -4, 4, -2, 2, 0] } : {}}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <div>
                    <motion.div
                      whileFocus={{ scale: 1.01 }}
                      className="relative"
                    >
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-3.5 rounded-xl border outline-none transition-all duration-200 text-sm font-medium bg-[#FCF9F8] ${formData.name ? 'border-[#FF8800]/40 focus:border-[#FF8800]' : 'border-slate-200 focus:border-[#FF8800]'} focus:ring-2 focus:ring-[#FF8800]/10`}
                        placeholder="Your name"
                      />
                      {formData.name && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#00E676]"
                        >
                          <Check className="w-4 h-4" />
                        </motion.span>
                      )}
                    </motion.div>
                  </div>
                  <div>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full px-4 py-3.5 rounded-xl border outline-none transition-all duration-200 text-sm font-medium bg-[#FCF9F8] ${formData.phone ? 'border-[#FF8800]/40 focus:border-[#FF8800]' : 'border-slate-200 focus:border-[#FF8800]'} focus:ring-2 focus:ring-[#FF8800]/10`}
                      placeholder="Phone number"
                    />
                  </div>
                  <div>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-4 py-3.5 rounded-xl border outline-none transition-all duration-200 resize-none text-sm font-medium bg-[#FCF9F8] ${formData.message ? 'border-[#FF8800]/40 focus:border-[#FF8800]' : 'border-slate-200 focus:border-[#FF8800]'} focus:ring-2 focus:ring-[#FF8800]/10`}
                      placeholder="Tell us about your project (location, type, size...)"
                    />
                  </div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }}>
                  <button
                    type="submit"
                    disabled={submitted}
                    className="w-full py-4 px-6 mt-2 bg-[#FF8800] hover:bg-[#E67700] disabled:bg-[#FF8800]/70 text-white text-sm font-bold rounded-xl shadow-lg shadow-[#FF8800]/20 transition-all duration-200 flex justify-center items-center gap-2 hover:-translate-y-0.5 relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '200%' }}
                      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    />
                    {submitted ? (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative z-10 flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        Sent!
                      </motion.span>
                    ) : (
                      <span className="relative z-10">Request Free Quote</span>
                    )}
                  </button>
                </motion.div>
                <p className="text-center text-xs text-slate-600 mt-4 leading-relaxed font-semibold">
                  By submitting, you agree to be contacted via call or WhatsApp.
                </p>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
