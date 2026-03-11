export const TopManagementSection = () => {
  return (
    <section
      id="top-management-section"
      className="w-full relative flex items-center py-10 sm:py-16 bg-[#f8f9fa]"
    >
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Text Column */}
          <div className="flex flex-col gap-6 order-2">
            <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold leading-tight text-[#2c3e50]">
              MANAGEMENT&apos;S COMMITMENT
            </h1>
            <div className="flex flex-col gap-4 text-[#555555] text-lg leading-relaxed">
              <p>
                We are committed to advancing our mission through a culture defined by technical
                integrity, professional excellence, and responsible innovation. As an engineering
                consultancy entrusted with designing vital infrastructure, we recognize that every
                decision carries long-term consequences for communities, the environment, and
                national development. Our commitment therefore begins with an unwavering dedication
                to sound engineering principles, transparency, and ethical practice.
              </p>
              <p>
                We place our clients at the center of our work. By listening carefully,
                understanding project objectives, and maintaining open communication throughout
                every stage of engagement, we strive to deliver solutions that meet the highest
                standards of quality, reliability, and value. Customer satisfaction is not merely an
                objective for us; it is a reflection of our accountability and professionalism.
              </p>
              <p>
                People are the core of our strength in achieving our mission. Through rigorous
                on-the-job learning, professional training, and academic engagement, we cultivate
                technical excellence alongside ethical responsibility. While our roots remain local,
                our outlook is global. We continuously strive to master and apply frontier
                technologies so that our domestic engineering capability reaches world-class
                standards.
              </p>
              <p>
                We are equally committed to precision and excellence in every aspect of our work.
                Through disciplined design processes, thorough rigorous reviews, and a culture of
                continuous improvement, we deliver engineering solutions that are reliable,
                innovative, sustainable yet highly economic.
              </p>
            </div>
          </div>

          {/* Image Column */}
          <div className="relative w-full h-[80vh] min-h-[400px] max-h-[80vh] rounded-3xl overflow-hidden shadow-2xl lg:sticky lg:top-24 self-start order-1">
            <img
              src="/commitment.jpg"
              alt="Managing Director"
              className="absolute inset-0 w-full h-full object-cover object-top"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
