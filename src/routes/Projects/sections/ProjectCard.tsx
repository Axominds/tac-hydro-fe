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
            className="group relative bg-white rounded-[24px] overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100"
        >
            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                {/* Arrow Icon Reveal */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 border border-white/20">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="mb-2">
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider">
                        {project.division}
                    </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {project.title}
                </h3>
                <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
                    {project.description}
                </p>
            </div>
        </div>
    );
};
