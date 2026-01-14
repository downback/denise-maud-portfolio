"use client"

import { useMemo } from "react"
import useSWR from "swr"
import { supabaseBrowser } from "@/lib/client"
import Loading from "@/components/Loading"

const FALLBACK_PDF_URL = "/portfolio.pdf"

export default function Works() {
  const supabase = useMemo(() => supabaseBrowser(), [])

  // Fetcher function for SWR
  const fetcher = async () => {
    const { data } = supabase.storage
      .from("site-assets")
      .getPublicUrl("works/portfolio.pdf")

    return data?.publicUrl || FALLBACK_PDF_URL
  }

  // Use SWR with aggressive caching
  const { data: pdfUrl, isLoading } = useSWR("portfolio-pdf", fetcher, {
    revalidateOnFocus: false, // Don't refetch on window focus
    revalidateOnReconnect: false, // Don't refetch on reconnect
    dedupingInterval: 3600000, // Dedupe requests within 1 hour
    fallbackData: FALLBACK_PDF_URL, // Instant fallback
  })

  return (
    <div className="space-y-6 md:space-y-4 translate-y-0 md:-translate-y-9">
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
          The portfolio is displayed in a PDF viewer, <br /> which can be opened
          in a new tab.
        </p>
      </div>

      {isLoading ? (
        <Loading message="Loading portfolio..." />
      ) : (
        <div className="h-[75vh] md:h-[80vh] overflow-hidden rounded border border-black">
          <iframe
            title="Portfolio PDF"
            src={`${pdfUrl}#toolbar=0&navpanes=0&view=FitH`}
            className="h-full w-full"
            loading="lazy"
          />
        </div>
      )}
    </div>
  )
}
