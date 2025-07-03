// src/components/qna/QnaCategorySelect.tsx
import SingleDropdown from '../common/SingleDropdown'
import { mockCategories } from '../../components/Mocks/MockCategories'

interface Props {
  majorId: number | null
  setMajorId: (id: number | null) => void
  middleId: number | null
  setMiddleId: (id: number | null) => void
  minorId: number | null
  setMinorId: (id: number | null) => void
}

export default function QnaCategorySelect({
  majorId,
  setMajorId,
  middleId,
  setMiddleId,
  minorId,
  setMinorId,
}: Props) {
  // 대분류, 중분류, 소분류 옵션 추출 (타입 추론 O)
  const majorOptions = mockCategories.filter(
    (cat) => cat.category_type === 'major'
  )
  const middleOptions = mockCategories.filter(
    (cat) => cat.category_type === 'middle' && cat.parent_id === majorId
  )
  const minorOptions = mockCategories.filter(
    (cat) => cat.category_type === 'minor' && cat.parent_id === middleId
  )

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {/* 대분류 */}
      <SingleDropdown
        options={['대분류 선택', ...majorOptions.map((cat) => cat.name)]}
        selected={
          majorOptions.find((cat) => cat.id === majorId)?.name || '대분류 선택'
        }
        onChange={(value) => {
          const found = majorOptions.find((cat) => cat.name === value)
          setMajorId(found?.id ?? null)
          setMiddleId(null)
          setMinorId(null)
        }}
        placeholder="대분류 선택"
      />
      {/* 중분류 */}
      <SingleDropdown
        options={['중분류 선택', ...middleOptions.map((cat) => cat.name)]}
        selected={
          middleOptions.find((cat) => cat.id === middleId)?.name ||
          '중분류 선택'
        }
        onChange={(value) => {
          const found = middleOptions.find((cat) => cat.name === value)
          setMiddleId(found?.id ?? null)
          setMinorId(null)
        }}
        placeholder="중분류 선택"
        disabled={!majorId}
      />
      {/* 소분류 */}
      <SingleDropdown
        options={['소분류 선택', ...minorOptions.map((cat) => cat.name)]}
        selected={
          minorOptions.find((cat) => cat.id === minorId)?.name || '소분류 선택'
        }
        onChange={(value) => {
          const found = minorOptions.find((cat) => cat.name === value)
          setMinorId(found?.id ?? null)
        }}
        placeholder="소분류 선택"
        disabled={!middleId}
      />
    </div>
  )
}
