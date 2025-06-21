export default function SignUpForm() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg p-6 m-10 bg-white">
        <div className="mb-6 text-center">
          <h2 className="text-m pt-2 font-bold">마법같이 빠르게 성장시켜줄</h2>
          <h1 className="text-2xl pt-2 font-black text-gray-800">OZ<span className="text-[#8e62c6]">.</span> 오즈코딩스쿨</h1>
        </div>

        <form>
          <fieldset className="space-y-9">
            <legend className="text-m font-medium mb-10">회원가입</legend>

            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm" >이름<span className="text-[#f04141]">*</span></label>
              <input id="name" type="text" placeholder="이름을 입력해주세요" className="border p-2.5 rounded-sm border-[#BDBDBD] text-[#BDBDBD] placeholder:text-sm" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="nickname" className="text-sm">닉네임<span className="text-[#f04141]">*</span></label>
              <div className="flex gap-2">
                <input
                  id="nickname"
                  type="text"
                  placeholder="닉네임을 입력해주세요"
                  className="flex-1 border p-2.5 rounded-sm border-[#BDBDBD] text-[#BDBDBD] placeholder:text-sm"
                />
                <button
                  type="button"
                  className="whitespace-nowrap px-7 py-2 bg-[#ECECEC] text-gray-700 rounded-sm border border-[#BDBDBD] text-sm font-semibold"
                >
                  중복확인
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="birth" className="text-sm">생년월일<span className="text-[#f04141]">*</span></label>
              <input id="birth" type="text" placeholder="8자리 입력해주세요 (ex.20001004)" className="border p-2.5 rounded-sm border-[#BDBDBD] text-[#BDBDBD] placeholder:text-sm" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium">
                이메일<span className="text-[#f04141]">*</span>
                <span className="ml-2 text-x p-2 text-[#6201E0] font-medium">
                  로그인 시 아이디로 사용합니다.
                </span>
              </label>

              <div className="flex gap-2">
                <input
                  id="email"
                  type="text"
                  placeholder="이메일 (example@gmail.com)"
                  className="flex-1 border p-2.5 rounded-sm border-[#BDBDBD] text-[#BDBDBD] placeholder:text-sm"
                />
                <button
                  type="button"
                  className="whitespace-nowrap px-4 py-2 bg-[#EFE6FC] rounded-sm border border-[#6201E0] text-[#6201E0] text-sm font-semibold"
                >
                  인증코드전송
                </button>
              </div>

              <div className="flex gap-2 mt-2">
                <input
                  id="emailcode"
                  type="text"
                  placeholder="전송된 코드를 입력해주세요"
                  className="flex-1 border p-2.5 rounded-sm border-[#BDBDBD] text-[#BDBDBD] placeholder:text-sm"
                />
                <button
                  type="button"
                  className="whitespace-nowrap px-4 py-2 bg-[#EFE6FC] rounded-sm border border-[#6201E0] text-[#6201E0] text-sm font-semibold"
                >
                  인증코드확인
                </button>
              </div>
            </div>


            <div className="flex flex-col gap-2">
              <label htmlFor="phone1" className="text-sm">휴대전화<span className="text-[#f04141]">*</span></label>
              <div className="flex items-center gap-2">
                <input id="phone1" type="text" placeholder="010" className="w-25 border p-2.5 rounded-sm border-[#BDBDBD] text-[#BDBDBD] placeholder:text-sm" />
                <span className=" text-[#BDBDBD]">-</span>
                <input id="phone2" type="text" className="w-25 border p-2.5 rounded-sm text-center border-[#BDBDBD]" />
                <span className=" text-[#BDBDBD]">-</span>
                <input id="phone3" type="text" className="w-25 border p-2.5 rounded-sm text-center border-[#BDBDBD]" />
                <button type="button" className="whitespace-nowrap px-4 py-3 bg-[#ECECEC] text-gray-700 rounded-sm border border-[#BDBDBD] text-sm font-semibold">
                  인증번호 전송
                </button>
              </div>
              <div className="flex gap-2 mt-2">
                <input id="phonecode" type="text" placeholder="인증번호 6자리를 입력해주세요" className="flex-1 border p-2.5 rounded-sm border-[#BDBDBD] text-[#BDBDBD] placeholder:text-sm" />
                <button type="button" className="whitespace-nowrap px-4 py-2 bg-[#ECECEC] text-gray-700 rounded-sm border border-[#BDBDBD] text-sm font-semibold">
                  인증번호 확인
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium">
                비밀번호<span className="text-[#f04141]">*</span>
                <span className="ml-2 text-x p-2 text-[#6201E0] font-medium">
                  8~15자의 영문 대소문자, 숫자, 특수문자 포함
                </span>
              </label>

              <input
                id="password"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                className="border p-2.5 rounded-sm border-[#BDBDBD] text-[#BDBDBD] placeholder:text-sm"
              />
              <input
                id="passwordCheck"
                type="password"
                placeholder="비밀번호를 다시 입력해주세요"
                className="border p-2.5 rounded-sm border-[#BDBDBD] text-[#BDBDBD] placeholder:text-sm"
              />
            </div>
          </fieldset>

          <button type="submit" className="mt-13 mb-5 w-full bg-[#6201E0] text-white p-3 rounded-sm font-normal text-sm">
            가입하기
          </button>
        </form>
      </div>
    </div>
  )
}
