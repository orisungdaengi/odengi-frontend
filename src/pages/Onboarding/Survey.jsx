// src/pages/Onboarding/SurveyStacked.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../../state/OnboardingContext";
import { signupApi, loginApi } from "../../services/auth";
import { saveToken } from "../../lib/api";

const QUESTIONS = [
    "방이나 집에서 하루를 보내는 날이 많으신가요?",
    "아침이나 점심은 잘 챙겨드시고 있나요?",
    "내 방 정리, 조금 미뤄두고 계신가요?",
    "혼자만의 시간을 주로 보내고 있나요?",
    "가족이나 친구랑 얼굴 보고 이야기 많이 나누시나요?",
    "산책이나 가까운 곳이라도, 밖에 자주 나가시나요?",
    "사소한 고민이나 중요한 문제가 있다면 의논할 만한 사람이 떠오르시나요?",
    "하루 종일 누워만 있거나 왜인지 힘이 안 나는 날, 자주 있으신가요?",
    "새로 배운 것들이 있으신가요?",
    "내일, 다음 주 일상에 대한 기대보단 걱정이나 피곤함이 더 크신가요?",
];

const SCALE = [1, 2, 3, 4, 5]; // 1 = 전혀 아니다, 5 = 그렇다

export default function Survey() {
    const nav = useNavigate();
    const { data, update } = useOnboarding();

    const total = QUESTIONS.length;
    const [visibleCount, setVisibleCount] = useState(1);
    const [answers, setAnswers] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const containerRef = useRef(null);
    const lastQuestionRef = useRef(null);
    const btnRef = useRef(null);

    const answered = useMemo(() => Object.keys(answers).length, [answers]);
    const progress = useMemo(() => Math.min(answered / total, 1), [answered, total]);
    const isAllAnswered = answered === total;

    // 새 질문이 열릴 때 자동 스크롤
    useEffect(() => {
        if (!lastQuestionRef.current) return;
        lastQuestionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }, [visibleCount]);

    // 완료 버튼 포커스
    useEffect(() => { if (isAllAnswered) btnRef.current?.focus(); }, [isAllAnswered]);

    const onPick = (qIndex, score) => {
        setAnswers(prev => ({ ...prev, [qIndex]: score }));
        if (qIndex === visibleCount - 1 && visibleCount < total) {
            setVisibleCount(c => c + 1);
        }
    };

    // ✅ 설문완료 → 가입 + 로그인 → 아웃트로
    const handleSubmit = async () => {
        if (submitting) return;
        setSubmitting(true);
        try {
            // 임시 점수(요청 바디에 반영되도록 Context에도 저장)
            update({ stress_score: "30" });

            // 가입 바디 구성 (email 기본값 자동 보정)
            const payload = {
                user_id: data.user_id,
                password: data.password,
                name: data.name || "User",
                email: data.email || `user_${Date.now()}@example.com`,
                birth: data.birth,                 // "YYYY-MM-DD"
                gender: data.gender || "m",        // 서버 허용값('m'|'f')
                stress_score: "30",
            };

            if (!payload.user_id || !payload.password) {
                alert("아이디/비밀번호가 비어 있어요. 처음 가입 단계부터 다시 시도해주세요.");
                return;
            }

            // 1) 회원가입
            await signupApi(payload);

            // 2) 바로 로그인
            const token = await loginApi({ user_id: payload.user_id, password: payload.password });
            if (!token) throw new Error("로그인 토큰이 비어 있어요");
            saveToken(token, true);

            // 3) Outro로 이동
            nav('/onboarding/survey-outro', { replace: true });
        } catch (e) {
            // 중복 아이디 등으로 가입 실패 시: 로그인만 시도(테스트 편의)
            const msg = e?.response?.data?.message || e.message || '';
            try {
                if (/exist|duplicate|이미|409/i.test(msg)) {
                    const token = await loginApi({ user_id: data.user_id, password: data.password });
                    if (token) {
                        saveToken(token, true);
                        return nav('/onboarding/survey-outro', { replace: true });
                    }
                }
            } catch {}
            alert('완료 실패: ' + msg);
        } finally {
            setSubmitting(false);
        }
    };

    // 레이아웃 상수
    const SAFE_BOTTOM = 'env(safe-area-inset-bottom)';
    const BTN_H = 30;
    const BTN_OFFSET = 42;
    const MAX_BTN_OFFSET = 20;
    const EXTRA = 20;
    const SCROLL_INSET = `calc(${SAFE_BOTTOM} + ${BTN_H + MAX_BTN_OFFSET + EXTRA}px)`;

    const btnBase =
        "fixed left-1/2 -translate-x-1/2 z-30 w-[360px] max-w-[92vw] h-10 " +
        "rounded-lg bg-white/20 hover:bg-white/30 text-white text-[14px] font-medium " +
        "transition-all duration-300 ease-out will-change-transform will-change-opacity";
    const btnShown  = "opacity-100 translate-y-0 pointer-events-auto";
    const btnHidden = "opacity-0 translate-y-3 pointer-events-none";

    return (
        <div className="relative h-full w-full text-white
      bg-[linear-gradient(12deg,_#122019_-8.17%,_#000_44.23%,_#081D25_107.49%)] overflow-hidden">

            {/* 헤더 */}
            <div className="absolute left-0 top-[54px] w-full h-14 z-20">
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

                <div className="absolute left-[60px] top-[30px] w-[274px] h-[6px] rounded-full bg-white/20 overflow-hidden">
                    <div
                        className="h-[6px] bg-white rounded-full transition-[width] duration-200"
                        style={{ width: `${progress * 274}px` }}
                    />
                </div>

                <div className="absolute right-[20px] top-[20px] text-base">
                    {answered}<span className="text-white/50">/{total}</span>
                </div>
            </div>

            {/* 스크롤 컨테이너 */}
            <div
                ref={containerRef}
                className="absolute inset-x-0 top-[110px] overflow-y-auto px-5 no-scrollbar overscroll-none"
                style={{ bottom: SCROLL_INSET }}
            >
                <div className="space-y-8">
                    {QUESTIONS.slice(0, visibleCount).map((q, i) => (
                        <QuestionBlock
                            key={i}
                            innerRef={i === visibleCount - 1 ? lastQuestionRef : undefined}
                            index={i}
                            question={q}
                            value={answers[i] ?? 0}
                            onChange={(score) => onPick(i, score)}
                        />
                    ))}
                </div>
                <div style={{ height: SCROLL_INSET }} />
            </div>

            {/* 설문완료 버튼 */}
            {isAllAnswered && (
                <button
                    ref={btnRef}
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitting}
                    aria-hidden={!isAllAnswered}
                    tabIndex={isAllAnswered ? 0 : -1}
                    className={`${btnBase} ${isAllAnswered ? btnShown : btnHidden} ${submitting ? 'opacity-60' : ''}`}
                    style={{ bottom: `calc(${SAFE_BOTTOM} + ${BTN_OFFSET}px)` }}
                >
                    {submitting ? '처리 중…' : '설문완료'}
                </button>
            )}
        </div>
    );
}

// 질문 블록
function QuestionBlock({ index, question, value, onChange, innerRef }) {
    return (
        <section ref={innerRef} className="pt-2">
            <p className="px-2 text-[17px] font-medium leading-7 mb-3">{question}</p>

            <div className="flex items-center justify-between gap-11 px-2">
                {SCALE.map((score, i) => {
                    const selected = value === score;
                    const size =
                        i === 0 || i === 4 ? "w-9 h-9"
                            : i === 2            ? "w-5 h-5"
                                :                       "w-7 h-7";
                    return (
                        <button
                            key={score}
                            type="button"
                            onClick={() => onChange(score)}
                            className="relative"
                            aria-label={`Q${index + 1}-score-${score}`}
                        >
              <span
                  className={`${size} rounded-full grid place-items-center
                  transition-all duration-150
                  ${selected ? "bg-zinc-300 border border-zinc-300"
                      : "border border-zinc-300/90"}`}
              />
                        </button>
                    );
                })}
            </div>

            <div className="relative w-full mt-2">
        <span className="absolute left-[27px] -translate-x-1/2 text-[10px] text-white/90">
          전혀 그렇지 않다
        </span>
                <span className="absolute right-[26px] translate-x-1/2 text-[10px] text-white/90">
          그렇다
        </span>
            </div>
        </section>
    );
}
