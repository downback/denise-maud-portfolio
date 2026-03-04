"use client"

import { useMemo } from "react"
import useSWR from "swr"
import { supabaseBrowser } from "@/lib/client"
import Loading from "@/components/Loading"

export default function Works() {
  const supabase = useMemo(() => supabaseBrowser(), [])

  // Fetcher function for SWR
  const fetcher = async () => {
    const { data: siteContent, error: siteContentError } = await supabase
      .from("site_content")
      .select("works_pdf_asset_id, updated_at")
      .eq("singleton_id", true)
      .maybeSingle()

    if (siteContentError) {
      return null
    }

    if (siteContent?.works_pdf_asset_id) {
      const { data: asset, error: assetError } = await supabase
        .from("assets")
        .select("path")
        .eq("id", siteContent.works_pdf_asset_id)
        .maybeSingle()

      if (assetError || !asset?.path) {
        return null
      }

      const { data } = supabase.storage
        .from("site-assets")
        .getPublicUrl(asset.path)

      const versionTag = siteContent.updated_at
        ? `?v=${encodeURIComponent(siteContent.updated_at)}`
        : ""

      return data?.publicUrl ? `${data.publicUrl}${versionTag}` : null
    }

    const { data: fallbackAsset, error: fallbackError } = await supabase
      .from("assets")
      .select("path, created_at")
      .eq("asset_kind", "works_pdf")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle()

    if (fallbackError || !fallbackAsset?.path) {
      return null
    }

    const { data } = supabase.storage
      .from("site-assets")
      .getPublicUrl(fallbackAsset.path)

    const versionTag = fallbackAsset.created_at
      ? `?v=${encodeURIComponent(fallbackAsset.created_at)}`
      : ""

    return data?.publicUrl ? `${data.publicUrl}${versionTag}` : null
  }

  // Use SWR with aggressive caching
  const { data: pdfUrl, isLoading } = useSWR<string | null>(
    "portfolio-pdf",
    fetcher,
    {
      revalidateOnFocus: false, // Don't refetch on window focus
      revalidateOnReconnect: false, // Don't refetch on reconnect
      dedupingInterval: 3600000, // Dedupe requests within 1 hour
      fallbackData: null,
    },
  )

  return (
    <div className="space-y-8 md:space-y-4 translate-y-0 md:-translate-y-9 pt-6 md:pt-30">
      <div className="space-y-2">
        <div>
          {pdfUrl ? (
            <>
              <div className="flex flex-row justify-center md:justify-end mb-2">
                <a
                  className="hidden sm:inline-block link-underline text-sm font-normal text-primary"
                  href={pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open portfolio PDF in new tab
                </a>
                <a
                  className="inline-block sm:hidden underline underline-offset-4 text-sm font-normal text-primary"
                  href={pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open portfolio in new tab
                </a>
              </div>
              <p className="text-xs leading-none text-center text-muted-foreground block md:hidden">
                You can view or download the full portfolio PDF
              </p>
            </>
          ) : (
            <div className="flex flex-row justify-center md:justify-end">
              <span className="text-sm font-normal text-muted-foreground">
                Portfolio PDF not available yet
              </span>
            </div>
          )}
        </div>
      </div>

      {isLoading ? (
        <Loading message="Loading portfolio..." />
      ) : pdfUrl ? (
        <>
          <div className="hidden md:block h-[80vh] overflow-auto rounded border border-black">
            <iframe
              title="Portfolio PDF"
              src={`${pdfUrl}#toolbar=0&navpanes=0&view=FitH`}
              className="block h-full w-full"
              loading="lazy"
            />
          </div>

          <div className="block md:hidden h-[75vh] overflow-auto rounded border border-black touch-pan-y">
            <iframe
              title="Portfolio PDF"
              src={`https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`}
              className="block h-full w-full"
              loading="lazy"
            />
          </div>
        </>
      ) : (
        <div className="flex h-[45vh] items-center justify-center rounded border border-dashed border-border bg-muted/40 text-sm text-muted-foreground">
          No portfolio PDF available
        </div>
      )}
    </div>
  )
}
