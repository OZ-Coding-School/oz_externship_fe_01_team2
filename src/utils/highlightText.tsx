export const highlightText = (
  text: string,
  keyword: string
): React.ReactNode => {
  if (!keyword) return text

  const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escapedKeyword})`, 'gi')

  const parts = text.split(regex)

  return parts.map((part, idx) =>
    regex.test(part) ? (
      <span key={idx} className="text-[#6201E0] font-semibold">
        {part}
      </span>
    ) : (
      <span key={idx}>{part}</span>
    )
  )
}
