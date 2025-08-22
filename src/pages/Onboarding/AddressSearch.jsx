import {useNavigate} from 'react-router-dom'

const SAMPLE = [
    { title: '숭실대학교', sub: '서울 동작구 상도로 369 (상도동)' },
    { title: '숭실대학교 정문', sub: '서울 동작구 상도로 369 (상도동)' },
    { title: '숭실대학교 정보과학관', sub: '서울 동작구 사당로 50 (상도동)' },
    { title: '숭실대학교 한경직기념관 주차장', sub: '서울 동작구 상도로 369 (상도동)' },
    { title: '숭실대학교 숭덕경상관', sub: '서울 동작구 상도로 369 (상도동)' },
    { title: '숭실대학교 전산관', sub: '서울 동작구 상도로 369 (상도동)' },
    { title: '숭실대학교 조만식기념관', sub: '서울 동작구 상도로 369 (상도동)' },
    { title: '숭실대학교 진리관', sub: '서울 동작구 상도로 369 (상도동)' },
    { title: '숭실대학교 베어드홀', sub: '서울 동작구 상도로 369 (상도동)' },
];

export default function AddressSearch() {
    const nav = useNavigate();

    return (
        <div className="relative h-full w-full text-white overflow-hidden
                    bg-[linear-gradient(12deg,_#122019_-8.17%,_#000_44.23%,_#081D25_107.49%)]">

            {/* 상단: 뒤로가기 + 진행바 + 4/4 */}
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
                    {/* 4/4 진행 (가득) */}
                    <div className="h-[6px] w-full bg-white rounded-full"/>
                </div>
                <div className="absolute right-[20px] top-[20px] text-base">
                    4<span className="text-white/50">/4</span>
                </div>
            </div>

            {/* 타이틀 */}
            <div className="absolute left-0 top-[105px] p-[32px]">
                <p className="text-[19px] font-semibold leading-loose">
                    주변의 정보를 파악하기 위해<br/>사는 지역을 알려주세요.
                </p>
            </div>

            {/* 검색 입력 */}
            <div className="absolute left-[21px] top-[245px] w-[360px] h-12 bg-white/20 rounded-lg px-4 flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-zinc-500/70" />
                <input
                    className="flex-1 bg-transparent outline-none placeholder:text-zinc-400 text-[15px]"
                    placeholder="지번,도로명,건물명으로 검색"
                />
            </div>

            {/* 현재 위치 찾기(비활성 스타일) */}
            <button
                type="button"
                className="absolute left-[21px] top-[307px] w-[360px] h-10 bg-white/30 rounded-lg grid place-items-center
                   text-zinc-500 text-[14px]"
            >
                현재 위치로 찾기
            </button>

            {/* 결과 리스트 (스크롤) */}
            <div
                className="absolute left-0 top-[363px] w-full bottom-[150px] overflow-y-auto"
                style={{scrollbarWidth: "none", msOverflowStyle: "none"}} // Firefox/IE
            >
                {SAMPLE.map((it, idx) => (
                    <button
                        key={idx}
                        onClick={() => nav('/onboarding/address-map')}
                        className="w-full px-6 py-2 text-left border-b border-white/30"
                    >
                        <div className="text-[16px] font-medium">{it.title}</div>
                        <div className="text-[13px] text-zinc-400">{it.sub}</div>
                    </button>
                ))}
            </div>


            {/* 다음(→) 버튼 */}
            <button
                type="button"
                onClick={() => nav('/onboarding/address-map')}
                className="absolute right-[28px] bottom-[55px] w-14 h-14 rounded-full bg-white
                   grid place-items-center active:scale-95 transition"
                aria-label="다음"
            >
                <svg width="35" height="35" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18l6-6-6-6" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>


            {/* 하단 홈 인디케이터 */}
            {/*<div className="absolute left-1/2 bottom-[10px] -translate-x-1/2 w-36 h-1.5 bg-white rounded-[100px]" />*/}
        </div>
    );
}
