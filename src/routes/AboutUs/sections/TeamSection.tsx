
import { FC, useState } from "react";
import { TEAM_MEMBERS, TeamMember } from "../data/teamData";
import { cn } from "../../../lib/utils";

// Categorize members
const BOARD_OF_DIRECTORS = TEAM_MEMBERS.filter(m => m.category === "BOD");
const DEPARTMENT_HEADS = TEAM_MEMBERS.filter(m => m.category === "Department Heads");
const DESIGN_HEADS = TEAM_MEMBERS.filter(m => m.category === "Design Heads");
const ENGINEER_PROFESSIONALS = TEAM_MEMBERS.filter(m => m.category === "Engineering Professionals");

const SECTIONS = [
    { title: "BOARD OF DIRECTORS", items: BOARD_OF_DIRECTORS },
    { title: "DEPARTMENT HEADS", items: DEPARTMENT_HEADS },
    { title: "DESIGN HEADS", items: DESIGN_HEADS },
    { title: "OUR PROFESSIONALS", items: ENGINEER_PROFESSIONALS },
];

export const TeamSection: FC = () => {
    // Default to the first member (Chairman)
    const [selectedMember, setSelectedMember] = useState<TeamMember>(TEAM_MEMBERS[0]);

    return (
        <section className="w-full py-16 px-4 md:px-8 bg-slate-50 min-h-screen" id="team-section">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 relative">

                {/* Left Panel: Member List */}
                <div className="w-full lg:w-1/2 lg:pr-8 overflow-y-auto max-h-[calc(100vh-120px)] hide-scrollbar pb-20">
                    {SECTIONS.map((section, idx) => (
                        <div key={idx} className="mb-12">
                            <div className="flex items-center gap-4 mb-8">
                                <h3 className="text-sm font-bold tracking-widest text-slate-400 uppercase">
                                    {section.title}
                                </h3>
                                <div className="h-px flex-1 bg-slate-200 border-t border-dashed border-slate-300"></div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {section.items.map((member) => (
                                    <div
                                        key={member.id}
                                        onClick={() => setSelectedMember(member)}
                                        className={cn(
                                            "bg-white rounded-2xl p-6 cursor-pointer transition-all duration-300 group border-2 relative overflow-hidden shadow-sm hover:shadow-md",
                                            selectedMember.id === member.id
                                                ? "border-blue-900 ring-1 ring-blue-900"
                                                : "border-transparent hover:border-blue-100"
                                        )}
                                    >
                                        <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4 bg-slate-100 relative">
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            {/* Overlay on hover */}
                                            <div className="absolute inset-0 bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>
                                        <h4 className="font-bold text-[#0b1522] text-lg group-hover:text-blue-700 transition-colors">
                                            {member.name}
                                        </h4>
                                        <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider mt-1">
                                            {member.position}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Panel: Detail View (Sticky) */}
                <div className="hidden lg:block w-1/2 relative">
                    <div className="sticky top-24 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 h-[calc(100vh-8rem)] flex flex-col overflow-hidden">
                        {/* Decorative Top Curve */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-bl-[100%] rounded-tr-[2.5rem] z-0"></div>

                        <div className="relative z-10 flex-1 overflow-y-auto p-8 custom-scrollbar">
                            {/* Key: Forces animation re-render when member changes */}
                            <div key={selectedMember.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">

                                {/* Image & Name Header */}
                                <div className="flex flex-col gap-6 mb-8">
                                    <div className="w-40 h-40 rounded-3xl overflow-hidden shadow-lg ring-4 ring-white border border-slate-100">
                                        <img
                                            src={selectedMember.image}
                                            alt={selectedMember.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold tracking-wider uppercase rounded-full mb-3">
                                            {selectedMember.category}
                                        </div>
                                        <h2 className="text-4xl font-extrabold text-[#0b1522] leading-tight mb-2">
                                            {selectedMember.name}
                                        </h2>
                                        <p className="text-xl text-blue-600 font-bold">
                                            {selectedMember.position}
                                        </p>
                                    </div>
                                </div>

                                {/* Education Box */}
                                {selectedMember.education && (
                                    <div className="bg-slate-50 rounded-xl p-5 mb-8 border border-slate-100">
                                        <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                                            Education
                                        </h5>
                                        <p className="text-[#0b1522] font-semibold italic">
                                            {selectedMember.education}
                                        </p>
                                    </div>
                                )}

                                {/* Biography */}
                                {selectedMember.bio && (
                                    <div>
                                        <div className="flex items-center gap-4 mb-4">
                                            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                                Professional Biography
                                            </h5>
                                            <div className="h-px flex-1 bg-slate-200"></div>
                                        </div>
                                        <p className="text-slate-600 leading-relaxed whitespace-pre-line text-justify">
                                            {selectedMember.bio}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Bottom Decoration */}
                        <div className="mt-auto pt-8 flex justify-center opacity-20">
                            <img src="/tac-logo-with-tagline-2.svg" alt="TAC Hydro" className="h-8 grayscale" />
                        </div>
                    </div>
                </div>

                {/* Mobile Detail Modal/Overlay logic could go here, but for now scrolling listing is fine for mobile */}
                {/* A simple sticky footer for mobile indicating "Select a member" or linking to details could be added if needed */}
            </div>

            <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #cbd5e1;
                    border-radius: 20px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: #94a3b8;
                }
            `}</style>
        </section>
    );
};
