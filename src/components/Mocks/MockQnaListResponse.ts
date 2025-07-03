// mocks/mockQnaListResponse2.ts

export const mockQnaListResponse = {
  count: 5,
  next: null,
  previous: null,
  results: [
    {
      id: 1,
      title: 'Django 마이그레이션 질문입니다',
      content: 'makemigrations 이후 migrate 시 오류가 납니다.',
      author: {
        nickname: 'oz_student',
        profile_image_url: 'https://cdn.ozcoding.com/profile/oz_student.jpg',
      },
      category: {
        depth_1: '웹개발',
        depth_2: 'Django',
        depth_3: '오류 해결',
      },
      answer_count: 3,
      view_count: 123,
      created_at: '2025-06-23T02:22:00Z',
      thumbnail: ' ',
    },
    {
      id: 2,
      title: 'React 상태관리 관련 질문입니다',
      content: 'useState와 Redux의 차이점이 궁금합니다.',
      author: {
        nickname: 'frontend_dev',
        profile_image_url: 'https://cdn.ozcoding.com/profile/frontend_dev.jpg',
      },
      category: {
        depth_1: '웹개발',
        depth_2: 'React',
        depth_3: '상태관리',
      },
      answer_count: 1,
      view_count: 78,
      created_at: '2025-06-25T14:12:00Z',
      thumbnail: 'https://cdn.ozcoding.com/media/questions/2/thumb.jpg',
    },
    {
      id: 3,
      title: 'Python 반복문 관련 오류',
      content: 'for문에서 인덱스 오류가 발생합니다. 해결 방법이 있을까요?',
      author: {
        nickname: 'python_lover',
        profile_image_url: 'https://cdn.ozcoding.com/profile/python_lover.jpg',
      },
      category: {
        depth_1: '프로그래밍 언어',
        depth_2: 'Python',
        depth_3: '문법',
      },
      answer_count: 0,
      view_count: 45,
      created_at: '2025-06-27T09:00:00Z',
      thumbnail: '',
    },
    {
      id: 4,
      title: 'Next.js에서 페이지 전환 시 데이터 유지하는 방법은?',
      content:
        'getServerSideProps로 받아온 데이터를 페이지 전환 후에도 유지하고 싶습니다.',
      author: {
        nickname: 'nextjs_master',
        profile_image_url: 'https://cdn.ozcoding.com/profile/nextjs_master.jpg',
      },
      category: {
        depth_1: '웹개발',
        depth_2: 'Next.js',
        depth_3: '데이터 처리',
      },
      answer_count: 2,
      view_count: 98,
      created_at: '2025-06-28T17:20:00Z',
      thumbnail: '',
    },
    {
      id: 5,
      title: '백엔드 API 응답이 너무 느립니다',
      content: '서버 응답 시간이 오래 걸리는 이유가 뭘까요?',
      author: {
        nickname: 'api_debugger',
        profile_image_url: 'https://cdn.ozcoding.com/profile/api_debugger.jpg',
      },
      category: {
        depth_1: '백엔드',
        depth_2: 'FastAPI',
        depth_3: '성능 최적화',
      },
      answer_count: 4,
      view_count: 250,
      created_at: '2025-06-30T08:30:00Z',
      thumbnail: 'https://cdn.ozcoding.com/media/questions/5/thumb.jpg',
    },
  ],
}
