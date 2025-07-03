// src/mocks/MockCategories.ts

export interface Category {
  id: number
  name: string
  category_type: 'major' | 'middle' | 'minor'
  parent_id?: number
}

export const mockCategories: Category[] = [
  { id: 1, name: '웹개발', category_type: 'major' },
  { id: 2, name: '프로그래밍 언어', category_type: 'major' },
  { id: 10, name: '프론트엔드', category_type: 'middle', parent_id: 1 },
  { id: 11, name: '백엔드', category_type: 'middle', parent_id: 1 },
  { id: 12, name: 'Python', category_type: 'middle', parent_id: 2 },
  { id: 100, name: 'React', category_type: 'minor', parent_id: 10 },
  { id: 101, name: 'Vue', category_type: 'minor', parent_id: 10 },
  { id: 110, name: 'Django', category_type: 'minor', parent_id: 11 },
  { id: 120, name: '기본 문법', category_type: 'minor', parent_id: 12 },
]
