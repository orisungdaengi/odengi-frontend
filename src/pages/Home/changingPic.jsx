// --- 이미지 파일들을 먼저 import 합니다 ---
// (실제 프로젝트의 이미지 경로에 맞게 수정해주세요)
import charLv1 from './characterImg/charLv1.png';
import bgLv1 from './backgroundImg/backgroundLv1.png';

import charLv2 from './characterImg/charLv2.png';
import bgLv2 from './backgroundImg/backgroundLv2.png';

import charLv3 from './characterImg/charLv3.png';
import bgLv3 from './backgroundImg/backgroundLv3.png';

import charLv4 from './characterImg/charLv4.png';
import bgLv4 from './backgroundImg/backgroundLv4.png';

import charLv5 from './characterImg/charLv5.png';
import bgLv5 from './backgroundImg/backgroundLv5.png';


// 배열 형태로 레벨별 데이터를 관리합니다.
// 배열의 0번째 = 레벨 1, 1번째 = 레벨 2 데이터
export const levelAssets = [
  {
    level: 1,
    character: charLv1,
    background: bgLv1,
  },
  {
    level: 2,
    character: charLv2,
    background: bgLv2,
  },
  {
    level: 3,
    character: charLv3,
    background: bgLv3,
  },
  {
    level: 4,
    character: charLv4,
    background: bgLv4,
  },
  {
    level: 5,
    character: charLv5,
    background: bgLv5,
  },
  // 필요하다면 레벨 4, 5 데이터를 계속 추가할 수 있습니다.
];