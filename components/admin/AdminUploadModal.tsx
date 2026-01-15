"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
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
import { Textarea } from "@/components/ui/textarea"

type AdminUploadModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  showImageUpload?: boolean
  showTextInput?: boolean
  showFileUpload?: boolean
}

export default function AdminUploadModal({
  open,
  onOpenChange,
  title = "Update Content",
  description = "Upload an image or update text content.",
  showImageUpload = true,
  showTextInput = true,
  showFileUpload = false,
}: AdminUploadModalProps) {
  const [selectedImageName, setSelectedImageName] = useState("")
  const [imagePreviewUrl, setImagePreviewUrl] = useState("")
  const [selectedFileName, setSelectedFileName] = useState("")

  const handleImageDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files?.[0]
    if (file) {
      setSelectedImageName(file.name)
      setImagePreviewUrl(URL.createObjectURL(file))
    }
  }
  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl)
      }
    }
  }, [imagePreviewUrl])

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {showImageUpload ? (
            <div className="space-y-2">
              <Label htmlFor="upload-image">Image upload</Label>
              <label
                htmlFor="upload-image"
                className="flex min-h-[120px] w-full cursor-pointer items-center justify-center rounded-md border border-dashed border-border bg-muted/20 px-4 text-center text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
                onDrop={handleImageDrop}
                onDragOver={handleDragOver}
              >
                <span>
                  Drop image or click to upload
                  {selectedImageName ? (
                    <span className="mt-2 block text-xs text-muted-foreground">
                      Selected: {selectedImageName}
                    </span>
                  ) : null}
                </span>
              </label>
              <Input
                id="upload-image"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(event) => {
                  const file = event.target.files?.[0]
                  if (file) {
                    setSelectedImageName(file.name)
                    setImagePreviewUrl(URL.createObjectURL(file))
                  }
                }}
              />
              {imagePreviewUrl ? (
                <div className="overflow-hidden rounded-md border border-border">
                  <Image
                    src={imagePreviewUrl}
                    alt="Selected preview"
                    width={800}
                    height={400}
                    className="h-48 w-full object-cover"
                    unoptimized
                  />
                </div>
              ) : null}
            </div>
          ) : null}

          {showFileUpload ? (
            <div className="space-y-2">
              <Label htmlFor="upload-file">File upload</Label>
              <Input
                id="upload-file"
                type="file"
                accept=".pdf"
                onChange={(event) => {
                  const fileName = event.target.files?.[0]?.name ?? ""
                  setSelectedFileName(fileName)
                }}
              />
              {selectedFileName ? (
                <p className="text-xs text-muted-foreground">
                  Selected: {selectedFileName}
                </p>
              ) : null}
            </div>
          ) : null}

          {showTextInput ? (
            <div className="space-y-2">
              <Label htmlFor="upload-text">Select Year</Label>
              <Input
                id="upload-year"
                type="text"
                placeholder="Year (e.g., 2024)"
              />
              <Label htmlFor="upload-text">Show Information</Label>
              <Textarea
                id="upload-text"
                placeholder="Show title, Location, Description..."
                rows={1}
                className="min-h-[40px]"
              />
            </div>
          ) : null}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="secondary"
            onClick={() => onOpenChange(false)}
          >
            Dismiss
          </Button>
          <Button type="button" variant="highlight">
            Confirm change
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
