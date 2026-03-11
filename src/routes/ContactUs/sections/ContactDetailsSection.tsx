import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const ContactDetailsSection = () => {
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
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300 shrink-0 shadow-lg">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[11px] text-blue-400 uppercase tracking-[0.2em] font-bold mb-1">
                      Call Us
                    </p>
                    <a
                      href="tel:+977015439239"
                      className="text-lg font-semibold hover:text-blue-400 transition-colors"
                    >
                      +977 01-5439239
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300 shrink-0 shadow-lg">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[11px] text-blue-400 uppercase tracking-[0.2em] font-bold mb-1">
                      Email Us
                    </p>
                    <a
                      href="mailto:info@tachydro.com.np"
                      className="text-lg font-semibold hover:text-blue-400 transition-colors break-all"
                    >
                      info@tachydro.com.np
                    </a>
                  </div>
                </div>

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
                      Sanepa - 02, Lalitpur 44600, Nepal
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Business Hours
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-[20px] hover:bg-white/10 transition-colors">
                  <span className="text-slate-300 text-sm font-medium">Sun - Fri</span>
                  <span className="font-bold text-white text-sm">9:00 AM - 5:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Area */}
          <div className="flex-1 p-8 sm:p-12 bg-white">
            {/*
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2.5">
                  <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name*"
                    className="h-14 rounded-2xl bg-slate-50 border border-slate-100 px-6 text-slate-900 text-base outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all placeholder:text-slate-400"
                  />
                </div>
                <div className="flex flex-col gap-2.5">
                  <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter your phone*"
                    className="h-14 rounded-2xl bg-slate-50 border border-slate-100 px-6 text-slate-900 text-base outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2.5">
                  <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email*"
                    className="h-14 rounded-2xl bg-slate-50 border border-slate-100 px-6 text-slate-900 text-base outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all placeholder:text-slate-400"
                  />
                </div>
                <div className="flex flex-col gap-2.5">
                  <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                    Desired Service
                  </label>
                  <select className="h-14 rounded-2xl bg-slate-50 border border-slate-100 px-6 text-slate-900 text-base outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all appearance-none cursor-pointer">
                    <option value="">Select a service</option>
                    <option value="feasibility">Feasibility Study</option>
                    <option value="design">Detailed Engineering Design</option>
                    <option value="supervision">Construction Supervision</option>
                    <option value="appraisal">Due Diligence Appraisal</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                  Message
                </label>
                <textarea
                  className="min-h-[160px] rounded-2xl bg-slate-50 border border-slate-100 px-6 py-5 text-slate-900 text-base outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all placeholder:text-slate-400 resize-none"
                  placeholder="Tell us about your project or inquiry..."
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="h-14 px-10 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-[0_15px_30px_rgba(37,99,235,0.25)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.35)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-3 group w-full md:w-auto"
                >
                  <span>Send Message</span>
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </div>
            </form>
            */}
            <div className="h-full flex flex-col justify-center">
              <div className="max-w-xl">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                  Please email us directly
                </h3>
                <p className="text-slate-600 text-base leading-relaxed mb-6">
                  Please send your inquiry to our team by email and we will respond within one
                  business day.
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <a
                    href="mailto:info@tachydro.com.np"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-blue-600 text-white font-semibold shadow-[0_12px_24px_rgba(37,99,235,0.25)] hover:bg-blue-700 hover:shadow-[0_18px_32px_rgba(37,99,235,0.3)] transition-all"
                  >
                    Email info@tachydro.com.np
                  </a>
                  <p className="text-sm text-slate-500">
                    Prefer a call? Use the direct line on the left.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
