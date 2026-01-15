import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminMainImagePreviewPanel() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Current Image on the Main Page</CardTitle>
        <Button type="button" variant="highlight">
          <span className="hidden md:inline">Change image</span>
          <span className="md:hidden">Change</span>
        </Button>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-3 max-w-5xl">
        <div className="space-y-3 md:col-span-2">
          <p className="text-sm font-medium text-muted-foreground">
            Desktop (5:3)
          </p>
          <div className="aspect-5/3 w-full rounded-md border border-dashed border-border bg-muted/30" />
        </div>
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">
            Mobile (9:16)
          </p>
          <div className="aspect-9/16 w-full md:h-fit rounded-md border border-dashed border-border bg-muted/30" />
        </div>
      </CardContent>
    </Card>
  )
}
