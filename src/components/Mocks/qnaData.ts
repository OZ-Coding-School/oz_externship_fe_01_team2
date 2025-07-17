export const qnaData = {
  id: 101,
  title: 'Django 마이그레이션 오류 질문입니다',
  content: 'migrate 명령 시 오류가 납니다. 해결 방법이 궁금합니다.',
  images: ['https://cdn.ozcoding.com/media/qnaDetails/101/1.jpg'],
  author: {
    id: 7,
    nickname: 'oz_student',
    profile_image_url: 'https://cdn.ozcoding.com/profiles/user7.png',
  },
  category: {
    depth_1: '백엔드',
    depth_2: 'Python',
    depth_3: 'Django 오류',
  },
  view_count: 24,
  created_at: '2025-06-23T05:00:00Z',
  answers: [
    {
      id: 201,
      content: '# Django 마이그레이션 오류 해결 방법',
      is_adopted: true,
      created_at: '2025-06-23T06:00:00Z',
      author: {
        id: 8,
        nickname: 'oz_helper',
        profile_image_url: 'https://cdn.ozcoding.com/profiles/user8.png',
      },
      comments: [
        {
          id: 301,
          content: '덕분에 해결했어요 감사합니다!',
          created_at: '2025-06-23T07:00:00Z',
          author: {
            id: 7,
            nickname: 'oz_student',
            profile_image_url: 'https://cdn.ozcoding.com/profiles/user7.png',
          },
        },
        {
          id: 302,
          content: '덕분에 해결했어요 감사합니다!',
          created_at: '2025-06-23T07:00:00Z',
          author: {
            id: 7,
            nickname: 'oz_student',
            profile_image_url: 'https://cdn.ozcoding.com/profiles/user7.png',
          },
        },
      ],
    },
    {
      id: 202,
      content:
        '마이그레이션 오류는 종종 데이터베이스 스키마와 모델 간의 불일치로 발생합니다. 다음 단계를 시도해 보세요:\n\n1. `python manage.py makemigrations` 명령어로 변경 사항을 적용하세요.\n2. `python manage.py migrate` 명령어로 마이그레이션을 실행하세요.\n3. 만약 여전히 오류가 발생한다면, 데이터베이스를 초기화하고 다시 마이그레이션을 시도해 보세요.',
      is_adopted: false,
      created_at: '2025-06-23T06:00:00Z',
      author: {
        id: 8,
        nickname: 'oz_helper',
        profile_image_url: 'https://cdn.ozcoding.com/profiles/user8.png',
      },
      comments: [
        {
          id: 303,
          content: '덕분에 해결했어요 감사합니다!',
          created_at: '2025-06-23T07:00:00Z',
          author: {
            id: 7,
            nickname: 'oz_student',
            profile_image_url: 'https://cdn.ozcoding.com/profiles/user7.png',
          },
        },
      ],
    },
  ],
}
