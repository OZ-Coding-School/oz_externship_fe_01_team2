import OzLogo from '@assets/images/common/renewal_ozcoding_logo_black.svg'
import Button from '@components/common/Button'
import FormInput from '@components/common/FormInput'
import { VALIDATION_REGEX } from '@constants/validation'
import { useInput } from '@hooks/useInput'
import axios from 'axios'
import { useToast } from '@hooks/useToast'

export default function SignUpFormPage() {
  const name = useInput(
    (v) => VALIDATION_REGEX.KOREAN_NAME.test(v) && v.length > 0
  )

  const nickname = useInput((v) => VALIDATION_REGEX.NICKNAME.test(v))

  const birth = useInput((v) => VALIDATION_REGEX.BIRTH.test(v))

  const email = useInput((v) => VALIDATION_REGEX.EMAIL.test(v))

  const emailCode = useInput((v) => VALIDATION_REGEX.EMAIL_CODE.test(v))

  const phone1 = useInput((v) => VALIDATION_REGEX.PHONE_PART1.test(v))
  const phone2 = useInput((v) => VALIDATION_REGEX.PHONE_PART2.test(v))
  const phone3 = useInput((v) => VALIDATION_REGEX.PHONE_PART3.test(v))
  const phone = !!(phone1.isValid && phone2.isValid && phone3.isValid)

  const phoneCode = useInput((v) => VALIDATION_REGEX.PHONE_CODE.test(v))

  const password = useInput((v) => VALIDATION_REGEX.PASSWORD.test(v))

  const passwordCheck = useInput((v) => v === password.value && v.length > 0)

  const isFormValid =
    nickname.isValid &&
    email.isValid &&
    emailCode.isValid &&
    phone &&
    phoneCode.isValid &&
    password.isValid &&
    passwordCheck.isValid

  const toast = useToast()

  const handleCheckNickname = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/profile/nickname-check/`,
        {
          nickname: nickname.value,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      toast.show({
        message: '사용 가능한 닉네임입니다.',
        type: 'success',
      })
    } catch (error) {
      toast.show({
        message: '이미 사용 중인 닉네임입니다.',
        type: 'error',
      })
    }
  }

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
                  errorMessage="이름은 한글만 입력 가능합니다"
                  hasSuccess={name.isValid}
                  successMessage="정상적으로 입력되었습니다"
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
                      disabled={!nickname.isValid}
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
                  successMessage="올바른 형식입니다"
                  className="w-[480px] h-[48px]"
                ></FormInput>
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
                      errorMessage=""
                      hasSuccess={email.isValid}
                      successMessage="사용 가능한 이메일입니다"
                      className="w-[356px] h-[48px]"
                    ></FormInput>

                    <div className="shrink-0">
                      <Button
                        variant={email.isValid ? 'check' : 'outline'}
                        className="w-[112px] h-[48px] p-0"
                        disabled={!email.isValid}
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
                          .slice(0, 10)
                        emailCode.setValue(base62Only)
                      }}
                      placeholder="전송된 코드를 입력해주세요"
                      type="text"
                      hasError={
                        !emailCode.isValid && emailCode.value.length > 0
                      }
                      errorMessage=""
                      hasSuccess={emailCode.isValid}
                      successMessage="이메일 인증이 완료되었습니다"
                      className="w-[356px] h-[48px]"
                    ></FormInput>

                    <div className="shrink-0">
                      <Button
                        variant={emailCode.isValid ? 'outline' : 'check'}
                        className="w-[112px] h-[48px] p-0"
                        disabled={!emailCode.isValid}
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
                      variant={phone ? 'check' : 'outline'}
                      className="w-[112px] h-[48px] p-0"
                      disabled={!phone}
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
                      errorMessage=""
                      hasSuccess={phoneCode.isValid}
                      successMessage="휴대전화 인증이 완료되었습니다"
                      className="w-[356px] h-[48px]"
                    ></FormInput>

                    <div className="shrink-0">
                      <Button
                        variant={phoneCode.isValid ? 'outline' : 'check'}
                        className="w-[112px] h-[48px] p-0"
                        disabled={!phoneCode.isValid}
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
            </div>
          </fieldset>

          <div className="mt-[52px] mb-[40px]">
            <Button
              variant={isFormValid ? 'fill' : 'ghost'}
              className="w-[480px] h-[52px]"
              disabled={!isFormValid}
            >
              가입하기
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
