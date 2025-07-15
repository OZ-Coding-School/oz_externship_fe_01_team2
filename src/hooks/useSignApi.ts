import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { useToast } from './useToast'

interface ErrorResponse {
  email?: string[]
  phone_number?: string[]
  nickname?: string[]
  message?: string
  error?: string
}
export function useSignUpApi() {
  const toast = useToast()
  const [loading, setLoading] = useState(false)

  // 닉네임 중복 확인
  const checkNicknameDuplicate = async (nickname: string): Promise<boolean> => {
    setLoading(true)
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/profile/nickname-check/`,
        { nickname },
        { headers: { 'Content-Type': 'application/json' } }
      )
      toast.show({ message: '사용 가능한 닉네임입니다.', type: 'success' })
      return true
    } catch {
      toast.show({ message: '이미 사용 중인 닉네임입니다.', type: 'error' })
      return false
    } finally {
      setLoading(false)
    }
  }

  // 이메일 인증코드 전송
  const sendEmailVerificationCode = async (email: string) => {
    setLoading(true)
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/email/send-code`,
        { email, purpose: 'signup' },
        { headers: { 'Content-Type': 'application/json' } }
      )
      toast.show({ message: '인증코드 전송 완료', type: 'success' })
      return true
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>
      if (
        axiosError.response?.data?.email &&
        axiosError.response.data.email.some((msg) =>
          msg.includes('이미 존재합니다')
        )
      ) {
        toast.show({ message: '이미 가입된 이메일입니다.', type: 'error' })
      } else {
        toast.show({ message: '인증코드 전송에 실패했습니다.', type: 'error' })
      }
      return false
    } finally {
      setLoading(false)
    }
  }

  // 이메일 인증 코드 검증
  const verifyEmailCode = async (
    email: string,
    code: string,
    onSuccess?: () => void,
    onError?: (msg: string) => void
  ) => {
    setLoading(true)
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/email/verify-code`,
        { email, verification_code: code, purpose: 'signup' },
        { headers: { 'Content-Type': 'application/json' } }
      )
      toast.show({ message: '이메일 인증이 완료되었습니다.', type: 'success' })
      if (onSuccess) onSuccess()
    } catch (error) {
      const errorMsg = '인증코드가 일치하지 않습니다.'
      toast.show({ message: errorMsg, type: 'error' })
      if (onError) onError(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  //휴대폰 인증번호 전송
  const sendPhoneVerificationCode = async (phone: string) => {
    setLoading(true)
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/phone/send-code/`,
        { phone },
        { headers: { 'Content-Type': 'application/json' } }
      )
      toast.show({
        message: '휴대폰 인증번호가 전송되었습니다.',
        type: 'success',
      })
      return true
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>
      if (
        axiosError.response?.data?.phone_number &&
        axiosError.response.data.phone_number.some((msg) =>
          msg.includes('이미 존재합니다')
        )
      ) {
        toast.show({
          message: '이미 가입된 휴대폰 번호입니다.',
          type: 'error',
        })
      } else {
        toast.show({
          message: '휴대폰 인증번호 전송에 실패했습니다.',
          type: 'error',
        })
      }
      return false
    } finally {
      setLoading(false)
    }
  }

  //휴대폰 인증번호 확인
  const verifyPhoneCode = async (
    phone: string,
    code: string
  ): Promise<boolean> => {
    setLoading(true)
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/phone/verify-code/`,
        { phone, code },
        { headers: { 'Content-Type': 'application/json' } }
      )
      toast.show({ message: '휴대폰 인증이 완료되었습니다.', type: 'success' })
      return true
    } catch {
      toast.show({ message: '인증번호가 일치하지 않습니다.', type: 'error' })
      return false
    } finally {
      setLoading(false)
    }
  }

  // 회원가입 요청
  const signUp = async (formData: {
    email: string
    password: string
    password_confirm: string
    name: string
    nickname: string
    gender: 'MALE' | 'FEMALE'
    phone_number: string
    birthday?: string
    self_introduction?: string
    profile_image_file?: File | null
  }) => {
    const data = new FormData()
    data.append('email', formData.email)
    data.append('password', formData.password)
    data.append('password_confirm', formData.password_confirm)
    data.append('name', formData.name)
    data.append('nickname', formData.nickname)
    data.append('gender', formData.gender)
    data.append('phone_number', formData.phone_number)

    if (formData.birthday) data.append('birthday', formData.birthday)
    if (formData.self_introduction)
      data.append('self_introduction', formData.self_introduction)
    if (formData.profile_image_file)
      data.append('profile_image_file', formData.profile_image_file)

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/signup`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      console.log(response)
      toast.show({ message: '회원가입이 완료되었습니다 🎉', type: 'success' })
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const data = error.response.data

        const emailError = data.email?.[0] // 예: "user의 email은/는 이미 존재합니다."
        const phoneError = data.phone_number?.[0] // 예: "user의 phone number은/는 이미 존재합니다."

        const messages = [emailError, phoneError].filter(Boolean).join('\n')

        if (messages) {
          toast.show({
            message: messages,
            type: 'error',
          })
        }
      } else {
        toast.show({
          message: '알 수 없는 오류가 발생했습니다.',
          type: 'error',
        })
      }
    }
  }

  return {
    loading,
    checkNicknameDuplicate,
    sendEmailVerificationCode,
    verifyEmailCode,
    sendPhoneVerificationCode,
    verifyPhoneCode,
    signUp,
  }
}
