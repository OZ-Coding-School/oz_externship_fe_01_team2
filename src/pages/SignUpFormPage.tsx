import OzLogo from '@assets/images/common/renewal_ozcoding_logo_black.svg'
import Button from '@components/common/Button'
import FormInput from '@components/common/FormInput'
import { VALIDATION_REGEX } from '@constants/validation'
import { useInput } from '@hooks/useInput'
import { useSignUpApi } from '@hooks/useSignApi'
import { useState } from 'react'
import { useNavigate } from 'react-router'

export default function SignUpFormPage() {
  const navigate = useNavigate()

  const {
    checkNicknameDuplicate,
    loading,
    sendEmailVerificationCode,
    verifyEmailCode,
    sendPhoneVerificationCode,
    verifyPhoneCode,
    signUp,
  } = useSignUpApi()

  const handleCheckNickname = async () => {
    if (!nickname.isValid) return
    const success = await checkNicknameDuplicate(nickname.value)
    setIsNicknameChecked(success)
  }

  const handleSendEmailCode = async () => {
    if (!email.isValid) return
    const success = await sendEmailVerificationCode(email.value)
    if (success) setIsEmailCodeSent(true)
  }
  const handleVerifyEmailCode = async () => {
    if (!email.isValid || !emailCode.isValid) return
    await verifyEmailCode(
      email.value,
      emailCode.value,
      () => setIsEmailVerified(true),
      () => setIsEmailVerified(false)
    )
  }
  const handleSendPhoneCode = async () => {
    if (!isPhoneValid) return

    const phoneNumber = phone1.value + phone2.value + phone3.value
    const success = await sendPhoneVerificationCode(phoneNumber)
    if (success) {
      setIsPhoneCodeSent(true)
    }
  }

  const handleVerifyPhoneCode = async () => {
    if (!phoneCode.isValid) return

    const fullPhone = phone1.value + phone2.value + phone3.value
    const success = await verifyPhoneCode(fullPhone, phoneCode.value)
    if (success) {
      setIsPhoneVerified(true)
    }
  }

  const handleSignUp = async () => {
    if (!isFormValid || !isEmailVerified || !isPhoneVerified) return

    await signUp({
      email: email.value,
      password: password.value,
      password_confirm: passwordCheck.value,
      name: name.value,
      nickname: nickname.value,
      gender: gender === '남' ? 'MALE' : 'FEMALE',
      phone_number: phone1.value + phone2.value + phone3.value,
      birthday: birth.value,
      self_introduction: introduction.value,
    })

    navigate('/login')
  }

  const name = useInput(
    (v) => VALIDATION_REGEX.KOREAN_NAME.test(v) && v.length > 0
  )

  const nickname = useInput((v) => VALIDATION_REGEX.NICKNAME.test(v))
  const [isNicknameChecked, setIsNicknameChecked] = useState(false)

  const birth = useInput((v) => VALIDATION_REGEX.BIRTH.test(v))

  const email = useInput((v) => VALIDATION_REGEX.EMAIL.test(v))

  const emailCode = useInput((v) => VALIDATION_REGEX.EMAIL_CODE.test(v))
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [isEmailCodeSent, setIsEmailCodeSent] = useState(false)

  const phone1 = useInput((v) => VALIDATION_REGEX.PHONE_PART1.test(v))
  const phone2 = useInput((v) => VALIDATION_REGEX.PHONE_PART2.test(v))
  const phone3 = useInput((v) => VALIDATION_REGEX.PHONE_PART3.test(v))
  const phone = `${phone1.value}${phone2.value}${phone3.value}`
  const isPhoneValid = phone1.isValid && phone2.isValid && phone3.isValid
  const [isPhoneCodeSent, setIsPhoneCodeSent] = useState(false)

  const phoneCode = useInput((v) => VALIDATION_REGEX.PHONE_CODE.test(v))
  const [isPhoneVerified, setIsPhoneVerified] = useState(false)

  const password = useInput((v) => VALIDATION_REGEX.PASSWORD.test(v))

  const passwordCheck = useInput((v) => v === password.value && v.length > 0)

  const introduction = useInput((v) => v.length > 0)

  const [gender, setGender] = useState<'남' | '여' | ''>('')

  const isFormValid =
    nickname.isValid &&
    email.isValid &&
    emailCode.isValid &&
    isEmailVerified &&
    isPhoneVerified &&
    phone &&
    phoneCode.isValid &&
    password.isValid &&
    passwordCheck.isValid &&
    introduction.isValid &&
    gender !== '' &&
    isNicknameChecked

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[528px] min-h-[1240px] my-[88px] py-[40px] px-[24px] bg-white">
        <div className="flex flex-col justify-centert items-center gap-[16px] text-center">
          <h2 className="text-m font-bold">마법같이 빠르게 성장시켜줄</h2>
          <img
            src={OzLogo}
            alt="오즈코딩스쿨"
            className="w-[180px] h-[24px] mb-[27px]"
          />
        </div>

        <form>
          <fieldset className=" flex flex-col gap-[52px]">
            <legend className="text-[18px] font-semibold mb-10">
              회원가입
            </legend>

            <div className="flex flex-col gap-[44px]">
              <div className="flex flex-col gap-[20px] justify-between">
                <label htmlFor="name" className="text-[16px]">
                  이름
                  <span className="text-[16px] font-normal text-[#f04141]">
                    *
                  </span>
                </label>
                <FormInput
                  value={name.value}
                  onChange={(value: string) => name.setValue(value)}
                  placeholder="이름을 입력해주세요"
                  type="text"
                  hasError={!name.isValid && name.value.length > 0}
                  hasSuccess={name.isValid}
                  className="w-[480px] h-[48px]"
                ></FormInput>
              </div>

              <div className="flex flex-col gap-[20px] justify-between">
                <label htmlFor="nickname" className="text-[16px]">
                  닉네임
                  <span className="text-[16px] font-normal text-[#f04141]">
                    *
                  </span>
                </label>
                <div className="flex gap-[12px]">
                  <FormInput
                    value={nickname.value}
                    onChange={(value: string) => nickname.setValue(value)}
                    placeholder="닉네임을 입력해주세요"
                    type="text"
                    hasError={!nickname.isValid && nickname.value.length > 0}
                    hasSuccess={nickname.isValid}
                    className="w-[356px] h-[48px]"
                  />

                  <div className="shrink-0">
                    <Button
                      variant={nickname.isValid ? 'check' : 'outline'}
                      className="w-[112px] h-[48px] p-0"
                      disabled={!nickname.isValid || loading}
                      onClick={handleCheckNickname}
                    >
                      중복확인
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-[20px] justify-between">
                <label htmlFor="birth" className="text-[16px]">
                  생년월일
                  <span className="text-[16px] font-normal text-[#f04141]">
                    *
                  </span>
                </label>
                <FormInput
                  value={birth.value}
                  onChange={(value: string) => {
                    const onlyNumbers = value.replace(/\D/g, '')
                    birth.setValue(onlyNumbers.slice(0, 8))
                  }}
                  placeholder="8자리 입력해주세요 (ex.20001004)"
                  type="text"
                  hasError={!birth.isValid && birth.value.length > 0}
                  errorMessage="숫자 8자리로 입력해주세요 (예: 19990101)"
                  hasSuccess={birth.isValid}
                  className="w-[480px] h-[48px]"
                ></FormInput>
              </div>

              <div className="flex flex-col gap-[20px] justify-between">
                <label htmlFor="introduction" className="text-[16px]">
                  성별
                  <span className="text-[16px] font-normal text-[#f04141]">
                    *
                  </span>
                </label>
                <div className="flex gap-[20px]">
                  <Button
                    variant={gender === '남' ? 'check' : 'outline'}
                    className="w-[80px] h-[42px] rounded-[100px] p-0"
                    disabled={gender === '남'}
                    onClick={() => setGender('남')}
                  >
                    남
                  </Button>
                  <Button
                    variant={gender === '여' ? 'check' : 'outline'}
                    className="w-[80px] h-[42px] rounded-[100px] p-0"
                    disabled={gender === '여'}
                    onClick={() => setGender('여')}
                  >
                    여
                  </Button>
                </div>
              </div>

              <div className="flex flex-col justify-center w-[480px] gap-[20px]">
                <label htmlFor="email" className="text-[16px]">
                  이메일
                  <span className="text-[16px] font-normal text-[#f04141]">
                    *
                  </span>
                  <span className="ml-[16px] text-[14px] text-[#6201E0] font-semibold">
                    로그인 시 아이디로 사용합니다.
                  </span>
                </label>

                <div className="flex flex-col gap-[16px]">
                  <div className="flex gap-[12px]">
                    <FormInput
                      value={email.value}
                      onChange={(value: string) => email.setValue(value)}
                      placeholder="이메일 (example@gmail.com)"
                      type="email"
                      hasError={!email.isValid && email.value.length > 0}
                      hasSuccess={email.isValid}
                      className="w-[356px] h-[48px]"
                    ></FormInput>

                    <div className="shrink-0">
                      <Button
                        variant={
                          !isEmailCodeSent && email.isValid
                            ? 'check'
                            : 'outline'
                        }
                        className="w-[112px] h-[48px] p-0"
                        disabled={!email.isValid}
                        onClick={handleSendEmailCode}
                      >
                        인증코드전송
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-[12px]">
                    <FormInput
                      value={emailCode.value}
                      onChange={(value: string) => {
                        const base62Only = value
                          .replace(/[^0-9a-zA-Z]/g, '')
                          .slice(0, 6)
                        emailCode.setValue(base62Only)
                      }}
                      placeholder="전송된 코드를 입력해주세요"
                      type="text"
                      hasError={
                        !emailCode.isValid && emailCode.value.length > 0
                      }
                      hasSuccess={emailCode.isValid}
                      className="w-[356px] h-[48px]"
                    ></FormInput>

                    <div className="shrink-0">
                      <Button
                        variant={
                          emailCode.isValid && !isEmailVerified
                            ? 'check'
                            : 'outline'
                        }
                        className="w-[112px] h-[48px] p-0"
                        disabled={!emailCode.isValid || isEmailVerified}
                        onClick={handleVerifyEmailCode}
                      >
                        인증코드확인
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center w-[480px] gap-[20px]">
                <label htmlFor="phone1" className="text-[16px]">
                  휴대전화
                  <span className="text-[16px] font-normal text-[#f04141]">
                    *
                  </span>
                </label>
                <div className="flex flex-col gap-[16px]">
                  <div className="flex gap-[4px]">
                    <div className="w-[356px] flex items-center gap-[4px] mr-[8px]">
                      <FormInput
                        value={phone1.value}
                        onChange={(v: string) => {
                          const onlyNumbers = v.replace(/\D/g, '')
                          phone1.setValue(onlyNumbers.slice(0, 3))
                        }}
                        placeholder="010"
                        type="text"
                        hasError={!phone1.isValid && phone1.value.length > 0}
                        errorMessage=""
                        hasSuccess={phone1.isValid}
                        successMessage=""
                        className="w-[108.67px] h-[48px]"
                      ></FormInput>

                      <span className=" text-[#BDBDBD]">-</span>

                      <FormInput
                        value={phone2.value}
                        onChange={(v: string) => {
                          const onlyNumbers = v.replace(/\D/g, '')
                          phone2.setValue(onlyNumbers.slice(0, 4))
                        }}
                        placeholder="0000"
                        type="text"
                        hasError={!phone2.isValid && phone2.value.length > 0}
                        errorMessage=""
                        hasSuccess={phone2.isValid}
                        successMessage=""
                        className="w-[108.67px] h-[48px]"
                      ></FormInput>

                      <span className=" text-[#BDBDBD]">-</span>

                      <FormInput
                        value={phone3.value}
                        onChange={(v: string) => {
                          const onlyNumbers = v.replace(/\D/g, '')
                          phone3.setValue(onlyNumbers.slice(0, 4))
                        }}
                        placeholder="0000"
                        type="text"
                        hasError={!phone3.isValid && phone3.value.length > 0}
                        errorMessage=""
                        successMessage=""
                        hasSuccess={phone3.isValid}
                        className="w-[108.67px] h-[48px]"
                      ></FormInput>
                    </div>

                    <Button
                      variant={
                        isPhoneValid && !isPhoneCodeSent ? 'check' : 'outline'
                      }
                      className="w-[112px] h-[48px] p-0"
                      disabled={!isPhoneValid}
                      onClick={handleSendPhoneCode}
                    >
                      인증번호전송
                    </Button>
                  </div>

                  <div className="flex gap-[12px]">
                    <FormInput
                      value={phoneCode.value}
                      onChange={(value: string) => {
                        const onlyNumbers = value.replace(/\D/g, '')
                        phoneCode.setValue(onlyNumbers.slice(0, 6))
                      }}
                      placeholder="인증번호 6자리를 입력해주세요"
                      type="text"
                      hasError={
                        !phoneCode.isValid && phoneCode.value.length > 0
                      }
                      hasSuccess={phoneCode.isValid}
                      className="w-[356px] h-[48px]"
                    ></FormInput>

                    <div className="shrink-0">
                      <Button
                        variant={
                          phoneCode.isValid && !isPhoneVerified
                            ? 'check'
                            : 'outline'
                        }
                        className="w-[112px] h-[48px] p-0"
                        disabled={!phoneCode.isValid || isPhoneVerified}
                        onClick={handleVerifyPhoneCode}
                      >
                        인증번호확인
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center w-[480px] gap-[20px]">
                <label htmlFor="password" className="text-[16px]">
                  비밀번호
                  <span className="text-[16px] font-normal text-[#f04141]">
                    *
                  </span>
                  <span className="ml-[16px] text-[14px] text-[#6201E0] font-semibold">
                    8~15자의 영문 대소문자, 숫자, 특수문자 포함
                  </span>
                </label>

                <div className="flex flex-col gap-[16px]">
                  <FormInput
                    value={password.value}
                    onChange={(value: string) => password.setValue(value)}
                    placeholder="비밀번호를 입력해주세요"
                    type="password"
                    hasError={!password.isValid && password.value.length > 0}
                    errorMessage="사용 불가능한 비밀번호입니다"
                    hasSuccess={password.isValid}
                    successMessage="사용 가능한 비밀번호입니다"
                    className="w-[480px] h-[48px]"
                  ></FormInput>

                  <FormInput
                    value={passwordCheck.value}
                    onChange={(value: string) => passwordCheck.setValue(value)}
                    placeholder="비밀번호를 다시 입력해주세요"
                    type="password"
                    hasError={
                      !passwordCheck.isValid && passwordCheck.value.length > 0
                    }
                    errorMessage="비밀번호가 일치하지 않습니다"
                    hasSuccess={passwordCheck.isValid}
                    successMessage="비밀번호가 일치합니다"
                    className="w-[480px] h-[48px]"
                  ></FormInput>
                </div>
              </div>
              <div className="flex flex-col gap-[20px] justify-between">
                <label htmlFor="introduction" className="text-[16px]">
                  자기소개
                  <span className="text-[16px] font-normal text-[#f04141]">
                    *
                  </span>
                </label>
                <FormInput
                  value={introduction.value}
                  onChange={(value: string) => {
                    introduction.setValue(value)
                  }}
                  placeholder="간단한 소개를 입력해주세요"
                  type="text"
                  hasError={
                    !introduction.isValid && introduction.value.length > 0
                  }
                  hasSuccess={introduction.isValid}
                  className="w-[480px] h-[48px]"
                ></FormInput>
              </div>
            </div>
          </fieldset>

          <div className="mt-[52px] mb-[40px]">
            <Button
              variant={isFormValid ? 'fill' : 'ghost'}
              className="w-[480px] h-[52px]"
              disabled={!isFormValid || !isEmailVerified || !isPhoneVerified}
              onClick={handleSignUp}
            >
              가입하기
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
