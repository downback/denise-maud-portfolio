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
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            Use high-resolution images for best quality (minimum 1920px wide).
          </p>
          <p>The image will be displayed in a 21:9 aspect ratio on desktop.</p>
          <p>On mobile, the image will be cropped to fit a 16:9 ratio.</p>
          <p>Avoid placing important elements at the edges.</p>
        </CardContent>
      </Card>
    </div>
  )
}
