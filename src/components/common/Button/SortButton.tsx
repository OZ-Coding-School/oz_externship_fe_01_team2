// components/common/Button/SortButton.tsx

type Props = {
  label: string
  selected?: boolean
  disabledVisual?: boolean // ✅ UI만 비활성처럼
  onClick?: () => void
}

const SortButton = ({
  label,
  selected = false,
  disabledVisual = false,
  onClick,
}: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-[98px] h-[42px] px-4 py-2 rounded-sm text-center text-sm font-medium transition
        ${
          disabledVisual
            ? 'text-[#C5C5C5] bg-[#F5F5F5] cursor-default font-semibold'
            : selected
              ? 'bg-[#EFE6FC] text-[#6201E0] font-semibold cursor-pointer'
              : 'bg-[#ffffff] text-[#4d4d4d] hover:bg-[#dcdcdc] font-semibold cursor-pointer'
        }`}
    >
      {label}
    </button>
  )
}

export default SortButton
