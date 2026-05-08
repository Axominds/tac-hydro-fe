"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Montserrat } from "next/font/google";
import { Lock, Mail, Loader2, Eye, EyeOff } from "lucide-react";
import Cookies from "js-cookie";
import { useAdminTheme } from "../../../src/hooks/useAdminTheme";
import { BASE_URL } from "../../../src/lib/api";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "700"] });

export default function AdminLoginPage() {
  const { theme, colors, mounted } = useAdminTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${BASE_URL}/api/auth/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        Cookies.set("access_token", data.access, { expires: 1, secure: true, sameSite: "strict" });
        Cookies.set("refresh_token", data.refresh, {
          expires: 7,
          secure: true,
          sameSite: "strict",
        });
        router.push("/admin/dashboard");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-300"
      style={{ backgroundColor: colors.bg as string }}
    >
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />

      <div
        className="w-full max-w-md p-8 backdrop-blur-xl rounded-2xl shadow-2xl relative z-10 transition-all"
        style={{
          backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.8)",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
        }}
      >
        <div className="text-center mb-8">
          <h1
            className={`${montserrat.className} text-3xl mb-2`}
            style={{ color: colors.text as string }}
          >
            Tac-Hydro <span className="text-blue-500">Admin</span>
          </h1>
          <p className="text-sm" style={{ color: colors.textSecondary as string }}>
            Secure Portal Access
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <Mail
              className="absolute left-3 top-3.5 h-4 w-4"
              style={{ color: colors.textMuted as string }}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              style={{
                backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#cbd5e1"}`,
                color: colors.text as string,
              }}
              required
            />
          </div>

          <div className="relative">
            <Lock
              className="absolute left-3 top-3.5 h-4 w-4"
              style={{ color: colors.textMuted as string }}
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg py-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              style={{
                backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#cbd5e1"}`,
                color: colors.text as string,
              }}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 focus:outline-none"
              style={{ color: colors.textMuted as string }}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center font-medium animate-shake">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Login"}
          </button>
        </form>

        <div
          className="mt-8 pt-6 text-center"
          style={{ borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}` }}
        >
          <p
            className="text-xs uppercase tracking-widest leading-relaxed"
            style={{ color: colors.textMuted as string }}
          >
            Reserved for Tac-Hydro Personnel only
          </p>
        </div>
      </div>
    </div>
  );
}
