export type EmailLoginRequest = {
  email: string
  password: string
}

export type EmailLoginResponse = {
  access: string
  message: string
  refresh: string
  user: User
}

export type User = {
  birthday: string
  email: string
  gender: string
  id: number
  nickname: string
  phone_number: string
  profile_image_url: string
  role: string
}

export type RefreshTokenRequest = {
  refresh: string
}

export type RefreshTokenResponse = {
  access: string
  message: string
}
