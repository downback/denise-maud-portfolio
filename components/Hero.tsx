"use client"

import { useMemo } from "react"
import Image from "next/image"
import useSWR from "swr"
import { supabaseBrowser } from "@/lib/client"
import Loading from "@/components/Loading"

type HeroProps = {
  alt?: string
}

export default function Hero({ alt = "Hero image" }: HeroProps) {
  const supabase = useMemo(() => supabaseBrowser(), [])

  // Fetcher function for SWR
  const fetcher = async () => {
    const { data } = supabase.storage
      .from("site-assets")
      .getPublicUrl("hero/main_image.png")

    return data?.publicUrl || "/hero-image.jpg"
  }

  // Use SWR with aggressive caching
  const { data: imageUrl, isLoading } = useSWR("hero-image", fetcher, {
    revalidateOnFocus: false, // Don't refetch on window focus
    revalidateOnReconnect: false, // Don't refetch on reconnect
    dedupingInterval: 3600000, // Dedupe requests within 1 hour
    fallbackData: "/hero-image.jpg", // Instant fallback
  })

  if (isLoading) {
    return (
      <div className="fixed inset-0 md:relative -z-10">
        <Loading message="Loading image..." height="h-screen md:h-[70vh]" />
      </div>
    )
  }

  return (
    <div className="fixed inset-0 md:relative -z-10">
      <div className="flex items-center justify-center w-full min-h-screen md:min-h-auto">
        <div className="hero-float w-[80vw] h-auto md:w-auto md:h-[70vh]">
          <Image
            src={imageUrl}
            alt={alt}
            width={1920}
            height={1080}
            className="w-full h-auto md:w-auto md:h-full object-contain"
            priority
            sizes="(max-width: 768px) 80vw, 70vh"
          />
        </div>
      </div>
    </div>
  )
}
