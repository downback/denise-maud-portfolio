import AdminQuickPreviewPanel from "@/components/AdminQuickPreviewPanel"
import AdminRecentActivityPanel from "@/components/AdminRecentActivityPanel"

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
