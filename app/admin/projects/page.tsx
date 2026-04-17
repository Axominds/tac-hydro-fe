"use client";

import { useState } from "react";
import { BarChart3, Plus, Edit2, Trash2, Loader2, X, Save } from "lucide-react";
import { Montserrat } from "next/font/google";
import { useProjectsWithScopes } from "../../../src/hooks/useProjects";
import { useProjectMutations } from "../../../src/hooks/useAdminMutations";
import { Project } from "../../../src/lib/api";
import { useAdminTheme, getThemedClasses } from "../../../src/hooks/useAdminTheme";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "700"] });

export default function ProjectsManagementPage() {
  const { theme, colors, mounted } = useAdminTheme();
  const classes = getThemedClasses(theme);
  const { data: projects, isLoading } = useProjectsWithScopes();
  const { createProject, updateProject, deleteProject } = useProjectMutations();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({});

  if (!mounted) return null;

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      status: "Ongoing",
      installed_capacity: 0,
      installed_capacity_unit: "MW",
      latitude: 27.7,
      longitude: 85.3,
      description: "",
      technical_highlights: {},
    });
    setIsModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setFormData({ ...project });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject) {
      const changedData: Partial<Project> = {};
      Object.keys(formData).forEach((k) => {
        const key = k as keyof Project;
        if (JSON.stringify(formData[key]) !== JSON.stringify(editingProject[key])) {
          // @ts-ignore
          changedData[key] = formData[key];
        }
      });
      if (Object.keys(changedData).length > 0) {
        await updateProject.mutateAsync({ id: editingProject.id, data: changedData });
      }
    } else {
      await createProject.mutateAsync(formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    if (
      window.confirm("Are you sure you want to delete this project? This action cannot be undone.")
    ) {
      await deleteProject.mutateAsync(id);
    }
  };

  return (
    <div className="space-y-10 uppercase relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`${montserrat.className} text-4xl mb-2`} style={classes.text.primary}>
            Hydro <span className="text-blue-500">Projects</span>
          </h1>
          <p style={classes.text.secondary}>
            View and edit project descriptions, scopes, and images.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-semibold transition-all shadow-lg shadow-blue-600/20 active:scale-95"
        >
          <Plus className="h-5 w-5" />
          Create New Project
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 pb-40">
          {projects?.map((project) => (
            <div
              key={project.id}
              className="flex items-center gap-6 p-6 rounded-2xl group transition-all"
              style={{
                ...classes.card.base,
                borderWidth: "1px",
                borderStyle: "solid",
              }}
            >
              <div className="w-24 h-16 bg-blue-600/10 rounded-xl relative overflow-hidden flex-shrink-0">
                {project.image_urls && project.image_urls[0] ? (
                  <img
                    src={project.image_urls[0]}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <BarChart3 className="h-8 w-8 text-blue-500" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg leading-tight mb-1" style={classes.text.primary}>
                  {project.title}
                </h3>
                <div className="flex gap-4">
                  <span
                    className="text-xs font-medium px-2 py-1 rounded-full uppercase tracking-widest"
                    style={{ color: "#60a5fa", backgroundColor: "rgba(96, 165, 250, 0.1)" }}
                  >
                    {project.status || "Active"}
                  </span>
                  <span className="text-xs font-medium" style={classes.text.muted}>
                    {project.installed_capacity} {project.installed_capacity_unit} Capacity
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all">
                <button
                  onClick={() => openEditModal(project)}
                  className="p-2.5 rounded-lg transition-all"
                  style={classes.card.hover}
                >
                  <Edit2 className="h-5 w-5" style={{ color: colors.textSecondary }} />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-2.5 rounded-lg transition-all"
                  style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                >
                  <Trash2 className="h-5 w-5 text-red-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CRUD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div
            className="w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative"
            style={{
              backgroundColor: colors.modalBg,
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: colors.border,
            }}
          >
            <div
              className="p-8 flex items-center justify-between"
              style={{ borderBottom: `1px solid ${colors.border}` }}
            >
              <div>
                <h2 className={`${montserrat.className} text-2xl`} style={classes.text.primary}>
                  {editingProject ? "Edit" : "Create"}{" "}
                  <span className="text-blue-500">Project</span>
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="transition-colors"
                style={classes.text.secondary}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 col-span-2">
                  <label
                    className="text-[10px] font-bold tracking-widest uppercase ml-1"
                    style={classes.text.muted}
                  >
                    Project Title
                  </label>
                  <input
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    style={{
                      ...classes.input.bg,
                      borderWidth: "1px",
                      borderStyle: "solid",
                    }}
                    placeholder="e.g. Maduwa Hydropower"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    className="text-[10px] font-bold tracking-widest uppercase ml-1"
                    style={classes.text.muted}
                  >
                    Status
                  </label>
                  <select
                    value={formData.status || "Ongoing"}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    style={{
                      ...classes.input.bg,
                      borderWidth: "1px",
                      borderStyle: "solid",
                    }}
                  >
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    className="text-[10px] font-bold tracking-widest uppercase ml-1"
                    style={classes.text.muted}
                  >
                    Capacity (MW)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formData.installed_capacity}
                    onChange={(e) =>
                      setFormData({ ...formData, installed_capacity: parseFloat(e.target.value) })
                    }
                    className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    style={{
                      ...classes.input.bg,
                      borderWidth: "1px",
                      borderStyle: "solid",
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    className="text-[10px] font-bold tracking-widest uppercase ml-1"
                    style={classes.text.muted}
                  >
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    required
                    value={formData.latitude}
                    onChange={(e) =>
                      setFormData({ ...formData, latitude: parseFloat(e.target.value) })
                    }
                    className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    style={{
                      ...classes.input.bg,
                      borderWidth: "1px",
                      borderStyle: "solid",
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    className="text-[10px] font-bold tracking-widest uppercase ml-1"
                    style={classes.text.muted}
                  >
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    required
                    value={formData.longitude}
                    onChange={(e) =>
                      setFormData({ ...formData, longitude: parseFloat(e.target.value) })
                    }
                    className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    style={{
                      ...classes.input.bg,
                      borderWidth: "1px",
                      borderStyle: "solid",
                    }}
                  />
                </div>

                <div className="space-y-2 col-span-2">
                  <label
                    className="text-[10px] font-bold tracking-widest uppercase ml-1"
                    style={classes.text.muted}
                  >
                    Description
                  </label>
                  <textarea
                    value={formData.description || ""}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                    style={{
                      ...classes.input.bg,
                      borderWidth: "1px",
                      borderStyle: "solid",
                    }}
                    placeholder="Project technical details..."
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-600/10 active:scale-95"
                >
                  <Save className="h-5 w-5" />
                  {editingProject ? "Save Changes" : "Create Project"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-8 font-bold rounded-2xl transition-all"
                  style={{
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: colors.border,
                    color: colors.textSecondary,
                    backgroundColor: "transparent",
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
