import { useEffect, useRef, useState } from 'react'

export type DropdownPosition = 'left' | 'right'

export function useDropdownPosition<T extends HTMLElement>(isOpen: boolean) {
  const ref = useRef<T>(null)
  const [position, setPosition] = useState<DropdownPosition>('left')

  useEffect(() => {
    if (!isOpen || !ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const spaceRight = window.innerWidth - rect.right
    const spaceLeft = rect.left

    if (spaceRight < 0 && spaceLeft > Math.abs(spaceRight)) {
      setPosition('right')
    } else {
      setPosition('left')
    }
  }, [isOpen])

  return { ref, position }
}
