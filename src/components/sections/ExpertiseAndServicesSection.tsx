import { useMemo } from "react";
import { Briefcase, Settings, Users, Lightbulb } from "lucide-react";
import { useExpertiseCategories } from "../../hooks/useExpertiseCategories";
import { useExpertiseItems } from "../../hooks/useExpertiseItems";
import { useProjectScopes } from "../../hooks/useProjectScopes";
import { useSiteSettings } from "../../hooks/useSiteSettings";

const iconMap: Record<string, React.ElementType> = {
  briefcase: Briefcase,
  settings: Settings,
  users: Users,
  lightbulb: Lightbulb,
};

const colorMap: Record<string, { bg: string; icon: string; hover: string; border: string }> = {
  blue: { bg: "from-blue-500/10 to-blue-600/5", icon: "text-blue-600", hover: "hover:bg-blue-600", border: "hover:border-blue-600" },
  emerald: { bg: "from-emerald-500/10 to-emerald-600/5", icon: "text-emerald-600", hover: "hover:bg-emerald-600", border: "hover:border-emerald-600" },
  amber: { bg: "from-amber-500/10 to-amber-600/5", icon: "text-amber-600", hover: "hover:bg-amber-600", border: "hover:border-amber-600" },
  purple: { bg: "from-purple-500/10 to-purple-600/5", icon: "text-purple-600", hover: "hover:bg-purple-600", border: "hover:border-purple-600" },
};

const defaultColors = { bg: "from-blue-500/10 to-blue-600/5", icon: "text-blue-600", hover: "hover:bg-blue-600", border: "hover:border-blue-600" };

export const ExpertiseAndServicesSection = () => {
  const { data: categories, isLoading: categoriesLoading } = useExpertiseCategories();
  const { data: items, isLoading: itemsLoading } = useExpertiseItems();
  const { data: projectScopes } = useProjectScopes();
  const { data: siteSettings } = useSiteSettings();

  const scopeMap = useMemo(() => {
    const map: Record<number, string> = {};
    projectScopes?.forEach((scope) => {
      map[scope.id] = scope.name;
    });
    return map;
  }, [projectScopes]);

  if (categoriesLoading || itemsLoading) {
    return (
      <section id="expertise-and-services" className="w-full bg-[#f8f9fa] min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-slate-400">Loading expertise...</div>
      </section>
    );
  }

  if (!categories?.length) {
    return (
      <section id="expertise-and-services" className="relative w-full bg-[#f8f9fa] min-h-screen flex items-center justify-center py-8 overflow-hidden">
        <div className="flex flex-col items-center justify-center py-32 px-4 bg-white rounded-[40px] border border-dashed border-slate-200 animate-fade-in max-w-lg mx-4">
          <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-3xl bg-slate-50 text-blue-600">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">No Expertise Found</h3>
          <p className="text-slate-500 text-center max-w-sm mb-8 leading-relaxed">
            We're currently preparing our expertise and services content. Check back soon for updates.
          </p>
        </div>
      </section>
    );
  }

  const groupedItems = categories.map((cat) => {
    const catItems = items?.filter((item) => item.category_id === cat.id) ?? [];
    const Icon = iconMap[cat.icon_key] || Briefcase;
    const colors = colorMap[cat.theme_color || ""] || defaultColors;

    return {
      categoryId: cat.id,
      title: cat.title,
      icon: Icon,
      color: colors.bg,
      iconColor: colors.icon,
      hoverBg: colors.hover,
      hoverBorder: colors.border,
      items: catItems.map((item) => ({
        title: item.title,
        projectScope: item.project_scope_id,
      })),
    };
  });

  return (
    <section
      id="expertise-and-services"
      className="relative w-full bg-[#f8f9fa] min-h-screen flex items-center justify-center py-8 overflow-hidden"
    >
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-50" />

      <div className="relative mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-20">
        <div className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold leading-tight text-slate-900">
            Our Expertise and Services
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {groupedItems.map((category) => (
            <div
              key={category.categoryId}
              className={`group relative flex flex-col p-6 rounded-[24px] bg-white border border-slate-200 ${category.hoverBorder} ${category.hoverBg} transition-all duration-500 overflow-hidden cursor-default min-h-[400px] items-start justify-start text-center`}
            >
              <div className="flex flex-col z-10 transition-all duration-500 items-center w-full">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-blue-50 group-hover:bg-white/20 mb-4 transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-1">
                    <category.icon
                      className={`w-8 h-8 ${category.iconColor} group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-[360deg]`}
                    />
                  </div>

                  <h3 className="text-xl lg:text-2xl font-bold text-slate-900 group-hover:text-white transition-colors duration-500 mb-4">
                    {category.title}
                  </h3>
                </div>

                <div className="w-full">
                  <ul className="space-y-3 pb-2 flex flex-col items-start px-4">
                    {category.items.map((item, itemIdx) => {
                      const scopeName = item.projectScope ? scopeMap[item.projectScope] : null;

                      const content = (
                        <>
                          <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110 group-hover/item:scale-110 group-hover/item:rotate-[10deg] group-hover/item:translate-x-1">
                            <svg
                              viewBox="0 0 24 24"
                              className="w-3 h-3 text-blue-600 transition-all duration-300 group-hover:text-white group-hover:scale-110 group-hover/item:scale-110 group-hover/item:rotate-[360deg]"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M9.55 17.2 4.8 12.45l1.4-1.4 3.35 3.35 8.25-8.25 1.4 1.4z" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium text-slate-600 group-hover:text-white/90 leading-snug transition-all text-left group-hover/item:translate-x-1">
                            {item.title}
                          </span>
                        </>
                      );

                      return (
                        <li key={itemIdx} className="group/item flex items-start gap-3">
                          {scopeName ? (
                            <a
                              href={`/projects?scope=${encodeURIComponent(scopeName)}`}
                              className="flex items-start gap-3 w-full hover:opacity-80 transition-opacity"
                            >
                              {content}
                            </a>
                          ) : (
                            content
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-bl-[60px] group-hover:bg-white/10 transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
