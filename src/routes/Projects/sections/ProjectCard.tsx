import { Project } from "../data/projectData";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
    project: Project;
    onClick: (project: Project) => void;
}

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
    return (
        <div
            onClick={() => onClick(project)}
            className="group relative bg-white rounded-[32px] overflow-hidden cursor-pointer shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] transition-all duration-500 border border-slate-100 hover:border-blue-100 group"
        >
            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden m-2 rounded-[24px]">
                <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Arrow Icon Reveal */}
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 border border-white/30">
                    <ArrowUpRight className="w-6 h-6 text-white" />
                </div>
            </div>

            {/* Content */}
            <div className="p-6 pt-2">
                <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {project.title}
                </h3>
            </div>
        </div>
    );
};
