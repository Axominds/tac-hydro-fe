"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import { ProjectCard } from "./ProjectCard";
import { ScrollArea } from "../../../components/ui/scroll-area";

import {
  Search,
  MapPin,
  Zap,
  Droplets,
  Waves,
  Maximize,
  Settings,
  ShieldCheck,
  ArrowUpRight,
  ZoomIn,
} from "lucide-react";
import { ImageViewer } from "../../../components/ui/ImageViewer";
import { useProjectScopes } from "../../../hooks/useProjectScopes";
import { useProjectsWithScopes, useProjectDetail } from "../../../hooks/useProjects";

export type ProjectFromAPI = ReturnType<typeof useProjectsWithScopes>["data"] extends
  | (infer T)[]
  | undefined
  ? T
  : never;

export const ProjectSection = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState<ProjectFromAPI | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeScope, setActiveScope] = useState<string>("Detailed Feasibility Study");
  const [viewerImageIndex, setViewerImageIndex] = useState<number | null>(null);

  const { data: scopes, isLoading: scopesLoading } = useProjectScopes();
  const { data: projects, isLoading: projectsLoading } = useProjectsWithScopes();
  const { data: projectDetail, isLoading: projectDetailLoading } = useProjectDetail(
    selectedProject ? selectedProject.id : null,
  );

  const scopeNames = useMemo(() => scopes?.map((s) => s.name) || [], [scopes]);

  // Merge list data with detail data
  const modalData = useMemo(() => {
    if (!selectedProject) return null;
    return {
      ...selectedProject,
      ...projectDetail,
      role: projectDetail?.description ? selectedProject.role : null,
    };
  }, [selectedProject, projectDetail]);

  const urlScope = (() => {
    const scopeParam = searchParams.get("scope");
    return scopeParam && scopeNames.includes(scopeParam) ? scopeParam : null;
  })();

  const effectiveScope = urlScope ?? activeScope;

  useEffect(() => {
    const section = document.getElementById("projects-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [effectiveScope]);

  const handleProjectClick = (project: ProjectFromAPI) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    return projects
      .filter((p) => {
        const matchesScope = p.scopes?.some((s) => s.name === effectiveScope);
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesScope && matchesSearch;
      })
      .sort((a, b) => b.installed_capacity - a.installed_capacity);
  }, [projects, effectiveScope, searchQuery]);

  if (scopesLoading || projectsLoading) {
    return (
      <section
        id="projects-section"
        className="relative w-full py-16 lg:py-24 bg-[#f8f9fa] min-h-screen flex items-center justify-center"
      >
        <div className="animate-pulse text-slate-400">Loading projects...</div>
      </section>
    );
  }

  if (!scopes?.length || !projects?.length) {
    return (
      <section
        id="projects-section"
        className="relative w-full bg-[#f8f9fa] min-h-screen flex items-center justify-center py-16 lg:py-24"
      >
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
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">No Projects Found</h3>
          <p className="text-slate-500 text-center max-w-sm mb-8 leading-relaxed">
            We're currently preparing our project portfolio. Check back soon for updates on our
            completed and ongoing projects.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects-section"
      className="relative w-full py-16 lg:py-24 bg-[#f8f9fa] min-h-screen"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar / Sidebar filtering */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="sticky top-32 space-y-8 animate-in fade-in slide-in-from-left duration-700">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold leading-tight uppercase text-slate-400 mb-6">
                  Project Scopes
                </h1>
                <nav className="space-y-2">
                  {scopes.map((scope) => {
                    const scopeProjects = projects.filter((p) =>
                      p.scopes?.some((s) => s.name === scope.name),
                    );
                    const count = scopeProjects.length;
                    const totalCapacity = scopeProjects.reduce(
                      (sum, p) => sum + p.installed_capacity,
                      0,
                    );
                    const isActive = effectiveScope === scope.name;

                    return (
                      <button
                        key={scope.id}
                        onClick={() => {
                          router.replace(`/projects?scope=${encodeURIComponent(scope.name)}`, {
                            scroll: false,
                          });
                        }}
                        className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-left transition-all duration-300 group ${
                          isActive
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                            : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-100"
                        }`}
                      >
                        <span
                          className={`text-sm font-bold ${isActive ? "text-white" : "text-slate-700"}`}
                        >
                          {scope.name}
                          <span
                            className={`block text-xs font-semibold ${isActive ? "text-white/80" : "text-slate-400"}`}
                          >
                            ({totalCapacity.toFixed(2)} MW)
                          </span>
                        </span>
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600"
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
            <div className="relative h-full">
              <div className="sticky top-0 z-[30] -mx-4 px-4 bg-[#f8f9fa] pt-6 mb-10 border-b border-slate-200/60">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 gap-6">
                  <div>
                    <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold leading-tight font-black text-slate-900">
                      {effectiveScope}
                    </h1>
                    <p className="text-slate-500 mt-1 font-medium italic">
                      Showing {filteredProjects.length} projects in this category
                    </p>
                  </div>

                  <div className="relative w-full sm:w-72 lg:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search projects..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all placeholder:text-slate-400 shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 min-h-[500px] content-start">
                  {filteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} onClick={handleProjectClick} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-100">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                    <Search className="w-8 h-8 text-slate-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">No projects found</h3>
                  <p className="text-slate-500 max-w-xs">
                    We couldn't find any projects matching "{searchQuery}" in this category.
                  </p>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="mt-6 text-blue-600 font-bold hover:underline"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[95vw] lg:max-w-5xl h-[85vh] p-0 overflow-hidden bg-white gap-0 border-0 flex flex-col">
          <DialogTitle className="sr-only">Project Details</DialogTitle>
          {projectDetailLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="animate-pulse text-slate-400">Loading project details...</div>
            </div>
          ) : modalData ? (
            <>
              <DialogHeader className="p-6 pb-2 bg-white border-b border-slate-100 flex-shrink-0">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">
                      {modalData.scope}
                    </span>
                  </div>
                  <DialogTitle className="text-2xl lg:text-3xl font-bold text-slate-900 leading-tight">
                    {modalData.title} ({modalData.installed_capacity}{" "}
                    {modalData.installed_capacity_unit})
                  </DialogTitle>
                </div>
              </DialogHeader>

              <ScrollArea className="flex-1 w-full">
                <div className="p-6 lg:p-8 space-y-8">
                  {/* Our Role Section - Now at the top for better visibility */}
                  {modalData.role && (
                    <div className="bg-blue-600 rounded-2xl p-6 lg:p-8 text-white shadow-lg shadow-blue-200">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                          <ShieldCheck className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-xl font-bold">Our Technical Role</h3>
                      </div>
                      <p className="text-blue-50 leading-relaxed text-lg font-medium">
                        {modalData.role}
                      </p>
                    </div>
                  )}

                  {/* Images Grid */}
                  {modalData.image_urls && modalData.image_urls.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {modalData.image_urls.slice(0, 4).map((image, idx) => (
                        <div
                          key={idx}
                          onClick={() => setViewerImageIndex(idx)}
                          className="relative aspect-video rounded-xl overflow-hidden shadow-sm group cursor-pointer"
                        >
                          <img
                            src={image}
                            alt={`${modalData.title} view ${idx + 1}`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                            decoding="async"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                            <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300 w-6 h-6" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Technical Highlights - Grid Layout */}
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                        <h3 className="text-xl font-bold text-slate-900">
                          Technical Specifications
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {Object.entries(modalData.technical_highlights || {}).map(
                          ([key, value]) => {
                            // Icon Selection Logic based on Standard 10 Points
                            let Icon = Settings;
                            const lowerKey = key.toLowerCase();

                            if (lowerKey.includes("location")) Icon = MapPin;
                            if (lowerKey.includes("capacity")) Icon = Zap;
                            if (lowerKey.includes("discharge")) Icon = Droplets;
                            if (lowerKey.includes("flood")) Icon = Waves;
                            if (lowerKey.includes("head")) Icon = ArrowUpRight;
                            if (lowerKey.includes("headrace")) Icon = Maximize;
                            if (lowerKey.includes("penstock")) Icon = Maximize;
                            if (lowerKey.includes("thickness")) Icon = ShieldCheck;

                            return (
                              <div
                                key={key}
                                className="flex gap-4 p-4 rounded-xl border border-slate-100 bg-white hover:border-blue-100 transition-colors"
                              >
                                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center">
                                  <Icon className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="flex flex-col">
                                  <dt className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-0.5">
                                    {key}
                                  </dt>
                                  <dd className="text-slate-900 font-bold text-sm leading-tight">
                                    {value}
                                  </dd>
                                </div>
                              </div>
                            );
                          },
                        )}
                      </div>
                    </div>

                    {/* Project Overview Sidebar */}
                    <div className="lg:col-span-1">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-1.5 h-6 bg-slate-400 rounded-full" />
                        <h3 className="text-xl font-bold text-slate-900">Project Overview</h3>
                      </div>
                      <div className="prose prose-slate max-w-none bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <p className="text-slate-600 leading-relaxed italic">
                          "{modalData.description || "No description available."}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </>
          ) : null}
        </DialogContent>
      </Dialog>

      {selectedProject && modalData.image_urls && modalData.image_urls.length > 0 && (
        <ImageViewer
          images={modalData.image_urls}
          initialIndex={viewerImageIndex ?? 0}
          isOpen={viewerImageIndex !== null}
          onClose={() => setViewerImageIndex(null)}
        />
      )}
    </section>
  );
};
