"use client"

import { useEffect, useState, useMemo, type ReactNode } from "react"
import { supabaseBrowser } from "@/lib/client"
import AdminSidebar from "@/components/AdminSidebar"
import AdminLoginModal from "@/components/AdminLoginModal"
import AdminPageHeader from "@/components/AdminPageHeader"
import Loading from "@/components/Loading"

export default function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = useMemo(() => supabaseBrowser(), [])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function checkAuth() {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession()

        if (sessionError) {
          console.error("Session error:", sessionError)
          if (mounted) {
            setIsAuthenticated(false)
            setIsLoading(false)
          }
          return
        }

        if (!session) {
          if (mounted) {
            setIsAuthenticated(false)
            setIsLoading(false)
          }
          return
        }

        const userId = session.user.id

        // Check if user is admin
        const { data: adminRow, error: adminError } = await supabase
          .from("app_admin")
          .select("admin_user_id")
          .eq("singleton_id", true)
          .maybeSingle()

        if (adminError) {
          console.error("Admin check error:", adminError)
          if (mounted) {
            setIsAuthenticated(false)
            setIsLoading(false)
          }
          return
        }

        if (adminRow && adminRow.admin_user_id === userId) {
          if (mounted) {
            setIsAuthenticated(true)
            setIsLoading(false)
          }
        } else {
          // Not admin, sign out
          await supabase.auth.signOut()
          if (mounted) {
            setIsAuthenticated(false)
            setIsLoading(false)
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        if (mounted) {
          setIsAuthenticated(false)
          setIsLoading(false)
        }
      }
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
      <main className="flex-1 p-6">
        <AdminPageHeader />
        <div className="mt-6">{children}</div>
      </main>
    </div>
  )
}
