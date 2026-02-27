import { Upload, Mail, Phone, ArrowRight, FileText } from "lucide-react";
import { useRef, useState } from "react";

export const InnitiateSynergySection = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
        }
    };

    return (
        <section id="initiate-synergy" className="relative w-full py-12 lg:py-16 bg-[#f8f9fa] flex items-center">
            <div className="mx-auto max-w-[1100px] px-4 sm:px-8 lg:px-12 w-full">

                <div className="bg-white rounded-[32px] shadow-[0_30px_60px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col lg:flex-row">

                    {/* Left Sidebar - Deep Blue/Gradient */}
                    <div className="lg:w-[360px] bg-[#0f1a2e] relative p-8 lg:p-10 flex flex-col justify-between text-white overflow-hidden shrink-0">
                        {/* Abstract Background Element Removed */}

                        <div className="relative z-10 text-left">
                            <h2 className="text-3xl font-bold mb-4 leading-tight">
                                INITIATE<br />SYNERGY
                            </h2>
                            <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                Briefly describe your proposal or project requirement. Our strategic lead will respond within 48 hours.
                            </p>
                        </div>

                        <div className="relative z-10 flex flex-col gap-5 mt-10 lg:mt-0">
                            <div className="flex items-start gap-3 group cursor-pointer text-left">
                                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#0070c0] transition-colors duration-300 shrink-0">
                                    <Mail className="w-4 h-4 text-white" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-0.5">Direct Email</p>
                                    <a href="mailto:collaboration@tachydro.com.np" className="text-sm font-semibold hover:text-[#0070c0] transition-colors whitespace-nowrap block">
                                        collaboration@tachydro.com.np
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 group cursor-pointer text-left">
                                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#d4002a] transition-colors duration-300 shrink-0">
                                    <Phone className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-0.5">Direct Line</p>
                                    <a href="tel:+977015439239" className="text-sm font-semibold hover:text-[#d4002a] transition-colors">
                                        +977 01-5439239
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Form Area */}
                    <div className="flex-1 p-6 sm:p-10 bg-white text-left">
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Representative Name*</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#0070c0] focus:ring-2 focus:ring-[#0070c0]/10 outline-none transition-all placeholder:text-gray-400 text-sm"
                                        placeholder="Full Name"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Organization*</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#0070c0] focus:ring-2 focus:ring-[#0070c0]/10 outline-none transition-all placeholder:text-gray-400 text-sm"
                                        placeholder="Organization Name"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Contact Email*</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#0070c0] focus:ring-2 focus:ring-[#0070c0]/10 outline-none transition-all placeholder:text-gray-400 text-sm"
                                        placeholder="email@example.com"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Contact Phone*</label>
                                    <input
                                        type="tel"
                                        required
                                        className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#0070c0] focus:ring-2 focus:ring-[#0070c0]/10 outline-none transition-all placeholder:text-gray-400 text-sm"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Company Website</label>
                                    <input
                                        type="url"
                                        className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#0070c0] focus:ring-2 focus:ring-[#0070c0]/10 outline-none transition-all placeholder:text-gray-400 text-sm"
                                        placeholder="https://"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Collaboration Type</label>
                                    <div className="relative">
                                        <select className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#0070c0] focus:ring-2 focus:ring-[#0070c0]/10 outline-none transition-all appearance-none cursor-pointer text-gray-700 text-sm">
                                            <option value="" disabled selected>Select Type</option>
                                            <option value="jv">Strategic Joint Venture (JV)</option>
                                            <option value="market">International Market Collaboration</option>
                                            <option value="technical">Technical Expertise Partnerships</option>
                                            <option value="research">Research Partnerships</option>
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Company Profile / Overview*</label>
                                <textarea
                                    required
                                    rows={2}
                                    className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#0070c0] focus:ring-2 focus:ring-[#0070c0]/10 outline-none transition-all resize-none placeholder:text-gray-400 text-sm"
                                    placeholder="Brief overview of your company..."
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Project Brief / Proposal</label>
                                <input
                                    type="text"
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
                                    className="w-full py-3.5 rounded-xl bg-[#0070c0] hover:bg-[#005a9e] text-white font-bold text-sm shadow-[0_10px_30px_rgba(0,112,192,0.3)] hover:shadow-[0_15px_40px_rgba(0,112,192,0.4)] hover:-translate-y-1 transition-all duration-300 uppercase tracking-widest flex items-center justify-center gap-2 group"
                                >
                                    Initialize Collaboration
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
