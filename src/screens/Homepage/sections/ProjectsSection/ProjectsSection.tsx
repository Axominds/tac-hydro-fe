import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";

const categories = [
  { label: "ALL", active: true },
  { label: "TRENDING", active: false },
  { label: "INTERNATIONAL", active: false },
  { label: "POLITICS", active: false },
  { label: "BUSINESS", active: false },
];

const featuredArticle = {
  image: "/downloads/mjlob7k1SeIJX4/img/mask-group-4.png",
  title: "Behalf of the undersigned organizations",
  subtitle: "and the millions of members.",
  author: {
    avatar: "/downloads/mjlob7k1SeIJX4/img/vector-5.svg",
    name: "Alex H. Hiller",
    date: "30 September 2021",
  },
};

const articles = [
  {
    image: "/downloads/mjlob7k1SeIJX4/img/mask-group-5.png",
    title: "Under longstan court preced",
    subtitle: "and Nation Labor Relations",
    category: "WORLD",
    comments: 583,
  },
  {
    image: "/downloads/mjlob7k1SeIJX4/img/mask-group-3.png",
    title: "The brutal prison fight first",
    subtitle: "broke out on",
    category: "POLITICS",
    comments: 2442,
  },
  {
    image: "/downloads/mjlob7k1SeIJX4/img/mask-group-6.png",
    title: "Ecuador police storm riot-hit",
    subtitle: "jail where 46 died",
    category: "POLITICS",
    comments: 453,
  },
  {
    image: "/downloads/mjlob7k1SeIJX4/img/rectangle-218.png",
    title: "China hands out at least twice",
    subtitle: "as much",
    category: "WORLD",
    comments: 279,
    vector: "/downloads/mjlob7k1SeIJX4/img/vector-25.svg",
  },
];

export const ProjectsSection = (): JSX.Element => {
  return (
    <section className="relative w-full py-16 px-4 md:px-12 lg:px-20 overflow-hidden bg-[url(/downloads/mjlob7k1SeIJX4/img/vector-3.svg)] bg-[100%_100%]">
      <div className="max-w-[1440px] mx-auto">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 translate-y-[-1rem] animate-fade-in opacity-0">
          <h2 className="[font-family:'Inter',Helvetica] font-bold italic text-[#111111] text-lg tracking-[0] leading-[normal]">
            Recently Added
          </h2>

          <nav className="flex items-center gap-6 md:gap-8">
            {categories.map((category, index) => (
              <button
                key={index}
                type="button"
                aria-pressed={category.active}
                className={`[font-family:'Inter',Helvetica] text-[13px] tracking-[0] leading-[normal] transition-colors hover:text-[#111111] ${
                  category.active ? "font-bold italic text-[#111111]" : "font-normal text-[#888888]"
                }`}
              >
                {category.label}
              </button>
            ))}
          </nav>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <article className="lg:col-span-5 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
            <Card className="relative overflow-hidden border-0 shadow-none bg-transparent h-full">
              <CardContent className="p-0 relative h-full">
                <img
                  className="w-full h-full object-cover"
                  alt="Featured article"
                  src={featuredArticle.image}
                />
                <img
                  className="absolute inset-0 w-full h-full"
                  alt=""
                  aria-hidden="true"
                  src="/downloads/mjlob7k1SeIJX4/img/vector-4.svg"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="[font-family:'Inter',Helvetica] font-bold italic text-white text-2xl tracking-[0] leading-[normal] mb-2">
                    {featuredArticle.title}
                  </h3>
                  <p className="[font-family:'Inter',Helvetica] font-bold italic text-white text-2xl tracking-[0] leading-[normal] mb-6">
                    {featuredArticle.subtitle}
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      className="w-12 h-12"
                      alt={`${featuredArticle.author.name} avatar`}
                      src={featuredArticle.author.avatar}
                    />
                    <div>
                      <div className="[font-family:'Inter',Helvetica] font-bold italic text-white text-[13px] tracking-[0] leading-[normal]">
                        {featuredArticle.author.name}
                      </div>
                      <div className="[font-family:'Inter',Helvetica] font-normal text-[#dddddd] text-xs tracking-[0] leading-[normal]">
                        {featuredArticle.author.date}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </article>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {articles.map((article, index) => (
              <article
                key={index}
                className={`translate-y-[-1rem] animate-fade-in opacity-0 ${
                  index === 3 ? "md:col-span-2" : ""
                }`}
                style={
                  {
                    "--animation-delay": `${400 + index * 200}ms`,
                  } as React.CSSProperties
                }
              >
                <Card className="border-0 shadow-none bg-transparent h-full hover:opacity-80 transition-opacity cursor-pointer">
                  <CardContent className="p-0 flex flex-col h-full">
                    <div className="relative mb-4">
                      {article.vector && (
                        <img
                          className="absolute inset-0 w-full h-full object-cover"
                          alt=""
                          aria-hidden="true"
                          src={article.vector}
                        />
                      )}
                      <img
                        className="w-full h-auto object-cover"
                        alt={article.title}
                        src={article.image}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="[font-family:'Inter',Helvetica] font-bold italic text-[#111111] text-base tracking-[0] leading-[normal] mb-1">
                        {article.title}
                      </h3>
                      <p className="[font-family:'Inter',Helvetica] font-bold italic text-[#111111] text-base tracking-[0] leading-[normal] mb-3">
                        {article.subtitle}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge
                        variant="secondary"
                        className="[font-family:'Inter',Helvetica] font-normal text-[#2a7fff] text-xs tracking-[0] leading-[normal] bg-transparent hover:bg-transparent border-0 px-0"
                      >
                        {article.category}
                      </Badge>
                      <span className="[font-family:'Inter',Helvetica] font-normal text-[#999999] text-xs tracking-[0] leading-[normal]">
                        💬 {article.comments}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
