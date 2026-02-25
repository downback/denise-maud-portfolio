import BioSection from "@/components/BioSection"
import { supabaseServer } from "@/lib/server"

const formatBioItems = (
  rows: { title: string; location: string; year: number }[],
) =>
  rows.map((row) => ({
    year: String(row.year),
    description: `${row.title}, ${row.location}`,
  }))

const education = [
  {
    year: "2020 - 2022",
    description: "Master Fine Arts, Zurich University of the Arts, Switzerland",
  },
  {
    year: "2018 - 2020",
    description: "Propädeutikum, Zurich University of the Arts, Switzerland",
  },
  {
    year: "2015 - 2019",
    description: "Pädagogische Hochschule Zürich, Switzerland",
  },
  {
    year: "2010 - 2013",
    description:
      "BA (Hons) Magazine Publishing, London College of Communication, University of the Arts, London, England",
  },
]

export default async function Bio() {
  const supabase = await supabaseServer()
  const [{ data: soloRows }, { data: groupRows }] = await Promise.all([
    supabase
      .from("bio_solo_shows")
      .select("title, location, year")
      .order("sort_order", { ascending: true })
      .order("year", { ascending: false }),
    supabase
      .from("bio_group_shows")
      .select("title, location, year")
      .order("sort_order", { ascending: true })
      .order("year", { ascending: false }),
  ])

  const soloShows = formatBioItems(soloRows ?? [])
  const selectedGroupShows = formatBioItems(groupRows ?? [])

  return (
    <div className="space-y-10 font-light pt-6 md:pt-30 mb-16 md:mb-20">
      <BioSection title="solo shows" items={soloShows} />
      <BioSection title="selected group shows" items={selectedGroupShows} />
      <BioSection title="education" items={education} />
    </div>
  )
}
