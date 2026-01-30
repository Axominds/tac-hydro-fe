export const ContactMapSection = () => {
    return (
        <section id="location-map" className="relative w-full py-16 lg:py-24 bg-[#f8f9fa]">
            <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 w-full">

                <div className="mb-12 text-center">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] mb-4">
                        OUR OFFICE LOCATION
                    </h2>
                    <p className="text-slate-600 max-w-[620px] text-lg leading-relaxed mx-auto">
                        Visit our headquarters in Lalitpur to discuss your hydropower engineering needs with our experts.
                    </p>
                </div>

                <div className="relative w-full rounded-[40px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.08)] border border-slate-100">
                    <iframe
                        title="TAC Hydro Consultancy Pvt. Ltd. location"
                        src="https://www.google.com/maps?q=27.6875467,85.3168056&z=18&output=embed"
                        className="h-[400px] sm:h-[500px] lg:h-[600px] w-full"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>
        </section>
    );
};
