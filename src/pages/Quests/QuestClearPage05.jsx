// import React from 'react';
// import { Box, Typography } from '@mui/material';
// import character from '/images/Homes/characterImg/charLv5.png' // 이미지 import

// const QuestClearPage05 = () => {
//   return (
//     <Box
//       sx={{
//         backgroundColor: 'black',
//         height: '100vh',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         pt: '25.66%', // 화면 6등분 기준 두 번째 영역
//       }}
//     >
//       {/* 첫 줄: Level 1-5 */}
//       <Typography
//         sx={{
//           fontSize: { xs: '2rem', sm: '3rem' },
//           fontWeight: 'semibold',
//           color: 'white',
//           mb: 2,
//         }}
//       >
//         Level 1-5
//       </Typography>

//       {/* 둘째 줄: 이미지 + Clear */}
//       <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: '143px', gap: 2 }}>
        
//         <Typography
//           sx={{
//             fontSize: { xs: '2rem', sm: '4rem' },
//             fontWeight: 'semibold',
//             color: 'white',
//           }}
//         >
//           Clear
//         </Typography>
//         <Box
//           component="img"
//           src={character}
//           alt="Clear Icon"
//           sx={{
//             width: { xs: 40, sm: 60 },
//             height: 'auto',
//           }}
//         />
//       </Box>

//       {/* 하단 문구 */}
//       <Typography
//         sx={{
//           fontSize: { xs: '1rem', sm: '1.25rem' },
//           fontWeight: 'normal',
//           color: 'white',
//           textAlign: 'center',
//           px: 2, // 좌우 여백
//         }}
//       >
//         작은 루틴이 쌓이면<br />
//         00의 하루가 조금 더 빛날 거에요
//       </Typography>
//     </Box>
//   );
// };

// export default QuestClearPage05;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import character from '/images/Homes/characterImg/charLv5.png'; // 이미지 import

const QuestClearPage05 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 3초 후에 홈('/')으로 이동하는 타이머를 설정합니다.
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    // 컴포넌트가 화면에서 사라질 때(unmount) 타이머를 정리(cleanup)합니다.
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box
      sx={{
        backgroundColor: 'black',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: '25.66%', // 화면 6등분 기준 두 번째 영역
      }}
    >
      {/* 첫 줄: Level 1-5 */}
      <Typography
        sx={{
          fontSize: { xs: '2rem', sm: '3rem' },
          fontWeight: 'semibold',
          color: 'white',
          mb: 2,
        }}
      >
        Level 1-5
      </Typography>

      {/* 둘째 줄: 이미지 + Clear */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: '143px', gap: 2 }}>
        
        <Typography
          sx={{
            fontSize: { xs: '2rem', sm: '4rem' },
            fontWeight: 'semibold',
            color: 'white',
          }}
        >
          Clear
        </Typography>
        <Box
          component="img"
          src={character}
          alt="Clear Icon"
          sx={{
            width: { xs: 40, sm: 60 },
            height: 'auto',
          }}
        />
      </Box>

      {/* 하단 문구 */}
      <Typography
        sx={{
          fontSize: { xs: '1rem', sm: '1.25rem' },
          fontWeight: 'normal',
          color: 'white',
          textAlign: 'center',
          px: 2, // 좌우 여백
        }}
      >
        작은 루틴이 쌓이면<br />
        영찬이의 하루가 조금 더 빛날 거에요
      </Typography>
    </Box>
  );
};

export default QuestClearPage05;