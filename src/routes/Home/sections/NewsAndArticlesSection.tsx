import { useState } from "react";
import { useNewsCategories, useNewsItems } from "../../../hooks/useNews";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getImageUrl } from "../../../lib/api";

export const NewsAndArticlesSection = () => {
  const [activeFilter, setActiveFilter] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  const { data: categories, isLoading: isLoadingCategories } = useNewsCategories();
  const { data: newsData, isLoading: isLoadingItems } = useNewsItems(activeFilter, currentPage, pageSize);

  const isLoading = isLoadingCategories || isLoadingItems;

  const categoryMap: Record<number, string> = {};
  categories?.forEach((cat) => {
    categoryMap[cat.id] = cat.name;
  });

  const items = newsData?.items || [];
  const totalPages = newsData?.total_pages || 1;

  const goToPage = (page: number) => {
    setCurrentPage(page);
    const element = document.getElementById("news-and-articles");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <section
        id="news-and-articles"
        className="relative w-full bg-[#f8f9fa] min-h-screen flex flex-col justify-center py-12 lg:py-16 overflow-hidden"
      >
        <div className="relative mx-auto max-w-[1400px] w-full px-6 sm:px-8 lg:px-20">
          <div className="flex flex-col items-center justify-center py-32">
            <div className="animate-pulse text-slate-400">Loading news...</div>
          </div>
        </div>
      </section>
    );
  }

  const filterOptions = [
    { id: null, name: "ALL" },
    ...(categories || []),
  ];

  return (
    <section
      id="news-and-articles"
      className="relative w-full bg-[#f8f9fa] min-h-screen flex flex-col justify-center py-12 lg:py-16 overflow-hidden"
    >
      <div className="relative mx-auto max-w-[1400px] w-full px-6 sm:px-8 lg:px-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold leading-tight font-extrabold text-slate-900">
              News and Articles
            </h1>
          </div>

          <div className="flex flex-wrap gap-3">
            {filterOptions.map((filter) => (
              <button
                key={filter.id ?? "all"}
                type="button"
                onClick={() => {
                  setActiveFilter(filter.id);
                  setCurrentPage(1);
                }}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                  activeFilter === filter.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                    : "bg-white text-slate-500 border border-slate-100 hover:border-blue-200"
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          {items.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item) => (
                  <a
                    key={item.id}
                    href={`/news/${item.id}`}
                    className="group block bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {item.image ? (
                        <img
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          alt={item.title}
                          src={getImageUrl(item.image)}
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-50 to-slate-100" />
                      )}
                      <div className="absolute top-6 left-6">
                        <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold text-blue-600 uppercase tracking-widest shadow-lg">
                          {categoryMap[item.news_category_id] || "NEWS"}
                        </div>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">
                        {item.news_date}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                        {item.title}
                      </h3>
                      <div className="mt-4">
                        <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                          {item.summary}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest">
                        Read More
                        <div className="w-8 h-[1px] bg-blue-600 transform scale-x-50 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Pagination Controls */}
              <div className="mt-12 flex items-center justify-center gap-4">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white border border-slate-100 text-slate-600 transition-all hover:bg-blue-600 hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-slate-600 shadow-sm"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm transition-all ${
                        currentPage === page
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                          : "bg-white border border-slate-100 text-slate-400 hover:border-blue-600 hover:text-blue-600 shadow-sm"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white border border-slate-100 text-slate-600 transition-all hover:bg-blue-600 hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-slate-600 shadow-sm"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 px-4 bg-white rounded-[40px] border border-dashed border-slate-200 animate-fade-in min-h-[500px]">
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
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No Articles Found</h3>
              <p className="text-slate-500 text-center max-w-sm mb-8 leading-relaxed">
                We're currently preparing fresh content for this category. Check back soon for the
                latest updates and in-depth insights.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveFilter(null);
                  setCurrentPage(1);
                }}
                className="px-8 py-3 rounded-2xl bg-slate-100 font-bold text-slate-600 text-sm transition-all hover:bg-blue-600 hover:text-white hover:shadow-xl active:scale-95"
              >
                View All Categories
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
