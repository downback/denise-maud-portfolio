"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { supabaseBrowser } from "@/lib/client"
import { useToast } from "@/components/ui/use-toast"

const adminNavLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/main-page", label: "Main Page" },
  { href: "/admin/works", label: "Works" },
  { href: "/admin/biography", label: "Biography" },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = useMemo(() => supabaseBrowser(), [])
  const { toast } = useToast()
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)

  const closeMobileNav = () => setIsMobileNavOpen(false)

  const handleSignOut = async () => {
    if (isSigningOut) return
    setIsSigningOut(true)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      toast({ title: "Signed out", description: "You have been signed out." })
      router.push("/admin")
    } catch (error) {
      console.error("Sign out failed:", error)
      toast({
        title: "Sign out failed",
        description: "An error occurred while signing out.",
      })
    } finally {
      setIsSigningOut(false)
    }
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 md:shrink-0 md:border-r md:border-border md:h-screen">
        <div className="px-6 py-6 border-b border-border">
          <h1 className="text-xl font-semibold">admin</h1>
        </div>
        <nav className="flex-1 flex flex-col px-4 py-4">
          <div className="space-y-1">
            {adminNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block px-3 py-2 text-sm font-light rounded-md transition-colors",
                  pathname === link.href
                    ? "bg-secondary text-secondary-foreground"
                    : "hover:bg-secondary/50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-auto pt-4 border-t border-border">
            <Button
              variant="ghost"
              className="w-full justify-start px-3 text-sm font-light"
              onClick={handleSignOut}
              disabled={isSigningOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              {isSigningOut ? "Signing out..." : "Sign out"}
            </Button>
          </div>
        </nav>
      </aside>

      {/* Mobile Header */}
      <header className="flex md:hidden items-center justify-start md:justify-between border-b border-border px-4 py-3 bg-white">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          onClick={() => setIsMobileNavOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">admin</h1>
      </header>

      {/* Mobile Overlay and Sidebar */}
      {isMobileNavOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-xs md:hidden"
            onClick={closeMobileNav}
            aria-hidden="true"
          />
          <aside className="fixed left-0 top-0 z-50 h-full w-64 bg-white border-r border-border md:hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <h1 className="text-lg font-semibold">admin</h1>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close menu"
                onClick={closeMobileNav}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex-1 flex flex-col px-4 py-4">
              <div className="space-y-1">
                {adminNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileNav}
                    className={cn(
                      "block px-3 py-2 text-sm font-light rounded-md transition-colors",
                      pathname === link.href
                        ? "bg-secondary text-secondary-foreground"
                        : "hover:bg-secondary/50"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="mt-auto pt-4 border-t border-border">
                <Button
                  variant="ghost"
                  className="w-full justify-start px-3 text-sm font-light"
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {isSigningOut ? "Signing out..." : "Sign out"}
                </Button>
              </div>
            </nav>
          </aside>
        </>
      )}
    </>
  )
}
