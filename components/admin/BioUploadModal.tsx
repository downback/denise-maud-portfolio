"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type BioFormValues = {
  year: string
  title: string
  location: string
}

type BioUploadModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  onConfirm?: (values: BioFormValues) => void
  confirmLabel?: string
  isConfirmDisabled?: boolean
  isSubmitting?: boolean
  errorMessage?: string
}

export default function BioUploadModal({
  open,
  onOpenChange,
  title = "Update Content",
  description = "Update text content.",
  onConfirm,
  confirmLabel = "Confirm change",
  isConfirmDisabled = false,
  isSubmitting = false,
  errorMessage,
}: BioUploadModalProps) {
  const [year, setYear] = useState("")
  const [titleValue, setTitleValue] = useState("")
  const [locationValue, setLocationValue] = useState("")

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setYear("")
      setTitleValue("")
      setLocationValue("")
    }

    onOpenChange(nextOpen)
  }

  const handleConfirm = () => {
    onConfirm?.({
      year: year.trim(),
      title: titleValue.trim(),
      location: locationValue.trim(),
    })
  }

  const hasRequiredValues =
    year.trim().length > 0 &&
    titleValue.trim().length > 0 &&
    locationValue.trim().length > 0

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="upload-year">Year</Label>
            <Input
              id="upload-year"
              type="text"
              placeholder="Year (e.g., 2024)"
              value={year}
              onChange={(event) => setYear(event.target.value)}
            />
            <Label htmlFor="upload-title">Title</Label>
            <Input
              id="upload-title"
              type="text"
              placeholder="Show title"
              value={titleValue}
              onChange={(event) => setTitleValue(event.target.value)}
            />
            <Label htmlFor="upload-location">Location</Label>
            <Input
              id="upload-location"
              type="text"
              placeholder="Location"
              value={locationValue}
              onChange={(event) => setLocationValue(event.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          {errorMessage ? (
            <p className="text-sm text-rose-600">{errorMessage}</p>
          ) : null}
          <Button
            type="button"
            variant="secondary"
            onClick={() => handleOpenChange(false)}
          >
            Dismiss
          </Button>
          <Button
            type="button"
            variant="highlight"
            onClick={handleConfirm}
            disabled={!hasRequiredValues || isConfirmDisabled || isSubmitting}
          >
            {isSubmitting ? "Saving..." : confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
