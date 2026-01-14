import BioSection from "@/components/BioSection"

const soloShows = [
  {
    year: "2024",
    description:
      "Tidal Notations apple browser hello bye, Glasshouse, Brooklyn, NY",
  },
  {
    year: "2022",
    description: "Holding Patterns, Drift Gallery, Los Angeles, CA",
  },
  {
    year: "2020",
    description: "Quiet Mechanics, Field Projects, New York, NY",
  },
  {
    year: "2020",
    description: "Quiet Mechanics, Field Projects, New York, NY",
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
  {
    year: "2023",
    description: "Resonances, KUNSTRAUM, Brooklyn, NY",
  },
]

const education = [
  {
    year: "2023",
    description: "MFA, Sculpture, Yale School of Art",
  },
  {
    year: "2020",
    description: "BFA, Fine Arts, Rhode Island School of Design",
  },
  {
    year: "2018",
    description: "Residency, Skowhegan School of Painting & Sculpture",
  },
]

export default function Bio() {
  return (
    <div className="space-y-10 font-light">
      <BioSection title="solo shows" items={soloShows} />
      <BioSection title="selected group shows" items={selectedGroupShows} />
      <BioSection title="education" items={education} />
    </div>
  )
}
