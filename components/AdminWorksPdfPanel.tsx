import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminWorksPdfPanel() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Current Portfolio PDF</CardTitle>
        <Button type="button" variant="highlight">
          <span className="hidden md:inline">Change PDF</span>
          <span className="md:hidden">Change</span>
        </Button>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <p>Last updated: Mar 12, 2025</p>
        <p>File name: portfolio.pdf</p>
      </CardContent>
    </Card>
  )
}
