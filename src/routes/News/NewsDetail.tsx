"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useNewsDetail } from "../../hooks/useNews";
import { HeaderSection } from "../../components/sections/HeaderSection";
import { FooterSection } from "../../components/sections/FooterSection";
import { Calendar, Tag, ChevronLeft, Link2, Check } from "lucide-react";
import { getImageUrl } from "../../lib/api";

export const NewsDetail = () => {
  const { id } = useParams();
  const { data: news, isLoading } = useNewsDetail(id ? Number(id) : null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const copyToClipboard = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
        <div className="text-center text-slate-500">Loading...</div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">News Not Found</h1>
          <Link href="/" className="text-blue-600 font-bold hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = getImageUrl(news.image);

  return (
    <div className="w-full relative bg-[#f8f9fa]">
      <HeaderSection />

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] lg:h-[70vh] overflow-hidden">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={news.title}
            className="absolute inset-0 w-full h-full object-cover animate-fade-in"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

        <div className="absolute inset-0 flex items-end justify-start pb-20 px-6 sm:px-8 lg:px-20">
          <div className="max-w-4xl mx-auto w-full">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-blue-500/30">
                NEWS
              </span>
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <Calendar className="w-4 h-4" />
                {news.news_date}
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-8">
              {news.title}
            </h1>

            <div className="flex items-center gap-6">
              <Link
                href="/#news-and-events"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-semibold"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to News
              </Link>
              <div className="h-4 w-[1px] bg-white/20" />
              <div className="flex items-center gap-4">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 text-white/60 hover:text-white transition-colors relative group"
                  title="Copy link"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Link2 className="w-4 h-4" />
                  )}
                  {copied && (
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded font-bold animate-fade-in whitespace-nowrap">
                      Link Copied!
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-6 sm:px-8 lg:px-20 min-h-[50vh]">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[40px] p-8 sm:p-12 lg:p-16 shadow-xl shadow-slate-200/50 border border-slate-100 -mt-32 relative z-10 overflow-hidden">
            {/* Glassmorphism accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

            <div className="relative prose prose-slate prose-lg max-w-none">
              <div className="flex items-center gap-2 text-blue-600 mb-8 font-bold text-xs uppercase tracking-widest">
                <Tag className="w-4 h-4" />
                Latest Updates from TAC Hydro
              </div>

              {news.content_html && (
                <div
                  className="text-slate-600 leading-relaxed space-y-6 text-lg"
                  dangerouslySetInnerHTML={{ __html: news.content_html }}
                />
              )}
            </div>

            <div className="mt-16 pt-12 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-slate-900 font-bold">TAC Hydro Consultancy</p>
                    <p className="text-slate-500 text-sm">Engineering for Sustainable Resources</p>
                  </div>
                </div>

                <Link
                  href="/#news-and-events"
                  className="px-8 py-3 rounded-2xl bg-slate-900 text-white font-bold hover:bg-blue-600 transition-all hover:shadow-xl active:scale-95"
                >
                  Explore More News & Events
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};
