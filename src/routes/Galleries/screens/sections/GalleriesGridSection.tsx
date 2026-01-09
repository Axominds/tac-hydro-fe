import React, { useState } from "react";

const yearTabs = [{ year: "2026" }, { year: "2025" }, { year: "2024" }, { year: "2023" }];

const galleryData = {
  "2026": [
    {
      id: 1,
      image: "/downloads/mjlodvw6RB1obD/img/mask-group.png",
    },
    {
      id: 2,
      image: "/downloads/mjlodvw6RB1obD/img/mask-group-1.png",
    },
    {
      id: 3,
      image: "/downloads/mjlodvw6RB1obD/img/clip-path-group.png",
    },
  ],
  "2025": [
    {
      id: 1,
      image: "/downloads/mjlodvw6RB1obD/img/mask-group-2.png",
    },
    {
      id: 2,
      image: "/downloads/mjlodvw6RB1obD/img/mask-group-3.png",
    },
    {
      id: 3,
      image: "/downloads/mjlodvw6RB1obD/img/mask-group-4.png",
    },
    {
      id: 4,
      image: "/downloads/mjlodvw6RB1obD/img/mask-group-5.png",
    },
  ],
  "2024": [
    {
      id: 1,
      image: "/downloads/mjlodvw6RB1obD/img/mask-group-6.png",
    },
    {
      id: 2,
      image: "/downloads/mjlodvw6RB1obD/img/mask-group.png",
    },
    {
      id: 3,
      image: "/downloads/mjlodvw6RB1obD/img/mask-group-1.png",
    },
    {
      id: 4,
      image: "/downloads/mjlodvw6RB1obD/img/clip-path-group.png",
    },
    {
      id: 5,
      image: "/downloads/mjlodvw6RB1obD/img/mask-group-2.png",
    },
  ],
  "2023": [
    {
      id: 1,
      image: "/downloads/mjlodvw6RB1obD/img/mask-group.png",
    },
    {
      id: 2,
      image: "/downloads/mjlodvw6RB1obD/img/mask-group-1.png",
    },
    {
      id: 3,
      image: "/downloads/mjlodvw6RB1obD/img/clip-path-group.png",
    },
    {
      id: 4,
      image: "/downloads/mjlodvw6RB1obD/img/mask-group.png",
    },
    {
      id: 5,
      image: "/downloads/mjlodvw6RB1obD/img/mask-group-1.png",
    },
    {
      id: 6,
      image: "/downloads/mjlodvw6RB1obD/img/clip-path-group.png",
    },
  ],
};

export const GalleriesGridSection = (): JSX.Element => {
  const [activeYear, setActiveYear] = useState("2026");

  const currentGalleryItems = galleryData[activeYear as keyof typeof galleryData] || [];

  return (
    <section className="relative w-full py-16 bg-[#f5f5f5]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Year Tabs */}
        <div id="galleries-filter" className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {yearTabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveYear(tab.year)}
              type="button"
              aria-pressed={activeYear === tab.year}
              className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
                activeYear === tab.year
                  ? "border-[#0070c0] bg-[#0070c0] text-white"
                  : "border-[#d9d9d9] bg-white text-[#6b6b6b] hover:border-[#0070c0] hover:text-[#0070c0]"
              }`}
            >
              {tab.year}
            </button>
          ))}
        </div>

        {/* Galleries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentGalleryItems.map((item) => (
            <div
              key={item.id}
              className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow cursor-pointer group"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-white">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt={`Galleries item ${item.id}`}
                  src={item.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {currentGalleryItems.length === 0 && (
          <div className="text-center py-20">
            <p className="font-semibold text-[#888888] text-lg sm:text-xl leading-[normal]">
              No galleries items available for {activeYear}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
