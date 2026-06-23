import { Mail, Phone, MapPin, Copy, Check, MessageCircle, ArrowRight } from 'lucide-react';
import React, { useState } from 'react';
import AnimatedSection from './AnimatedSection';
import { motion } from 'motion/react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; phone?: string; message?: string }>({});
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('+919100044124');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { name?: string; phone?: string; message?: string } = {};
    if (!formData.name || formData.name.trim().length < 2) {
      errors.name = 'Name is required (min 2 characters)';
    }
    if (formData.phone && !/^(\+91)?[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = 'Enter a valid Indian phone number (10 digits, optional +91)';
    }
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;
    let text = `*New Inquiry via Website*\n\n`;
    if (formData.name) text += `*Name:* ${formData.name}\n`;
    if (formData.phone) text += `*Phone:* ${formData.phone}\n`;
    if (formData.message) text += `*Requirement:* ${formData.message}\n`;
    window.open(`https://wa.me/919100044124?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-[#FCF9F8] relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute top-20 right-0 w-72 h-72 bg-[#FF8800]/[0.02] rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1C1B1B] mb-4 tracking-tight">
              Contact <span className="text-[#FF8800]">Vistaline</span>
            </h2>
            <p className="text-slate-600 text-sm md:text-base">
              Get in touch for quotes, custom requirements, or general inquiries —<br className="hidden md:block" /> our team responds within an hour during business hours.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <AnimatedSection className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-[#1C1B1B] mb-2">Get In Touch</h3>
              <p className="text-slate-600 text-sm max-w-md">
                We are ready to supply premium aluminium and glass materials for your next project anywhere in India.
              </p>
            </div>

            <motion.div
              whileHover={{ y: -2, borderColor: 'rgba(255, 136, 0, 0.3)' }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="bg-white border border-slate-200/60 rounded-xl p-6 relative overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#FF8800]/10 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-[#FF8800]" />
                </div>
                <div>
                  <div className="inline-block px-2 py-0.5 border border-[#FF8800]/30 text-[#FF8800] text-xs font-bold uppercase rounded-full mb-2 tracking-wider">No Middlemen</div>
                  <h4 className="text-lg font-bold text-[#1C1B1B] mb-1">Deal Direct with the Owner</h4>
                  <p className="text-xs text-slate-700 mb-4">Skip the sales team—chat with the founder directly on WhatsApp for the best price & honest advice.</p>
                  <motion.a
                    href="https://wa.me/919100044124?text=Hi,%20I%20want%20to%20discuss%20my%20office%20partition%20project%20directly."
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 bg-[#FF8800] hover:bg-[#E67700] text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-200"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Chat with Owner on WhatsApp
                  </motion.a>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -2, borderColor: 'rgba(255, 136, 0, 0.3)' }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="bg-white border border-slate-200/60 rounded-xl p-4 flex items-center justify-between hover:shadow-lg transition-shadow duration-200"
            >
              <a href="tel:+919100044124" className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 rounded-full bg-[#FF8800]/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#FF8800]" />
                </div>
                <div>
                  <p className="text-xs text-slate-700">Phone & WhatsApp — tap to call</p>
                  <p className="text-lg font-bold text-[#1C1B1B]">+91 91000 44124</p>
                </div>
              </a>
              <motion.button
                onClick={handleCopy}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 text-xs text-[#FF8800] font-medium px-3 py-1.5 rounded-lg bg-[#FF8800]/5 hover:bg-[#FF8800]/10 transition-colors shrink-0"
              >
                {copied ? (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-1"
                  >
                    <Check className="w-3 h-3" />
                    Copied
                  </motion.span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Copy className="w-3 h-3" />
                    Copy
                  </span>
                )}
              </motion.button>
            </motion.div>

            <motion.div
              whileHover={{ y: -2, borderColor: 'rgba(255, 136, 0, 0.3)' }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="bg-white border border-slate-200/60 rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:shadow-lg transition-shadow duration-200"
              onClick={() => window.location.href = 'mailto:info@vistaline.in'}
            >
              <div className="w-10 h-10 rounded-full bg-[#FF8800]/10 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-[#FF8800]" />
              </div>
              <div>
                <p className="text-xs text-slate-700">Email — click to send</p>
                <p className="text-base font-bold text-[#1C1B1B] leading-tight">info@vistaline.in</p>
              </div>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="bg-white border border-slate-200/60 p-6 lg:p-8 rounded-2xl shadow-sm">
              <h4 className="text-xl font-bold text-[#1C1B1B] mb-6">Send an Inquiry via WhatsApp</h4>
              <form className="space-y-4" onSubmit={handleSendInquiry}>
                <div className="space-y-4">
                    <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Full Name</label>
                    <motion.div whileFocus={{ scale: 1.01 }} className="relative">
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => { setFormData({ ...formData, name: e.target.value }); if (fieldErrors.name) setFieldErrors(prev => ({ ...prev, name: undefined })); }}
                        maxLength={100}
                        className={`w-full px-4 py-2.5 rounded-xl border outline-none transition-all duration-200 text-sm bg-[#FCF9F8] ${fieldErrors.name ? 'border-red-300' : formData.name ? 'border-[#FF8800]/40' : 'border-slate-200'} focus:border-[#FF8800] focus:ring-2 focus:ring-[#FF8800]/10`}
                        placeholder="John Doe"
                      />
                    </motion.div>
                    {fieldErrors.name && <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>}
                  </div>
                    <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Phone Number</label>
                    <motion.div whileFocus={{ scale: 1.01 }}>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => { setFormData({ ...formData, phone: e.target.value }); if (fieldErrors.phone) setFieldErrors(prev => ({ ...prev, phone: undefined })); }}
                        maxLength={15}
                        className={`w-full px-4 py-2.5 rounded-xl border outline-none transition-all duration-200 text-sm bg-[#FCF9F8] ${fieldErrors.phone ? 'border-red-300' : formData.phone ? 'border-[#FF8800]/40' : 'border-slate-200'} focus:border-[#FF8800] focus:ring-2 focus:ring-[#FF8800]/10`}
                        placeholder="+91 98765 43210"
                      />
                    </motion.div>
                    {fieldErrors.phone && <p className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Requirement Details</label>
                    <motion.div whileFocus={{ scale: 1.01 }}>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border outline-none transition-all duration-200 resize-none text-sm bg-[#FCF9F8] ${formData.message ? 'border-[#FF8800]/40' : 'border-slate-200'} focus:border-[#FF8800] focus:ring-2 focus:ring-[#FF8800]/10`}
                        placeholder="I need a quote for aluminium frames for a commercial project..."
                      />
                    </motion.div>
                  </div>
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3.5 px-6 mt-2 bg-[#FF8800] hover:bg-[#E67700] text-white text-sm font-bold rounded-xl shadow-lg shadow-[#FF8800]/20 transition-all duration-200 flex justify-center items-center gap-2 relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '200%' }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                  <MessageCircle className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Send via WhatsApp</span>
                </motion.button>
              </form>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.1}>
          <div className="grid lg:grid-cols-2 gap-8 border-t border-slate-200/60 pt-12">
            <div className="flex bg-white rounded-xl overflow-hidden border border-slate-200/60 hover:border-[#FF8800]/20 transition-colors">
              <div className="p-6 flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-[#FF8800]" />
                  <span className="text-xs font-bold tracking-wider text-slate-700 uppercase">Hyderabad</span>
                </div>
                <h5 className="font-bold text-[#1C1B1B] text-sm mb-2">Hyderabad Office</h5>
                <p className="font-semibold text-slate-800 text-sm mb-2">Vistaline Profiles Pvt. Ltd.</p>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Plot No. 7 & 8, Sy No. 164/B1/A,<br />
                  164/B1/B, 164/B1/C, 164/B1/D,<br />
                  Thondapally, Shamshabad—501218,<br />
                  Telangana
                </p>
                <a
                  href="https://maps.google.com/?q=Plot+No.+7+%26+8,+Sy+No.+164/B1/A,+Thondapally,+Shamshabad+-+501218,+Telangana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#FF8800] hover:text-[#E67700] transition-colors"
                >
                  Open in Google Maps <ArrowRight className="w-3 h-3" />
                </a>
              </div>
              <iframe
                src="https://www.google.com/maps?q=Plot+No.+7+%26+8,+Sy+No.+164/B1/A,+Thondapally,+Shamshabad+-+501218,+Telangana&output=embed"
                title="Hyderabad Office Map"
                className="w-1/3 min-h-[160px]"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="flex bg-white rounded-xl overflow-hidden border border-slate-200/60 hover:border-[#FF8800]/20 transition-colors">
              <div className="p-6 flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-[#FF8800]" />
                  <span className="text-xs font-bold tracking-wider text-slate-700 uppercase">Chennai</span>
                </div>
                <h5 className="font-bold text-[#1C1B1B] text-sm mb-2">Chennai Office</h5>
                <p className="font-semibold text-slate-800 text-sm mb-2">Vistaline Profiles Pvt. Ltd.</p>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  G-1, North Facing, Ground Floor,<br />
                  No.42, 5th Cross Street,<br />
                  Venkateshwara Nagar, Industrial Estate,<br />
                  Perungudi, Chennai—600096
                </p>
                <a
                  href="https://maps.google.com/?q=G-1,+North+Facing,+Ground+Floor,+No.42,+5th+Cross+Street,+Venkateshwara+Nagar,+Industrial+Estate,+Perungudi,+Chennai+-+600096"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#FF8800] hover:text-[#E67700] transition-colors"
                >
                  Open in Google Maps <ArrowRight className="w-3 h-3" />
                </a>
              </div>
              <iframe
                src="https://www.google.com/maps?q=G-1,+North+Facing,+Ground+Floor,+No.42,+5th+Cross+Street,+Venkateshwara+Nagar,+Industrial+Estate,+Perungudi,+Chennai+-+600096&output=embed"
                title="Chennai Office Map"
                className="w-1/3 min-h-[160px]"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
