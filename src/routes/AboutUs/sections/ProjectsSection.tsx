import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";

const navigationItems = [
  { label: "ALL", active: true },
  { label: "TRENDING", active: false },
  { label: "INTERNATIONAL", active: false },
  { label: "POLITICS", active: false },
  { label: "BUSINESS", active: false },
];

const smallArticles = [
  {
    image: "/downloads/mjlodvw6RB1obD/img/mask-group-5.png",
    title: "Under longstan court preced",
    subtitle: "and Nation Labor Relations",
    category: "WORLD",
    comments: "583",
  },
  {
    image: "/downloads/mjlodvw6RB1obD/img/mask-group-3.png",
    title: "The brutal prison fight first",
    subtitle: "broke out on",
    category: "POLITICS",
    comments: "2,442",
  },
  {
    image: "/downloads/mjlodvw6RB1obD/img/mask-group-6.png",
    title: "Ecuador police storm riot-hit",
    subtitle: "jail where 46 died",
    category: "POLITICS",
    comments: "453",
  },
  {
    image: "/downloads/mjlodvw6RB1obD/img/mask-group-6.png",
    title: "Ecuador police storm riot-hit",
    subtitle: "jail where 46 died",
    category: "POLITICS",
    comments: "453",
  },
  {
    image: "/downloads/mjlodvw6RB1obD/img/rectangle-218.png",
    title: "China hands out at least twice",
    subtitle: "as much",
    category: "WORLD",
    comments: "279",
  },
];

export const ProjectsSection = () => {
  return (
    <section
      id="project"
      className="relative w-full overflow-hidden bg-[url(/downloads/mjlodvw6RB1obD/img/vector-3.svg)] bg-[100%_100%] py-16"
    >
      <div className="container mx-auto px-[120px]">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-bold text-[#111111] text-lg leading-[normal]">
            Recently Added
          </h2>

          <nav className="flex items-center gap-8">
            {navigationItems.map((item, index) => (
              <button
                key={index}
                type="button"
                aria-pressed={item.active}
                className={`${item.active ? "font-bold text-[#111111]" : "font-normal text-[#888888]"
                  } text-[13px] leading-[normal] hover:text-[#111111] transition-colors`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <Card className="col-span-5 relative overflow-hidden border-0 shadow-none bg-transparent">
            <CardContent className="p-0 relative h-[620px]">
              <img
                className="absolute inset-0 w-full h-full object-cover"
                alt="Featured project"
                src="/downloads/mjlodvw6RB1obD/img/mask-group-4.png"
              />
              <img
                className="absolute inset-0 w-full h-full"
                alt=""
                aria-hidden="true"
                src="/downloads/mjlodvw6RB1obD/img/vector-4.svg"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="font-bold text-white text-2xl leading-[normal] mb-2">
                  Behalf of the undersigned organizations
                </h3>
                <p className="font-bold text-white text-2xl leading-[normal] mb-6">
                  and the millions of members.
                </p>
                <div className="flex items-center gap-4">
                  <img
                    className="w-[57px] h-[32px]"
                    alt=""
                    aria-hidden="true"
                    src="/downloads/mjlodvw6RB1obD/img/vector-5.svg"
                  />
                  <div>
                    <div className="font-bold text-white text-[13px] leading-[normal]">
                      Alex H. Hiller
                    </div>
                    <div className="font-normal text-[#dddddd] text-xs leading-[normal]">
                      30 September 2021
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="col-span-7 grid grid-cols-2 gap-6">
            {smallArticles.map((article, index) => (
              <Card
                key={index}
                className={`relative overflow-hidden border-0 shadow-none bg-transparent cursor-pointer hover:opacity-80 transition-opacity ${index === 4 ? "col-span-2" : ""
                  }`}
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      className={`w-full object-cover ${index === 4 ? "h-[280px]" : "h-[190px]"}`}
                      alt={article.title}
                      src={article.image}
                    />
                    {index === 4 && (
                      <img
                        className="absolute top-0 left-0 w-[250px] h-[207px] object-cover"
                        alt=""
                        aria-hidden="true"
                        src="/downloads/mjlodvw6RB1obD/img/vector-25.svg"
                      />
                    )}
                  </div>
                  <div className="mt-4">
                    <h4 className="font-bold text-[#111111] text-base leading-[normal]">
                      {article.title}
                    </h4>
                    <p className="font-bold text-[#111111] text-base leading-[normal] mt-1">
                      {article.subtitle}
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      <Badge
                        variant="secondary"
                        className="font-normal text-[#2a7fff] text-xs leading-[normal] bg-transparent hover:bg-transparent px-0"
                      >
                        {article.category}
                      </Badge>
                      <span className="font-normal text-[#999999] text-xs leading-[normal]">
                        💬 {article.comments}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
