import { FooterSection } from "../../../components/sections/FooterSection";
import { SecondaryHeader } from "../../../components/sections/secondaryHeader";


const navigationItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Galleries", href: "/galleries" },
  { label: "Contact Us", href: "/contact-us", isActive: true },
];

export const ContactUs = () => {
  return (
    <div className="w-full relative bg-[#f8f9fa]">
      <SecondaryHeader
        title="Contact Us"
        description="Let us know how we can support your next hydropower project."
        navigationItems={navigationItems}
      />

      <section className="relative w-full bg-[#f8f9fa] py-16">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-20">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl sm:text-[28px] font-bold text-[#111111]">
              CONTACT US
            </h2>
            <p className="text-sm text-[#6b6b6b] max-w-[620px]">
              Whether you have a question, need more details about our services, or want to discuss a potential collaboration, we're here to help.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-2xl bg-[#f4f4f4] p-6 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
              <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#111111]">
                Get in Touch
              </h3>
              <div className="mt-4 border-t border-[#e2e2e2] pt-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-2">
                    <span className="text-[11px] font-semibold uppercase text-[#6b6b6b]">
                      Name
                    </span>
                    <input
                      className="h-11 rounded-lg border border-[#dddddd] bg-white px-3 text-sm outline-none focus:border-[#0070c0]"
                      placeholder="Enter your name*"
                      type="text"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-[11px] font-semibold uppercase text-[#6b6b6b]">
                      Phone Number
                    </span>
                    <input
                      className="h-11 rounded-lg border border-[#dddddd] bg-white px-3 text-sm outline-none focus:border-[#0070c0]"
                      placeholder="Enter your phone number*"
                      type="tel"
                    />
                  </label>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="flex flex-col gap-2">
                      <span className="text-[11px] font-semibold uppercase text-[#6b6b6b]">
                        Email
                      </span>
                      <input
                        className="h-11 rounded-lg border border-[#dddddd] bg-white px-3 text-sm outline-none focus:border-[#0070c0]"
                        placeholder="Enter your email*"
                        type="email"
                      />
                    </label>
                    <label className="flex flex-col gap-2">
                      <span className="text-[11px] font-semibold uppercase text-[#6b6b6b]">
                        Services
                      </span>
                      <input
                        className="h-11 rounded-lg border border-[#dddddd] bg-white px-3 text-sm outline-none focus:border-[#0070c0]"
                        placeholder="Select a service"
                        type="text"
                      />
                    </label>
                  </div>
                  <label className="flex flex-col gap-2">
                    <span className="text-[11px] font-semibold uppercase text-[#6b6b6b]">
                      Your Message
                    </span>
                    <textarea
                      className="min-h-[140px] rounded-lg border border-[#dddddd] bg-white px-3 py-2 text-sm outline-none focus:border-[#0070c0]"
                      placeholder="Write your message"
                    />
                  </label>
                </div>
                <button
                  type="button"
                  className="mt-5 inline-flex h-11 items-center justify-center rounded-lg bg-[#0070c0] px-6 text-sm font-semibold uppercase tracking-[0.18em] text-white"
                >
                  Send Message
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="rounded-2xl bg-[#f4f4f4] p-6 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
                <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#111111]">
                  Contact Information
                </h3>
                <div className="mt-4 border-t border-[#e2e2e2] pt-4 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#d4002a] shadow-[0_6px_16px_rgba(212,0,42,0.2)]">
                      <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1-.24 11.36 11.36 0 0 0 3.56.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C9.39 21 3 14.61 3 6a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.56 1 1 0 0 1-.24 1Z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase text-[#111111]">
                        Phone
                      </p>
                      <p className="text-sm text-[#6b6b6b]">
                        +977 01-5422896
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#d4002a] shadow-[0_6px_16px_rgba(212,0,42,0.2)]">
                      <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5Z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase text-[#111111]">
                        Email
                      </p>
                      <p className="text-sm text-[#6b6b6b]">
                        service@tachydro.com.np
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#d4002a] shadow-[0_6px_16px_rgba(212,0,42,0.2)]">
                      <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase text-[#111111]">
                        Address
                      </p>
                      <p className="text-sm text-[#6b6b6b]">
                        Kupondole, Lalitpur, Nepal
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-[#f4f4f4] p-6 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
                <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#111111]">
                  Business Hours
                </h3>
                <div className="mt-4 border-t border-[#e2e2e2] pt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase text-[#6b6b6b]">
                      Monday - Friday
                    </p>
                    <p className="text-sm text-[#6b6b6b]">
                      9:00 am - 8:00 pm
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase text-[#6b6b6b]">
                      Saturday
                    </p>
                    <p className="text-sm text-[#6b6b6b]">
                      9:00 am - 6:00 pm
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase text-[#6b6b6b]">
                      Sunday
                    </p>
                    <p className="text-sm text-[#6b6b6b]">
                      9:00 am - 5:00 pm
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full bg-[#f8f9fa] pb-16">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-20">
          <div className="overflow-hidden rounded-2xl border border-[#e5e7eb] shadow-[0_12px_32px_rgba(15,23,42,0.08)]">
            <iframe
              title="TAC Hydro Consultancy Pvt. Ltd. location"
              src="https://www.google.com/maps?q=27.6875467,85.3168056&z=18&output=embed"
              className="h-[260px] sm:h-[360px] lg:h-[420px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};
