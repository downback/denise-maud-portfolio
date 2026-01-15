"use client"

import { useEffect, useState, useMemo, type ReactNode } from "react"
import { supabaseBrowser } from "@/lib/client"
import AdminSidebar from "@/components/admin/AdminSidebar"
import AdminLoginModal from "@/components/admin/AdminLoginModal"
import AdminPageHeader from "@/components/admin/AdminPageHeader"
import Loading from "@/components/Loading"

export default function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = useMemo(() => {
    console.log("🔧 Initializing Supabase client...")
    console.log("📍 Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log(
      "🔑 Supabase Key:",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Set" : "❌ Missing"
    )
    return supabaseBrowser()
  }, [])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function checkAuth() {
      console.log("🔍 Starting auth check...")

      // Add timeout to prevent infinite hanging
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(
          () => reject(new Error("Auth check timeout after 10 seconds")),
          10000
        )
      })

      try {
        console.log("📡 Fetching session...")
        const result = (await Promise.race([
          supabase.auth.getSession(),
          timeoutPromise,
        ])) as Awaited<ReturnType<typeof supabase.auth.getSession>>

        const {
          data: { session },
          error: sessionError,
        } = result

        console.log("✅ Session response:", {
          session: !!session,
          error: sessionError,
        })

        if (sessionError) {
          console.error("❌ Session error:", sessionError)
          if (mounted) {
            setIsAuthenticated(false)
            setIsLoading(false)
          }
          return
        }

        if (!session) {
          console.log("❌ No session found")
          if (mounted) {
            setIsAuthenticated(false)
            setIsLoading(false)
          }
          return
        }

        const userId = session.user.id
        console.log("👤 User ID:", userId)

        // Check if user is admin
        console.log("🔍 Checking admin status...")
        const { data: adminRow, error: adminError } = await supabase
          .from("app_admin")
          .select("admin_user_id")
          .eq("singleton_id", true)
          .maybeSingle()

        console.log("✅ Admin check response:", { adminRow, error: adminError })

        if (adminError) {
          console.error("❌ Admin check error:", adminError)
          if (mounted) {
            setIsAuthenticated(false)
            setIsLoading(false)
          }
          return
        }

        if (adminRow && adminRow.admin_user_id === userId) {
          console.log("✅ User is admin!")
          if (mounted) {
            setIsAuthenticated(true)
            setIsLoading(false)
          }
        } else {
          console.log("❌ User is not admin, signing out...")
          // Not admin, sign out
          await supabase.auth.signOut()
          if (mounted) {
            setIsAuthenticated(false)
            setIsLoading(false)
          }
        }
      } catch (error) {
        console.error("💥 Auth check failed:", error)
        if (mounted) {
          setIsAuthenticated(false)
          setIsLoading(false)
        }
      }

      console.log("🏁 Auth check completed")
    }

    checkAuth()

    // Listen to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return

      if (event === "SIGNED_OUT") {
        setIsAuthenticated(false)
      } else if (event === "SIGNED_IN" && session) {
        // Verify admin status
        const userId = session.user.id
        const { data: adminRow } = await supabase
          .from("app_admin")
          .select("admin_user_id")
          .eq("singleton_id", true)
          .maybeSingle()

        if (mounted) {
          if (adminRow && adminRow.admin_user_id === userId) {
            setIsAuthenticated(true)
          } else {
            setIsAuthenticated(false)
            await supabase.auth.signOut()
          }
        }
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [supabase])

  if (isLoading) {
    return <Loading message="Checking authentication..." />
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <AdminLoginModal />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <AdminSidebar />
      <main className="flex-1 p-6 pt-22 md:pt-6 md:pl-72">
        <AdminPageHeader />
        <div className="mt-6">{children}</div>
      </main>
    </div>
  )
}
