import defaultThumbnail from '@assets/images/thumbnail.png'

const MypageCourse = () => {
  return (
    <section className="rounded-lg p-12 mb-[52px] pb-0 border border-[#D1D1D1]">
      {/* 수강 중인 과정 타이틀 */}
      <h2 className="text-[#721AE3] text-[20px] font-bold mb-[40px] border-b border-[#bdbdbd] pb-4">
        수강 중인 과정
      </h2>
      <div className="flex items-center justify-between mb-[52px]">
        <div>
          <p className="text-[#bdbdbd] text-[14px] mb-1">
            익스턴십 개발 캠프 • 오즈코딩
          </p>
          <p className="text-[16px]">
            IT스터디 실무형 풀스택 웹 개발 부트캠프 (React + Node.js) &lt;T1&gt;
          </p>
        </div>
        <div className="pr-2">
          <img
            src={defaultThumbnail}
            alt="썸네일 이미지"
            className="w-[152px] h-[102px] rounded"
          />
        </div>
      </div>
    </section>
  )
}

export default MypageCourse
