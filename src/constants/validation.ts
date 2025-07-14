export const VALIDATION_REGEX = {
  KOREAN_NAME: /^[가-힣]+$/,
  NICKNAME: /^[가-힣a-zA-Z0-9]{2,10}$/,
  BIRTH: /^\d{8}$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  EMAIL_CODE: /^[A-Za-z0-9]{6}$/,
  PHONE_PART1: /^\d{3}$/,
  PHONE_PART2: /^\d{4}$/,
  PHONE_PART3: /^\d{4}$/,
  PHONE: /^\d{11}$/,
  PHONE_CODE: /^\d{6}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,15}$/,
  CODE: /^[A-Za-z0-9]{6}$/,
} as const

export const TIMER_DURATION = 300
