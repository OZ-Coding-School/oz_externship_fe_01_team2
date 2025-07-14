import defaultImage from '@assets/images/common/img_default.png'
import defaultAvatar from '@assets/images/common/img_user_default.png'
import React from 'react'

export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement>,
  type: 'avatar' | 'default' = 'default'
) => {
  e.currentTarget.onerror = null

  if (type === 'avatar') {
    e.currentTarget.src = defaultAvatar
    e.currentTarget.alt = '기본 프로필 이미지'
    return
  }
  e.currentTarget.src = defaultImage
  e.currentTarget.alt = '기본 이미지'
}
