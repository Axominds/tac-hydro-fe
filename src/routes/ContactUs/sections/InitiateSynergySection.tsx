import { useState, useRef } from "react";
import { Mail, Phone, ArrowRight, FileText, Upload, CheckCircle, AlertCircle } from "lucide-react";
import { useSiteSettings } from "../../../hooks/useSiteSettings";
import { apiFetch } from "../../../lib/api";

const validateForm = (formData: {
  rep_name: string;
  organization: string;
  email: string;
  phone: string;
  website: string;
  company_profile: string;
  proposal_brief: string;
}) => {
  const errors: Record<string, string> = {};

  if (!formData.rep_name.trim()) {
    errors.rep_name = "Name is required.";
  } else if (formData.rep_name.trim().length < 2) {
    errors.rep_name = "Name must be at least 2 characters long.";
  } else if (formData.rep_name.trim().length > 100) {
    errors.rep_name = "Name cannot exceed 100 characters.";
  } else if (!/^[a-zA-Z\s'\-]+$/.test(formData.rep_name.trim())) {
    errors.rep_name = "Name can only contain alphabetical characters, spaces, hyphens, and apostrophes.";
  }

  if (!formData.organization.trim()) {
    errors.organization = "Organization is required.";
  } else if (formData.organization.trim().length < 2) {
    errors.organization = "Organization must be at least 2 characters long.";
  } else if (formData.organization.trim().length > 200) {
    errors.organization = "Organization cannot exceed 200 characters.";
  }

  if (!formData.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!formData.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!/^\+?[0-9\s\-\(\)]+$/.test(formData.phone.trim())) {
    errors.phone = "Phone number can only contain digits, spaces, hyphens, parentheses, and start with +.";
  } else {
    const digits = formData.phone.replace(/\D/g, "");
    if (digits.length < 7 || digits.length > 20) {
      errors.phone = "Phone number must contain between 7 and 20 digits.";
    }
  }

  if (formData.website.trim() && !/^https?:\/\/.+/.test(formData.website.trim())) {
    errors.website = "Enter a valid URL starting with http:// or https://.";
  }

  if (!formData.company_profile.trim()) {
    errors.company_profile = "Company profile is required.";
  } else if (formData.company_profile.trim().length < 10) {
    errors.company_profile = "Company profile must be at least 10 characters long.";
  } else if (formData.company_profile.length > 5000) {
    errors.company_profile = "Company profile cannot exceed 5000 characters.";
  }

  if (formData.proposal_brief.length > 1000) {
    errors.proposal_brief = "Proposal brief cannot exceed 1000 characters.";
  }

  return errors;
};

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
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errors = validateForm(formData);
    if (errors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: errors[name] }));
    } else {
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedExtensions = [".pdf", ".doc", ".docx"];
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!ext || !allowedExtensions.includes(`.${ext}`)) {
      setValidationErrors((prev) => ({ ...prev, attachment: "Only PDF, DOC, and DOCX files are allowed." }));
      setTouched((prev) => ({ ...prev, attachment: true }));
      e.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setValidationErrors((prev) => ({ ...prev, attachment: "Attachment size cannot exceed 10MB." }));
      setTouched((prev) => ({ ...prev, attachment: true }));
      e.target.value = "";
      return;
    }

    setValidationErrors((prev) => {
      const next = { ...prev };
      delete next.attachment;
      return next;
    });
    setFileName(file.name);
    setSelectedFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm(formData);
    setValidationErrors(errors);
    setTouched({
      rep_name: true,
      organization: true,
      email: true,
      phone: true,
      website: true,
      company_profile: true,
      proposal_brief: true,
    });
    if (Object.keys(errors).length > 0) return;

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
      setValidationErrors({});
      setTouched({});
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error: any) {
      if (error?.body) {
        const serverErrors: Record<string, string> = {};
        for (const [key, messages] of Object.entries(error.body)) {
          serverErrors[key] = Array.isArray(messages) ? messages[0] : String(messages);
        }
        setValidationErrors((prev) => ({ ...prev, ...serverErrors }));
        setTouched((prev) => ({ ...prev, ...Object.keys(serverErrors).reduce((acc, k) => ({ ...acc, [k]: true }), {}) }));
      }
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
                    Representative Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="rep_name"
                    value={formData.rep_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#0070c0] focus:ring-2 focus:ring-[#0070c0]/10 outline-none transition-all placeholder:text-gray-400 text-sm"
                    placeholder="Full Name"
                  />
                  {validationErrors.rep_name && touched.rep_name && (
                    <p className="flex items-center gap-1 text-red-500 text-xs mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {validationErrors.rep_name}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                    Organization<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#0070c0] focus:ring-2 focus:ring-[#0070c0]/10 outline-none transition-all placeholder:text-gray-400 text-sm"
                    placeholder="Organization Name"
                  />
                  {validationErrors.organization && touched.organization && (
                    <p className="flex items-center gap-1 text-red-500 text-xs mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {validationErrors.organization}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                    Contact Email<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#0070c0] focus:ring-2 focus:ring-[#0070c0]/10 outline-none transition-all placeholder:text-gray-400 text-sm"
                    placeholder="email@example.com"
                  />
                  {validationErrors.email && touched.email && (
                    <p className="flex items-center gap-1 text-red-500 text-xs mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {validationErrors.email}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                    Contact Phone<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#0070c0] focus:ring-2 focus:ring-[#0070c0]/10 outline-none transition-all placeholder:text-gray-400 text-sm"
                    placeholder="+1 (555) 000-0000"
                  />
                  {validationErrors.phone && touched.phone && (
                    <p className="flex items-center gap-1 text-red-500 text-xs mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {validationErrors.phone}
                    </p>
                  )}
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
                    onBlur={handleBlur}
                    className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#0070c0] focus:ring-2 focus:ring-[#0070c0]/10 outline-none transition-all placeholder:text-gray-400 text-sm"
                    placeholder="https://"
                  />
                  {validationErrors.website && touched.website && (
                    <p className="flex items-center gap-1 text-red-500 text-xs mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {validationErrors.website}
                    </p>
                  )}
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
                      onBlur={handleBlur}
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
                    Company Profile / Overview<span className="text-red-500">*</span>
                  </label>
                <textarea
                  name="company_profile"
                  value={formData.company_profile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  rows={2}
                  className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#0070c0] focus:ring-2 focus:ring-[#0070c0]/10 outline-none transition-all resize-none placeholder:text-gray-400 text-sm"
                  placeholder="Brief overview of your company..."
                />
                {validationErrors.company_profile && touched.company_profile && (
                  <p className="flex items-center gap-1 text-red-500 text-xs mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {validationErrors.company_profile}
                  </p>
                )}
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
                  onBlur={handleBlur}
                  className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#0070c0] focus:ring-2 focus:ring-[#0070c0]/10 outline-none transition-all placeholder:text-gray-400 text-sm"
                  placeholder="Short description or title of proposal"
                />
                {validationErrors.proposal_brief && touched.proposal_brief && (
                  <p className="flex items-center gap-1 text-red-500 text-xs mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {validationErrors.proposal_brief}
                  </p>
                )}
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
              {validationErrors.attachment && touched.attachment && (
                <p className="flex items-center gap-1 text-red-500 text-xs mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {validationErrors.attachment}
                </p>
              )}

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
