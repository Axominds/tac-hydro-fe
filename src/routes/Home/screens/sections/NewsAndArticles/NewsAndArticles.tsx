import { useState } from "react";

const newsFilters = ["ALL", "CONTRACT SIGNING", "NEWS", "IN-HOUSE ARTICLES"];

const newsItems = [
    {
        id: 1,
        title: "River Basin Capacity Upgrade",
        category: "NEWS",
        image: "/downloads/mjlodvw6RB1obD/img/mask-group.png",
        date: "JAN 12, 2024",
        description: "Exploring the latest innovations and milestones in our journey towards sustainable energy excellence.",
    },
    {
        id: 2,
        title: "Green Corridor Retrofit",
        category: "CONTRACT SIGNING",
        image: "/downloads/mjlodvw6RB1obD/img/mask-group-1.png",
        date: "JAN 10, 2024",
        description: "Exploring the latest innovations and milestones in our journey towards sustainable energy excellence.",
    },
    {
        id: 3,
        title: "Turbine Efficiency Pilot",
        category: "IN-HOUSE ARTICLES",
        image: "/downloads/mjlodvw6RB1obD/img/clip-path-group.png",
        date: "JAN 08, 2024",
        description: "Exploring the latest innovations and milestones in our journey towards sustainable energy excellence.",
    },
    {
        id: 4,
        title: "Rapid Flow Intake Design",
        category: "NEWS",
        image: "/downloads/mjlodvw6RB1obD/img/mask-group-2.png",
        date: "JAN 05, 2024",
        description: "Exploring the latest innovations and milestones in our journey towards sustainable energy excellence.",
    },
    {
        id: 5,
        title: "Watershed Resilience Program",
        category: "CONTRACT SIGNING",
        image: "/downloads/mjlodvw6RB1obD/img/mask-group-3.png",
        date: "JAN 02, 2024",
        description: "Exploring the latest innovations and milestones in our journey towards sustainable energy excellence.",
    },
    {
        id: 6,
        title: "Grid Stability Partnership",
        category: "IN-HOUSE ARTICLES",
        image: "/downloads/mjlodvw6RB1obD/img/mask-group-4.png",
        date: "DEC 28, 2023",
        description: "Exploring the latest innovations and milestones in our journey towards sustainable energy excellence.",
    },
];

export const NewsAndArticlesSection = () => {
    const [activeFilter, setActiveFilter] = useState("ALL");

    const filteredItems = newsItems.filter(
        (item) => activeFilter === "ALL" || item.category === activeFilter
    );

    return (
        <section id="news-and-articles" className="relative w-full bg-[#f8f9fa] py-20 lg:py-28 overflow-hidden">
            <div className="relative mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div>
                        <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
                            News and Articles
                        </h2>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {newsFilters.map((filter) => (
                            <button
                                key={filter}
                                type="button"
                                onClick={() => setActiveFilter(filter)}
                                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${activeFilter === filter
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                                    : "bg-white text-slate-500 border border-slate-100 hover:border-blue-200"
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredItems.map((item) => (
                        <div
                            key={item.id}
                            className="group bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
                        >
                            <div className="relative aspect-[16/10] overflow-hidden">
                                <img
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    alt={item.title}
                                    src={item.image}
                                />
                                <div className="absolute top-6 left-6">
                                    <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold text-blue-600 uppercase tracking-widest shadow-lg">
                                        {item.category}
                                    </div>
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">
                                    {item.date}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                                    {item.title}
                                </h3>
                                <div className="mt-4">
                                    <p className="text-slate-500 text-sm leading-relaxed mb-6">
                                        {item.description}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest">
                                    Read Story
                                    <div className="w-8 h-[1px] bg-blue-600 transform scale-x-50 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
};
