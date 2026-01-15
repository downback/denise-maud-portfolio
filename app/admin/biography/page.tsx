import AdminBioSectionPanel from "@/components/AdminBioSectionPanel"

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
    <div className="grid gap-6 xl:grid-cols-2">
      <AdminBioSectionPanel title="Solo Shows Information" items={soloShows} />
      <AdminBioSectionPanel
        title="Selected Group Shows Information"
        items={selectedGroupShows}
      />
    </div>
  )
}
