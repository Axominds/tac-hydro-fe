import React from "react";
import { NavLink } from "react-router-dom";
import { HERO_BG_ALT } from "../../../../assets";

export const ContactSection = (): JSX.Element => {
  return (
    <section className="relative w-full py-20">
      <div className="relative w-full min-h-[380px] overflow-hidden">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          alt="Hydropower dam"
          src={HERO_BG_ALT}
        />
        <div className="absolute inset-0 bg-[#0f1821]/45" />

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-20">
          <div className="max-w-[520px] bg-white/95 backdrop-blur-sm rounded-[22px] px-8 py-10 sm:px-10 sm:py-12 my-8 sm:my-10 shadow-[0_18px_36px_rgba(0,0,0,0.12)]">
            <p className="[font-family:'Montserrat',Helvetica] text-[11px] tracking-[0.18em] uppercase text-[#5b7b6f] font-semibold mb-3">
              Schedule a consultation today
            </p>
            <h3 className="[font-family:'Playfair_Display',Helvetica] font-bold italic text-[#1f4d3a] text-[34px] sm:text-[40px] leading-[1.05] mb-4">
              Start Your Journey To
              <br />
              Talent Excellence
            </h3>
            <p className="[font-family:'Montserrat',Helvetica] font-normal text-[#5a5a5a] text-base leading-[26px] mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
              ullamcorper mattis.
            </p>
            <NavLink
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#d1862b] px-6 py-3 text-white text-sm font-semibold tracking-[0.02em] shadow-[0_10px_20px_rgba(209,134,43,0.35)] hover:bg-[#bb741f] transition-colors"
            >
              Contact Us
              <span aria-hidden="true">→</span>
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};
