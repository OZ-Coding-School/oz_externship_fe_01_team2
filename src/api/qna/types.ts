import type { Question } from '@custom-types/qnaDetail'

export interface QuestionRawResponse {
  count: number
  next: string | null
  previous: string | null
  results: Question[]
}

export enum CategoryType {
  Major = 'major',
  Middle = 'middle',
  Minor = 'minor',
}

export interface Category {
  id: number
  name: string
  category_type: CategoryType
  parent_ctg?: ParentCategory
  child_categories?: Category[]
}

export interface ParentCategory {
  id: number
  name: string
}
