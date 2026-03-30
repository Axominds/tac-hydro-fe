import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useSiteSettings } from "../../../hooks/useSiteSettings";

export const ContactDetailsSection = () => {
  const { data: settings } = useSiteSettings();

  return (
    <section id="contact-details" className="relative w-full py-16 lg:py-24 bg-[#f8f9fa]">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 w-full">
        <div className="bg-white rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden flex flex-col lg:flex-row">
          {/* Left Sidebar - Contact Info */}
          <div className="lg:w-[400px] bg-[#0f1a2e] p-8 sm:p-12 flex flex-col justify-between text-white relative">
            {/* Decorative background flare */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] -mr-32 -mt-32" />

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-8 tracking-tight">Contact Information</h3>

              <div className="space-y-8">
                {settings?.phone && (
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300 shrink-0 shadow-lg">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[11px] text-blue-400 uppercase tracking-[0.2em] font-bold mb-1">
                        Call Us
                      </p>
                      <a
                        href={`tel:${settings.phone.replace(/\D/g, "")}`}
                        className="text-lg font-semibold hover:text-blue-400 transition-colors"
                      >
                        {settings.phone}
                      </a>
                    </div>
                  </div>
                )}

                {settings?.contact_email && (
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300 shrink-0 shadow-lg">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[11px] text-blue-400 uppercase tracking-[0.2em] font-bold mb-1">
                        Email Us
                      </p>
                      <a
                        href={`mailto:${settings.contact_email}`}
                        className="text-lg font-semibold hover:text-blue-400 transition-colors break-all"
                      >
                        {settings.contact_email}
                      </a>
                    </div>
                  </div>
                )}

                {settings?.address && (
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300 shrink-0 shadow-lg">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[11px] text-blue-400 uppercase tracking-[0.2em] font-bold mb-1">
                        Visit Us
                      </p>
                      <a
                        href="/contact-us#location-map"
                        className="text-lg font-semibold leading-snug hover:text-blue-400 transition-colors"
                      >
                        {settings.address}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {settings?.business_hours && (
              <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
                <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Business Hours
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-white/5 p-4 rounded-[20px] hover:bg-white/10 transition-colors">
                    <span className="text-slate-300 text-sm font-medium">Sun - Fri</span>
                    <span className="font-bold text-white text-sm">{settings.business_hours}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Form Area */}
          <div className="flex-1 p-8 sm:p-12 bg-white">
            <div className="h-full flex flex-col justify-center">
              <div className="max-w-xl">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                  Please email us directly
                </h3>
                <p className="text-slate-600 text-base leading-relaxed mb-6">
                  Please send your inquiry to our team by email and we will respond within one
                  business day.
                </p>
                {settings?.contact_email && (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <a
                      href={`mailto:${settings.contact_email}`}
                      className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-blue-600 text-white font-semibold shadow-[0_12px_24px_rgba(37,99,235,0.25)] hover:bg-blue-700 hover:shadow-[0_18px_32px_rgba(37,99,235,0.3)] transition-all"
                    >
                      Email {settings.contact_email}
                    </a>
                    <p className="text-sm text-slate-500">
                      Prefer a call? Use the direct line on the left.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
