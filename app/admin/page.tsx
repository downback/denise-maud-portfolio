import AdminQuickPreviewPanel from "@/components/admin/AdminQuickPreviewPanel"
import AdminRecentActivityPanel from "@/components/admin/AdminRecentActivityPanel"

export default function Admin() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <AdminRecentActivityPanel />
        <div className="lg:col-span-2">
          <AdminQuickPreviewPanel />
        </div>
      </div>
    </div>
  )
}
