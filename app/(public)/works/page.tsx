"use client"

import { useEffect, useMemo, useState } from "react"
import { supabaseBrowser } from "@/lib/client"
import Loading from "@/components/Loading"

const FALLBACK_PDF_URL = "/portfolio.pdf"

export default function Works() {
  const supabase = useMemo(() => supabaseBrowser(), [])
  const [isLoading, setIsLoading] = useState(true)
  const [pdfUrl, setPdfUrl] = useState(FALLBACK_PDF_URL)

  useEffect(() => {
    async function verifyAndLoadPdf() {
      try {
        const { data: files, error } = await supabase.storage
          .from("site-assets")
          .list("works", {
            limit: 1,
            sortBy: { column: "created_at", order: "desc" },
          })

        if (error) throw error

        if (files && files.length > 0) {
          const pdfFile = files[0]
          const { data } = supabase.storage
            .from("site-assets")
            .getPublicUrl(`works/${pdfFile.name}`)

          if (data?.publicUrl) {
            setPdfUrl(data.publicUrl)
          }
        }
      } catch (error) {
        console.error("Failed to verify PDF from Supabase:", error)
        setPdfUrl(FALLBACK_PDF_URL)
      } finally {
        setIsLoading(false)
      }
    }

    verifyAndLoadPdf()
  }, [supabase])

  return (
    <div className="space-y-6 md:space-y-4 translate-y-0 md:-translate-y-9">
      {!isLoading && (
        <>
          <div className="space-y-2">
            <div className="flex flex-row justify-center md:justify-end">
              <a
                className="text-sm font-normal text-primary underline underline-offset-4"
                href={pdfUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open portfolio PDF in new tab
              </a>
            </div>
            <p className="text-sm leading-none text-center text-muted-foreground block md:hidden">
              The portfolio is displayed in a PDF viewer, <br /> which can be
              opened in a new tab.
            </p>
          </div>
          <div className="h-[75vh] md:h-[80vh] overflow-hidden rounded border border-black">
            <iframe
              title="Portfolio PDF"
              src={`${pdfUrl}#toolbar=0&navpanes=0&view=FitH`}
              className="h-full w-full"
              loading="lazy"
            />
          </div>
        </>
      )}

      {isLoading && <Loading message="Loading portfolio..." />}
    </div>
  )
}
