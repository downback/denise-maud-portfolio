import type { ReactNode } from "react"
import SidebarNav from "@/components/SidebarNav"

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    // <div className="flex min-h-dvh flex-col md:flex-row">
    //   <SidebarNav />
    //   <main className="w-full md:w-auto flex-1">
    //     <div className="px-4 md:pr-8 sm:px-0 py-6 md:py-0 ">
    //       {children}
    //       <div className="h-full w-full bg-red-500">test</div>
    //     </div>
    //   </main>
    // </div>
    <div className="w-full h-dvh min-h-dvh flex flex-col md:flex-row">
      <SidebarNav />
      <main className="w-full min-h-dvh md:w-auto flex-1">
        <div className="px-4 md:pr-8 sm:px-0 py-6 md:py-0 h-full">
          {children}
        </div>
        <div className="min-h-dvh w-full bg-red-500">test</div>
      </main>
    </div>
  )
}
