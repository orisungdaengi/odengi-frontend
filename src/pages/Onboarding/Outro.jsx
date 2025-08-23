// src/pages/Onboarding/Outro.jsx
import { useNavigate } from 'react-router-dom'

export default function OnboardingOutro() {
    const nav = useNavigate()

    return (
        <div className="relative h-full w-full text-white overflow-hidden
      bg-[linear-gradient(12deg,_#122019_-8.17%,_#000_44.23%,_#081D25_107.49%)]">

            {/* 타이틀 */}
            <div className="absolute left-0 top-[105px] p-[32px]">
                <p className="text-[19px] font-medium leading-loose">
                    작은 변화들이 모이면 큰 힘이 됩니다<br/>
                    지금부터 그 첫 걸음을 함께 내디뎌 보실까요?
                </p>
            </div>


            {/* 캐릭터 */}
            <img
                className="absolute left-1/2 -translate-x-1/2 top-[348px]
                   w-[290px] h-[272px] object-contain"
                src="/images/signup/character.png"
                alt="캐릭터"
            />

            {/* 시작하기 버튼 */}
            <button
                type="button"
                onClick={() => nav('/onboarding/survey-intro')}  // 홈 경로에 맞춰 변경
                className="absolute left-1/2 -translate-x-1/2 top-[794px]
          w-[360px] h-10 rounded-lg bg-white/20 hover:bg-white/30
          text-white text-[14px] font-medium active:scale-95 transition"
            >
                시작하기
            </button>
        </div>
    )
}
