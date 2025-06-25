import { Link } from 'react-router'
import BlogIcon from '../../assets/icons/common/sns_blog.svg'
import InstagramIcon from '../../assets/icons/common/sns_instagram.svg'
import KakaoIcon from '../../assets/icons/common/sns_kakao.svg'
import YoutubeIcon from '../../assets/icons/common/sns_youtube.svg'
import LogoImage from '../../assets/images/common/renewal_ozcoding_logo.svg'

const Footer = () => {
  return (
    <footer className="bg-[#222] text-white">
      <div className="container mx-auto px-4 py-20 flex md:flex-col justify-center gap-8 flex-row">
        {/* 좌측 콘텐츠 */}
        <div className="flex md:flex-col gap-10">
          <h2 className="text-lg font-bold">
            <img src={LogoImage} alt="oz코딩스쿨 로고" />
          </h2>
          <ul className="text-lg text-gray-250 hidden md:flex flex-col gap-4">
            <li>초격차캠프</li>
            <li>사업개발캠프</li>
            <li>프로덕트 디자이너 캠프</li>
          </ul>
          <div className="flex flex-col md:flex-row justify-between items-center md:pt-10 md:border-t md:border-gray-500">
            <div className="space-x-4 hidden md:block">
              <Link to="#" className="underline">
                개인정보처리방침
              </Link>
              <Link to="#" className="underline">
                이용약관
              </Link>
              <Link to="#" className="underline">
                멘토링&강사지원
              </Link>
            </div>
            <div className="flex items-end space-x-3">
              <Link to="#" aria-label="채팅" className="w-6 h-6">
                <img src={KakaoIcon} alt="chat" />
              </Link>
              <Link to="#" aria-label="블로그" className="w-6 h-6">
                <img src={BlogIcon} alt="blog" />
              </Link>
              <Link to="#" aria-label="유튜브" className="w-6 h-6">
                <img src={YoutubeIcon} alt="youtube" />
              </Link>
              <Link to="#" aria-label="인스타그램" className="w-6 h-6">
                <img src={InstagramIcon} alt="insta" />
              </Link>
            </div>
          </div>
        </div>

        {/* 가운데 콘텐츠 */}
        <div className="flex-col gap-4 hidden md:flex text-gray-400">
          <p>
            대표자 : 이한별 | 사업자 등록번호 : 540-86-00384 | 통신판매업
            신고번호 : 2020-경기김포-3725호
          </p>
          <p>
            주소 : 경기도 김포시 사우중로 87 201호 | 이메일 :
            kdigital@nextrunners.co.kr | 전화 : 070-4099-8219
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
