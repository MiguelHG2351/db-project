'use client'
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react"
import { usePathname } from "next/navigation"

export default function SectionInfo() {
  const router = usePathname()

  return (
    <section className="h-[66px] flex items-center px-4 border-b border-b-[#d3d3d3]">
      <Breadcrumbs>
        {
          router.split('/').map((item, index) => (
            <BreadcrumbItem key={index}>{item || 'Home'}</BreadcrumbItem>
          ))
        }
      </Breadcrumbs>
    </section>
  )
}
