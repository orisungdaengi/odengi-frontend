// src/animations.js

// ✨ easeOut으로 변경된, 앱 전체에서 사용할 페이지 전환 효과입니다.
export const pageTransition = {
    type: 'tween',
    ease: 'easeOut', // 가장 대중적이고 자연스러운 easeOut 효과
    duration: 0.4,   // 지속 시간은 0.4초로 살짝 빠르게
  };
  
  // ✨ 페이지가 어떻게 나타나고 사라질지 정의하는 부분입니다.
  export const pageVariants = {
    initial: { x: '100vw', opacity: 0 }, // 오른쪽 화면 밖에서 시작
    in: { x: 0, opacity: 1 },             // 화면 안으로 들어옴
    out: { x: '-100vw', opacity: 0 },    // 왼쪽 화면 밖으로 사라짐
  };