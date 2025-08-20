import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// 나중에 실제 API 붙일 때 these 2개 사용
// import { loginApi } from '../../api/auth'
// import { saveToken } from '../../state/auth'

export default function Login() {
    const [id, setId] = useState('')
    const [pw, setPw] = useState('')
    const [auto, setAuto] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const nav = useNavigate()

    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true); setError('')
        try {
            // --- 실제 API 붙일 때 ---
            // const res = await loginApi({ user_id: id, password: pw })
            // const token = res?.access_token || res?.token
            // if (!token) throw new Error('로그인 실패')
            // saveToken(token)
            // -----------------------
            nav('/', { replace: true }) // 임시 이동(데모)
        } catch (err) {
            setError(err.message || '로그인 실패')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="relative h-full w-full bg-[linear-gradient(12deg,_#122019_-8.17%,_#000_44.23%,_#081D25_107.49%)] overflow-hidden text-white">
            {/* 본문 */}
            <div className="px-6 pb-8 pt-4 flex flex-col items-center">
                {/* 캐릭터 */}
                <img
                    className="w-[290px] h-[272px] object-contain mt-[160px]"
                    src="/images/signup/character.png"
                    alt=""
                />

                {/* 폼 */}
                <form onSubmit={onSubmit} className="w-[300px] mt-[-64px] space-y-[8px] text-[14px] font-medium">
                    <label className="block">
                        <span className="sr-only">아이디</span>
                        <div className="h-[41px] bg-stone-50 rounded-lg px-[10px] flex items-center gap-[13px]">
                            <img className="ml-[3px] w-[23px] h-[23px] opacity-[0.52]" src="/images/signup/id.png" alt=""/>
                            <input
                                className="flex-1 bg-transparent text-zinc-900 placeholder:text-zinc-500 outline-none"
                                placeholder="아이디"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                autoComplete="username"
                            />
                        </div>
                    </label>

                    <label className="block">
                        <span className="sr-only">비밀번호</span>
                        <div className="h-10 bg-stone-50 rounded-lg px-[13px] flex items-center gap-[16.5px]">
                            <img className="ml-[3.5px] w-[15.5px] h-[17.5px]" src="/images/signup/pw.svg" alt=""/>
                            <input
                                className="flex-1 bg-transparent text-zinc-900 placeholder:text-zinc-500 outline-none"
                                placeholder="비밀번호"
                                type="password"
                                value={pw}
                                onChange={(e) => setPw(e.target.value)}
                                autoComplete="current-password"
                            />
                        </div>
                    </label>

                    <div className="flex items-center justify-end text-[14px] mb-[24px] font-light">
                        <label className="inline-flex items-center gap-[6px] cursor-pointer select-none">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={auto}
                                onChange={(e) => setAuto(e.target.checked)}
                            />
                            <span
                                className="size-3 rounded-full border border-zinc-500
                                peer-checked:bg-white
                                peer-focus:outline peer-focus:outline-2 peer-focus:outline-white/60"
                            />
                            <span>자동로그인</span>
                        </label>

                    </div>

                    <button
                        disabled={loading || !id || !pw}
                        className="h-[41px] w-full rounded-lg bg-white/20 hover:bg-white/30 transition mb-[24px] text-white text-[14px] font-normal"
                    >
                        {loading ? '로그인 중…' : '로그인'}
                    </button>

                    <div className="flex w-full justify-center font-normal">
                    <div className="flex items-center text-[13px] gap-2 text-slate-50/60">
                            <Link to="/find-id" className="hover:underline">아이디 찾기</Link>
                            <span className="w-[8px] h-px rotate-90 bg-slate-50/60"/>
                            <Link to="/find-password" className="hover:underline">비밀번호 찾기</Link>
                            <span className="w-[8px] h-px rotate-90 bg-slate-50/60"/>
                            <Link to="/signup" className="hover:underline">회원가입</Link>
                        </div>
                    </div>

                    {error && <p className="text-sm text-red-400">{error}</p>}
                </form>
            </div>
        </div>
    )
}
