import AdminWorksPdfPanel from "@/components/AdminWorksPdfPanel"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminWorks() {
  return (
    <div className="space-y-6">
      <AdminWorksPdfPanel />

      <Card className="border-0 bg-muted shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">
            PDF Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <ul className="list-disc space-y-2 pl-5">
            <li>Use a single PDF file named portfolio.pdf.</li>
            <li>Recommended size: under 15MB for fast loading.</li>
            <li>Include a cover page and keep page order final.</li>
            <li>Update the file whenever new work is added.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
