import React, { useState, useEffect } from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

// 아이콘 이미지 import

import recordOffIcon from '../../public/images/Component/기록off.png';
import recordOnIcon from '../../public/images/Component/기록on.png';
import questOffIcon from '../../public/images/Component/퀘스트off.png';
import questOnIcon from '../../public/images/Component/퀘스트on.png';
import homeOffIcon from '../../public/images/Component/홈off.png';
import homeOnIcon from '../../public/images/Component/홈on.png';
import chatOffIcon from '../../public/images/Component/채팅off.png';
import chatOnIcon from '../../public/images/Component/채팅on.png';
import myOffIcon from '../../public/images/Component/마이off.png';
import myOnIcon from '../../public/images/Component/마이on.png';
import { Opacity } from '@mui/icons-material';



const navActionStyle = {
  padding: '6px 0',
  '& img': {
    width: '80px',
    height: '80px',
  },
};

export default function BottomNavBar({ variant = 'default' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);

  useEffect(() => {

    // URL이 변경될 때마다 현재 경로로 value 상태를 업데이트
    setValue(location.pathname);
  }, [location.pathname]);

  const changedColor =  {backgroundColor:'rgba(0, 0, 0, 0.3)'}
  const backgroundColor = variant === 'quest' ? changedColor : 'transparent';


  const handleChange = (event, newValue) => {
    navigate(newValue);
  };

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: backgroundColor,
        boxShadow: 'none',
        transition: 'background-color 0.3s ease-in-out',
      }}
      elevation={0}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleChange}
        sx={{
          backgroundColor: 'transparent',
          height: '65px',
        }}
      >
        <BottomNavigationAction
          value="/records"
          sx={navActionStyle}
          icon={<img src={value === '/records' ? recordOnIcon : recordOffIcon} alt="기록" />}
        />
        <BottomNavigationAction
          value="/quests"
          sx={navActionStyle}

          // ✨ 'value ===' 대신 'value.startsWith'를 사용하여 /quests로 시작하는 모든 경로에서 아이콘이 on 상태가 되도록 수정
          icon={<img src={value.startsWith('/quests') ? questOnIcon : questOffIcon} alt="퀘스트" />}

        />
        <BottomNavigationAction
          value="/home"
          sx={navActionStyle}
          icon={<img src={value === '/home' ? homeOnIcon : homeOffIcon} alt="홈" />}
        />

        {/* --- ⬇️ 이 부분의 value를 수정했습니다 ⬇️ --- */}
        <BottomNavigationAction
          value="/chat"
          sx={navActionStyle}
          icon={<img src={value.startsWith('/chat') ? chatOnIcon : chatOffIcon} alt="채팅" />}
        />
        {/* --- ⬆️ 여기까지 수정! ⬆️ --- */}
        <BottomNavigationAction
          value="/my"
          sx={navActionStyle}
          icon={<img src={value.startsWith('/my') ? myOnIcon : myOffIcon} alt="마이" />}

        />
      </BottomNavigation>
    </Paper>
  );
}