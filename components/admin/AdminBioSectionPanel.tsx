"use client"

import { useState } from "react"
import { Pencil, Plus, Trash2 } from "lucide-react"
import BioUploadModal from "@/components/admin/BioUploadModal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type BioItem = {
  year: string
  description: string
}

type AdminBioSectionPanelProps = {
  title: string
  items: BioItem[]
}

export default function AdminBioSectionPanel({
  title,
  items,
}: AdminBioSectionPanelProps) {
  const [isUploadOpen, setIsUploadOpen] = useState(false)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, index) => (
          <div
            key={`${item.year}-${item.description}-${index}`}
            className="flex flex-row gap-3 border-b border-border pb-4 last:border-b-0 last:pb-0 md:items-center justify-between"
          >
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                {item.year}
              </p>
              <p className="text-sm">{item.description}</p>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="default"
                size="icon"
                aria-label="Edit"
                className="shadow-none"
              >
                <Pencil className="h-4 w-4 hover:text-zinc-400" />
              </Button>
              <Button
                type="button"
                variant="default"
                size="icon"
                aria-label="Delete"
                className="shadow-none"
              >
                <Trash2 className="h-4 w-4 text-red-500 hover:text-red-300" />
              </Button>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
          aria-label={`Add new detail in ${title.replace(" Information", "")}`}
          onClick={() => setIsUploadOpen(true)}
        >
          <Plus className="h-4 w-4" />
          <span>Add new detail in {title.replace(" Information", "")}</span>
        </button>
      </CardContent>
      <BioUploadModal
        open={isUploadOpen}
        onOpenChange={setIsUploadOpen}
        title={`Add ${title.replace(" Information", "")} detail`}
        description="Add or update biography text details."
      />
    </Card>
  )
}
