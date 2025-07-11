// 현재 사용자 정보 조회 타입
export type UserProfile = {
  profile_image_url: string
  email: string
  nickname: string
  name: string
  phone_number: string
  birthday: string
  course_name: string
  generation: string
}

// 닉네임 중복 확인 응답
export type NicknameCheck = {
  isDuplicated: boolean
}

// ✅ 수정 요청 타입 - multipart/form-data용
export type UpdateRequest = {
  profile_image_file?: File // 이미지 파일 첨부
  password?: string // 비밀번호
  password2?: string // 비밀번호 확인
  nickname: string
  phone_number: string
}

// ✅ 수정 응답 타입 - 업데이트된 필드들 반환
export type UpdateResponse = {
  message: string
  updated_fields: {
    profile_image_url?: string
    nickname?: string
    phone_number?: string
  }
}
