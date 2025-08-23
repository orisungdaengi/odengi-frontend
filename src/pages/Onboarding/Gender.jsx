// src/pages/Onboarding/Gender.jsx
import { useNavigate } from 'react-router-dom'
import { useOnboarding } from '../../state/OnboardingContext'   // ✅ 꼭 추가

export default function OnboardingGender() {
    const nav = useNavigate()
    const { data, update } = useOnboarding()  // ✅ Context에서 값/업데이트 훅

    const goNext = () => {
        if (!data.gender) return
        nav('/onboarding/age') // 다음 단계
    }

    return (
        <div className="relative h-full w-full text-white overflow-hidden
                    bg-[linear-gradient(12deg,_#122019_-8.17%,_#000_44.23%,_#081D25_107.49%)]">

            {/* 상단: 뒤로가기 + 진행바 + 2/4 */}
            <div className="absolute left-0 top-[54px] w-full h-14 z-10">
                <button
                    type="button"
                    onClick={() => nav(-1)}
                    className="absolute left-[24px] top-[18px] size-5 grid place-items-center"
                    aria-label="뒤로가기"
                >
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                        <path d="M15 6L9 12l6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                <div className="absolute left-[60px] top-[30px] w-[288px] h-[6px] rounded-full bg-white/20">
                    <div className="h-[6px] w-[144px] bg-white rounded-full"/>
                </div>
                <div className="absolute right-[20px] top-[20px] text-base">
                    2<span className="text-white/50">/4</span>
                </div>
            </div>

            {/* 타이틀 */}
            <div className="absolute left-0 top-[105px] p-[32px]">
                <p className="text-[19px] font-medium leading-loose">
                    비슷한 성별에게 잘 맞는<br/>
                    정보를 제공하기 위해<br/>
                    성별을 알려주세요.
                </p>
            </div>

            {/* 선택 버튼들 */}
            <div className="absolute left-[55px] top-[387px] inline-flex items-center gap-[14px]">
                <SelectChip
                    label="남자"
                    active={data.gender === 'm'}                 // ✅ 저장된 값 사용
                    onClick={() => update({ gender: 'm' })}     // ✅ 업데이트
                    widthClass="w-[84px]"
                />
                <SelectChip
                    label="여자"
                    active={data.gender === 'f'}
                    onClick={() => update({ gender: 'f' })}
                    widthClass="w-[84px]"
                />
                <SelectChip
                    label="기타"
                    active={data.gender === 'other'}
                    onClick={() => update({ gender: 'other' })}
                    widthClass="w-[84px]"
                />
            </div>

            {/* 다음(→) 버튼 */}
            <button
                type="button"
                onClick={goNext}
                disabled={!data.gender}
                className="absolute left-[318px] top-[763px] w-14 h-14 rounded-full grid place-items-center
                   bg-white text-black active:scale-95 transition
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

function SelectChip({ label, active, onClick, widthClass = 'w-24' }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={[
                'h-12 px-4 rounded-lg text-[18px] font-medium',
                widthClass,
                active
                    ? 'bg-white text-black'
                    : 'bg-white/20 text-white hover:bg-white/30',
                'transition'
            ].join(' ')}
        >
            {label}
        </button>
    )
}
