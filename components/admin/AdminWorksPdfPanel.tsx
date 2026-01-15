"use client"

import { useState } from "react"
import AdminUploadModal from "@/components/admin/AdminUploadModal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminWorksPdfPanel() {
  const [isUploadOpen, setIsUploadOpen] = useState(false)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Current Portfolio PDF</CardTitle>
        <Button
          type="button"
          variant="highlight"
          onClick={() => setIsUploadOpen(true)}
        >
          <span className="hidden md:inline">Change PDF</span>
          <span className="md:hidden">Change</span>
        </Button>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <p>Last updated: Mar 12, 2025</p>
      </CardContent>
      <AdminUploadModal
        open={isUploadOpen}
        onOpenChange={setIsUploadOpen}
        title="Update portfolio PDF"
        description="Upload a new portfolio PDF file."
        showImageUpload={false}
        showTextInput={false}
        showFileUpload
      />
    </Card>
  )
}
