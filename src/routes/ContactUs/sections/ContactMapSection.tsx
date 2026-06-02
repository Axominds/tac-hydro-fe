import { useSiteSettings } from "../../../hooks/useSiteSettings";

export const ContactMapSection = () => {
  const { data: settings } = useSiteSettings();

  return (
    <section id="location-map" className="relative w-full py-16 lg:py-24 bg-[#f8f9fa]">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 w-full">
        <div className="mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#111111] mb-4">
            OUR OFFICE LOCATION
          </h1>
          <p className="text-slate-600 max-w-[620px] text-lg leading-relaxed mx-auto">
            Visit our headquarters in Lalitpur to discuss your hydropower engineering needs with our
            experts.
          </p>
        </div>

        {settings?.map_embed_url && (
          <div className="relative w-full rounded-[40px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.08)] border border-slate-100">
            <iframe
              title="TAC Hydro Consultancy Pvt. Ltd. location"
              src={settings.map_embed_url}
              className="h-[400px] sm:h-[500px] lg:h-[600px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}
      </div>
    </section>
  );
};
