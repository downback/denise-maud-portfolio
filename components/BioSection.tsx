type BioItem = {
  year: string
  description: string
}

type BioSectionProps = {
  title: string
  items: BioItem[]
}

const renderYear = (year: string) => {
  const parts = year.split(/\s*-\s*/).filter(Boolean)

  if (parts.length <= 1) {
    return year
  }

  if (parts.length === 2) {
    return (
      <>
        <span className="md:hidden">
          {parts[0]}
          <br />- {parts[1]}
        </span>
        <span className="hidden md:inline">{`${parts[0]} - ${parts[1]}`}</span>
      </>
    )
  }

  const mobileParts = parts.map((part, index) => (
    <span key={`${part}-${index}`}>
      {index === 0 ? part : `- ${part}`}
      {index < parts.length - 1 ? <br /> : null}
    </span>
  ))
  const desktopText = parts.join(" - ")

  return (
    <>
      <span className="md:hidden">{mobileParts}</span>
      <span className="hidden md:inline">{desktopText}</span>
    </>
  )
}

export default function BioSection({ title, items }: BioSectionProps) {
  return (
    <section className="group flex flex-col gap-4 lg:flex-row">
      <h2 className="w-full text-[14px] md:w-xs md:text-base font-light">
        <span className="link-underline link-underline-mobile">{title}</span>
      </h2>
      <ul className="space-y-2 md:space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex w-full h-fit items-center sm:items-start flex-row-reverse justify-between md:w-xl md:flex-col"
          >
            <h3 className="text-right sm:text-left text-xs min-w-14 sm:flex-1 ml-4 sm:ml-0 ">
              {renderYear(item.year)}
            </h3>
            <p className="text-[14px] flex-auto">{item.description}</p>
          </div>
        ))}
      </ul>
    </section>
  )
}
