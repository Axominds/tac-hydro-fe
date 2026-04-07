import { Users, Plus, Edit2, Trash2 } from "lucide-react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "700"] });

export default function AboutManagementPage() {
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`${montserrat.className} text-4xl text-white mb-2`}>
            About <span className="text-blue-500">Us</span>
          </h1>
          <p className="text-gray-400">Manage company sections, team members, and core principles.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-semibold transition-all">
          <Plus className="h-5 w-5" />
          Add Section
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-6 flex items-center justify-between group hover:bg-white/10 transition-all">
            <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-blue-600/10 rounded-xl flex items-center justify-center">
                    <Users className="h-8 w-8 text-blue-500" />
                </div>
                <div>
                    <h3 className="text-white font-bold text-lg mb-1">Company History Section</h3>
                    <p className="text-gray-500 text-sm">Last modified 3 days ago by System</p>
                </div>
            </div>
            <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all">
                <button className="p-2.5 bg-white/5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                    <Edit2 className="h-5 w-5" />
                </button>
                <button className="p-2.5 bg-red-500/10 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-all">
                    <Trash2 className="h-5 w-5" />
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
