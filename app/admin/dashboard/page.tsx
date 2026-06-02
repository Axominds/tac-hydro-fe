"use client";

import { BarChart3, Users, Briefcase, Newspaper, Building2, Handshake, Layers } from "lucide-react";
import { Montserrat } from "next/font/google";
import { useAdminTheme, getThemedClasses } from "../../../src/hooks/useAdminTheme";
import { useAdminDashboardStats } from "../../../src/hooks/useAdminDashboardStats";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "700"] });

export default function AdminDashboardPage() {
  const { theme, colors, mounted } = useAdminTheme();
  const { data: stats, isLoading } = useAdminDashboardStats();
  const classes = getThemedClasses(theme);

  if (!mounted) return null;

  const statCards = [
    { name: "Total Projects", value: stats?.projects_count, icon: BarChart3, color: "text-blue-500", bg: "bg-blue-500/10" },
    { name: "Service Sectors", value: stats?.service_sectors_count, icon: Briefcase, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { name: "Team Members", value: stats?.team_members_count, icon: Users, color: "text-amber-500", bg: "bg-amber-500/10" },
    { name: "News & Events", value: stats?.news_count, icon: Newspaper, color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { name: "Expertise Areas", value: stats?.expertise_categories_count, icon: Building2, color: "text-purple-500", bg: "bg-purple-500/10" },
    { name: "Valued Partners", value: stats?.partners_count, icon: Handshake, color: "text-rose-500", bg: "bg-rose-500/10" },
  ];

  const scopeEntries = stats?.projects_by_scope
    ? Object.entries(stats.projects_by_scope).sort(([, a], [, b]) => b - a)
    : [];
  const maxScopeCount = Math.max(...scopeEntries.map(([, c]) => c), 1);

  return (
    <div className="space-y-16">
      {/* Welcome Header */}
      <div>
          <h1 className={`${montserrat.className} text-4xl font-bold mb-3`} style={classes.text.primary}>
          Welcome back, <span className="text-blue-500">Administrator</span>
        </h1>
        <p className="max-w-2xl leading-relaxed" style={classes.text.secondary}>
          Manage and monitor all hydroelectric operations, project developments, and site content
          from your premium command center.
        </p>
      </div>

      {/* Stats Grid — 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <div
            key={stat.name}
            className="p-6 rounded-2xl transition-all hover:scale-[1.02] group"
            style={{
              ...classes.card.base,
              borderWidth: "1px",
              borderStyle: "solid",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
            <p className="text-sm font-medium mb-1" style={classes.text.secondary}>
              {stat.name}
            </p>
            <h3 className="text-3xl font-bold tracking-tight" style={classes.text.primary}>
              {isLoading ? "\u2014" : (stat.value ?? "\u2014")}
            </h3>
          </div>
        ))}
      </div>

      {/* Projects by Scope Breakdown */}
      <div
        className="p-8 rounded-2xl"
        style={{
          ...classes.card.base,
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        <h2
          className={`${montserrat.className} text-xl mb-6 flex items-center gap-2`}
          style={classes.text.primary}
        >
          <Layers className="h-5 w-5 text-blue-500" />
          Projects by Scope
        </h2>
        {scopeEntries.length === 0 ? (
          <p className="font-medium italic" style={classes.text.muted}>
            {isLoading ? "Loading..." : "No project scopes defined yet."}
          </p>
        ) : (
          <div className="space-y-5">
            {scopeEntries.map(([scopeName, count]) => (
              <div key={scopeName}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium" style={classes.text.primary}>
                    {scopeName}
                  </span>
                  <span className="text-sm font-bold" style={classes.text.primary}>
                    {count} {count === 1 ? "project" : "projects"}
                  </span>
                </div>
                <div
                  className="h-2.5 rounded-full overflow-hidden"
                  style={{ backgroundColor: colors.border }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${(count / maxScopeCount) * 100}%`,
                      background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
