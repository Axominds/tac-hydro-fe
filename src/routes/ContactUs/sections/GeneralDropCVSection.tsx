import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { SendIcon, UploadIcon } from "lucide-react";
import { cn } from "../../../lib/utils";

export const GeneralDropCVSection = () => {
  const [cvFile, setCvFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB limit.");
        return;
      }
      setCvFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Application Submitted Successfully!");
    setCvFile(null);
  };

  return (
    <section id="general-drop-cv" className="w-full py-20 bg-[#f8f9fa] px-4 sm:px-8 lg:px-20">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold leading-tight text-gray-900 mb-4">
          Not finding the right fit today?
        </h1>
        <p className="text-gray-600 mb-10 text-lg leading-relaxed max-w-2xl mx-auto">
          We are always looking for visionary professionals to help us power the future. If you are
          a motivated professional looking to apply your expertise within the dynamic field of
          hydropower consultancy, we invite you to share your profile with us. Connect with us for
          future opportunities.
        </p>
        <div className="bg-white p-8 sm:p-10 rounded-xl shadow-lg border border-gray-100 max-w-2xl mx-auto text-left">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Apply Now</h3>
          {/* Placeholder Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Full Name *</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0b1522] transition-all"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Phone Number *</label>
                <input
                  type="tel"
                  placeholder="+977 9800000000"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0b1522] transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Email Address *</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0b1522] transition-all"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Area of Interest *</label>
                <select
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0b1522] transition-all"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Civil/Design Engineering">Civil/Design Engineering</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Electrical Engineering">Electrical Engineering</option>
                  <option value="Engineering Geology">Engineering Geology</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Cover Letter / Message</label>
              <textarea
                rows={4}
                placeholder="Tell us briefly about yourself and what you are looking for..."
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0b1522] transition-all"
              />
            </div>

            <div
              onClick={() => document.getElementById("general-cv-upload")?.click()}
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors group",
                cvFile
                  ? "bg-blue-50 border-blue-400"
                  : "border-gray-300 hover:bg-gray-50 hover:border-blue-400",
              )}
            >
              <input
                id="general-cv-upload"
                type="file"
                className="hidden"
                accept=".pdf,.docx"
                onChange={handleFileChange}
              />
              <div
                className={cn(
                  "inline-flex h-10 w-10 items-center justify-center rounded-full mb-2 transition-colors",
                  cvFile ? "bg-blue-100" : "bg-gray-100 group-hover:bg-gray-200",
                )}
              >
                <UploadIcon
                  className={cn(
                    "h-6 w-6 transition-colors",
                    cvFile ? "text-blue-600" : "text-gray-500",
                  )}
                />
              </div>
              <p className="text-gray-900 font-medium whitespace-nowrap overflow-hidden text-ellipsis px-4">
                {cvFile ? cvFile.name : "Click to upload your CV"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {cvFile ? `${(cvFile.size / 1024 / 1024).toFixed(2)} MB` : "PDF or Word (Max 5MB)"}
              </p>
            </div>

            <Button
              type="submit"
              className="w-full py-7 text-lg font-bold mt-4 bg-blue-600 hover:bg-blue-700 shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
            >
              <SendIcon className="w-6 h-6" />
              <span>Apply Now</span>
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
