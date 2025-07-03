// src/mocks/MockQuestionDetail.ts
export const mockQuestionDetail = {
  id: 101,
  title: '질문 제목을 수정합니다',
  content: '수정된 질문 내용입니다.\n여기에 기존 질문 본문이 들어갑니다.',
  author: { id: 7, nickname: 'oz_student' },
  category: { id: 120, name: '기본 문법' }, // minor 카테고리 id!
  images: [
    'https://cdn.ozcoding.com/media/questions/101/edit1.jpg',
    'https://cdn.ozcoding.com/media/questions/101/edit2.jpg',
  ],
  created_at: '2025-06-22T14:00:00Z',
  updated_at: '2025-06-23T08:30:00Z',
}
