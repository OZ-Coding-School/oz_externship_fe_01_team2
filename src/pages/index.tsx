import { useState, useEffect } from 'react'
import MainExamSvg from '@assets/images/common/main-exam.svg'
import MainQnaSvg from '@assets/images/common/main-qna.svg'
import MainCommunitySvg from '@assets/images/common/main-community.svg'

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('qna')

  const tabs = [
    {
      id: 'quiz',
      label: '쪽지시험',
      image: MainExamSvg,
      title: '쪽지시험으로 실력을',
      subtitle: '차곡차곡 쌓아보세요',
      description: '간편한 쪽지시험으로 실력을 점검해보세요',
    },
    {
      id: 'qna',
      label: '질의응답',
      image: MainQnaSvg,
      title: '질문하고 배우고,',
      subtitle: '동료 수강생과 함께 성장해요',
      description: '언제든지 질문하고 빠른 답변을 받아보세요',
    },
    {
      id: 'community',
      label: '커뮤니티',
      image: MainCommunitySvg,
      title: '정보 공유부터 팀원 모집까지',
      subtitle: '커뮤니티에서 함께해요',
      description: '동료들과 소통하며 함께 성장해보세요',
    },
  ]

  const currentTab = tabs.find((tab) => tab.id === activeTab) || tabs[1]

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateX(30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [])

  return (
    <div className="-mx-4 -mt-4 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-16 text-center relative">
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            {currentTab.title}
            <br />
            <span className="text-purple-600">{currentTab.subtitle}</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            정보 공유부터 팀원 모집까지
            <br />
            커뮤니티에서 함께해요
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'bg-white text-purple-600 border border-purple-200 hover:bg-purple-600 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="bg-white rounded-3xl shadow-xl p-8 mx-auto max-w-4xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {currentTab.label} 시스템
              </h2>
              <p className="text-gray-600">{currentTab.description}</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 min-h-96 flex items-center justify-center">
              <img
                key={activeTab}
                src={currentTab.image}
                alt={currentTab.label}
                className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                style={{
                  animation: 'slideIn 0.5s ease-out',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
