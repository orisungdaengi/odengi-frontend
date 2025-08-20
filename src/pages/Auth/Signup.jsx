import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
    const [name, setName] = useState('')
    const [pw, setPw] = useState('')
    const [pw2, setPw2] = useState('')
    const nav = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault()
        // TODO: 나중에 FastAPI 연동
    }

    return (
        <div className="relative h-full w-full bg-[linear-gradient(12deg,_#122019_-8.17%,_#000_44.23%,_#081D25_107.49%)] text-white overflow-hidden">
            {/* 상단 헤더 */}
            <div className="absolute left-0 top-[54px] w-full h-14 z-10">
                <button
                    type="button"
                    onClick={() => nav(-1)}
                    className="absolute left-[24px] top-[18px] size-5 grid place-items-center"
                    aria-label="뒤로가기"
                >
                    {/* 심플 백 아이콘 (SVG) */}
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                        <path d="M15 6L9 12l6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <h1 className="absolute left-1/2 top-[20px] -translate-x-1/2 text-base font-bold">
                    회원가입
                </h1>
            </div>

            {/* 폼 영역 */}
            <form onSubmit={onSubmit} className="relative w-full h-full">

                {/* 이름 */}
                <label className="absolute left-[37px] top-[166px] w-[320px]">
                    <span className="block text-xs font-semibold mb-2">이름</span>
                    <div className="h-12 px-4 py-3 rounded-xl outline outline-1 outline-white/70 flex items-center gap-2">
                        <input
                            className="w-full bg-transparent text-white placeholder:text-white/60 outline-none text-[14px] leading-tight"
                            placeholder="이름을 입력하세요."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </label>

                {/* 비밀번호 */}
                <label className="absolute left-[37px] top-[254px] w-[320px]">
                    <span className="block text-xs font-semibold mb-2">비밀번호</span>
                    <div
                        className="h-12 px-4 py-3 rounded-xl outline outline-1 outline-white/80 flex items-center gap-2">
                        <input
                            type="password"
                            className="w-full bg-transparent text-white placeholder:text-white/60 outline-none text-[14px] leading-tight"
                            placeholder="비밀번호를 입력하세요."
                            value={pw}
                            onChange={(e) => setPw(e.target.value)}
                            autoComplete="new-password"
                        />
                        <img className="ml-[3px] w-[16px] h-[16px]" src="/images/signup/eye.svg" alt=""/>
                    </div>
                </label>

                {/* 비밀번호 확인 */}
                <label className="absolute left-[37px] top-[342px] w-[320px]">
                    <span className="sr-only">비밀번호 확인</span>
                    <div
                        className="h-12 px-4 py-3 rounded-xl outline outline-1 outline-white/80 flex items-center gap-2">
                        <input
                            type="password"
                            className="w-full bg-transparent text-white placeholder:text-white/60 outline-none text-[14px] leading-tight"
                            placeholder="다시 한 번 입력해주세요."
                            value={pw2}
                            onChange={(e) => setPw2(e.target.value)}
                            autoComplete="new-password"
                        />
                        <img className="ml-[3px] w-[16px] h-[16px]" src="/images/signup/eye.svg" alt=""/>
                    </div>
                </label>

                {/* 제출 버튼 */}
                <button
                    type="submit"
                    className="absolute left-[37px] top-[430px] w-[320px] h-10 rounded-lg bg-white/20 hover:bg-white/30 transition text-white text-[14px] font-normal"
                >
                    가입하기
                </button>
            </form>

            {/* 하단 홈 인디케이터 */}
            <div className="absolute left-1/2 bottom-[10px] -translate-x-1/2 w-36 h-1.5 bg-white/90 rounded-full" />
        </div>
    )
}
