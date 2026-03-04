"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "/works", label: "works" },
  { href: "/biography", label: "biography" },
  { href: "/contact", label: "contact" },
]

export default function SidebarNav() {
  const pathname = usePathname()
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const scrollPositionRef = useRef(0)

  const closeMobileNav = () => setIsMobileNavOpen(false)

  useEffect(() => {
    if (!isMobileNavOpen) {
      return
    }

    const isIos =
      typeof navigator !== "undefined" &&
      /iP(hone|ad|od)/.test(navigator.userAgent)
    const body = document.body

    if (isIos) {
      scrollPositionRef.current = window.scrollY
      body.style.position = "fixed"
      body.style.top = `-${scrollPositionRef.current}px`
      body.style.left = "0"
      body.style.right = "0"
      body.style.width = "100%"
    } else {
      body.style.overflow = "hidden"
    }

    return () => {
      if (isIos) {
        body.style.position = ""
        body.style.top = ""
        body.style.left = ""
        body.style.right = ""
        body.style.width = ""
        window.scrollTo(0, scrollPositionRef.current)
      } else {
        body.style.overflow = ""
      }
    }
  }, [isMobileNavOpen])

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-56 shrink-0">
        <div className="px-8 py-8 text-base font-medium">
          <Link href="/">denise maud</Link>
        </div>
        <nav className="flex flex-col gap-2 px-8 pb-6 text-base font-light">
          {navLinks.map((link) => (
            <Link key={link.href} className="inline-block" href={link.href}>
              <span
                className={cn(
                  "link-underline",
                  pathname === link.href && "link-underline-active",
                )}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-40 flex md:hidden items-center justify-between border-b border-border px-2 py-2 backdrop-blur-sm">
        <Link
          className="text-base font-normal pl-2"
          href="/"
          onClick={closeMobileNav}
        >
          denise maud
        </Link>
        <Button
          variant="default"
          size="icon"
          aria-label="Open menu"
          onClick={() => setIsMobileNavOpen(true)}
        >
          <Menu className="h-5 w-5 " strokeWidth={1.3} />
        </Button>
      </header>

      {/* Mobile Overlay and Nav */}
      {isMobileNavOpen && (
        <>
          <div
            className="fixed overflow-hidden inset-0 z-40 bg-black/20 backdrop-blur-xs md:hidden h-svh min-h-svh"
            onClick={closeMobileNav}
            aria-hidden="true"
          />
          <aside className="fixed overflow-hidden right-0 top-0 z-50 h-svh min-h-svh w-3/5 bg-white text-right md:hidden">
            <div className="flex justify-end px-4 py-4">
              <Button
                variant="default"
                size="icon"
                aria-label="Close menu"
                onClick={closeMobileNav}
              >
                <X className="h-5 w-5" strokeWidth={1.3} />
              </Button>
            </div>
            <nav className="flex flex-col gap-2 items-end px-8 pb-6 text-base font-light mt-12">
              <Link className="inline-block" href="/" onClick={closeMobileNav}>
                <span
                  className={cn(
                    "link-underline",
                    pathname === "/" && "link-underline-active",
                  )}
                >
                  home
                </span>
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  className="inline-block"
                  href={link.href}
                  onClick={closeMobileNav}
                >
                  <span
                    className={cn(
                      "link-underline",
                      pathname === link.href && "link-underline-active",
                    )}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>
          </aside>
        </>
      )}
    </>
  )
}
