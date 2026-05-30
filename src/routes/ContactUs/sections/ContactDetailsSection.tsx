import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from "lucide-react";
import { useSiteSettings } from "../../../hooks/useSiteSettings";
import { useProjectScopes } from "../../../hooks/useProjectScopes";
import { Button } from "../../../components/ui/button";
import { apiFetch } from "../../../lib/api";

const validateForm = (formData: {
  name: string;
  phone: string;
  email: string;
  message: string;
}) => {
  const errors: Record<string, string> = {};

  if (!formData.name.trim()) {
    errors.name = "Name is required.";
  } else if (formData.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters long.";
  } else if (formData.name.trim().length > 100) {
    errors.name = "Name cannot exceed 100 characters.";
  } else if (!/^[a-zA-Z\s'\-]+$/.test(formData.name.trim())) {
    errors.name = "Name can only contain alphabetical characters, spaces, hyphens, and apostrophes.";
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

  if (!formData.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (formData.message.length > 5000) {
    errors.message = "Message cannot exceed 5000 characters.";
  }

  return errors;
};

export const ContactDetailsSection = () => {
  const { data: settings } = useSiteSettings();
  const { data: projectScopes } = useProjectScopes();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    project_scope_id: "" as string,
    message: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm(formData);
    setValidationErrors(errors);
    setTouched({ name: true, phone: true, email: true, message: true });
    if (Object.keys(errors).length > 0) return;

    setIsLoading(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      await apiFetch<{ message: string }>("/api/contact-us/inquiry/", {
        method: "POST",
        body: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          project_scope_id: formData.project_scope_id ? parseInt(formData.project_scope_id) : null,
          message: formData.message,
        },
      });
      setStatus("success");
      setFormData({
        name: "",
        phone: "",
        email: "",
        project_scope_id: "",
        message: "",
      });
      setValidationErrors({});
      setTouched({});
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
      setErrorMessage("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact-details" className="relative w-full py-16 lg:py-24 bg-[#f8f9fa]">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 w-full">
        <div className="bg-white rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden flex flex-col lg:flex-row">
          {/* Left Sidebar - Contact Info */}
          <div className="lg:w-[400px] bg-[#0f1a2e] p-8 sm:p-12 flex flex-col justify-between text-white relative">
            {/* Decorative background flare */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] -mr-32 -mt-32" />

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-8 tracking-tight">Contact Information</h3>

              <div className="space-y-8">
                {settings?.phone && (
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300 shrink-0 shadow-lg">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[11px] text-blue-400 uppercase tracking-[0.2em] font-bold mb-1">
                        Call Us
                      </p>
                      <a
                        href={`tel:${settings.phone.replace(/\D/g, "")}`}
                        className="text-lg font-semibold hover:text-blue-400 transition-colors"
                      >
                        {settings.phone}
                      </a>
                    </div>
                  </div>
                )}

                {settings?.contact_email && (
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300 shrink-0 shadow-lg">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[11px] text-blue-400 uppercase tracking-[0.2em] font-bold mb-1">
                        Email Us
                      </p>
                      <a
                        href={`mailto:${settings.contact_email}`}
                        className="text-lg font-semibold hover:text-blue-400 transition-colors break-all"
                      >
                        {settings.contact_email}
                      </a>
                    </div>
                  </div>
                )}

                {settings?.address && (
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300 shrink-0 shadow-lg">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[11px] text-blue-400 uppercase tracking-[0.2em] font-bold mb-1">
                        Visit Us
                      </p>
                      <a
                        href="/contact-us#location-map"
                        className="text-lg font-semibold leading-snug hover:text-blue-400 transition-colors"
                      >
                        {settings.address}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {settings?.business_hours && (
              <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
                <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Business Hours
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-white/5 p-4 rounded-[20px] hover:bg-white/10 transition-colors">
                    <span className="text-slate-300 text-sm font-medium">Sun - Fri</span>
                    <span className="font-bold text-white text-sm">{settings.business_hours}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Form Area */}
          <div className="flex-1 p-8 sm:p-12 bg-white">
            {status === "success" && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3 text-green-700">
                <CheckCircle className="w-5 h-5 shrink-0" />
                <p className="font-medium">Thank you! Your message has been sent successfully.</p>
              </div>
            )}
            {status === "error" && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="font-medium">{errorMessage}</p>
              </div>
            )}
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2.5">
                  <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your name*"
                    required
                    className="h-14 rounded-2xl bg-slate-50 border border-slate-100 px-6 text-slate-900 text-base outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all placeholder:text-slate-400"
                  />
                  {validationErrors.name && touched.name && (
                    <p className="flex items-center gap-1 text-red-500 text-xs mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {validationErrors.name}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2.5">
                  <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your phone*"
                    required
                    className="h-14 rounded-2xl bg-slate-50 border border-slate-100 px-6 text-slate-900 text-base outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all placeholder:text-slate-400"
                  />
                  {validationErrors.phone && touched.phone && (
                    <p className="flex items-center gap-1 text-red-500 text-xs mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {validationErrors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2.5">
                  <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your email*"
                    required
                    className="h-14 rounded-2xl bg-slate-50 border border-slate-100 px-6 text-slate-900 text-base outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all placeholder:text-slate-400"
                  />
                  {validationErrors.email && touched.email && (
                    <p className="flex items-center gap-1 text-red-500 text-xs mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {validationErrors.email}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2.5">
                  <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                    Desired Service
                  </label>
                  <select
                    name="project_scope_id"
                    value={formData.project_scope_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="h-14 rounded-2xl bg-slate-50 border border-slate-100 px-6 text-slate-900 text-base outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Select a service</option>
                    {projectScopes?.map((scope) => (
                      <option key={scope.id} value={scope.id}>
                        {scope.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="min-h-[160px] rounded-2xl bg-slate-50 border border-slate-100 px-6 py-5 text-slate-900 text-base outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all placeholder:text-slate-400 resize-none"
                  placeholder="Tell us about your project or inquiry..."
                />
                {validationErrors.message && touched.message && (
                  <p className="flex items-center gap-1 text-red-500 text-xs mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {validationErrors.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-14 px-10 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-[0_15px_30px_rgba(37,99,235,0.25)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.35)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-3 group w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {isLoading ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send</span>
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </Button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </section>
  );
};
