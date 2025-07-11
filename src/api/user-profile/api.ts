import fetcher from '../../lib/fetcher'

import type {
  UserProfile,
  NicknameCheck as NicknameCheckResponse,
  UpdateRequest,
  UpdateResponse,
} from './types'

const UserProfileApi = {
  // 내 정보 조회
  getUserProfile: async (): Promise<UserProfile> => {
    const response = await fetcher.get('/auth/profile')
    return response.data
  },

  // 닉네임 중복 확인
  checkNickname: async (nickname: string): Promise<NicknameCheckResponse> => {
    const response = await fetcher.post('/auth/profile/nickname-check', {
      nickname,
    })
    return response.data
  },

  // 내 정보 수정 (multipart/form-data 전송)
  updateUserProfile: async (data: UpdateRequest): Promise<UpdateResponse> => {
    const formData = new FormData()
    formData.append('nickname', data.nickname)
    formData.append('phone_number', data.phone_number)

    if (data.profile_image_file) {
      formData.append('profile_image_file', data.profile_image_file)
    }
    if (data.password) {
      formData.append('password', data.password)
    }
    if (data.password2) {
      formData.append('password2', data.password2)
    }

    const response = await fetcher.patch('/auth/profile/update', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },
}

export default UserProfileApi
