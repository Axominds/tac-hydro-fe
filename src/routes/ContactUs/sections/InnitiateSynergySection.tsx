import { Mail, Phone } from "lucide-react";
import { useSiteSettings } from "../../../hooks/useSiteSettings";

export const InnitiateSynergySection = () => {
  const { data: settings } = useSiteSettings();

  return (
    <section
      id="initiate-synergy"
      className="relative w-full py-12 lg:py-16 bg-[#f8f9fa] flex items-center"
    >
      <div className="mx-auto max-w-[1100px] px-4 sm:px-8 lg:px-12 w-full">
        <div className="bg-white rounded-[32px] shadow-[0_30px_60px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col lg:flex-row">
          {/* Left Sidebar - Deep Blue/Gradient */}
          <div className="lg:w-[360px] bg-[#0f1a2e] relative p-8 lg:p-10 flex flex-col justify-between text-white overflow-hidden shrink-0">
            <div className="relative z-10 text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold leading-tight mb-4">
                INITIATE
                <br />
                SYNERGY
              </h1>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Briefly describe your proposal or project requirement. Our strategic lead will
                respond within 48 hours.
              </p>
            </div>

            <div className="relative z-10 flex flex-col gap-5 mt-10 lg:mt-0">
              {settings?.collaboration_email && (
                <div className="flex items-start gap-3 group cursor-pointer text-left">
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#0070c0] transition-colors duration-300 shrink-0">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-0.5">
                      Direct Email
                    </p>
                    <a
                      href={`mailto:${settings.collaboration_email}`}
                      className="text-sm font-semibold hover:text-[#0070c0] transition-colors whitespace-nowrap block"
                    >
                      {settings.collaboration_email}
                    </a>
                  </div>
                </div>
              )}
              {settings?.phone && (
                <div className="flex items-start gap-3 group cursor-pointer text-left">
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#d4002a] transition-colors duration-300 shrink-0">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-0.5">
                      Direct Line
                    </p>
                    <a
                      href={`tel:${settings.phone.replace(/\D/g, "")}`}
                      className="text-sm font-semibold hover:text-[#d4002a] transition-colors"
                    >
                      {settings.phone}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Form Area */}
          <div className="flex-1 p-6 sm:p-10 bg-white text-left">
            <div className="h-full flex flex-col justify-center">
              <div className="max-w-xl">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                  Email your proposal to start the conversation
                </h3>
                <p className="text-slate-600 text-base leading-relaxed mb-6">
                  Please send your collaboration proposal or project brief by email and our
                  strategic lead will respond within 48 hours.
                </p>
                {settings?.collaboration_email && (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <a
                      href={`mailto:${settings.collaboration_email}`}
                      className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#0070c0] text-white font-semibold shadow-[0_12px_24px_rgba(0,112,192,0.25)] hover:bg-[#005a9e] hover:shadow-[0_18px_32px_rgba(0,112,192,0.3)] transition-all"
                    >
                      Email {settings.collaboration_email}
                    </a>
                    <p className="text-sm text-slate-500">
                      Attach PDFs or a brief overview in the message.
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
