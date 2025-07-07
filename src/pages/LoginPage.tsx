import { Link } from 'react-router-dom'
import FormInput from '../components/common/FormInput'
import Button from '../components/common/Button'
import { useInput } from '../hooks/useInput'
import Modal from '../components/common/Modal'
import { useState, useEffect } from 'react'
import { UserRound, LockKeyhole } from 'lucide-react'
import IdSuccess from '../components/common/Popup/IdSuccess'
import PwSuccess from '../components/common/Popup/PwSuccess'
import ozLogo from '../assets/images/common/renewal_ozcoding_logo_black.svg'

export default function LoginPage() {
  const nameValid = useInput((v) => {
    const regex = /^[가-힣]+$/ // 한글만
    return regex.test(v) && v.trim() !== ''
  })

  const phoneValid = useInput((v) => {
    const regex = /^\d{11}$/ // 숫자 11자리
    return regex.test(v)
  })

  const codeValid = useInput((v) => {
    const regex = /^\d{6}$/ // 숫자 6자리
    return regex.test(v)
  })

  const idValid = useInput((v) => {
    const regex = /^[^\s@]+@gmail\.com$/
    return regex.test(v)
  })

  const pwValid = useInput((v) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,15}$/
    return regex.test(v)
  })

  const isFormValid = idValid.value.length > 0 && pwValid.value.length > 0

  const [isFindIdOpen, setIsFindIdOpen] = useState<boolean>(false)
  const [isFindPwOpen, setIsFindPwOpen] = useState<boolean>(false)

  const [validError, setValidError] = useState(false)

  const handleFindId = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault() // ✅ 폼 제출 막기
    if (!nameValid.isValid || !phoneValid.isValid || !codeValid.isValid) {
      setValidError(true)
      return
    }

    setValidError(false)
    setFindIdStep('result')
  }

  const emailValid = useInput((v) => {
    const regex = /^[^\s@]+@gmail\.com$/
    return regex.test(v)
  })

  const emailCodeValid = useInput((v) => {
    const regex = /^\d{6}$/ // 숫자 6자리
    return regex.test(v)
  })

  const [timeLeft, setTimeLeft] = useState(0) // 남은 시간 (초)
  const [isTimerActive, setIsTimerActive] = useState(false)

  useEffect(() => {
    if (!isTimerActive || timeLeft <= 0) {
      if (timeLeft <= 0) {
        setIsTimerActive(false) // 타이머 비활성화
      }
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [isTimerActive, timeLeft])

  // 인증코드 전송 시 타이머 시작
  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault()

    setTimeLeft(300) // 5분 = 300초
    setIsTimerActive(true)
  }

  const formatTime = (seconds: number) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, '0')
    const sec = String(seconds % 60).padStart(2, '0')
    return `${min}:${sec}`
  }

  const handleVerifyCode = () => {
    // 인증코드 확인 로직
    console.log('인증코드 확인 진행')

    // 타이머 중지
    setIsTimerActive(false)
    setTimeLeft(0) // 시간도 0으로 리셋
  }

  const [findIdStep, setFindIdStep] = useState<'form' | 'result'>('form')
  const [findPwStep, setFindPwStep] = useState<'form' | 'result'>('form')

  return (
    <div className="flex justify-center">
      <div className="mt-[200px] mb-[392px] w-[348px] h-[488px]">
        <form>
          <div className="flex flex-col justify-center items-center mb-[64px]">
            <img
              src={ozLogo}
              alt="오즈코딩스쿨"
              className="w-[180px] h-[24px] mb-[27px]"
            />
            <div className="flex justify-center items-center h-[11px] gap-[12px]">
              <h3 className="font-medium">아직 회원이 아니신가요?</h3>
              <Link
                to="/signup"
                className="text-[#6201E0] no-underline font-medium"
              >
                회원가입하기
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-[12px] mb-[40px]">
            <button
              type="button"
              className="flex items-center justify-center p-[8px] gap-[4px] bg-[#FEE500] rounded-[4px] w-full h-[52px] text-black font-normal"
            >
              <svg
                width="16"
                height="214"
                viewBox="0 0 14 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[16px] h-[14px]"
              >
                <path
                  d="M6.99533 0C3.39972 0 0.5 2.31659 0.5 5.12896C0.5 6.95447 1.70628 8.55295 3.51571 9.46564L2.90328 11.7499C2.89174 11.7841 2.88997 11.8209 2.89816 11.856C2.90636 11.8912 2.92419 11.9235 2.94969 11.9491C2.98685 11.9818 3.03468 11.9999 3.08423 12C3.12532 11.9968 3.1643 11.9805 3.19557 11.9537L5.83084 10.1792C6.21984 10.2328 6.61196 10.2606 7.00469 10.2626C10.5957 10.2626 13.5 7.94599 13.5 5.12896C13.5 2.31196 10.5863 0 6.99533 0Z"
                  fill="#392020"
                />
              </svg>
              카카오 간편 로그인 / 가입
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-[4px] bg-[#03C75A] h-[52px] p-[8px] text-white rounded-[4px] w-full font-normal"
            >
              <svg
                width="20"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[20px] h-[21px]"
              >
                <rect width="20" height="21" fill="none" />
                <path
                  d="M5.015 18.4h4.765v-6.457L14.21 18.4h4.78V5.6h-4.765v6.458L9.78 5.6H5.015v12.8z"
                  fill="white"
                />
              </svg>
              네이버 간편 로그인 / 가입
            </button>
          </div>

          <div className="flex flex-col gap-[12px]">
            <FormInput
              value={idValid.value}
              onChange={(value: string) => idValid.setValue(value)}
              placeholder="아이디 (example@gmail.com)"
              type="email"
              className="w-[348px] h-[48px]"
            ></FormInput>
            <FormInput
              value={pwValid.value}
              onChange={(value: string) => pwValid.setValue(value)}
              placeholder="비밀번호 (6~15자의 영문 대소문자, 숫자, 특수문자 포함)"
              type="password"
              className="w-[348px] h-[48px]"
            ></FormInput>
            <div>
              <button
                type="button"
                onClick={() => setIsFindIdOpen(true)}
                className="py-[8px] text-sm underline-none text-gray-600 font-normal"
              >
                아이디 찾기
              </button>
              <span className="px-[8px] py-[8px] text-gray-600 font-normal">
                {' '}
                |{' '}
              </span>
              <button
                type="button"
                onClick={() => setIsFindPwOpen(true)}
                className="py-[8px] text-sm no-underline text-gray-600 font-normal"
              >
                비밀번호 찾기
              </button>
            </div>
            {/* 아이디 찾기 모달 */}
            <Modal
              isOpen={isFindIdOpen}
              onClose={() => {
                setIsFindIdOpen(false)
                setFindIdStep('form')
              }}
            >
              {findIdStep === 'form' ? (
                <div className="flex flex-col items-center mt-[10px] w-[348px] gap-[40px]">
                  <div className="flex flex-col items-center">
                    <div className="text-primary bg-[#D0B3F6] w-[28px] h-[28px] flex items-center justify-center rounded-full p-1">
                      <UserRound />
                    </div>
                    <h2 className="mt-[13px] font-semibold text-[18px]">
                      아이디 찾기
                    </h2>
                    {validError && (
                      <div className="text-[14px] text-[rgba(236,0,55,1)] mt-2 text-center">
                        입력한 이름과 휴대폰 번호로 등록된 <br /> 이메일이
                        존재하지 않습니다.
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-[20px]">
                    <label htmlFor="name" className="text-sm">
                      이름<span className="text-[#f04141]">*</span>
                    </label>

                    <FormInput
                      value={nameValid.value}
                      onChange={(v) => nameValid.setValue(v)}
                      type="text"
                      hasError={
                        !nameValid.isValid && nameValid.value.length > 0
                      }
                      errorMessage=""
                      hasSuccess={nameValid.isValid}
                      successMessage=""
                      placeholder="이름을 입력해주세요"
                      className="w-[348px] h-[48px]"
                    />
                  </div>

                  <div className="flex flex-col gap-[20px]">
                    <label htmlFor="name" className="text-sm">
                      휴대전화<span className="text-[#f04141]">*</span>
                    </label>

                    <div className="flex flex-col gap-[12px]">
                      <div className="flex">
                        <div className="w-[228px] mr-[8px]">
                          <FormInput
                            value={phoneValid.value}
                            onChange={(v) => {
                              // 숫자만 입력 & 최대 11자
                              const onlyNums = v.replace(/\D/g, '').slice(0, 11)
                              phoneValid.setValue(onlyNums)
                            }}
                            hasError={
                              !phoneValid.isValid && phoneValid.value.length > 0
                            }
                            errorMessage=""
                            hasSuccess={phoneValid.isValid}
                            successMessage=""
                            type="text"
                            placeholder="숫자만 입력해주세요"
                            className="w-[228px] h-[48px]"
                          />
                        </div>
                        <Button
                          variant={phoneValid.isValid ? 'fill' : 'outline'}
                          className="w-[112px] h-[48px] p-0"
                        >
                          인증번호전송
                        </Button>
                      </div>

                      <div className="flex">
                        <div className="w-[228px] mr-[8px]">
                          <FormInput
                            value={codeValid.value}
                            onChange={(v) => {
                              const onlyNums = v.replace(/\D/g, '').slice(0, 6)
                              codeValid.setValue(onlyNums)
                            }}
                            hasError={
                              !codeValid.isValid && codeValid.value.length > 0
                            }
                            errorMessage=""
                            hasSuccess={codeValid.isValid}
                            successMessage=""
                            type="text"
                            placeholder="인증번호 6자리를 입력해주세요"
                            className="w-[228px] h-[48px]"
                          />
                        </div>
                        <Button
                          variant={codeValid.isValid ? 'fill' : 'outline'}
                          className="w-[112px] h-[48px] p-0"
                        >
                          인증번호확인
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="fill"
                    className="w-[348px] h-[52px]"
                    onClick={handleFindId}
                  >
                    아이디 찾기
                  </Button>
                </div>
              ) : (
                <IdSuccess
                  email="example@gmail.com"
                  onFindPw={() => {
                    // 아이디 찾기 모달을 먼저 닫고, 상태 초기화
                    setIsFindIdOpen(false)
                    setFindIdStep('form')

                    // 비밀번호 찾기 모달 열기
                    setIsFindPwOpen(true)
                  }}
                />
              )}
            </Modal>

            <Modal
              isOpen={isFindPwOpen}
              onClose={() => {
                setIsFindPwOpen(false)
                setFindPwStep('form')
              }}
            >
              {findPwStep === 'form' ? (
                <div className="flex flex-col items-center mt-[10px] w-[348px] gap-[40px]">
                  <div className="flex flex-col items-center">
                    <div className="text-primary bg-[#D0B3F6] w-[28px] h-[28px] p-[6px] flex items-center justify-center rounded-full">
                      <LockKeyhole />
                    </div>
                    <h2 className="mt-[13px] font-semibold text-[20px]">
                      비밀번호 찾기
                    </h2>
                    <p className="mt-[10px] text-[14px] text-[#4D4D4D] font-normal">
                      이메일로 비밀번호 재설정 링크를 보내드려요.
                    </p>
                  </div>

                  <div className="flex flex-col gap-[16px]">
                    <label htmlFor="name" className="text-[16px] font-normal">
                      이메일<span className="text-[#f04141]">*</span>
                    </label>

                    <div className="flex flex-col gap-[16px]">
                      <div className="flex">
                        <div className="relative w-[228px] mr-[8px]">
                          <FormInput
                            value={emailValid.value}
                            onChange={(value: string) =>
                              emailValid.setValue(value)
                            }
                            hasError={
                              !emailValid.isValid && emailValid.value.length > 0
                            }
                            errorMessage=""
                            hasSuccess={emailValid.isValid}
                            successMessage=""
                            type="text"
                            placeholder="가입한 이메일을 입력해주세요."
                            className="w-[228px] h-[48px]"
                          />
                        </div>
                        <Button
                          variant={emailValid.isValid ? 'fill' : 'outline'}
                          className="w-[112px] h-[48px] p-0"
                          onClick={handleSendCode}
                        >
                          인증코드전송
                        </Button>
                      </div>

                      <div className="flex">
                        <div className="relative w-[228px] mr-[8px]">
                          <FormInput
                            value={emailCodeValid.value}
                            onChange={(v) => {
                              const onlyNums = v.replace(/\D/g, '').slice(0, 6)
                              emailCodeValid.setValue(onlyNums)
                            }}
                            hasError={
                              !emailCodeValid.isValid &&
                              emailCodeValid.value.length > 0
                            }
                            errorMessage=""
                            hasSuccess={emailCodeValid.isValid}
                            successMessage=""
                            type="text"
                            placeholder="인증코드를 입력해주세요."
                            className="w-[228px] h-[48px]"
                          />

                          {isTimerActive && (
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#EC0037] pointer-events-none">
                              {formatTime(timeLeft)}
                            </span>
                          )}
                        </div>

                        <Button
                          variant={emailCodeValid.isValid ? 'fill' : 'outline'}
                          className="w-[112px] h-[48px] p-0"
                          disabled={!emailValid.isValid}
                          onClick={handleVerifyCode}
                        >
                          인증코드확인
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="fill"
                    className="w-[348px] h-[52px]"
                    onClick={() => {
                      // 여기서 인증 완료 후 처리
                      if (emailValid.isValid && emailCodeValid.isValid) {
                        setFindPwStep('result') // 콘텐츠 변경
                        setIsTimerActive(false) // 타이머 종료
                      }
                    }}
                  >
                    비밀번호 찾기
                  </Button>
                </div>
              ) : (
                <PwSuccess onCloseModal={() => setIsFindPwOpen(false)} />
              )}
            </Modal>
          </div>

          <div className="mt-[12px]">
            <Button
              variant={isFormValid ? 'fill' : 'ghost'}
              disabled={!isFormValid}
              className="w-[348px] h-[52px]"
            >
              일반회원 로그인
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
