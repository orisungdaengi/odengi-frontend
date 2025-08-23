import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOnboarding } from "../../state/OnboardingContext";

const pad2 = (n) => String(n).padStart(2, '0')

// 해당 월의 마지막 일수 계산
const daysIn = (y, m) => new Date(y, m, 0).getDate()

export default function OnboardingAge() {
    const nav = useNavigate()
    const { update } = useOnboarding();

    // 기본값: 오늘 기준
    const today = new Date()
    const [year, setYear]   = useState(today.getFullYear())
    const [month, setMonth] = useState(today.getMonth() + 1)
    const [day, setDay]     = useState(today.getDate())

    // 범위: 최근 100년(원하면 조절)
    const years = useMemo(() => {
        const arr = []
        for (let y = today.getFullYear() - 100; y <= today.getFullYear(); y++) arr.push(y)
        return arr
    }, [today])

    const months = useMemo(() => Array.from({length: 12}, (_, i) => i + 1), [])
    const days   = useMemo(() => Array.from({length: daysIn(year, month)}, (_, i) => i + 1), [year, month])

    // 한 칸 위/아래 이동
    const stepYear  = (d) => {
        const idx = years.indexOf(year) + d
        if (idx >= 0 && idx < years.length) {
            const next = years[idx]
            setYear(next)
            // 연도 바뀌면 말일 보정
            if (day > daysIn(next, month)) setDay(daysIn(next, month))
        }
    }
    const stepMonth = (d) => {
        let next = month + d
        if (next < 1) next = 1
        if (next > 12) next = 12
        setMonth(next)
        if (day > daysIn(year, next)) setDay(daysIn(year, next))
    }
    const stepDay   = (d) => {
        let next = day + d
        const last = daysIn(year, month)
        if (next < 1) next = 1
        if (next > last) next = last
        setDay(next)
    }

    // ⬇️ 기존 isFuture 계산 대신 이걸로 교체
    const toDateStr = (y, m, d) => `${y}-${pad2(m)}-${pad2(d)}`;
    const todayStr = toDateStr(today.getFullYear(), today.getMonth() + 1, today.getDate());
    const selectedStr = toDateStr(year, month, day);
    const isFuture = selectedStr > todayStr;  // 오늘은 허용, 오늘 이후만 막기


    return (
        <div className="relative h-full w-full text-white overflow-hidden
      bg-[linear-gradient(12deg,_#122019_-8.17%,_#000_44.23%,_#081D25_107.49%)]">

            {/* 상단: 뒤로가기 + 진행바 + 3/4 */}
            <div className="absolute left-0 top-[54px] w-full h-14">
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

                {/* 진행바 */}
                <div className="absolute left-[60px] top-[30px] w-[288px] h-[6px] rounded-full bg-white/20">
                    <div className="h-[6px] w-[192px] bg-white rounded-full"/> {/* 3/4 진척(= 288px의 2/3 정도로 조정 가능) */}
                </div>
                <div className="absolute right-[20px] top-[20px] text-base">
                    3<span className="text-white/50">/4</span>
                </div>
            </div>

            {/* 타이틀 */}
            <div className="absolute left-0 top-[105px] p-[32px]">
                <p className="text-[19px] font-medium leading-loose">
                    비슷한 나이에 맞는<br/>
                    정보를 제공하기 위해 <br/>
                    생일을 알려주세요.
                </p>
            </div>

            {/* 3열 ‘피커’ (위/가운데/아래 표기 & 밑줄) */}
            <div className="absolute left-[69px] top-[346px] flex flex-col gap-4">
                {/* 윗줄(회색) */}
                <div className="flex items-center justify-center gap-16 text-neutral-500">
                    <div className="w-16">
                        <div className="text-2xl font-medium tracking-tight">{year - 1}</div>
                        <div className="w-14 h-px bg-white/50 mt-1"/>
                    </div>
                    <div className="w-9 text-center">
                        <div className="text-2xl font-medium tracking-tight">{pad2(month - 1 >= 1 ? month - 1 : month)}</div>
                        <div className="w-9 h-px bg-white/50 mt-1"/>
                    </div>
                    <div className="w-9 text-center">
                        <div className="text-2xl font-medium tracking-tight">{pad2(day - 1 >= 1 ? day - 1 : day)}</div>
                        <div className="w-9 h-px bg-white/50 mt-1"/>
                    </div>
                </div>

                {/* 현재값(흰색) */}
                <div className="flex items-center justify-center gap-16">
                    <div className="w-16 text-2xl font-medium tracking-tight">{year}</div>
                    <div className="w-9  text-2xl font-medium tracking-tight text-center">{pad2(month)}</div>
                    <div className="w-9  text-2xl font-medium tracking-tight text-center">{pad2(day)}</div>
                </div>

                {/* 아랫줄(회색) */}
                <div className="flex items-center justify-center gap-16 text-neutral-500">
                    <div className="w-16">
                        <div className="text-2xl font-medium tracking-tight">{year + 1}</div>
                        <div className="w-14 h-px bg-white/50 mt-1"/>
                    </div>
                    <div className="w-9 text-center">
                        <div className="text-2xl font-medium tracking-tight">{pad2(month + 1 <= 12 ? month + 1 : month)}</div>
                        <div className="w-9 h-px bg-white/50 mt-1"/>
                    </div>
                    <div className="w-9 text-center">
                        <div className="text-2xl font-medium tracking-tight">{pad2(day + 1 <= days.length ? day + 1 : day)}</div>
                        <div className="w-9 h-px bg-white/50 mt-1"/>
                    </div>
                </div>

                {/* 값 조정 버튼(보이지 않게 영역만, 모바일이면 좌/우/클릭으로 바꾸고 싶으면 여기 onClick) */}
                <div className="flex items-center justify-center gap-16 mt-2">
                    <div className="w-16 flex items-center justify-between">
                        <button onClick={() => stepYear(-1)} className="sr-only">prev year</button>
                        <button onClick={() => stepYear(+1)} className="sr-only">next year</button>
                    </div>
                    <div className="w-9 flex items-center justify-between">
                        <button onClick={() => stepMonth(-1)} className="sr-only">prev month</button>
                        <button onClick={() => stepMonth(+1)} className="sr-only">next month</button>
                    </div>
                    <div className="w-9 flex items-center justify-between">
                        <button onClick={() => stepDay(-1)} className="sr-only">prev day</button>
                        <button onClick={() => stepDay(+1)} className="sr-only">next day</button>
                    </div>
                </div>
            </div>

            {/* 다음(→) 버튼 */}
            <button
                type="button"
                onClick={() => {
                    const birth = `${year}-${pad2(month)}-${pad2(day)}`;
                    update({ birth });   // Context에 저장
                    nav('/onboarding/address');   // 다음 페이지로 이동
                }}
                disabled={isFuture}
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
