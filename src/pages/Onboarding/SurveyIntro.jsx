import { useNavigate } from 'react-router-dom'

export default function SurveyIntro() {
    const nav = useNavigate()

    return (
        <div className="relative h-full w-full text-white overflow-hidden
      bg-[linear-gradient(12deg,_#122019_-8.17%,_#000_44.23%,_#081D25_107.49%)]">

            {/* 타이틀 */}
            <div className="absolute left-0 top-[105px] p-[32px]">
                <p className="text-[19px] font-medium leading-loose">
                    작은 설문이지만,<br/>
                    앞으로의 모험을 더 즐겁게 만들어 줄 거에요!!
                </p>
            </div>


            {/* 캐릭터 */}
            <img
                className="absolute left-1/2 -translate-x-1/2 top-[348px]
                   w-[290px] h-[272px] object-contain"
                src="/images/signup/character.png"
                alt="캐릭터"
            />

            {/* 다음(→) 버튼 */}
            <button
                type="button"
                onClick={() => {
                    nav('/onboarding/survey');   // 다음 페이지로 이동
                }}
                className="absolute left-[318px] top-[763px] w-14 h-14 rounded-full bg-white
          grid place-items-center active:scale-95 transition"
                aria-label="다음"
            >
                <svg width="35" height="35" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18l6-6-6-6" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </div>
    )
}
