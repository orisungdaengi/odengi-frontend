import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';

// assets 폴더에서 사용할 이미지 아이콘들을 import 합니다.
import recordIcon from './기록off.png';
import questIcon from './퀘스트off.png';
import homeIcon from './홈on.png';
import chatIcon from './채팅off.png';
import myIcon from './마이off.png';

// ⭐ 1. 아이콘 크기를 제어할 스타일 객체를 새로 만듭니다.
const navActionStyle = {
  // 아이콘과 라벨 주변의 기본 여백을 조절
  padding: '6px 0', 
  // 내부의 img 태그를 직접 타겟팅하여 크기 조절
  '& img': {
    width: '80px',  // 원하시는 크기로 조절하세요 (예: 32px)
    height: '80px',
  },
};

export default function BottomNavBar() {
  const [value, setValue] = useState(2);

  return (
    <Paper 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0,
        backgroundColor: 'transparent',
        boxShadow: 'none',
      }} 
      elevation={0}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          backgroundColor: 'transparent',
          // 네비게이션 바 자체의 높이를 아이콘에 맞게 조절
          height: '65px', 
        }}
      >
        {/* ⭐ 2. 모든 BottomNavigationAction에 sx prop으로 스타일을 적용합니다. */}
        <BottomNavigationAction sx={navActionStyle} icon={<img src={recordIcon} alt="기록" />} />
        <BottomNavigationAction sx={navActionStyle} icon={<img src={questIcon} alt="퀘스트" />} />
        <BottomNavigationAction sx={navActionStyle} icon={<img src={homeIcon} alt="홈" />} />
        <BottomNavigationAction sx={navActionStyle} icon={<img src={chatIcon} alt="채팅" />} />
        <BottomNavigationAction sx={navActionStyle} icon={<img src={myIcon} alt="마이" />} />
      </BottomNavigation>
    </Paper>
  );
}