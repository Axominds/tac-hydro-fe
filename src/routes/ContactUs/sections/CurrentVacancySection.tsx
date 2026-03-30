import { useState, useEffect, useMemo } from "react";
import {
  XIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  UserIcon,
  ZapIcon,
  FileTextIcon,
  UploadIcon,
} from "lucide-react";
import { cn } from "../../../lib/utils";
import { useJobPostings, useJobCategories } from "../../../hooks/useCareers";
import { Button } from "../../../components/ui/button";
import { JobPosting } from "../../../lib/api";

type JobType = "Full Time" | "Internship" | "Independent Consultant";

const TYPE_CONFIG: Record<
  JobType,
  { label: string; color: string; bgColor: string; accentColor: string }
> = {
  "Full Time": {
    label: "FULL TIME",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    accentColor: "bg-blue-500",
  },
  "Internship": {
    label: "INTERNSHIP",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    accentColor: "bg-emerald-500",
  },
  "Independent Consultant": {
    label: "INDEPENDENT CONSULTANT",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    accentColor: "bg-purple-500",
  },
};

export const CurrentVacancySection = () => {
  const [selectedType, setSelectedType] = useState<JobType | null>("Full Time");
  const [viewingRole, setViewingRole] = useState<JobPosting | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);

  const { data: jobs, isLoading } = useJobPostings();
  const { data: categories } = useJobCategories();

  const categoryMap = useMemo(() => {
    const map: Record<number, string> = {};
    categories?.forEach((cat) => {
      map[cat.id] = cat.name;
    });
    return map;
  }, [categories]);

  const openJobs = useMemo(() => {
    return (jobs || []).filter((job) => job.is_open);
  }, [jobs]);

  const handleApplyClick = (role: JobPosting, e: React.MouseEvent) => {
    e.stopPropagation();
    setViewingRole(role);
  };

  const confirmApplication = () => {
    setViewingRole(null);
    setCvFile(null);
    setCoverLetterFile(null);
    alert("Application Submitted Successfully!");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "cv" | "cover") => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB limit.");
        return;
      }
      if (type === "cv") setCvFile(file);
      else setCoverLetterFile(file);
    }
  };

  const filteredRoles = selectedType
    ? openJobs.filter((role) => role.type === selectedType)
    : [];

  useEffect(() => {
    if (viewingRole) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [viewingRole]);

  if (isLoading) {
    return (
      <section id="active-opportunities" className="w-full py-20 bg-white px-4 sm:px-8 lg:px-20">
        <div className="max-w-7xl mx-auto text-center text-gray-500">Loading opportunities...</div>
      </section>
    );
  }

  return (
    <section id="active-opportunities" className="w-full py-20 bg-white px-4 sm:px-8 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filtering */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="sticky top-32 space-y-8 animate-in fade-in slide-in-from-left duration-700">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold leading-tight uppercase text-slate-400 mb-6 font-black">
                  Job Types
                </h1>
                <nav className="space-y-2">
                  {(Object.keys(TYPE_CONFIG) as JobType[]).map((type) => {
                    const count = openJobs.filter((v) => v.type === type).length;
                    const isActive = selectedType === type;

                    return (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={cn(
                          "w-full flex items-center justify-between px-5 py-4 rounded-2xl text-left transition-all duration-300 group",
                          isActive
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                            : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-100"
                        )}
                      >
                        <span className={cn(
                          "text-sm font-bold transition-colors uppercase tracking-widest",
                          isActive ? "text-white" : "text-slate-700 group-hover:text-blue-600"
                        )}>
                          {type}
                        </span>
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-[10px] font-bold transition-all",
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600"
                        )}>
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
              {selectedType && (
                <div className="sticky top-0 z-[30] -mx-4 px-4 bg-white pt-6 mb-10 border-b border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 gap-6">
                    <div>
                      <h4 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-gray-900 flex items-center gap-3 font-black">
                        <span className={cn("w-2 h-8 rounded-full", TYPE_CONFIG[selectedType].accentColor)} />
                        {selectedType}
                      </h4>
                      <p className="text-gray-500 mt-1 font-medium italic">
                        Viewing {filteredRoles.length} active opportunities
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {filteredRoles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 min-h-[500px]">
                  {filteredRoles.map((role) => (
                    <div
                      key={role.id}
                      className="group bg-[#f8f9fa] border border-gray-100 rounded-2xl p-6 hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col h-full"
                    >
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-4">
                          <span
                            className={cn(
                              "inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                              role.type === "Full Time"
                                ? "bg-blue-100 text-blue-800"
                                : role.type === "Internship"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-purple-100 text-purple-800",
                            )}
                          >
                            {role.type}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                            {categoryMap[role.category] || "General"}
                          </span>
                        </div>
                        <h5 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {role.title}
                        </h5>
                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                          {role.description}
                        </p>
                      </div>
                      <div className="mt-auto pt-6 border-t border-gray-100">
                        <Button
                          onClick={(e) => handleApplyClick(role, e)}
                          className={cn(
                            "w-full rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all text-white",
                            role.type === "Full Time"
                              ? "bg-blue-600 hover:bg-blue-700"
                              : role.type === "Internship"
                                ? "bg-emerald-600 hover:bg-emerald-700"
                                : "bg-purple-600 hover:bg-purple-700",
                          )}
                        >
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  <p className="text-gray-500 font-medium">
                    No roles currently listed for this type.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Premium Modal */}
      {viewingRole && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6 py-10">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#0b1522]/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setViewingRole(null)}
          />

          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-4xl max-h-full rounded-[32px] shadow-2xl overflow-hidden flex flex-col animate-scale-in">
            {/* Modal Header */}
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <span
                  className={cn(
                    "text-[10px] font-black tracking-[0.2em] uppercase mb-1 block",
                    TYPE_CONFIG[viewingRole.type as JobType]?.color || "text-gray-600",
                  )}
                >
                  {viewingRole.type} • {categoryMap[viewingRole.category] || "General"}
                </span>
                <h3 className="text-2xl font-bold text-[#0b1522]">{viewingRole.title}</h3>
              </div>
              <button
                onClick={() => setViewingRole(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <XIcon className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto px-8 py-8">
              <div className="space-y-12">
                {/* Job Overview Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-900">
                    <FileTextIcon className="w-5 h-5 text-blue-600" />
                    <h4 className="font-bold text-lg leading-none">Job Overview</h4>
                  </div>
                  <p className="text-slate-600 text-[15px] leading-relaxed pl-8 text-justify">
                    {viewingRole.description}
                  </p>
                </div>

                {/* Job Details Sections */}
                <div className="grid lg:grid-cols-2 gap-10">
                  {/* Responsibilities */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-blue-600">
                      <BriefcaseIcon className="w-5 h-5" />
                      <h4 className="font-bold text-lg leading-none">Key Responsibilities</h4>
                    </div>
                    <ul className="space-y-3">
                      {viewingRole.responsibilities?.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex gap-4 text-gray-600 text-[14px] leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Qualifications */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-emerald-600">
                      <GraduationCapIcon className="w-5 h-5" />
                      <h4 className="font-bold text-lg leading-none">Qualifications</h4>
                    </div>
                    <ul className="space-y-3">
                      {viewingRole.qualifications?.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex gap-4 text-gray-600 text-[14px] leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Divider */}
                <div className="relative h-px bg-gray-100">
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Application Form (
                    {viewingRole.type === "Independent Consultant"
                      ? "Independent Consultant"
                      : "Individual"}
                    )
                  </span>
                </div>

                {/* Form Sections */}
                <form className="space-y-10 pb-10">
                  {/* Section A: General Information */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-gray-900">
                      <UserIcon className="w-5 h-5" />
                      <h4 className="font-bold text-xl">Section: General Information</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase">
                          First Name *
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase">
                          Middle Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase">
                          Gender *
                        </label>
                        <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all appearance-none bg-white">
                          <option>Select Gender</option>
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section B: Last Qualification */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-gray-900">
                      <GraduationCapIcon className="w-5 h-5" />
                      <h4 className="font-bold text-xl">Section: Last Qualification</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase">
                          Degree Name *
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase">
                          Percentage / Grade / CGPA *
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase">
                          Year Completed *
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase">
                          Specialization *
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">
                          College / University Attended *
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section C: Major Abilities (Hidden for Consultants) */}
                  {viewingRole.type !== "Independent Consultant" && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 text-gray-900">
                        <ZapIcon className="w-5 h-5" />
                        <h4 className="font-bold text-xl">Section: Major Abilities</h4>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase">
                          What are the major abilities regarding the job you have applied for? *
                        </label>
                        <textarea
                          rows={4}
                          placeholder="Briefly describe your core technical and professional strengths..."
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all resize-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* Section D: Professional Details (Conditional fields) */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-gray-900">
                      <BriefcaseIcon className="w-5 h-5" />
                      <h4 className="font-bold text-xl">Section: Professional Details</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {viewingRole.type !== "Independent Consultant" && (
                        <>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-500 uppercase">
                              Software Proficiency *
                            </label>
                            <input
                              type="text"
                              placeholder="e.g., AutoCAD, SAP2000, MS Project"
                              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-500 uppercase">
                              Current Employment Status *
                            </label>
                            <input
                              type="text"
                              placeholder="e.g., Employed, Unemployed, Freelancing"
                              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                            />
                          </div>
                        </>
                      )}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase">
                          Experience Sector *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Hydropower, Construction, Irrigation"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase">
                          Years of Experience *
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                      {viewingRole.type !== "Independent Consultant" && (
                        <>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-500 uppercase">
                              Possible Joining Date *
                            </label>
                            <input
                              type="date"
                              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-500 uppercase">
                              Expected Salary (Monthly / NPR) *
                            </label>
                            <input
                              type="text"
                              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Section E: Upload Documents */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-gray-900">
                      <FileTextIcon className="w-5 h-5" />
                      <h4 className="font-bold text-xl">Section: Upload Documents</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* CV Upload */}
                      <div
                        onClick={() => document.getElementById("cv-upload")?.click()}
                        className={cn(
                          "p-6 border-2 border-dashed rounded-2xl text-center group transition-colors cursor-pointer",
                          cvFile
                            ? "bg-blue-50 border-blue-400"
                            : "bg-gray-50 border-gray-200 hover:border-blue-400",
                        )}
                      >
                        <input
                          id="cv-upload"
                          type="file"
                          className="hidden"
                          accept=".pdf,.docx"
                          onChange={(e) => handleFileChange(e, "cv")}
                        />
                        <UploadIcon
                          className={cn(
                            "w-8 h-8 mx-auto mb-3 transition-colors",
                            cvFile ? "text-blue-600" : "text-gray-400 group-hover:text-blue-500",
                          )}
                        />
                        <h5 className="font-bold text-sm text-gray-900 mb-1">
                          {cvFile ? cvFile.name : "Upload CV / Resume *"}
                        </h5>
                        <p className="text-[10px] text-gray-500">
                          {cvFile
                            ? `${(cvFile.size / 1024 / 1024).toFixed(2)} MB`
                            : "Accepted formats: PDF, DOCX (Max 5MB)"}
                        </p>
                      </div>

                      {/* Cover Letter Upload */}
                      <div
                        onClick={() => document.getElementById("cover-upload")?.click()}
                        className={cn(
                          "p-6 border-2 border-dashed rounded-2xl text-center group transition-colors cursor-pointer",
                          coverLetterFile
                            ? "bg-emerald-50 border-emerald-400"
                            : "bg-gray-50 border-gray-200 hover:border-emerald-400",
                        )}
                      >
                        <input
                          id="cover-upload"
                          type="file"
                          className="hidden"
                          accept=".pdf,.docx"
                          onChange={(e) => handleFileChange(e, "cover")}
                        />
                        <UploadIcon
                          className={cn(
                            "w-8 h-8 mx-auto mb-3 transition-colors",
                            coverLetterFile
                              ? "text-emerald-600"
                              : "text-gray-400 group-hover:text-emerald-500",
                          )}
                        />
                        <h5 className="font-bold text-sm text-gray-900 mb-1">
                          {coverLetterFile ? coverLetterFile.name : "Upload Cover Letter *"}
                        </h5>
                        <p className="text-[10px] text-gray-500">
                          {coverLetterFile
                            ? `${(coverLetterFile.size / 1024 / 1024).toFixed(2)} MB`
                            : "Accepted formats: PDF, DOCX (Max 5MB)"}
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-8 py-6 border-t border-gray-100 bg-white flex items-center justify-end sticky bottom-0 z-10 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
              <Button
                onClick={confirmApplication}
                className="w-full py-7 bg-blue-600 hover:bg-blue-700 rounded-full font-bold text-xl shadow-xl transition-all"
              >
                Submit Application
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
