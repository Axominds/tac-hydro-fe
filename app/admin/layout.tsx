import { AdminSidebar } from "../../components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#070707] text-white selection:bg-blue-500/30 selection:text-white">
      <AdminSidebar />
      <main className="flex-1 ml-72 p-10 relative">
        {/* Top Header/Bar (Optional if needed) */}
        <div className="absolute top-0 right-0 w-full h-[300px] bg-gradient-to-br from-blue-600/5 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
