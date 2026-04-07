"use client";

import { FC, useState, useEffect, useMemo } from "react";
import { useTeamMembersWithCategories, TeamMemberWithCategories } from "../../../hooks/useTeam";
import { X } from "lucide-react";



export const TeamSection: FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMemberWithCategories | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);
  const { data: membersWithCategories, grouped, isLoading } = useTeamMembersWithCategories();

  const sections = useMemo(() => {
    if (!grouped) return [];
    return Object.entries(grouped).map(([categoryName, members]) => ({
      title: categoryName.toUpperCase(),
      categoryName,
      items: members,
    }));
  }, [grouped]);

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

  const handleMemberClick = (member: TeamMemberWithCategories, categoryName: string) => {
    setSelectedMember(member);
    setSelectedCategoryName(categoryName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedMember(null);
      setSelectedCategoryName(null);
    }, 300);
  };

  if (isLoading) {
    return (
      <section className="w-full py-16 px-4 md:px-8 bg-slate-50 min-h-screen" id="team-section">
        <div className="max-w-7xl mx-auto text-center text-slate-500">Loading team members...</div>
      </section>
    );
  }

  if (sections.length === 0) {
    return (
      <section className="w-full py-16 px-4 md:px-8 bg-slate-50 min-h-screen" id="team-section">
        <div className="flex flex-col items-center justify-center py-32 px-4 bg-white rounded-[40px] border border-dashed border-slate-200 animate-fade-in max-w-lg mx-auto">
          <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-3xl bg-slate-50 text-blue-600">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">No Team Members Found</h3>
          <p className="text-slate-500 text-center max-w-sm mb-8 leading-relaxed">
            We're currently preparing information about our team. Check back soon for updates.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-16 px-4 md:px-8 bg-slate-50 min-h-screen" id="team-section">
      <div className="max-w-7xl mx-auto">
        {sections.map((section, idx) => (
          <div key={idx} className="mb-16 last:mb-0">
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-xl font-bold tracking-widest text-[#0b1522] uppercase border-l-4 border-[#0b1522] pl-4">
                {section.title}
              </h3>
              <div className="h-px flex-1 bg-slate-200"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {section.items.map((member: TeamMemberWithCategories) => {
                const category = member.categories.find((c) => c.categoryName === section.categoryName);
                const technicalExpertise = category?.technical_expertise || "";
                const role = category?.role || "";
                const isIndependentConsultant = section.categoryName === "Independent Consultants";

                return (
                  <div
                    key={`${member.id}-${section.categoryName}`}
                    onClick={() => handleMemberClick(member, section.categoryName)}
                    className="group bg-white rounded-2xl p-6 transition-all duration-300 border border-slate-100 shadow-sm relative overflow-hidden flex flex-col items-center text-center cursor-pointer hover:shadow-xl hover:-translate-y-2"
                  >
                    {!isIndependentConsultant && (
                      <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-slate-100 relative border-4 border-white shadow-md group-hover:border-blue-50 transition-colors">
                        {member.profile_photo ? (
                          <img
                            src={member.profile_photo}
                            alt={member.name}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full bg-slate-200" />
                        )}
                      </div>
                    )}
                    <h4 className="font-bold text-[#0b1522] text-lg leading-tight mb-1 group-hover:text-blue-700 transition-colors">
                      {member.name}
                    </h4>

                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                      {technicalExpertise}
                    </p>

                    {role && (
                      <span className="mt-3 px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full">
                        {role}
                      </span>
                    )}
                  </div >
                );
              })}
            </div >
          </div >
        ))}
      </div >

  {/* Detail Modal */}
  {
    isModalOpen && selectedMember && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <div
          className="absolute inset-0 bg-[#0b1522]/60 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={closeModal}
        ></div>
        <div className="relative w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] min-h-0 animate-in fade-in zoom-in-95 duration-300">
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-50 p-2 bg-black/5 hover:bg-black/10 rounded-full transition-colors md:hidden"
          >
            <X className="w-6 h-6 text-slate-700" />
          </button>

          {/* Left Side: Photo (upper half) */}
          <div className="w-full md:w-2/5 md:max-w-[40%] bg-slate-50 flex flex-col items-center text-center relative overflow-hidden border-b md:border-b-0 md:border-r border-slate-100">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-100/50 rounded-bl-[100px] -z-0"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-100/50 rounded-tr-[80px] -z-0"></div>

            {selectedMember.categories.find((c) => c.categoryName === selectedCategoryName)?.categoryName !==
              "Independent Consultants" && (
              <div className="w-full h-[80%] bg-slate-100 relative z-10 overflow-hidden">
                {(selectedMember.photo || selectedMember.profile_photo) ? (
                  <img
                    src={selectedMember.photo || selectedMember.profile_photo}
                    alt={selectedMember.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-200" />
                )}
              </div>
            )}

            <div className="w-full p-6 flex flex-col items-center text-center bg-slate-50">
              <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold leading-tight text-slate-900 relative z-10 mb-2">
                {selectedMember.name}
              </h1>
              <p className="text-blue-600 font-bold uppercase tracking-wide text-xs md:text-sm relative z-10">
                {
                  selectedMember.categories.find((c) => c.categoryName === selectedCategoryName)
                    ?.technical_expertise
                }
              </p>

              {(() => {
                const cat = selectedMember.categories.find((c) => c.categoryName === selectedCategoryName);
                const role = cat?.role;
                return role ? (
                  <div className="mt-4 flex flex-wrap gap-2 justify-center relative z-10">
                    <span className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-full shadow-sm">
                      {role}
                    </span>
                  </div>
                ) : null;
              })()}
            </div>
          </div>

          {/* Right Side: Scrollable Content */}
          <div className="w-full md:w-3/5 md:flex-1 relative flex flex-col min-h-0 bg-white">
            <button
              onClick={closeModal}
              className="hidden md:block absolute top-6 right-6 z-20 p-2 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5 text-slate-400 hover:text-red-500 transition-colors" />
            </button>

            <div className="flex-1 min-h-0 overflow-y-auto p-8 pb-3 md:p-10 md:pb-3 custom-scrollbar overscroll-contain">
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
                {selectedMember.bio && selectedMember.categories[0]?.categoryName !== "Independent Consultants" && (
                  <div className="animate-in slide-in-from-bottom-4 fade-in duration-500 delay-200">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-3">
                      <span className="w-6 h-[2px] bg-blue-500"></span>
                      Biography
                    </h4>
                    <div className="text-slate-600 leading-relaxed space-y-4 text-justify pl-9 text-base">
                      {selectedMember.bio.split("\n\n").map((paragraph, idx) => (
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
            <div className="p-3 border-t border-slate-50 flex justify-center opacity-30 bg-white relative z-10 shrink-0">
              <img
                src="/tac-logo-with-tagline-2.svg"
                alt="TAC Hydro"
                className="h-4 md:h-5 grayscale opacity-70"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

<style>{`
                .custom-scrollbar {
                    scrollbar-width: thin !important;
                    scrollbar-color: #64748b #f1f5f9 !important;
                    overflow-y: auto !important;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 12px !important;
                    display: block !important;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f5f9 !important;
                    border-radius: 10px !important;
                    margin: 10px 0 !important;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #64748b !important;
                    border-radius: 10px !important;
                    border: 3px solid #f1f5f9 !important;
                    min-height: 50px !important;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: #334155 !important;
                }
            `}</style>
    </section >
  );
};
