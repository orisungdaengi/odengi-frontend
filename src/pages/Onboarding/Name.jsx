import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOnboarding } from '../../state/OnboardingContext'

export default function OnboardingName() {
    const [name, setName] = useState('')
    const nav = useNavigate()
    const { update } = useOnboarding()

    const goNext = () => {
        const trimmed = name.trim()
        if (!trimmed) return
        update({ name: trimmed })        // 닉네임/표시 이름만 저장
        nav('/onboarding/gender')         // 다음 단계
    }

    return (
        <div className="relative h-full w-full text-white overflow-hidden
                    bg-[linear-gradient(12deg,_#122019_-8.17%,_#000_44.23%,_#081D25_107.49%)]">
            {/* 상단: 뒤로가기 + 진행바 + 1/4 */}
            <div className="absolute left-0 top-[54px] w-full h-14 z-10">
                <button
                    type="button"
                    onClick={() => nav('/login', { replace: true })}
                    className="absolute left-[24px] top-[18px] size-5 grid place-items-center"
                    aria-label="뒤로가기"
                >
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                        <path d="M15 6L9 12l6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                <div className="absolute left-[60px] top-[30px] w-[288px] h-[6px] rounded-full bg-white/20">
                    <div className="h-[6px] w-[72px] bg-white rounded-full"/>
                </div>
                <div className="absolute right-[20px] top-[20px] text-base">1<span className="text-white/50">/4</span></div>
            </div>

            {/* 타이틀 */}
            <div className="absolute left-0 top-[105px] p-[32px] ">
                <p className="text-[19px] font-medium leading-loose">
                    제가 부를 당신의 이름을<br/>알려주세요.
                </p>
            </div>

            {/* 입력 박스 */}
            <label className="absolute left-[17px] top-[400px] w-[368px]">
                <div className="h-12 px-4 py-3 rounded-lg bg-white/20 flex items-center">
                    <input
                        className="w-full bg-transparent outline-none text-[16px] placeholder:text-zinc-400"
                        placeholder="당신의 이름은?"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && goNext()}   // 선택: 엔터로 다음
                        autoComplete="name"
                        maxLength={20}
                    />
                </div>
            </label>

            {/* 다음(→) 버튼 */}
            <button
                type="button"
                onClick={goNext}
                disabled={!name.trim()}
                className="absolute left-[318px] top-[763px] w-14 h-14 rounded-full bg-white
                   grid place-items-center active:scale-95 transition
                   disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="다음"
            >
                <svg width="35" height="35" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18l6-6-6-6" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </div>
    )
}
