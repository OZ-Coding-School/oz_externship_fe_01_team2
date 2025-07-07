export const VALIDATION_REGEX = {
  KOREAN_NAME: /^[가-힣]+$/,
  PHONE: /^\d{11}$/,
  CODE: /^\d{6}$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.(com)$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,15}$/,
} as const

export const TIMER_DURATION = 300
