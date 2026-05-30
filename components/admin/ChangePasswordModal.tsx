"use client";

import { useState, useEffect } from "react";
import { Loader2, X, Eye, EyeOff, KeyRound, Lock, CheckCircle2, AlertCircle } from "lucide-react";
import { Montserrat } from "next/font/google";
import { useAdminTheme } from "../../src/hooks/useAdminTheme";
import { apiFetch } from "../../src/lib/api";
import { Toast, useToast } from "../../src/components/ui/toast";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "700"] });

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
  const { theme, colors, mounted } = useAdminTheme();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const isDark = theme === "dark";

  const inputStyle = {
    backgroundColor: isDark ? "rgba(0,0,0,0.3)" : "#f1f5f9",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: isDark ? "rgba(255,255,255,0.15)" : "#cbd5e1",
    color: isDark ? "#ffffff" : "#1e293b",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess(false);

    const newErrors: Record<string, string> = {};

    if (!oldPassword) newErrors.old_password = "Current password is required.";
    if (!newPassword) newErrors.new_password = "New password is required.";
    if (!confirmPassword) newErrors.confirm_password = "Please confirm your new password.";
    else if (newPassword !== confirmPassword) newErrors.confirm_password = "Passwords do not match.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSaving(true);

    try {
      await apiFetch("/api/auth/change-password/", {
        method: "POST",
        body: { old_password: oldPassword, new_password: newPassword, confirm_password: confirmPassword },
        requireAuth: true,
      });
      setSuccess(true);
      showToast("Password changed successfully!");
      setTimeout(() => {
        onClose();
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setSuccess(false);
      }, 1000);
    } catch (error: any) {
      if (error?.body) {
        setErrors(error.body);
      } else {
        setErrors({ _general: "Failed to change password. Please try again." });
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setErrors({});
    setSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm w-screen h-screen"
        onClick={handleClose}
      />
      <div
        className="relative z-10 w-full max-w-md max-h-[90vh] rounded-2xl overflow-hidden flex flex-col"
        style={{
          backgroundColor: isDark ? "#0a0a0a" : "#ffffff",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0"}`,
        }}
      >
        <div
          className="p-6 flex items-center justify-between"
          style={{ borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}` }}
        >
          <h2 className={`${montserrat.className} text-xl font-bold flex items-center gap-2`} style={{ color: colors.text as string }}>
            <KeyRound className="h-5 w-5 text-blue-500" />
            Change Password
          </h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg transition-all"
            style={{ backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}
          >
            <X className="h-5 w-5" style={{ color: colors.textMuted as string }} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {errors._general && (
            <p className="text-red-500 text-sm flex items-center gap-1.5 bg-red-500/10 p-3 rounded-lg">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {errors._general}
            </p>
          )}

          {success && (
            <p className="text-green-500 text-sm flex items-center gap-1.5 bg-green-500/10 p-3 rounded-lg">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              Password changed successfully!
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label className="block text-sm mb-1" style={{ color: colors.textMuted as string }}>
                  Current Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: colors.textMuted as string }} />
                  <input
                    type={showOld ? "text" : "password"}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full rounded-lg px-3 py-2.5 pl-10 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    style={inputStyle}
                  />
                  <button
                    type="button"
                    onClick={() => setShowOld(!showOld)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: colors.textMuted as string }}
                  >
                    {showOld ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.old_password && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    {errors.old_password}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm mb-1" style={{ color: colors.textMuted as string }}>
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: colors.textMuted as string }} />
                  <input
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full rounded-lg px-3 py-2.5 pl-10 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    style={inputStyle}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: colors.textMuted as string }}
                  >
                    {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.new_password && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    {errors.new_password}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm mb-1" style={{ color: colors.textMuted as string }}>
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: colors.textMuted as string }} />
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    className="w-full rounded-lg px-3 py-2.5 pl-10 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    style={inputStyle}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: colors.textMuted as string }}
                  >
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirm_password && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    {errors.confirm_password}
                  </p>
                )}
              </div>

              <div
                className="flex items-center justify-end gap-2 pt-2"
                style={{ borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}` }}
              >
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 rounded-lg text-sm"
                  style={{
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0"}`,
                    color: colors.textSecondary as string,
                    backgroundColor: "transparent",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving || success}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-bold flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4" />
                  )}
                  {isSaving ? "Changing..." : success ? "Done" : "Change Password"}
                </button>
              </div>
            </div>
          </form>
        </div>

        {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
      </div>
    </div>
  );
}
