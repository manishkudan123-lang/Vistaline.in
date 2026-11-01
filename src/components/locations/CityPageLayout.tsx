import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Layers,
  Building2,
  Sparkles,
  ExternalLink,
  Send
} from 'lucide-react';
import { motion } from 'motion/react';
import { CityInfo, CITIES_LIST } from '../../data/citiesData';
import { setStoredLocationId } from '../../utils/locationStorage';

export default function CityPageLayout({ city }: { city: CityInfo }) {
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formRequirement, setFormRequirement] = useState('');

  // Automatically save current city to localStorage
  useEffect(() => {
    if (city?.id) {
      setStoredLocationId(city.id);
    }
  }, [city?.id]);

  const whatsappMessage = encodeURIComponent(
    `Hi Vistaline team, I am looking for aluminium & glass partition solutions for our project in ${city.name}, ${city.state}. Please share the catalog and pricing.`
  );

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hi Vistaline, My name is ${formName || 'Customer'} (Ph: ${formPhone || 'N/A'}). I have an inquiry for ${city.name}: ${formRequirement || 'General partition requirement'}`
    );
    window.open(`https://wa.me/918764131313?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FCF9F8] pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0A3D73] rounded-3xl p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl">
            {/* Background ambient decorative shapes */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-gradient-to-br from-[#00A2FF]/20 to-[#FF8800]/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#FF8800]/15 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-amber-300 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse" />
                <MapPin className="w-3.5 h-3.5 text-[#FF8800]" />
                <span>{city.badge}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 text-white">
                Aluminium & Glass Partitions in <span className="text-[#FF8800]">{city.name}</span>
              </h1>

              <p className="text-base sm:text-xl text-slate-200 leading-relaxed mb-8">
                {city.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`https://wa.me/918764131313?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#FF8800] hover:bg-[#E67700] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#FF8800]/25 transition-all transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp Inquiry for {city.name}</span>
                </a>

                <a
                  href={`tel:${city.phone}`}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm sm:text-base backdrop-blur-sm transition-all"
                >
                  <Phone className="w-4 h-4 text-[#FF8800]" />
                  <span>Call {city.phone}</span>
                </a>

                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-transparent hover:bg-white/10 text-white/90 hover:text-white font-semibold text-sm transition-all"
                >
                  <span>Explore Profiles</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Stats row inside banner */}
            <div className="mt-12 pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {city.stats.map((s, i) => (
                <div key={i}>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#FF8800]">{s.value}</div>
                  <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Office / Hub Information & Map */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-sm grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold tracking-wider text-[#FF8800] uppercase">
                  {city.type}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1B1B] mt-1">
                  Vistaline Profiles — {city.name}
                </h2>
                <p className="text-sm text-slate-600 mt-2">
                  Direct regional supply, architectural engineering support, and rapid turnkey installations.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3 text-slate-700">
                  <div className="p-2.5 rounded-xl bg-orange-50 text-[#FF8800] shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Address / Hub</div>
                    <div className="text-sm font-medium text-slate-800 leading-snug mt-0.5">{city.address}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-700">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-[#0088CC] shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Direct Phone</div>
                    <a href={`tel:${city.phone}`} className="text-sm font-semibold text-slate-800 hover:text-[#FF8800] transition-colors mt-0.5 block">
                      {city.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-700">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-[#00E676] shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Inquiry</div>
                    <a href={`mailto:${city.email}`} className="text-sm font-semibold text-slate-800 hover:text-[#FF8800] transition-colors mt-0.5 block">
                      {city.email}
                    </a>
                  </div>
                </div>
              </div>

              {city.mapUrl && (
                <div className="pt-2">
                  <a
                    href={city.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#FF8800] hover:text-[#E67700] transition-colors uppercase tracking-wider"
                  >
                    Open Location in Google Maps <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            {/* Map Frame or Logistics Visualizer */}
            <div className="lg:col-span-7 h-full min-h-[300px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 relative">
              {city.mapEmbedUrl ? (
                <iframe
                  src={city.mapEmbedUrl}
                  title={`${city.name} Office Map`}
                  className="w-full h-full min-h-[340px]"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="h-full min-h-[340px] flex flex-col justify-center items-center p-8 text-center bg-gradient-to-br from-slate-50 to-orange-50/40">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center text-[#FF8800] mb-4">
                    <Building2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1C1B1B]">Regional Fast Dispatch Hub</h3>
                  <p className="text-xs text-slate-600 max-w-md mt-2 leading-relaxed">
                    Doorstep crated supply & certified installation service covering all commercial zones in {city.name} with transit times of 24 to 48 hours.
                  </p>
                  <a
                    href={`https://wa.me/918764131313?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF8800] hover:bg-[#E67700] text-white text-xs font-bold shadow-sm transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Contact {city.name} Dispatch</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Delivery & Commercial Zones */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
            <div className="max-w-2xl">
              <span className="text-xs font-bold tracking-widest text-[#FF8800] uppercase">
                Delivery Coverage
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-1 mb-4">
                Key Commercial Corridors Served in {city.name}
              </h2>
              <p className="text-sm text-slate-400 mb-8">
                Our logistics network provides rapid transit, on-site measurement, and certified assembly across:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {city.deliveryZones.map((zone, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#FF8800]/40 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#00E676] shrink-0" />
                  <span className="text-sm font-semibold text-slate-200">{zone}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modular Partition Systems for this city */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-wider text-[#FF8800] uppercase">
              Engineered Profiles
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C1B1B] mt-1">
              Top Systems Installed in {city.name}
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              High-tensile architectural alloy 6063-T6, compatible with tempered, laminated, acoustic & fluted glass.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {city.popularSystems.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 hover:border-[#FF8800]/40 hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-orange-50 text-[#FF8800] text-xs font-bold mb-4">
                    {item.tag}
                  </div>
                  <h3 className="text-lg font-bold text-[#1C1B1B] mb-2 group-hover:text-[#FF8800] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <Link
                  to="/products"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A3D73] group-hover:text-[#FF8800] transition-colors uppercase tracking-wider"
                >
                  <span>View Specifications</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Vistaline in this City */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FCF9F8] rounded-3xl p-8 sm:p-10 border border-slate-200">
            <h3 className="text-xl sm:text-2xl font-bold text-[#1C1B1B] mb-6">
              Why Architects & Builders in {city.name} Partner with Vistaline
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {city.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                  <ShieldCheck className="w-5 h-5 text-[#FF8800] shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-slate-700 leading-snug">{h}</span>
                </div>
              ))}
            </div>

            {/* Testimonial Quote */}
            <div className="mt-8 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <blockquote className="text-sm italic text-slate-700 max-w-2xl">
                “{city.testimonial.quote}”
              </blockquote>
              <div className="shrink-0 text-left sm:text-right">
                <div className="text-sm font-bold text-[#1C1B1B]">{city.testimonial.author}</div>
                <div className="text-xs text-slate-500">{city.testimonial.role} — {city.testimonial.project}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Inquiry Form */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm text-center">
            <div className="inline-flex p-3 rounded-2xl bg-orange-50 text-[#FF8800] mb-4">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1C1B1B]">
              Get Instant Estimate for {city.name}
            </h3>
            <p className="text-sm text-slate-600 max-w-lg mx-auto mt-2 mb-8">
              Send your project layout or approximate dimensions. Our engineering team will respond within 30 minutes with an itemized quote.
            </p>

            <form onSubmit={handleInquirySubmit} className="max-w-xl mx-auto grid sm:grid-cols-2 gap-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#FF8800]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Phone / WhatsApp</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#FF8800]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Project Details in {city.name}</label>
                <textarea
                  rows={3}
                  placeholder={`Mention area in sq.ft, number of cabins, or system preference (e.g., 25mm slimline glass for office in ${city.name}).`}
                  value={formRequirement}
                  onChange={(e) => setFormRequirement(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#FF8800]"
                />
              </div>

              <div className="sm:col-span-2 mt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#FF8800] hover:bg-[#E67700] text-white font-bold text-sm shadow-md shadow-[#FF8800]/25 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send WhatsApp Inquiry for {city.name}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Switch between cities */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-slate-200/80 pt-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Explore Vistaline in Other Cities
              </span>
              <Link to="/contact" className="text-xs font-bold text-[#FF8800] hover:underline">
                View All Branch Locations →
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {CITIES_LIST.map((c) => {
                const isActive = c.id === city.id;
                return (
                  <Link
                    key={c.id}
                    to={`/${c.id}`}
                    onClick={() => setStoredLocationId(c.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${isActive
                        ? 'bg-[#0A3D73] text-white shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-700 hover:border-[#FF8800] hover:text-[#FF8800]'
                      }`}
                  >
                    {c.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
