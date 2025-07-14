import SingleDropdown from '@components/common/SingleDropdown'
import { useState } from 'react'
import { mockCategories } from '../Mocks/MockCategories'

interface SelectedCategories {
  major: string | null
  middle: string | null
  minor: string | null
}

export default function QnaCategorySelect() {
  const [selectedCategories, setSelectedCategories] =
    useState<SelectedCategories>({
      major: null,
      middle: null,
      minor: null,
    })

  // 대분류 옵션
  const majorOptions = mockCategories.map((item) => item.name)

  // 중분류 옵션 (추가!)
  let middleOptions: string[] = []
  if (selectedCategories.major) {
    const selectedMajor = mockCategories.find(
      (item) => item.name === selectedCategories.major
    )
    if (selectedMajor) {
      middleOptions = selectedMajor.child_categories.map((child) => child.name)
    }
  }

  // 소분류 옵션 (추가!)
  let minorOptions: string[] = []
  if (selectedCategories.middle) {
    const selectedMajor = mockCategories.find(
      (item) => item.name === selectedCategories.major
    )
    if (selectedMajor) {
      const selectedMiddle = selectedMajor.child_categories.find(
        (child) => child.name === selectedCategories.middle
      )
      if (selectedMiddle) {
        minorOptions = selectedMiddle.child_categories.map(
          (child) => child.name
        )
      }
    }
  }

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <SingleDropdown
        options={majorOptions}
        placeholder="대분류 선택"
        onChange={(selected) => {
          setSelectedCategories({
            major: selected,
            middle: null,
            minor: null,
          })
        }}
      />
      <SingleDropdown
        options={middleOptions}
        placeholder="중분류 선택"
        onChange={(selected) => {
          setSelectedCategories((prevCategories) => ({
            ...prevCategories,
            middle: selected,
            minor: null,
          }))
        }}
        disabled={!selectedCategories.major}
      />
      <SingleDropdown
        options={minorOptions}
        placeholder="소분류 선택"
        onChange={(selected) => {
          setSelectedCategories((prevCategories) => ({
            ...prevCategories,
            minor: selected,
          }))
        }}
        disabled={!selectedCategories.middle}
      />
    </div>
  )
}
