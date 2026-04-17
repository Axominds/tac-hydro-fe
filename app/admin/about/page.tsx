"use client";

import { useState, useEffect } from "react";
import { Users, Plus, Edit2, Trash2, Loader2 } from "lucide-react";
import { Montserrat } from "next/font/google";
import { useAdminTheme } from "../../../src/hooks/useAdminTheme";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "700"] });

export default function AboutManagementPage() {
  const { theme, colors, mounted } = useAdminTheme();

  if (!mounted) return null;

  const isDark = theme === "dark";
  const cardStyle = {
    backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "#ffffff",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0",
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1
            className={`${montserrat.className} text-4xl mb-2`}
            style={{ color: colors.text as string }}
          >
            About <span className="text-blue-500">Us</span>
          </h1>
          <p style={{ color: colors.textSecondary as string }}>
            Manage company sections, team members, and core principles.
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-semibold transition-all">
          <Plus className="h-5 w-5" />
          Add Section
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-2xl p-6 flex items-center justify-between group transition-all"
            style={cardStyle}
          >
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-blue-600/10 rounded-xl flex items-center justify-center">
                <Users className="h-8 w-8 text-blue-500" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1" style={{ color: colors.text as string }}>
                  Company History Section
                </h3>
                <p className="text-sm" style={{ color: colors.textMuted as string }}>
                  Last modified 3 days ago by System
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all">
              <button
                className="p-2.5 rounded-lg transition-all"
                style={{
                  backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                  color: colors.textSecondary as string,
                }}
              >
                <Edit2 className="h-5 w-5" />
              </button>
              <button
                className="p-2.5 rounded-lg transition-all"
                style={{ backgroundColor: "rgba(239,68,68,0.1)", color: "#ef4444" }}
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
