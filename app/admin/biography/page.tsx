import AdminBioSectionPanel from "@/components/admin/AdminBioSectionPanel"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const soloShows = [
  {
    year: "2024",
    description: "Tidal Notations, Glasshouse, Brooklyn, NY",
  },
  {
    year: "2022",
    description: "Holding Patterns, Drift Gallery, Los Angeles, CA",
  },
]

const selectedGroupShows = [
  {
    year: "2025",
    description: "Surface/Depth, Assembly Room, New York, NY",
  },
  {
    year: "2024",
    description: "Signals, ICA Boston (project room), Boston, MA",
  },
]

export default function AdminBiography() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-2">
        <AdminBioSectionPanel
          title="Solo Shows Information"
          items={soloShows}
        />
        <AdminBioSectionPanel
          title="Selected Group Shows Information"
          items={selectedGroupShows}
        />
      </div>
      <Card className="border-0 bg-muted shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">
            Biography Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Newest bio details appear at the top to keep recent updates
              visible first.
            </li>
            <li>
              All entries are displayed in time order to preserve the timeline.
            </li>
            <li>
              Keep descriptions consistent in tone and length for a clean list.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
