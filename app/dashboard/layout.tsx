import DashboardSidebar from "@/features/dashboard/components/DashboardSideBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-10 mb-10 max-w-full min-w-0">
      <div className="mt-15 flex max-w-full min-w-0 items-start gap-10">
        <DashboardSidebar />

        {/* 👈 التعديل هنا: أضفنا min-w-0 و overflow-hidden للـ flex-1 */}
        <div className="flex w-full min-w-0 flex-1 flex-col overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
