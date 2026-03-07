export const ContactMapSection = () => {
  return (
    <section id="location-map" className="relative w-full py-16 lg:py-24 bg-[#f8f9fa]">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 w-full">
        <div className="mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold leading-tight font-extrabold text-[#111111] mb-4">
            OUR OFFICE LOCATION
          </h1>
          <p className="text-slate-600 max-w-[620px] text-lg leading-relaxed mx-auto">
            Visit our headquarters in Lalitpur to discuss your hydropower engineering needs with our
            experts.
          </p>
        </div>

        <div className="relative w-full rounded-[40px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.08)] border border-slate-100">
          <iframe
            title="TAC Hydro Consultancy Pvt. Ltd. location"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d883.2137613190752!2d85.3028434!3d27.6908747!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19e3c58c781b%3A0xcd2d0a96e7e9cc6d!2sTAC%20Hydro%20Consultancy%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1772626875825!5m2!1sen!2snp"
            className="h-[400px] sm:h-[500px] lg:h-[600px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};
