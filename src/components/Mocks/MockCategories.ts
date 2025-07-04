// src/Mocks/MockCategories.ts

export interface Category {
  id: number
  name: string
  type: '대' | '중' | '소'
  child_categories: Category[]
  parent_category: string | null
}
export const mockCategories: Category[] = [
  {
    id: 1,
    name: '웹개발',
    type: '대',
    parent_category: null,
    child_categories: [
      {
        id: 10,
        name: '프론트엔드',
        type: '중',
        parent_category: '웹개발',
        child_categories: [
          {
            id: 100,
            name: 'React',
            type: '소',
            parent_category: '프론트엔드',
            child_categories: [],
          },
          {
            id: 101,
            name: 'Vue',
            type: '소',
            parent_category: '프론트엔드',
            child_categories: [],
          },
        ],
      },
      {
        id: 11,
        name: '백엔드',
        type: '중',
        parent_category: '웹개발',
        child_categories: [
          {
            id: 110,
            name: 'Django',
            type: '소',
            parent_category: '백엔드',
            child_categories: [],
          },
          {
            id: 111,
            name: 'Express',
            type: '소',
            parent_category: '백엔드',
            child_categories: [],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: '프로그래밍 언어',
    type: '대',
    parent_category: null,
    child_categories: [
      {
        id: 12,
        name: 'Python',
        type: '중',
        parent_category: '프로그래밍 언어',
        child_categories: [
          {
            id: 120,
            name: '기본 문법',
            type: '소',
            parent_category: 'Python',
            child_categories: [],
          },
          {
            id: 121,
            name: 'Django 심화',
            type: '소',
            parent_category: 'Python',
            child_categories: [],
          },
        ],
      },
      {
        id: 13,
        name: 'JavaScript',
        type: '중',
        parent_category: '프로그래밍 언어',
        child_categories: [
          {
            id: 130,
            name: 'ES6',
            type: '소',
            parent_category: 'JavaScript',
            child_categories: [],
          },
          {
            id: 131,
            name: 'Node.js',
            type: '소',
            parent_category: 'JavaScript',
            child_categories: [],
          },
        ],
      },
    ],
  },
]
