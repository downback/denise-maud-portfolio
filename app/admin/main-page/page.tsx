import AdminMainImagePreviewPanel from "@/components/AdminMainImagePreviewPanel"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminMainPage() {
  return (
    <div className="space-y-6">
      <AdminMainImagePreviewPanel />

      <Card className="border-0 bg-muted shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">
            Image Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Use high-resolution images for best quality (minimum 1920px wide).
            </li>
            <li>
              The image will be displayed in a 21:9 aspect ratio on desktop.
            </li>
            <li>On mobile, the image will be cropped to fit a 16:9 ratio.</li>
            <li>Avoid placing important elements at the edges.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
