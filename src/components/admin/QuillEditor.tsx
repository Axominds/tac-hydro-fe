"use client";

import { useMemo } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  isDark?: boolean;
  placeholder?: string;
}

export function QuillEditor({
  value,
  onChange,
  isDark = false,
  placeholder = "Enter content...",
}: QuillEditorProps) {
  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
        ["clean"],
      ],
    }),
    []
  );

  const formats = ["bold", "italic", "underline", "list", "link"];

  const themeStyles = {
    "--tw-quill-border-radius": "0.75rem",
    "--tw-quill-background-color": isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9",
    "--tw-quill-border-color": isDark ? "rgba(255,255,255,0.1)" : "#cbd5e1",
    "--tw-quill-toolbar-background-color": isDark ? "rgba(255,255,255,0.05)" : "#f8fafc",
    "--tw-quill-toolbar-border-color": isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0",
    "--tw-quill-toolbar-button-color": isDark ? "#888" : "#64748b",
    "--tw-quill-toolbar-button-active-color": "#3b82f6",
    "--tw-quill-content-color": isDark ? "#ffffff" : "#1e293b",
    "--tw-quill-placeholder-color": isDark ? "#555" : "#94a3b8",
  } as React.CSSProperties;

  return (
    <div className="quill-editor" style={themeStyles}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        style={{
          backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9",
          borderRadius: "0.75rem",
        }}
      />
      <style jsx global>{`
        .quill-editor .ql-toolbar {
          border-top-left-radius: 0.75rem;
          border-top-right-radius: 0.75rem;
          border-color: ${isDark ? "rgba(255,255,255,0.1)" : "#cbd5e1"} !important;
          background-color: ${isDark ? "rgba(255,255,255,0.05)" : "#f8fafc"};
        }
        .quill-editor .ql-container {
          border-bottom-left-radius: 0.75rem;
          border-bottom-right-radius: 0.75rem;
          border-color: ${isDark ? "rgba(255,255,255,0.1)" : "#cbd5e1"} !important;
          background-color: ${isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9"};
          min-height: 200px;
          font-size: 14px;
          color: ${isDark ? "#ffffff" : "#1e293b"};
        }
        .quill-editor .ql-editor {
          min-height: 200px;
          color: ${isDark ? "#ffffff" : "#1e293b"};
        }
        .quill-editor .ql-editor.ql-blank::before {
          color: ${isDark ? "#555" : "#94a3b8"};
          font-style: normal;
        }
        .quill-editor .ql-toolbar .ql-stroke {
          stroke: ${isDark ? "#888" : "#64748b"};
        }
        .quill-editor .ql-toolbar .ql-fill {
          fill: ${isDark ? "#888" : "#64748b"};
        }
        .quill-editor .ql-toolbar .ql-picker {
          color: ${isDark ? "#888" : "#64748b"};
        }
        .quill-editor .ql-toolbar button:hover .ql-stroke,
        .quill-editor .ql-toolbar button.ql-active .ql-stroke {
          stroke: #3b82f6;
        }
        .quill-editor .ql-toolbar button:hover .ql-fill,
        .quill-editor .ql-toolbar button.ql-active .ql-fill {
          fill: #3b82f6;
        }
        .quill-editor .ql-toolbar .ql-picker-label:hover,
        .quill-editor .ql-toolbar .ql-picker-label.ql-active {
          color: #3b82f6;
        }
        .quill-editor .ql-toolbar .ql-picker-options {
          background-color: ${isDark ? "#1a1a1a" : "#ffffff"};
          border-color: ${isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0"};
        }
        .quill-editor .ql-toolbar .ql-picker-item:hover {
          color: #3b82f6;
        }
        .quill-editor a {
          color: #3b82f6;
        }
      `}</style>
    </div>
  );
}