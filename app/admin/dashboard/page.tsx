import { BarChart3, Users, Briefcase, Newspaper } from "lucide-react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "700"] });

const STATS = [
  { name: "Total Projects", value: "24", icon: BarChart3, color: "text-blue-500", bg: "bg-blue-500/10" },
  { name: "Active Services", value: "12", icon: Briefcase, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { name: "Team Members", value: "48", icon: Users, color: "text-amber-500", bg: "bg-amber-500/10" },
  { name: "News Articles", value: "156", icon: Newspaper, color: "text-indigo-500", bg: "bg-indigo-500/10" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-12">
      {/* Welcome Header */}
      <div>
        <h1 className={`${montserrat.className} text-4xl text-white mb-3`}>
          Welcome back, <span className="text-blue-500">Administrator</span>
        </h1>
        <p className="text-gray-400 max-w-2xl leading-relaxed">
          Manage and monitor all hydroelectric operations, project developments, and site content from your premium command center.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat) => (
          <div key={stat.name} className="p-6 bg-white/5 border border-white/5 rounded-2xl transition-all hover:bg-white/10 hover:border-white/10 group">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <span className="text-xs text-green-400 font-medium bg-green-400/10 px-2 py-1 rounded-full">+12%</span>
            </div>
            <p className="text-gray-400 text-sm font-medium mb-1">{stat.name}</p>
            <h3 className="text-3xl text-white font-bold tracking-tight">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Quick Actions / Activity Feed Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-8 bg-white/5 border border-white/5 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <BarChart3 className="h-64 w-64 text-blue-500" />
            </div>
            <h2 className={`${montserrat.className} text-xl text-white mb-6 flex items-center gap-2`}>
                <BarChart3 className="h-5 w-5 text-blue-500" />
                Latest Analytics Performance
            </h2>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-white/5 rounded-xl">
                <p className="text-gray-500 font-medium italic">Data visualization module initializing...</p>
            </div>
        </div>

        <div className="p-8 bg-white/5 border border-white/5 rounded-2xl">
            <h2 className={`${montserrat.className} text-xl text-white mb-6 flex items-center gap-2`}>
                <Newspaper className="h-5 w-5 text-indigo-500" />
                Recent Drafts
            </h2>
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 bg-white/5 rounded-xl border border-transparent hover:border-white/10 transition-all cursor-pointer">
                        <p className="text-sm text-white font-medium mb-1">Q2 Hydro Electric Report Analysis</p>
                        <p className="text-xs text-gray-500">Last edited 2h ago</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
