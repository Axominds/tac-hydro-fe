
import { FC, useState, useEffect } from "react";
import { TEAM_MEMBERS, TeamMember } from "../data/teamData";
import { cn } from "../../../lib/utils";
import { X } from "lucide-react";

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
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isModalOpen]);

    const handleMemberClick = (member: TeamMember) => {
        setSelectedMember(member);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedMember(null), 300); // Clear after animation
    };

    return (
        <section className="w-full py-16 px-4 md:px-8 bg-slate-50 min-h-screen" id="team-section">
            <div className="max-w-7xl mx-auto">
                {SECTIONS.map((section, idx) => (
                    <div key={idx} className="mb-16 last:mb-0">
                        <div className="flex items-center gap-4 mb-8">
                            <h3 className="text-xl font-bold tracking-widest text-[#0b1522] uppercase border-l-4 border-[#0b1522] pl-4">
                                {section.title}
                            </h3>
                            <div className="h-px flex-1 bg-slate-200"></div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {section.items.map((member) => (
                                <div
                                    key={member.id}
                                    onClick={() => handleMemberClick(member)}
                                    className="group bg-white rounded-2xl p-6 cursor-pointer transition-all duration-300 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 relative overflow-hidden flex flex-col items-center text-center"
                                >
                                    <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-slate-100 relative border-4 border-white shadow-md group-hover:border-blue-50 transition-colors">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <h4 className="font-bold text-[#0b1522] text-lg leading-tight mb-1 group-hover:text-blue-700 transition-colors">
                                        {member.name}
                                    </h4>
                                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                                        {member.position}
                                    </p>

                                    {/* Sub-label for specific category if needed */}
                                    {section.title === "BOARD OF DIRECTORS" && (
                                        <span className="mt-3 px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full">
                                            Board Member
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Detail Modal */}
            {isModalOpen && selectedMember && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    <div
                        className="absolute inset-0 bg-[#0b1522]/60 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={closeModal}
                    ></div>
                    <div className="relative w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] animate-in fade-in zoom-in-95 duration-300">
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 z-50 p-2 bg-black/5 hover:bg-black/10 rounded-full transition-colors md:hidden"
                        >
                            <X className="w-6 h-6 text-slate-700" />
                        </button>

                        {/* Left Side: Photo & Key Info */}
                        <div className="w-full md:w-2/5 bg-slate-50 p-8 flex flex-col items-center text-center justify-center border-b md:border-b-0 md:border-r border-slate-100 relative overflow-hidden text-balance">
                            {/* Decorative elements */}
                            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-100/50 rounded-bl-[100px] -z-0"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-100/50 rounded-tr-[80px] -z-0"></div>

                            <div className="w-56 h-56 rounded-full shadow-2xl overflow-hidden border-[6px] border-white relative z-10 mb-6 group">
                                <img
                                    src={selectedMember.image}
                                    alt={selectedMember.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 relative z-10 leading-tight mb-2">{selectedMember.name}</h2>
                            <p className="text-blue-600 font-bold uppercase tracking-wide text-sm md:text-base relative z-10">{selectedMember.position}</p>

                            <div className="mt-6 flex flex-wrap gap-2 justify-center relative z-10">
                                <span className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-full shadow-sm">
                                    {selectedMember.category}
                                </span>
                            </div>
                        </div>

                        {/* Right Side: Scrollable Content */}
                        <div className="w-full md:w-3/5 relative flex flex-col h-full bg-white">
                            <button
                                onClick={closeModal}
                                className="hidden md:block absolute top-6 right-6 z-20 p-2 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors"
                            >
                                <X className="w-5 h-5 text-slate-400 hover:text-red-500 transition-colors" />
                            </button>

                            <div className="flex-1 overflow-y-auto p-8 md:p-10 custom-scrollbar">
                                <div className="space-y-10">
                                    {/* Education Section */}
                                    {selectedMember.education && (
                                        <div className="animate-in slide-in-from-bottom-4 fade-in duration-500 delay-100">
                                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-3">
                                                <span className="w-6 h-[2px] bg-blue-500"></span>
                                                Education
                                            </h4>
                                            <p className="text-slate-800 text-lg leading-relaxed font-medium pl-9">
                                                {selectedMember.education}
                                            </p>
                                        </div>
                                    )}

                                    {/* Bio Section */}
                                    {selectedMember.bio && (
                                        <div className="animate-in slide-in-from-bottom-4 fade-in duration-500 delay-200">
                                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-3">
                                                <span className="w-6 h-[2px] bg-blue-500"></span>
                                                Biography
                                            </h4>
                                            <div className="text-slate-600 leading-relaxed space-y-4 text-justify pl-9 text-base">
                                                {selectedMember.bio.split('\n\n').map((paragraph, idx) => (
                                                    <p key={idx}>{paragraph}</p>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Fallback if no content */}
                                    {!selectedMember.education && !selectedMember.bio && (
                                        <div className="text-center py-12 text-slate-400 italic">
                                            No additional information available for this team member.
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Bottom styling */}
                            <div className="p-6 border-t border-slate-50 flex justify-center opacity-30 bg-white relative z-10">
                                <img src="/tac-logo-with-tagline-2.svg" alt="TAC Hydro" className="h-6 grayscale" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
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
