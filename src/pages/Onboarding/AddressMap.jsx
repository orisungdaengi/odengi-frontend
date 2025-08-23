import {useNavigate} from 'react-router-dom'

export default function AddressMap() {
    const nav = useNavigate();

    return (
        <div className="relative h-full w-full text-white overflow-hidden
                    bg-[linear-gradient(12deg,_#122019_-8.17%,_#000_44.23%,_#081D25_107.49%)]">

            {/* 상단 바 + 타이틀 */}
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

                <div className="absolute left-[72px] top-[18px] text-[18px] font-semibold">
                    지도에서 위치 확인
                </div>
            </div>

            {/* 지도 영역 (플레이스홀더) */}
            <img
                className="absolute left-0 top-[122px] w-[402px] h-[752px] object-cover"
                src="https://placehold.co/402x752?text=Map"
                alt=""
            />

            {/* 말풍선 */}
            <div className="absolute left-[88px] top-[360px] bg-black text-white text-[12px] px-3 py-2 rounded">
                바꾼 위치가 주소와 같은지 확인해주세요
            </div>

            {/* 위치 핀 모양 대충 */}
            <div className="absolute left-[190px] top-[410px] w-7 h-9 bg-black rounded-b-full" />

            {/* 바텀 시트 */}
            <div className="absolute left-0 bottom-0 w-full py-6 bg-gradient-to-bl from-gray-900 via-black to-neutral-900
                      rounded-t-2xl flex flex-col gap-4">
                <div className="px-4">
                    <div className="text-[18px] font-semibold">숭실대학교 정보과학관</div>
                    <div className="text-[14px] text-neutral-400">서울 동작구 사당로 50(상도동)</div>
                </div>

                <div className="mx-4 h-10 px-4 bg-red-200/70 rounded-lg grid place-items-center">
                    <div className="text-red-700 text-[12px] font-light">
                        지도의 표시와 실제 주소가 맞는지 확인해주세요
                    </div>
                </div>

                <button
                    type="button"
                    className="mx-4 h-14 rounded-lg bg-white/20 hover:bg-white/30 transition"
                    onClick={() => nav('/onboarding/outro')}
                >
                    이 위치로 주소 등록
                </button>
            </div>

            {/* 하단 홈 인디케이터 */}
            {/*<div className="absolute left-1/2 bottom-[10px] -translate-x-1/2 w-36 h-1.5 bg-white rounded-[100px]" />*/}
        </div>
    );
}
