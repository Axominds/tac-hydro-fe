import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import { Project, projectData, ProjectDivision } from "../data/projectData";
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
    ArrowUpRight
} from "lucide-react";

const divisions: ProjectDivision[] = [
    "Detailed Feasibility Study",
    "Detailed Engineering Design",
    "Construction Supervision",
    "Due Diligence Appraisal",
    "Progress Monitoring and Bill Vetting"
];

export const ProjectSection = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Header logic mirror:
            // < 20: visible
            // scrolling down (> last): hidden
            // scrolling up (< last): visible

            if (currentScrollY < 20) {
                setIsHeaderVisible(true);
            } else if (currentScrollY > lastScrollY) {
                setIsHeaderVisible(false);
            } else if (currentScrollY < lastScrollY) {
                setIsHeaderVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <section id="projects-section" className="relative w-full py-16 lg:py-24 bg-[#f8f9fa]">
            <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">

                {/* Sticky Navigation & Search */}
                <div
                    className={`sticky z-30 bg-[#f8f9fa]/95 backdrop-blur-sm py-4 mb-12 border-b border-slate-200 transition-all duration-300 ${isHeaderVisible ? 'top-[72px] sm:top-[88px]' : 'top-0'
                        }`}
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        {/* Division Nav */}
                        <nav className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                            {divisions.map((division) => (
                                <a
                                    key={division}
                                    href={`#${division.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const element = document.getElementById(division.toLowerCase().replace(/\s+/g, '-'));
                                        if (element) {
                                            const y = element.getBoundingClientRect().top + window.scrollY - 180; // Offset for sticky headers
                                            window.scrollTo({ top: y, behavior: 'smooth' });
                                        }
                                    }}
                                >
                                    {division}
                                </a>
                            ))}
                        </nav>

                        {/* Search Bar */}
                        <div className="relative w-full md:w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
                            />
                        </div>
                    </div>
                </div>

                {/* Project Divisions */}
                <div className="space-y-24 min-h-[50vh]">
                    {divisions.map((division) => {
                        const divisionProjects = projectData.filter(p =>
                            p.division === division &&
                            (p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                p.description.toLowerCase().includes(searchQuery.toLowerCase()))
                        );

                        if (divisionProjects.length === 0 && searchQuery) return null;
                        // Show all divisions if no search, or only matching ones if search is active
                        if (divisionProjects.length === 0) return null;

                        return (
                            <div key={division} className="scroll-mt-48" id={division.toLowerCase().replace(/\s+/g, '-')}>
                                <div className="flex items-center gap-4 mb-8">
                                    <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-blue-600 pl-4">
                                        {division}
                                    </h2>
                                    <div className="h-px bg-slate-200 flex-1" />
                                    <span className="text-sm font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                                        {divisionProjects.length}
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {divisionProjects.map((project) => (
                                        <ProjectCard
                                            key={project.id}
                                            project={project}
                                            onClick={handleProjectClick}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}

                    {/* Empty State */}
                    {projectData.filter(p =>
                        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.description.toLowerCase().includes(searchQuery.toLowerCase())
                    ).length === 0 && (
                            <div className="text-center py-20">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                                    <Search className="w-8 h-8 text-slate-400" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">No projects found</h3>
                                <p className="text-slate-500">
                                    We couldn't find any projects matching "{searchQuery}"
                                </p>
                            </div>
                        )}
                </div>
            </div>

            {/* Project Detail Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-[95vw] lg:max-w-5xl h-[85vh] p-0 overflow-hidden bg-white gap-0 border-0 flex flex-col">
                    {selectedProject && (
                        <>
                            <DialogHeader className="p-6 pb-2 bg-white border-b border-slate-100 flex-shrink-0">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-3">
                                        <span className="inline-flex px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">
                                            {selectedProject.division}
                                        </span>
                                    </div>
                                    <DialogTitle className="text-2xl lg:text-3xl font-bold text-slate-900 leading-tight">
                                        {selectedProject.title}
                                    </DialogTitle>
                                </div>
                            </DialogHeader>

                            <ScrollArea className="flex-1 w-full">
                                <div className="p-6 lg:p-8 space-y-8">
                                    {/* Our Role Section - Now at the top for better visibility */}
                                    <div className="bg-blue-600 rounded-2xl p-6 lg:p-8 text-white shadow-lg shadow-blue-200">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                                <ShieldCheck className="w-5 h-5 text-white" />
                                            </div>
                                            <h3 className="text-xl font-bold">Our Technical Role</h3>
                                        </div>
                                        <p className="text-blue-50 leading-relaxed text-lg font-medium">
                                            {selectedProject.role}
                                        </p>
                                    </div>

                                    {/* Images Grid */}
                                    {selectedProject.images && selectedProject.images.length > 0 && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {selectedProject.images.slice(0, 4).map((image, idx) => (
                                                <div key={idx} className="relative aspect-video rounded-xl overflow-hidden shadow-sm group">
                                                    <img
                                                        src={image}
                                                        alt={`${selectedProject.title} view ${idx + 1}`}
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                        {/* Technical Highlights - Grid Layout */}
                                        <div className="lg:col-span-2">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                                                <h3 className="text-xl font-bold text-slate-900">Technical Specifications</h3>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {Object.entries(selectedProject.technicalHighlights).map(([key, value]) => {
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
                                                        <div key={key} className="flex gap-4 p-4 rounded-xl border border-slate-100 bg-white hover:border-blue-100 transition-colors">
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
                                                })}
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
                                                    "{selectedProject.description}"
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollArea>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </section >
    );
};
