import SingleDropdown from '../../components/common/SingleDropdown'
import { useState, useEffect } from 'react'
import { fetchCategories } from '../../api/qnaCategory'

interface Category {
  id: number
  name: string
  type: string
  parent_category_id: number | null
}

interface SelectedCategories {
  major: string | null
  middle: string | null
  minor: string | null
}

interface QnaCategorySelectProps {
  onCategoryChange?: (categoryId: number | null) => void
}

export default function QnaCategorySelect({
  onCategoryChange,
}: QnaCategorySelectProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategories, setSelectedCategories] =
    useState<SelectedCategories>({
      major: null,
      middle: null,
      minor: null,
    })
  const [openDropdown, setOpenDropdown] = useState<
    'major' | 'middle' | 'minor' | null
  >(null)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) return

    fetchCategories(token).then((data) => {
      if (!Array.isArray(data)) return

      const transformedCategories = data.map(
        ({
          category_id,
          category_name,
          category_type,
          parent_category_id,
        }) => ({
          id: category_id,
          name: category_name,
          type: category_type,
          parent_category_id: parent_category_id,
        })
      )

      setCategories(transformedCategories)
    })
  }, [])

  const findCategoryIdByName = (categoryName: string | null): number | null => {
    if (!categoryName) return null
    const category = categories.find((c) => c.name === categoryName)
    return category ? category.id : null
  }

  const getChildCategoryNames = (
    parentCategoryName: string | null,
    childType: 'middle' | 'minor'
  ): string[] => {
    if (!parentCategoryName) return []

    const parentId = findCategoryIdByName(parentCategoryName)
    if (!parentId) return []

    return categories
      .filter(
        (category) =>
          category.type === childType &&
          category.parent_category_id === parentId
      )
      .map((category) => category.name)
  }

  const majorOptions = categories
    .filter((category) => category.type === 'major')
    .map((category) => category.name)

  const middleOptions = getChildCategoryNames(
    selectedCategories.major,
    'middle'
  )
  const minorOptions = getChildCategoryNames(selectedCategories.middle, 'minor')


  //여기 잘 모르겠어요
  useEffect(() => {
    const selectedMinorCategoryId = findCategoryIdByName(
      selectedCategories.minor
    )
    onCategoryChange?.(selectedMinorCategoryId)
  }, [selectedCategories.minor, categories, onCategoryChange])

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <SingleDropdown
        options={majorOptions}
        placeholder="대분류 선택"
        isOpen={openDropdown === 'major'}
        onToggle={() =>
          setOpenDropdown(openDropdown === 'major' ? null : 'major')
        }
        selected={selectedCategories.major || ''}
        onChange={(selected) => {
          setSelectedCategories({ major: selected, middle: null, minor: null })
          setOpenDropdown(null)
        }}
      />

      <SingleDropdown
        options={middleOptions}
        placeholder="중분류 선택"
        isOpen={openDropdown === 'middle'}
        onToggle={() =>
          setOpenDropdown(openDropdown === 'middle' ? null : 'middle')
        }
        selected={selectedCategories.middle || ''}
        onChange={(selected) => {
          setSelectedCategories((prev) => ({
            ...prev,
            middle: selected,
            minor: null,
          }))
          setOpenDropdown(null)
        }}
        disabled={!selectedCategories.major}
      />

      <SingleDropdown
        options={minorOptions}
        placeholder="소분류 선택"
        isOpen={openDropdown === 'minor'}
        onToggle={() =>
          setOpenDropdown(openDropdown === 'minor' ? null : 'minor')
        }
        selected={selectedCategories.minor || ''}
        onChange={(selected) => {
          setSelectedCategories((prev) => ({ ...prev, minor: selected }))
          setOpenDropdown(null)
        }}
        disabled={!selectedCategories.middle}
      />
    </div>
  )
}
