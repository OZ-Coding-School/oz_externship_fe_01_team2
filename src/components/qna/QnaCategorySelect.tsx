import SingleDropdown from '@components/common/SingleDropdown'
import { useState, useEffect } from 'react'
import { fetchCategories } from '@api/qna/questionApi'
import type { Category } from '@api/qna/types'

interface SelectedCategories {
  major: Category | null
  middle: Category | null
  minor: Category | null
}

interface QnaCategorySelectProps {
  value?: number | null
  onCategoryChange?: (categoryId: number | null) => void
}

export default function QnaCategorySelect({
  value,
  onCategoryChange,
}: QnaCategorySelectProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [selected, setSelected] = useState<SelectedCategories>({
    major: null,
    middle: null,
    minor: null,
  })

  const [openDropdown, setOpenDropdown] = useState<
    'major' | 'middle' | 'minor' | null
  >(null)

  useEffect(() => {
    fetchCategories().then((data) => setCategories(data))
  }, [])

  useEffect(() => {
    if (value && categories.length > 0) {
      // 소분류 ID로부터 대분류-중분류-소분류 찾기
      const findCategoryPath = (minorId: number) => {
        for (const major of categories) {
          if (major.child_categories) {
            for (const middle of major.child_categories) {
              if (middle.child_categories) {
                const minor = middle.child_categories.find(
                  (m) => m.id === minorId
                )
                if (minor) {
                  return { major, middle, minor }
                }
              }
            }
          }
        }
        return null
      }
      const categoryPath = findCategoryPath(value)
      if (categoryPath) {
        setSelected(categoryPath)
      }
    }
  }, [value, categories])

  const majorOptions = categories.map((item) => ({
    id: item.id,
    name: item.name,
  }))

  let middleOptions: { id: number; name: string }[] = []
  if (selected.major) {
    middleOptions =
      selected.major.child_categories?.map((child) => ({
        id: child.id,
        name: child.name,
      })) ?? []
  }

  let minorOptions: { id: number; name: string }[] = []
  if (selected.middle) {
    minorOptions =
      selected.middle.child_categories?.map((child) => ({
        id: child.id,
        name: child.name,
      })) ?? []
  }

  const toggleDropdown = (type: 'major' | 'middle' | 'minor') => {
    setOpenDropdown((prev) => (prev === type ? null : type))
  }

  const handleMajor = (name: string) => {
    const major = categories.find((cat) => cat.name === name) || null
    setSelected({ major, middle: null, minor: null })
    setOpenDropdown(null)
  }
  const handleMiddle = (name: string) => {
    const middle =
      selected.major?.child_categories?.find((cat) => cat.name === name) || null
    setSelected((prev) => ({ ...prev, middle, minor: null }))
    setOpenDropdown(null)
  }
  const handleMinor = (name: string) => {
    const minor =
      selected.middle?.child_categories?.find((cat) => cat.name === name) ||
      null
    setSelected((prev) => ({ ...prev, minor }))
    setOpenDropdown(null)
  }

  useEffect(() => {
    if (onCategoryChange) {
      onCategoryChange(selected.minor ? selected.minor.id : null)
    }
  }, [selected.minor, onCategoryChange])

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <SingleDropdown
        options={majorOptions.map((c) => c.name)}
        placeholder="대분류 선택"
        isOpen={openDropdown === 'major'}
        onToggle={() => toggleDropdown('major')}
        selected={selected.major?.name ?? ''}
        onChange={handleMajor}
      />
      <SingleDropdown
        options={middleOptions.map((c) => c.name)}
        placeholder="중분류 선택"
        isOpen={openDropdown === 'middle'}
        onToggle={() => toggleDropdown('middle')}
        selected={selected.middle?.name ?? ''}
        onChange={handleMiddle}
        disabled={!selected.major}
      />
      <SingleDropdown
        options={minorOptions.map((c) => c.name)}
        placeholder="소분류 선택"
        isOpen={openDropdown === 'minor'}
        onToggle={() => toggleDropdown('minor')}
        selected={selected.minor?.name ?? ''}
        onChange={handleMinor}
        disabled={!selected.middle}
      />
    </div>
  )
}
