import { useMemo, useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOnboarding } from "../../state/OnboardingContext";

const pad2 = (n) => String(n).padStart(2, '0')

// 해당 월의 마지막 일수 계산
const daysIn = (y, m) => new Date(y, m, 0).getDate()

// 공용 휠 컴포넌트 (가운데 줄 기준 스크롤 스냅)
function WheelColumn({
                         options,              // number[] (연/월/일 값 배열)
                         value,                // 현재 선택값
                         onChange,             // (next:number) => void
                         widthClass = 'w-16',  // 열 너비 클래스
                         itemHeight = 40,      // 항목 높이(px)
                         containerHeight = 120,// 컨테이너 높이(px) — 3줄 보이게
                         align = 'center',     // 텍스트 정렬
                     }) {
    const ref = useRef(null)
    const scrollTimer = useRef(null)

    // 가운데 라인에 맞추기 위한 위/아래 패딩
    const pad = (containerHeight - itemHeight) / 2

    // value 변경 시 해당 항목이 "가운데" 오도록 스크롤 이동
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const idx = Math.max(0, options.indexOf(value))
        const targetTop = idx * itemHeight // 패딩 덕분에 이 값이 중앙 위치
        if (Math.abs(el.scrollTop - targetTop) > 1) {
            el.scrollTo({ top: targetTop, behavior: 'auto' })
        }
    }, [value, options, itemHeight])

    // 스크롤 멈추면 가장 가까운 인덱스로 스냅 + onChange
    const handleScroll = () => {
        if (!ref.current) return
        if (scrollTimer.current) clearTimeout(scrollTimer.current)
        scrollTimer.current = setTimeout(() => {
            const el = ref.current
            const idx = Math.round(el.scrollTop / itemHeight)
            const clampedIdx = Math.max(0, Math.min(options.length - 1, idx))
            const next = options[clampedIdx]
            if (next !== value) onChange(next)
            // 정확히 중앙에 맞춰주기
            const targetTop = clampedIdx * itemHeight
            if (Math.abs(el.scrollTop - targetTop) > 1) {
                el.scrollTo({ top: targetTop, behavior: 'smooth' })
            }
        }, 90)
    }

    return (
        <div className={`${widthClass} relative`}>
            {/*/!* 가운데 선택 가이드 라인 *!/*/}
            {/*<div className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2">*/}
            {/*    <div className="mx-auto w-[90%] h-px bg-white/70" />*/}
            {/*</div>*/}

            {/* 실제 스크롤 목록 */}
            <div
                ref={ref}
                onScroll={handleScroll}
                className="overflow-y-scroll snap-y snap-mandatory no-scrollbar"
                style={{
                    height: `${containerHeight}px`,
                    paddingTop: `${pad}px`,
                    paddingBottom: `${pad}px`,
                    scrollSnapType: 'y mandatory',
                }}
            >
                {options.map((opt) => (
                    <div
                        key={opt}
                        className={`snap-center ${align === 'center' ? 'text-center' : ''} ${align === 'right' ? 'text-right' : ''} leading-[40px]`}
                        style={{ height: `${itemHeight}px` }}
                        onClick={() => onChange(opt)}
                    >
            <span className={`text-2xl font-medium tracking-tight ${opt === value ? 'text-white' : 'text-neutral-500'}`}>
              {String(opt).padStart(2, '0')}
            </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function OnboardingAge() {
    const nav = useNavigate()
    const { update } = useOnboarding();

    // 기본값: 오늘 기준
    const today = new Date()
    const [year, setYear]   = useState(today.getFullYear())
    const [month, setMonth] = useState(today.getMonth() + 1)
    const [day, setDay]     = useState(today.getDate())

    // 범위: 최근 100년
    const nowYear = today.getFullYear()
    const years = useMemo(() => {
        const arr = []
        for (let y = nowYear - 100; y <= nowYear; y++) arr.push(y)
        return arr
    }, [nowYear])

    const months = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), [])
    const days   = useMemo(() => Array.from({ length: daysIn(year, month) }, (_, i) => i + 1), [year, month])

    // 기존 보정/버튼 로직 (유지)
    const stepYear  = (d) => {
        const idx = years.indexOf(year) + d
        if (idx >= 0 && idx < years.length) {
            const next = years[idx]
            setYear(next)
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

    // 오늘 이후 막기(오늘은 허용)
    const toDateStr = (y, m, d) => `${y}-${pad2(m)}-${pad2(d)}`
    const todayStr = toDateStr(today.getFullYear(), today.getMonth() + 1, today.getDate())
    const selectedStr = toDateStr(year, month, day)
    const isFuture = selectedStr > todayStr

    return (
        <div className="relative h-full w-full text-white overflow-hidden
      bg-[linear-gradient(12deg,_#122019_-8.17%,_#000_44.23%,_#081D25_107.49%)]">

            {/* 상단: 뒤로가기 + 진행바 + 3/4 (원래 그대로) */}
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
                    <div className="h-[6px] w-[192px] bg-white rounded-full"/>
                </div>
                <div className="absolute right-[20px] top-[20px] text-base">
                    3<span className="text-white/50">/4</span>
                </div>
            </div>

            {/* 타이틀 (원래 그대로) */}
            <div className="absolute left-0 top-[105px] p-[32px]">
                <p className="text-[19px] font-medium leading-loose">
                    비슷한 나이에 맞는<br/>
                    정보를 제공하기 위해 <br/>
                    생일을 알려주세요.
                </p>
            </div>

            {/* 3열 휠 피커 */}
            <div className="absolute left-[69px] top-[330px] flex flex-col gap-4">
                <div className="flex items-center justify-center gap-16">
                    {/* 연도 */}
                    <div className="w-16">
                        <WheelColumn
                            options={years}
                            value={year}
                            onChange={(next) => {
                                setYear(next)
                                const last = daysIn(next, month)
                                if (day > last) setDay(last)
                            }}
                            widthClass="w-16"
                            align="right"
                            itemHeight={40}
                            containerHeight={120}
                        />
                    </div>

                    {/* 월 */}
                    <div className="w-9">
                        <WheelColumn
                            options={months}
                            value={month}
                            onChange={(next) => {
                                setMonth(next)
                                const last = daysIn(year, next)
                                if (day > last) setDay(last)
                            }}
                            widthClass="w-9"
                            align="center"
                            itemHeight={40}
                            containerHeight={120}
                        />
                    </div>

                    {/* 일 */}
                    <div className="w-9">
                        <WheelColumn
                            options={days}
                            value={day}
                            onChange={(next) => setDay(next)}
                            widthClass="w-9"
                            align="center"
                            itemHeight={40}
                            containerHeight={120}
                        />
                    </div>
                </div>

                {/* 접근성/테스트용 숨김 버튼 (원래 유지) */}
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

            {/* 다음(→) 버튼 (원래 그대로) */}
            <button
                type="button"
                onClick={() => {
                    const birth = `${year}-${pad2(month)}-${pad2(day)}`
                    update({ birth })            // Context에 저장
                    nav('/onboarding/address')   // 다음 페이지로 이동
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
