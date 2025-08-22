import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOnboarding } from '../../state/OnboardingContext'

export default function Signup() {
    const [userId, setUserId] = useState('')     // ← 아이디
    const [pw, setPw] = useState('')
    const [pw2, setPw2] = useState('')
    const { update } = useOnboarding()
    const nav = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault()

        const id = userId.trim()
        if (!id || !pw || !pw2) return alert('모든 항목을 입력해 주세요.')
        if (pw !== pw2) return alert('비밀번호가 일치하지 않아요.')

        // 서버 호출 X  → 온보딩 마지막에만 /user/create 호출
        update({
            user_id: id,
            password: pw,
            // 백엔드에서 email required면 기본값 미리 채워두기
            email: `user_${Date.now()}@example.com`,
        })

        nav('/onboarding/name')  // 온보딩 시작
    }

    return (
        <div className="relative h-full w-full bg-[linear-gradient(12deg,_#122019_-8.17%,_#000_44.23%,_#081D25_107.49%)] text-white overflow-hidden">
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
                <h1 className="absolute left-1/2 top-[20px] -translate-x-1/2 text-base font-bold">회원가입</h1>
            </div>

            <form onSubmit={onSubmit} className="relative w-full h-full">
                {/* 아이디 */}
                <label className="absolute left-[37px] top-[166px] w-[320px]">
                    <span className="block text-xs font-semibold mb-2">아이디</span>
                    <div className="h-12 px-4 py-3 rounded-xl outline outline-1 outline-white/70 flex items-center gap-2">
                        <input
                            className="w-full bg-transparent text-white placeholder:text-white/60 outline-none text-[14px] leading-tight"
                            placeholder="아이디를 입력하세요."
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            autoComplete="username"
                        />
                    </div>
                </label>

                {/* 비밀번호 */}
                <label className="absolute left-[37px] top-[254px] w-[320px]">
                    <span className="block text-xs font-semibold mb-2">비밀번호</span>
                    <div className="h-12 px-4 py-3 rounded-xl outline outline-1 outline-white/80 flex items-center gap-2">
                        <input
                            type="password"
                            className="w-full bg-transparent text-white placeholder:text-white/60 outline-none text-[14px] leading-tight"
                            placeholder="비밀번호를 입력하세요."
                            value={pw}
                            onChange={(e) => setPw(e.target.value)}
                            autoComplete="new-password"
                        />
                    </div>
                </label>

                {/* 비밀번호 확인 */}
                <label className="absolute left-[37px] top-[342px] w-[320px]">
                    <span className="sr-only">비밀번호 확인</span>
                    <div className="h-12 px-4 py-3 rounded-xl outline outline-1 outline-white/80 flex items-center gap-2">
                        <input
                            type="password"
                            className="w-full bg-transparent text-white placeholder:text-white/60 outline-none text-[14px] leading-tight"
                            placeholder="다시 한 번 입력해주세요."
                            value={pw2}
                            onChange={(e) => setPw2(e.target.value)}
                            autoComplete="new-password"
                        />
                    </div>
                </label>

                <button
                    type="submit"
                    className="absolute left-[37px] top-[430px] w-[320px] h-10 rounded-lg bg-white/20 hover:bg-white/30 transition text-white text-[14px] font-normal"
                >
                    계속하기
                </button>
            </form>
        </div>
    )
}
