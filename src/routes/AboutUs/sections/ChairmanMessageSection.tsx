export const ChairmanMessageSection = () => {
  return (
    <section
      id="chairman-message-section"
      className="w-full relative flex items-center py-12 sm:py-18 bg-[#f8f9fa]"
    >
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#2c3e50] leading-tight">
              Chairman&apos;s Message
            </h2>
            <div className="flex flex-col gap-4 text-[#555555] text-lg leading-relaxed">
              <p>
                It is a privilege to share the vision that guides our company and defines our
                journey. From our inception, we have been committed to delivering engineering
                excellence in hydropower design, study, and construction supervision. As we expand
                our services into solar energy, tunneling, and irrigation, our purpose remains
                consistent: to contribute meaningfully to sustainable national development.
              </p>
              <p>
                We believe that sustainability is not achieved solely through infrastructure, but
                through the strength of the people and institutions that create it. True and lasting
                progress must grow organically from within society. It must be indigenous—shaped by
                local knowledge, strengthened by local talent, and sustained by local ownership.
                This conviction shapes every aspect of our work. Our foremost investment is in
                people. We are dedicated to developing strong in-house engineering capabilities
                through rigorous on-the-job learning, continuous professional training, and academic
                engagement. By fostering technical depth, critical thinking, and ethical
                responsibility, we aim to cultivate engineers who can confidently address complex
                challenges and deliver solutions suited to our country’s unique context.
              </p>
              <p>
                As an engineering consultancy of national level, we aspire to reduce dependence on
                external expertise by strengthening domestic capacity. Our goal is not isolation,
                but self-reliance - ensuring that future hydropower plants, solar installations,
                tunnels, and irrigation systems can be planned, designed, supervised, commissioned,
                operated, maintained and rehabilitated predominantly by capable professionals from
                within our own borders. We recognize that engineering is more than calculation and
                construction; it is a long-term responsibility toward society and the environment.
                Every project we undertake is approached with a commitment to technical integrity,
                safety, environmental stewardship, and community well-being.
              </p>
              <p>
                Looking ahead, we remain dedicated to advancing sustainable infrastructure while
                nurturing the next generation of indigenous engineering leadership. Together with
                our clients, partners, and team members, we are proud to contribute to a future
                built on competence, resilience, and national confidence.
              </p>
              <p>Thank you for your trust and partnership in this shared endeavor.</p>
            </div>
          </div>

          <div className="relative w-full h-[80vh] min-h-[400px] max-h-[80vh] rounded-3xl overflow-hidden shadow-2xl lg:sticky lg:top-24 self-start">
            <img
              src="/chairperson.png"
              alt="Chairman"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
