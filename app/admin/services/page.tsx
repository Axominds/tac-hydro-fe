import { Briefcase, Plus, Edit2, Trash2 } from "lucide-react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "700"] });

export default function ServicesManagementPage() {
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`${montserrat.className} text-4xl text-white mb-2`}>
            Our <span className="text-blue-500">Services</span>
          </h1>
          <p className="text-gray-400">Manage expertise categories, items, and service sectors.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-semibold transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)]">
          <Plus className="h-5 w-5" />
          Add Expertise
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-6 transition-all hover:bg-white/10 hover:border-white/10 group relative">
            <div className={`p-3 rounded-xl bg-blue-600/10 w-fit mb-4`}>
              <Briefcase className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Feasibility Study</h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">Systematic analysis of project viability and implementation...</p>
            
            <div className="flex items-center justify-end gap-2 pt-4 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-all">
                <button className="p-2.5 bg-white/5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                    <Edit2 className="h-4 w-4" />
                </button>
                <button className="p-2.5 bg-red-500/10 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-all">
                    <Trash2 className="h-4 w-4" />
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
