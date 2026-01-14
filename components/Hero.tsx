"use client"

import { useEffect, useState, useMemo } from "react"
import Image from "next/image"
import { supabaseBrowser } from "@/lib/client"

type HeroProps = {
  alt?: string
}

export default function Hero({ alt = "Hero image" }: HeroProps) {
  const supabase = useMemo(() => supabaseBrowser(), [])
  const [imageUrl, setImageUrl] = useState<string>("/hero-image.jpg")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchHeroImage() {
      try {
        const { data: files, error } = await supabase.storage
          .from("site-assets")
          .list("hero", {
            limit: 1,
            sortBy: { column: "created_at", order: "desc" },
          })

        if (error) throw error

        if (files && files.length > 0) {
          const imageFile = files[0]
          const { data } = supabase.storage
            .from("site-assets")
            .getPublicUrl(`hero/${imageFile.name}`)

          if (data?.publicUrl) {
            setImageUrl(data.publicUrl)
          }
        }
      } catch (error) {
        console.error("Failed to fetch hero image:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHeroImage()
  }, [supabase])

  return (
    // <div className="flex items-center justify-center w-full">
    <div className="fixed inset-0 md:relative -z-10">
      <div className="flex items-center justify-center w-full min-h-screen md:min-h-auto ">
        {!isLoading && (
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
        )}
      </div>
    </div>
  )
}
