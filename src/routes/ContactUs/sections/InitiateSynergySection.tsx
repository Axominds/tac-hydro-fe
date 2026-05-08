import { useState, useRef } from "react";
import { Mail, Phone, ArrowRight, FileText, Upload, CheckCircle, AlertCircle } from "lucide-react";
import { useSiteSettings } from "../../../hooks/useSiteSettings";
import { apiFetch } from "../../../lib/api";

export const InitiateSynergySection = () => {
  const { data: settings } = useSiteSettings();
  const [fileName, setFileName] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    rep_name: "",
    organization: "",
    email: "",
    phone: "",
    website: "",
    collab_type: "",
    company_profile: "",
    proposal_brief: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file?.size > 10 * 1024 * 1024) {
      alert("File size exceeds 10MB limit.");
      return;
    }
    setFileName(file?.name || "");
    setSelectedFile(file || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("rep_name", formData.rep_name);
      formDataToSend.append("organization", formData.organization);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      if (formData.website) formDataToSend.append("website", formData.website);
      if (formData.collab_type) formDataToSend.append("collab_type", formData.collab_type);
      if (formData.company_profile) formDataToSend.append("company_profile", formData.company_profile);
      if (formData.proposal_brief) formDataToSend.append("proposal_brief", formData.proposal_brief);
      if (selectedFile) formDataToSend.append("attachment", selectedFile);

      await apiFetch<{ message: string }>("/api/contact-us/collaboration/", {
        method: "POST",
        body: formDataToSend,
      });
      setStatus("success");
      setFormData({
        rep_name: "",
        organization: "",
        email: "",
        phone: "",
        website: "",
        collab_type: "",
        company_profile: "",
        proposal_brief: "",
      });
      setFileName("");
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      setStatus("error");
      setErrorMessage("Failed to submit. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="initiate-synergy"
      className="relative w-full py-12 lg:py-16 bg-[#f8f9fa] flex items-center"
    >
      <div className="mx-auto max-w-[1100px] px-4 sm:px-8 lg:px-12 w-full">
        <div className="bg-white rounded-[32px] shadow-[0_30px_60px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col lg:flex-row">
          {/* Left Sidebar - Deep Blue/Gradient */}
          <div className="lg:w-[360px] bg-[#0f1a2e] relative p-8 lg:p-10 flex flex-col justify-between text-white overflow-hidden shrink-0">
            <div className="relative z-10 text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold leading-tight mb-4">
                INITIATE
                <br />
                SYNERGY
              </h1>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Briefly describe your proposal or project requirement. Our strategic lead will
                respond within 48 hours.
              </p>
            </div>

            <div className="relative z-10 flex flex-col gap-5 mt-10 lg:mt-0">
              {settings?.collaboration_email && (
                <div className="flex items-start gap-3 group cursor-pointer text-left">
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#0070c0] transition-colors duration-300 shrink-0">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-0.5">
                      Direct Email
                    </p>
                    <a
                      href={`mailto:${settings.collaboration_email}`}
                      className="text-sm font-semibold hover:text-[#0070c0] transition-colors whitespace-nowrap block"
                    >
                      {settings.collaboration_email}
                    </a>
                  </div>
                </div>
              )}
              {settings?.phone && (
                <div className="flex items-start gap-3 group cursor-pointer text-left">
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#d4002a] transition-colors duration-300 shrink-0">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-0.5">
                      Direct Line
                    </p>
                    <a
                      href={`tel:${settings.phone.replace(/\D/g, "")}`}
                      className="text-sm font-semibold hover:text-[#d4002a] transition-colors"
                    >
                      {settings.phone}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Form Area */}
          <div className="flex-1 p-6 sm:p-10 bg-white text-left">
            {status === "success" && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-700">
                <CheckCircle className="w-5 h-5 shrink-0" />
                <p className="font-medium">Thank you! Your collaboration inquiry has been submitted successfully.</p>
              </div>
            )}
            {status === "error" && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="font-medium">{errorMessage}</p>
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                    Representative Name*
                  </label>
                  <input
                    type="text"
                    name="rep_name"
                    value={formData.rep_name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#0070c0] focus:ring-2 focus:ring-[#0070c0]/10 outline-none transition-all placeholder:text-gray-400 text-sm"
                    placeholder="Full Name"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                    Organization*
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#0070c0] focus:ring-2 focus:ring-[#0070c0]/10 outline-none transition-all placeholder:text-gray-400 text-sm"
                    placeholder="Organization Name"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                    Contact Email*
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#0070c0] focus:ring-2 focus:ring-[#0070c0]/10 outline-none transition-all placeholder:text-gray-400 text-sm"
                    placeholder="email@example.com"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                    Contact Phone*
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#0070c0] focus:ring-2 focus:ring-[#0070c0]/10 outline-none transition-all placeholder:text-gray-400 text-sm"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                    Company Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#0070c0] focus:ring-2 focus:ring-[#0070c0]/10 outline-none transition-all placeholder:text-gray-400 text-sm"
                    placeholder="https://"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                    Collaboration Type
                  </label>
                  <div className="relative">
                    <select
                      name="collab_type"
                      value={formData.collab_type}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#0070c0] focus:ring-2 focus:ring-[#0070c0]/10 outline-none transition-all appearance-none cursor-pointer text-gray-700 text-sm"
                    >
                      <option value="">Select Type</option>
                      <option value="jv">Strategic Joint Venture (JV)</option>
                      <option value="market">International Market Collaboration</option>
                      <option value="technical">Technical Expertise Partnerships</option>
                      <option value="research">Research Partnerships</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-3.5 h-3.5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                  Company Profile / Overview*
                </label>
                <textarea
                  name="company_profile"
                  value={formData.company_profile}
                  onChange={handleChange}
                  required
                  rows={2}
                  className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#0070c0] focus:ring-2 focus:ring-[#0070c0]/10 outline-none transition-all resize-none placeholder:text-gray-400 text-sm"
                  placeholder="Brief overview of your company..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                  Project Brief / Proposal
                </label>
                <input
                  type="text"
                  name="proposal_brief"
                  value={formData.proposal_brief}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#0070c0] focus:ring-2 focus:ring-[#0070c0]/10 outline-none transition-all placeholder:text-gray-400 text-sm"
                  placeholder="Short description or title of proposal"
                />
              </div>

              <div
                onClick={handleUploadClick}
                className="border-2 border-dashed border-blue-100 rounded-xl p-6 text-center hover:border-[#0070c0] hover:bg-blue-50/50 transition-all cursor-pointer group bg-gray-50/50"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300 text-[#0070c0]">
                    {fileName ? <FileText className="w-5 h-5" /> : <Upload className="w-5 h-5" />}
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    {fileName ? (
                      <span className="text-[#0070c0]">{fileName}</span>
                    ) : (
                      <>
                        <span className="text-[#0070c0]">Click to upload</span> or drag and drop
                      </>
                    )}
                  </div>
                  {!fileName && <p className="text-[10px] text-gray-400">PDF, DOCX up to 10MB</p>}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-xl bg-[#0070c0] hover:bg-[#005a9e] text-white font-bold text-sm shadow-[0_10px_30px_rgba(0,112,192,0.3)] hover:shadow-[0_15px_40px_rgba(0,112,192,0.4)] hover:-translate-y-1 transition-all duration-300 uppercase tracking-widest flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {isLoading ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      Initialize Collaboration
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </section>
  );
};
