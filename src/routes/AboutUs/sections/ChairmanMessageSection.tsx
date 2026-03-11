export const ChairmanMessageSection = () => {
  return (
    <section
      id="chairman-message-section"
      className="w-full relative flex items-center py-12 sm:py-18 bg-[#f8f9fa]"
    >
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold leading-tight text-[#2c3e50]">
              CHAIRMAN&apos;S MESSAGE
            </h1>
            <div className="flex flex-col gap-4 text-[#555555] text-lg leading-relaxed">
              <p>Dear Clients, Partners, and Colleagues,</p>
              <p>
                It is a privilege to share the vision that guides our journey. Since our inception,
                we have remained committed to Empowering Sustainable Resources Through Engineering
                Excellence. While our foundation lies in hydropower, we are steadily expanding into
                solar energy, tunneling, and irrigation, guided by the same enduring purpose:
                contributing meaningfully to sustainable national development.
              </p>
              <p>
                The infrastructure we design today will endure for generations well into the next
                century. This reality reminds us of our profound responsibility toward both ecology
                and society, and we approach that responsibility with deep awareness and care. We
                believe that lasting progress must be indigenous - shaped by local knowledge,
                strengthened by local talent, and sustained through local ownership.
              </p>
              <p>
                By blending indigenous understanding with modern engineering innovation, we strive
                to develop professionals capable of delivering sophisticated, future-ready solutions
                suited to our unique context. As a national consultancy, our aspiration is to
                strengthen domestic capability and gradually reduce reliance on external expertise.
              </p>
              <p>
                Engineering, to us, is more than calculation - it is a long-term commitment to
                technical integrity, ecological balance, and community well-being. We remain
                dedicated to nurturing the next generation of engineering leaders and to building a
                future defined by competence, resilience, and national confidence.
              </p>
              <p>Thank you for your trust and partnership in this shared endeavor.</p>
            </div>
          </div>

          <div className="relative w-full h-[80vh] min-h-[400px] max-h-[80vh] rounded-3xl overflow-hidden shadow-2xl lg:sticky lg:top-24 self-start">
            <img
              src="/chairperson.png"
              alt="Chairman"
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
