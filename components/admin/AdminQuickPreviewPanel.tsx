import Link from "next/link"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type PreviewCard = {
  title: "Main Page" | "Works" | "Biography"
  updatedAt: string
  previewTitle: string
  previewText: string
  adminLink: string
}

const previewCards: PreviewCard[] = [
  {
    title: "Main Page",
    updatedAt: "Mar 12, 2025",
    previewTitle: "Latest hero image",
    previewText: "Hero image updated with floating sculpture visual.",
    adminLink: "/admin/main-page",
  },
  {
    title: "Works",
    updatedAt: "Mar 08, 2025",
    previewTitle: "Latest work",
    previewText: "Quiet Mechanics (Portfolio PDF updated).",
    adminLink: "/admin/works",
  },
  {
    title: "Biography",
    updatedAt: "Feb 27, 2025",
    previewTitle: "Latest update",
    previewText: "Added 2024 solo show: Tidal Notations.",
    adminLink: "/admin/biography",
  },
]

export default function AdminQuickPreviewPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preview & Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 xl:grid-cols-3">
        {previewCards.map((card) => (
          <Card key={card.title} className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{card.title}</CardTitle>
              <p className="text-xs text-muted-foreground">
                Last updated {card.updatedAt}
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {card.title === "Main Page" ? (
                <div className="h-28 w-full rounded-md border border-dashed border-border bg-muted/30" />
              ) : null}
              <div className="space-y-1">
                <p className="text-sm font-medium">{card.previewTitle}</p>
                <p className="text-sm text-muted-foreground">
                  {card.previewText}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="secondary" size="sm">
                <Link href={card.adminLink}>Manage</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </CardContent>
    </Card>
  )
}
